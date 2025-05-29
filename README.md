# Sensay Labs

<img src="https://github.com/EduchainLabs/Showcase/blob/main/EduchainLogo.png" width=200 />

> Web3 Learning Platform with Solidity Practice Arena, NFT Certifications, and **Personalized AI Replica Tutors Powered by Sensay**

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [🤖 Sensay AI Integration](#-sensay-ai-integration)
- [Getting Started](#getting-started)
- [Platform Components](#platform-components)
- [Tech Stack](#tech-stack)
- [Development](#development)
- [Our Team](#our-team)
- [Links](#links)
- [Fundraising Status](#fundraising-status)
- [Smart Contracts](#smart-contracts)
- [License](#license)

## Overview

Sensay Labs is a comprehensive Web3 learning platform built for the EduChain ecosystem. It combines interactive blockchain education with hands-on Solidity practice, **personalized AI replica tutors powered by Sensay**, and real-world challenge rewards. Our platform bridges the gap between theoretical blockchain knowledge and practical development skills through cutting-edge AI technology.

![Platform Overview](https://github.com/EduchainLabs/Showcase/blob/main/EarlyAccess.png)

Sensay Labs empowers learners to:
- Practice Solidity through a LeetCode-style code arena with real-time validation
- Complete blockchain courses and earn verifiable NFT certificates
- Participate in company-posted challenges and earn on-chain bounties
- **Interact with personalized AI replica tutors that learn and adapt to each user's learning style**
- **Access 24/7 intelligent assistance through custom-trained AI models via Sensay API**
- Log in securely using OpenCampus ID (OCID)

## 🤖 Sensay AI Integration

**🚀 Revolutionary Personalized Learning Experience**

Sensay Labs leverages the powerful **Sensay API** to create individualized AI replica tutors for each user, transforming the traditional learning experience into a personalized, adaptive journey.

### What Makes Our Sensay Integration Special:

#### 🧠 **Personal AI Replica Tutors**
- **Individual AI Models**: Each user gets their own dedicated AI replica trained specifically for their learning needs
- **Adaptive Learning**: AI replicas learn from user interactions and adapt teaching methods accordingly  
- **Persistent Memory**: Your AI tutor remembers your progress, strengths, and areas for improvement across sessions
- **Custom Knowledge Base**: AI replicas are trained on blockchain and Solidity-specific knowledge for expert guidance

![Sensay AI Replica Dashboard](https://github.com/EduchainLabs/Showcase/blob/main/CourseChatbot.png)

#### 🎯 **Intelligent Learning Assistance**
- **Real-time Code Review**: AI replicas analyze your Solidity code and provide personalized feedback
- **Concept Explanation**: Complex blockchain concepts explained in a way that matches your learning style
- **Debugging Support**: Intelligent error detection and step-by-step debugging guidance
- **Learning Path Optimization**: AI suggests optimal learning sequences based on your progress

#### 📚 **Dynamic Knowledge Training**
- **Course-Specific Training**: AI replicas are trained on specific course materials and industry best practices
- **Real-World Problem Solving**: Access to updated blockchain development patterns and solutions
- **Interactive Q&A**: Natural conversation flow for asking questions and getting immediate, contextual answers
- **Progress Tracking**: AI monitors learning milestones and suggests improvements

#### 🔧 **Technical Implementation**
```javascript
// Example: Creating personalized AI replica for each user
const createUserReplica = async (userId, learningPreferences) => {
  const replica = await sensayAPI.createReplica({
    name: `${userId}-Blockchain-Tutor`,
    shortDescription: "Personal blockchain learning assistant",
    greeting: "Hi! I'm your personalized blockchain tutor. How can I help you today?",
    ownerID: userId,
    llm: {
      provider: "openai",
      model: "gpt-4o"
    }
  });
  
  // Train replica with blockchain-specific knowledge
  await trainReplicaWithBlockchainKnowledge(replica.uuid);
  return replica;
};
```

## Key Features

### 🔹 Solidity Practice Arena
A LeetCode-style coding platform where users get AI-generated problem statements suitable for Smart Contract Development. They can write, compile, and test Solidity smart contracts with **personalized AI replica feedback** and real-time code validation.

![Solidity Arena](https://github.com/EduchainLabs/Showcase/blob/main/SolidityCodeArena.png)

### 🔹 NFT-Certified Courses
Earn verifiable NFT certificates upon course completion. Each course includes theoretical knowledge & hands-on challenges where users can practice with **AI replica guidance**. Each certificate is minted via IPFS using Pinata and tied to the user's wallet—making achievements permanent and tamper-proof.

![NFT Certificates](https://github.com/EduchainLabs/Showcase/blob/main/Courses.png)

### 🔹 Company Challenge System
Tackle real-world Web3 problems posted by companies with **AI replica support**. Successful submissions trigger smart contracts that automatically distribute bounty rewards to the solver's wallet. Companies can promote their organization and get solutions to Smart Contract development problems.

![Challenge System](https://github.com/EduchainLabs/Showcase/blob/main/CreateBounty.png)

### 🔹 **Sensay-Powered AI Replica Tutors** ⭐
**The heart of our platform** - Each user gets their own dedicated AI replica tutor powered by Sensay's advanced API:
- **Personal Learning Assistant**: 24/7 availability with persistent memory of your learning journey
- **Adaptive Teaching**: AI adjusts explanations based on your comprehension level and learning style
- **Code Mentorship**: Real-time code review, debugging help, and best practice suggestions
- **Blockchain Expertise**: Deep knowledge of Solidity, smart contracts, and Web3 development
- **Progress Tracking**: Intelligent monitoring of your skills development and learning milestones

![AI Replica Tutor](https://github.com/EduchainLabs/Showcase/blob/main/CourseChatbot.png)

### 🔹 OpenCampus ID (OCID) Integration
Secure, decentralized authentication using OCID. Users sign in with their Web3 identity and immediately get paired with their **personal AI replica tutor**.

![OCID Authentication](https://github.com/EduchainLabs/Showcase/blob/main/OCID%20Authentication.png)
![OCID Integration](https://github.com/EduchainLabs/Showcase/blob/main/TutorialSection.png)

### 🔹 User Profile & Dashboard
A personalized dashboard that tracks courses completed, submissions made, accepted submissions, **AI replica interactions**, AI scores for each submission, achievements and more — helping learners stay motivated and on track.

![User Dashboard](https://github.com/EduchainLabs/Showcase/blob/main/ProfileSection.png)

### 🔹 Gas Fee Transparency
Before any blockchain interaction, the platform provides an estimate of the required gas fee with **AI replica explanations** of why certain operations cost more. This builds awareness of real-world blockchain costs and prevents failed transactions.

### 🔹 Beginner-Friendly Setup Tutorials
Step-by-step guides (both video and text-based) for absolute beginners, **enhanced with AI replica support**. Learn how to install MetaMask, add testnet networks, acquire testnet tokens, and sign up using OCID — all with personalized guidance from your AI tutor.

![Setup Tutorials](https://github.com/EduchainLabs/Showcase/blob/main/TutorialSectionVideo.png)

## Getting Started

### Prerequisites
- MetaMask or compatible Web3 wallet
- Basic understanding of blockchain concepts (or willingness to learn with your AI replica!)
- OpenCampus ID (OCID) - can be created during signup

### Quick Start
1. Visit [https://sensaylabs.vercel.app](https://educhainlabs.vercel.app/)
2. Connect your wallet and authenticate with OCID
3. **Meet your personal AI replica tutor** - automatically created upon first login
4. Explore courses or jump into the Solidity Practice Arena with AI guidance
5. Start earning NFT certificates, achievements and rewards with personalized support!

## Platform Components

### Learning Paths
- **Blockchain Fundamentals** - For absolute beginners (with AI replica onboarding)
- **Smart Contract Development** - Intermediate Solidity programming (with AI code mentorship)
- **Advanced Web3 Development** - Organized Smart Contract Competitions (with AI strategic guidance)

### Practice Arena
- Categorized Solidity challenges by difficulty
- Real-time Solidity compilation and validation
- **AI replica-generated problem statements** with personalized requirements
- **Intelligent code suggestions and debugging** from your personal AI tutor

### Challenge Portal
- Company-sponsored real-world problems
- Bounty rewards distributed via smart contracts
- **AI replica assistance** for solution development and verification
- **Personalized feedback** and improvement suggestions

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Flask
- **Database**: MongoDB  
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **AI**: **Sensay API (GPT-4o powered replicas)**, Gemini API (Model - Gemini Flash 2.0)
- **Storage**: Pinata (IPFS)
- **Auth**: OpenCampus ID (OCID)
- **Hosting**: Vercel

## Development

### Local Setup
```bash
# Clone the Frontend repository
git clone https://github.com/SensayLabs/Frontend.git

# Install dependencies
cd Frontend
npm install

# Set up environment variables
WEBSITE_URL = "http://localhost:3000/"
NEXT_PUBLIC_API_URL = "Where Your Backend Server is Running - Responsible for Code Validation and AI Responses"
MONGODB_URI=_YourURI
SENSAY_API_KEY=your_sensay_organization_secret
SENSAY_API_VERSION=2025-03-25

# Run development server
npm run dev
```

### Sensay Integration Setup
```bash
# Environment variables for Sensay API
export SENSAY_ORGANIZATION_SECRET=your_secret_token
export SENSAY_API_VERSION=2025-03-25
export SENSAY_API_URL=https://api.sensay.io
```

## Our Team

### Core Team
- **Raksha** – Frontend, **Sensay AI integration**, Web3 integration, Smart contracts, Database Management, Code Editor Config
- **Aditya** – Frontend, Smart contracts, Backend & Compiler Config, OCID integration

![Team Story](https://github.com/EduchainLabs/Showcase/blob/main/AboutSection.png)

## Links

- 🌐 Website: [https://sensaylabs.xyz](https://educhainlabs.vercel.app/)
- 🐦 X: [@sensaylabs](https://x.com/EduchainLabs)
- 🧑‍💻 GitHub: [github.com/sensaylabs](https://github.com/EduchainLabs)
- 🤖 Sensay Platform: [https://sensay.io](https://sensay.io)

## Fundraising Status

Not raised yet; actively looking for incubation and early-stage support. 

**Our unique Sensay AI integration** sets us apart in the Web3 education space with truly personalized learning experiences.

Interested in supporting our vision? Contact us at [investors@sensaylabs.xyz](mailto:educhainlabs@gmail.com)

## Smart Contracts

- 🧾 **Certificate NFT Contract**: [View on Etherscan](https://edu-chain-testnet.blockscout.com/address/0xE64fA322753b840Ab87895f069F4f85C5cD28A13)
- 💰 **Challenge Bounty Contract**: [View on Etherscan](https://edu-chain-testnet.blockscout.com/address/0x58e491bEB8B389e9eea9d832639819D5A557d121)

## License

License
Sensay Labs Commercial License
Copyright (c) 2025 Sensay Labs
All rights reserved.
This software and associated documentation files (the "Software") may only be used or copied in accordance with the terms of the commercial license agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sensay Labs.
Commercial Use Requirements:

A valid commercial license must be purchased for any business or individual using this software for commercial purposes.
Licensing fees are based on usage tiers as defined in our commercial licensing agreement.
Subscription renewal is required to continue using the software after the initial license period.

Prohibited Activities:

Distributing, sharing, or reselling the Software without explicit written permission.
Modifying, reverse engineering, or creating derivative works based on the Software.
Removing or altering any proprietary notices or labels on the Software.
Using the Software after license expiration or termination.

No Warranty:
THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SENSAY LABS BE LIABLE FOR ANY DAMAGES ARISING FROM THE USE OF THIS SOFTWARE.
For licensing information, please contact: sensaylabs@gmail.com
Unauthorized use of this software may result in legal action.