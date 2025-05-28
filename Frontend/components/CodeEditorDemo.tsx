"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const CodeEditorDemo = () => {
  const [code, setCode] = useState(`// Simple ERC20 token contract
pragma solidity ^0.8.0;

contract MyToken {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;

    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        
        emit Transfer(msg.sender, to, value);
        return true;
    }
}`);

  const [output, setOutput] = useState("✅ Compilation successful!");
  const [activeTab, setActiveTab] = useState("problem");

  const handleRun = () => {
    // Simulate compilation and execution
    setOutput("⏳ Compiling...");

    setTimeout(() => {
      if (code.includes("require(balanceOf[msg.sender] >= value")) {
        setOutput(
          "✅ Compilation successful!\n\nTest Cases Passed: 3/3\n\n- Basic token properties ✓\n- Transfer validation ✓\n- Event emission ✓"
        );
      } else {
        setOutput(
          "❌ Error: Transfer function missing proper validation.\nInsufficient balance check required."
        );
      }
    }, 1000);
  };

  return (
    <section className="px-6 py-16">
       
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive Code <span className="text-violet-400">Editor</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Try our Solidity code editor with real-time feedback and compilation
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-900/60 backdrop-blur rounded-xl border border-violet-900/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex border-b border-gray-800">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "problem"
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("problem")}
            >
              Problem
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "editor"
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("editor")}
            >
              Code Editor
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "output"
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("output")}
            >
              Output
            </button>
          </div>

          <div className="p-4 md:flex">
            {/* Problem Statement */}
            <div
              className={`${
                activeTab === "problem" ? "block" : "hidden md:block"
              } md:w-1/3 p-4`}
            >
              <h3 className="text-lg font-medium mb-3 text-violet-400">
                ERC-20 Token Challenge
              </h3>
              <div className="text-sm text-gray-300">
                <p className="mb-3">
                  Create a basic ERC-20 token with the following requirements:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Name: "MyToken"</li>
                  <li>Symbol: "MTK"</li>
                  <li>Decimals: 18</li>
                  <li>Total Supply: 1,000,000 tokens</li>
                  <li>Implement a transfer function that:</li>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Validates sufficient balance</li>
                    <li>Updates balances correctly</li>
                    <li>Emits a Transfer event</li>
                  </ul>
                </ul>
                <div className="mt-4 p-3 bg-violet-900/20 rounded-md border border-violet-800/30">
                  <p className="text-xs font-medium text-violet-300">
                    💡 Hint:
                  </p>
                  <p className="text-xs mt-1">
                    Remember to check the sender's balance before transferring
                    tokens.
                  </p>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div
              className={`${
                activeTab === "editor" ? "block" : "hidden md:block"
              } md:w-2/3 p-4`}
            >
              <div className="relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={handleRun}
                    className="text-xs px-3 py-1 bg-violet-700 hover:bg-violet-600 rounded text-white flex items-center"
                  >
                    <span className="mr-1">▶</span> Run
                  </button>
                </div>
                <div className="font-mono text-sm bg-gray-950 rounded-md p-4 overflow-auto h-96 border border-gray-800">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-transparent outline-none text-gray-300 resize-none"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>

            {/* Output */}
            <div
              className={`${
                activeTab === "output" ? "block" : "hidden md:block"
              } mt-4 md:mt-0 md:w-1/3 p-4`}
            >
              <h3 className="text-lg font-medium mb-3">Execution Result</h3>
              <div className="font-mono text-sm bg-gray-950 rounded-md p-4 overflow-auto h-64 border border-gray-800 whitespace-pre-wrap text-gray-300">
                {output}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeEditorDemo;
