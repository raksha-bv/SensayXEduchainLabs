export interface ProblemStatement {
  title: string;
  description: string;
  requirements: string[];
  hints: string[];
}
export function getInitialCodeTemplate(lessonId: string): string {
  switch (lessonId) {
    case "solidity-functions":
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RestrictedMessage {
    // TODO: Define owner variable and message variable

    constructor() {
        // TODO: Set owner to message sender
    }

    // TODO: Create onlyOwner modifier

    // TODO: Implement function to update message with onlyOwner restriction

}`;
    case "control-structures":
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuessTheNumber {
    // TODO: Define a private secret number variable

    constructor() {
        // TODO: Set the secret number (e.g., 7)
    }

    // TODO: Implement function that takes a number as input and checks if it's correct
}
`;

    case "solidity-syntax":
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator {
    // TODO: Implement add function

    // TODO: Implement subtract function


}`;

    case "mappings-structs-arrays":
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Library {
    // TODO: Define a struct 'Book' with title, author, and availability status

    // TODO: Create a mapping to store books by an ID

    // TODO: Implement function to add a new book

    // TODO: Implement function to mark a book as borrowed or returned

}`;
    case "events-security":
      `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeVault {
    // TODO: Create mapping to store user balances

    // TODO: Define Deposit and Withdraw events

    // TODO: Implement deposit function (payable) that emits an event

    // TODO: Implement withdraw function that allows users to withdraw their own balance and emits an event
}
`;
    case "inheritance-advanced-concepts":
      `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeVault {
    // TODO: Create mapping to store user balances

    // TODO: Define Deposit and Withdraw events

    // TODO: Implement deposit function (payable) that emits an event

    // TODO: Implement withdraw function that allows users to withdraw their own balance and emits an event
}
`;
    default:
      return `// Start coding your solution here\n`;
  }
}

export const problemStatements: { [key: string]: ProblemStatement } = {
  "solidity-syntax": {
    title: "Simple Math Challenge",
    description: "Write a contract that adds and subtracts numbers.",
    requirements: [
      "Create a contract named 'Math'.",
      "Write a function to add two numbers.",
      "Write a function to subtract two numbers.",
      "Both functions should return the result.",
    ],
    hints: [
      "Use 'uint' for numbers.",
      "Mark functions as 'public' and 'pure'.",
      "Pure functions don’t change contract data.",
    ],
  },
  "solidity-functions": {
    title: "Restricted Function Challenge",
    description: "Write a contract where only the owner can update a message.",
    requirements: [
      "Create a contract named 'RestrictedMessage'.",
      "Declare a string variable called 'message'.",
      "Use a constructor to set the owner when the contract is deployed.",
      "Write a function to update the message, but only the owner can call it.",
    ],
    hints: [
      "Use 'msg.sender' to check who is calling the function.",
      "Create a modifier called 'onlyOwner' to restrict access.",
      "Use 'require()' inside the modifier to enforce the rule.",
    ],
  },
  "control-structures": {
    title: "Guess the Number Challenge",
    description: "Write a contract where users guess a secret number.",
    requirements: [
      "Create a contract named 'GuessTheNumber'.",
      "Store a secret number (e.g., 7) in a private variable.",
      "Write a function that takes a number as input.",
      "If the guess is correct, return 'You guessed it!'.",
      "If the guess is too high, return 'Too high! Try again.'.",
      "If the guess is too low, return 'Too low! Try again.'.",
    ],
    hints: [
      "Use an 'if-else' structure to check conditions.",
      "Make the secret number private so it can't be read from outside.",
      "Use 'require()' only if you want to stop execution on invalid inputs.",
    ],
  },
  "mappings-structs-arrays": {
    title: "Library Book Management",
    description:
      "Write a contract to manage books in a library using structs and mappings.",
    requirements: [
      "Create a contract named 'Library'.",
      "Define a struct 'Book' with title, author, and availability status.",
      "Use a mapping to store books using an ID as the key.",
      "Write a function to add a new book.",
      "Write a function to mark a book as borrowed or returned.",
    ],
    hints: [
      "Use a boolean variable in the struct for availability.",
      "Mappings are great for storing data with unique keys.",
      "Functions should allow updating book status based on ID.",
    ],
  },
  "events-security": {
    title: "Safe Vault Challenge",
    description:
      "Write a secure contract where users can deposit and withdraw Ether with event logging.",
    requirements: [
      "Create a contract named 'SafeVault'.",
      "Allow users to deposit Ether into the contract.",
      "Write a withdraw function that only allows users to withdraw their own balance.",
      "Emit an event whenever a deposit or withdrawal happens.",
    ],
    hints: [
      "Use the 'payable' keyword for functions that handle Ether.",
      "Use a mapping to track each user's balance.",
      "Use 'require()' to prevent unauthorized withdrawals.",
      "Emit events to log deposits and withdrawals.",
    ],
  },
  "inheritance-advanced-concepts": {
    title: "Role-Based Access Control Challenge",
    description:
      "Write a contract where different roles (Admin and User) have different permissions using inheritance.",
    requirements: [
      "Create a base contract named 'UserRoles' with an 'owner' variable.",
      "Define a modifier 'onlyOwner' to restrict certain functions.",
      "Create a derived contract 'Admin' that inherits from 'UserRoles'.",
      "In 'Admin', add a function that only the owner can call to assign new admins.",
      "Create another contract 'User' that inherits from 'Admin' and allows users to perform a basic action.",
    ],
    hints: [
      "Use 'is' to inherit from another contract.",
      "Use 'onlyOwner' in functions that should be restricted.",
      "Use mappings to track which addresses are admins.",
    ],
  },
};
