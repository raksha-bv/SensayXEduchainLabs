// app/api/blockchain-chat/route.ts
import { NextResponse } from "next/server";
import { client } from "../../../src/client/client.gen";

// Create organization client by setting config
function createOrganizationClient() {
  const orgClient = { ...client };
  orgClient.setConfig({
    baseUrl: "https://api.sensay.io",
    headers: {
      "X-ORGANIZATION-SECRET": process.env.SENSAY_API_KEY!,
      "Content-Type": "application/json",
    },
  });
  return orgClient;
}

// Create user client by setting config
function createUserClient(userId: string) {
  const userClient = { ...client };
  userClient.setConfig({
    baseUrl: "https://api.sensay.io",
    headers: {
      "X-ORGANIZATION-SECRET": process.env.SENSAY_API_KEY!,
      "X-USER-ID": userId,
      "Content-Type": "application/json",
    },
  });
  return userClient;
}

async function ensureUserExists(userId: string) {
  const organizationClient = createOrganizationClient();

  try {
    console.log(`Checking if user ${userId} exists...`);
    const user = await organizationClient.get({
      url: `/users/${userId}`,
    });
    console.log("User exists:", user);
    return user;
  } catch (error: any) {
    console.log("User check error:", error.status, error.message);
    if (error.status === 404) {
      console.log(`Creating new user: ${userId}`);
      try {
        const newUser = await organizationClient.post({
          url: "/users",
          body: { id: userId },
        });
        console.log("Created new user:", newUser);
        return newUser;
      } catch (createError: any) {
        console.error("Error creating user:", createError);
        throw createError;
      }
    }
    throw error;
  }
}

async function getOrCreateReplica(userId: string) {
  const userClient = createUserClient(userId);

  try {
    console.log(`Getting replicas for user: ${userId}`);
    const replicasResponse = await userClient.get({
      url: "/replicas",
    });

    console.log(
      "Replicas response:",
      JSON.stringify(replicasResponse, null, 2)
    );
    const replicas = replicasResponse as any;

    // Check if we have replicas
    if (!replicas?.items || replicas.items.length === 0) {
      console.log("No replicas found, creating new one...");
      const newReplicaResponse = await userClient.post({
        url: "/replicas",
        body: {
          name: `Blockchain Assistant ${Date.now()}`,
          shortDescription: "A helpful blockchain and cryptocurrency assistant",
          greeting:
            "Hello! I am your blockchain assistant. How can I help you with crypto, DeFi, or blockchain technology today?",
          ownerID: userId,
          private: false,
          slug: `blockchain-assistant-${Date.now()}`,
          llm: {
            provider: "openai",
            model: "gpt-4o",
          },
        },
      });

      console.log(
        "New replica response:",
        JSON.stringify(newReplicaResponse, null, 2)
      );
      const newReplica = newReplicaResponse as any;
      const replicaId = newReplica?.uuid || newReplica?.id;
      console.log("Created replica with ID:", replicaId);
      return replicaId;
    }

    // Use the first available replica
    const replicaId = replicas.items[0]?.uuid || replicas.items[0]?.id;
    console.log("Using existing replica:", replicaId);
    return replicaId;
  } catch (error) {
    console.error("Error managing replica:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { message, userId = "solidity_learner" } = await request.json();

    console.log("Received request:", { message, userId });

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.SENSAY_API_KEY) {
      console.error("SENSAY_API_KEY not found in environment variables");
      return NextResponse.json(
        { error: "Sensay API key not configured" },
        { status: 500 }
      );
    }

    // Ensure user exists
    await ensureUserExists(userId);

    // Get or create a replica for the user
    const replicaId = await getOrCreateReplica(userId);

    if (!replicaId) {
      throw new Error("Failed to get or create replica ID");
    }

    // Create user client for chat
    const userClient = createUserClient(userId);

    console.log(`Sending message to replica ${replicaId}:`, message);

    // Send message to Sensay replica
    const chatResponse = await userClient.post({
      url: `/replicas/${replicaId}/chat`,
      body: { content: message },
    });

    console.log("Chat response:", JSON.stringify(chatResponse, null, 2));
    const response = chatResponse as any;

    // Try different possible response structures
    let botResponse = "";
    let success = false;

    // Check various possible response formats
    if (response?.success && response?.content) {
      botResponse = response.content;
      success = true;
    } else if (response?.message) {
      botResponse = response.message;
      success = true;
    } else if (response?.response) {
      botResponse = response.response;
      success = true;
    } else if (response?.data?.content) {
      botResponse = response.data.content;
      success = true;
    } else if (response?.data?.message) {
      botResponse = response.data.message;
      success = true;
    } else if (typeof response === "string") {
      botResponse = response;
      success = true;
    } else if (response?.choices?.[0]?.message?.content) {
      // OpenAI-style response
      botResponse = response.choices[0].message.content;
      success = true;
    }

    if (success && botResponse) {
      console.log("Successful response:", botResponse);
      return NextResponse.json({
        response: botResponse,
        replicaId: replicaId,
      });
    } else {
      console.error("No valid response content found in:", response);
      throw new Error("Failed to get valid response from Sensay");
    }
  } catch (error: any) {
    console.error("Sensay API Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      stack: error.stack,
    });

    // Handle different types of errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key or authentication failed" },
        { status: 401 }
      );
    } else if (error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    } else if (error.status === 404) {
      return NextResponse.json(
        { error: "Endpoint not found - check API documentation" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to process request with Sensay API",
          details: error.message,
        },
        { status: 500 }
      );
    }
  }
}
