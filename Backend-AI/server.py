import os
import json
import solcx
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import google.generativeai as genai

# Load environment variables first
load_dotenv()

# Configure solcx - use /tmp directory which is writable in Vercel
SOLCX_PATH = os.path.join('/tmp', '.solcx')
os.environ["SOLCX_BINARY_PATH"] = SOLCX_PATH

# Ensure the solcx directory exists in the writable area
os.makedirs(SOLCX_PATH, exist_ok=True)

# Configure API
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    print("Warning: API_KEY not found in environment variables")
    
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define solc versions to use
DEFAULT_SOLC_VERSION = "0.8.0"

# Initialize solc - use a try-except to handle initialization issues
try:
    # Install solc if needed - pre-compiled binary is in the writable /tmp directory
    print(f"Installing solc {DEFAULT_SOLC_VERSION}...")
    solcx.install_solc(DEFAULT_SOLC_VERSION, allow_osx=True, allow_windows=True, show_progress=False)
    solcx.set_solc_version(DEFAULT_SOLC_VERSION)
    print(f"Solc installed successfully: {solcx.get_installed_solc_versions()}")
except Exception as e:
    print(f"Error initializing solc: {str(e)}")
    # Continue execution - we'll handle compilation errors in the endpoints

@app.route('/', methods=['GET'])
def connect():
    """Health check endpoint"""
    try:
        # Check if solc is installed
        versions = solcx.get_installed_solc_versions()
        return jsonify({
            "status": "Connected to the server",
            "solc_versions": [str(v) for v in versions]
        })
    except Exception as e:
        return jsonify({
            "status": "Connected but solc not properly initialized",
            "error": str(e)
        })

@app.route('/generatePS', methods=['GET'])
def generatePS():
    """Generate a beginner-level Solidity problem statement"""
    prompt = """You are creating educational content for complete beginners who want to learn Solidity from scratch.

Generate a very simple Solidity problem statement that introduces fundamental concepts step by step.

The problem should:
- Focus on basic contract structure, state variables, simple functions, and visibility modifiers
- Be easy to understand for someone with little to no blockchain experience
- Use a real-world example that shows how smart contracts work in a practical way
- Be implementable in 20-40 lines of code

Format the problem statement as a JSON object with these fields:
{
    "title": "A short, beginner-friendly title",
    "description": "A simple explanation of what the learner needs to build",
    "requirements": ["List of basic concepts to include, such as variables, functions, and modifiers"],
    "hints": ["Small tips to guide the learner without giving the solution"]
}

Do not include code solutions in your response, only the problem statement.
"""  

    
    return generate_ai_response(prompt)

@app.route('/generatePSI', methods=['GET'])
def generatePSI():
    """Generate an beginner-level Solidity problem statement"""
    prompt = """You are a senior blockchain developer creating educational content for beginner Solidity developers.

    Generate an beginner-level smart contract problem statement (single smart contract needed) that helps developers advance their Solidity skills.
    
    The problem should:
    - Focus on basic contract structure, simple data types, functions, and state variables
    - Be approachable for someone with programming experience but new to blockchain
    - Include a real-world use case that demonstrates the value of smart contracts
    - Be implementable in 30-50 lines of code
    
    Format the problem statement as a JSON object with these fields:
    {
        "title": "A short, easy to understand title",
        "description": "A simple explanation of what the learner needs to build",
        "requirements": ["List of specific technical requirements the solution must meet"],
        "hints": ["Helpful guidance without giving away the solution"]
    }
    
    Do not include code solutions in your response, only the problem statement.
    """
    
    return generate_ai_response(prompt)

@app.route('/generatePSA', methods=['GET'])
def generatePSA():
    """Generate an intermediate-level Solidity problem statement"""
    prompt = """You are a senior blockchain developer creating educational content for intermediate Solidity developers.

    Generate an intermediate-level smart contract problem statement that helps developers advance their Solidity skills.
    
    The problem should:
    - Focus on more complex concepts like inheritance, libraries, events, modifiers, and error handling
    - Include interaction between multiple contracts or interfaces
    - Present a realistic DeFi, NFT, or DAO use case that requires thoughtful implementation
    - Encourage gas optimization and security best practices
    
    Format the problem statement as a JSON object with these fields:
    {
        "title": "A concise, descriptive title",
        "description": "A detailed explanation of the problem context and objectives",
        "requirements": ["List of specific technical requirements the solution must meet"],
        "hints": ["Helpful guidance without giving away the solution"]
    }
    
    Do not include code solutions in your response, only the problem statement.
    """
    
    return generate_ai_response(prompt)

@app.route('/validate-code', methods=['POST'])
def validate_code():
    """Validate if Solidity code is compilable"""
    data = request.get_json()
    code = data.get('code', '')
    problem_statement = data.get('problem_statement', '')
    
    # Perform actual compilation check
    compilation_result = check_solidity_compilation(code)
    if compilation_result["error"] == "":
        prompt = f"""
    Analyze the Solidity code against the problem requirements:
    
    Problem Statement: {problem_statement}
    
    Code: {code}
    
    Compilation Result: {compilation_result}
    
    Provide your analysis in the following JSON format:
    {{
        "status": true/false,
        "error": "Detailed explanation of how and which requirements are not met, if all requirements are met, leave it empty, if no requirements are provided leave it empty",
        "syntax_correct": "true/false",
        "compilable_code": "true/false",
        "score" : "rate their code out of 100 based on  the code they wrote"
    }}
    
    """
        return generate_ai_response(prompt)

    
    # Return just the compilation result
    return jsonify(compilation_result)

def check_solidity_compilation(code):
    try:
        # First, ensure solcx is properly initialized
        try:
            solc_versions = solcx.get_installed_solc_versions()
            if not solc_versions:
                # Install the default version if none is found
                solcx.install_solc(DEFAULT_SOLC_VERSION)
                solcx.set_solc_version(DEFAULT_SOLC_VERSION)
                pragma_version = DEFAULT_SOLC_VERSION
            else:
                # Use the first installed version
                solcx.set_solc_version(solc_versions[0])
                pragma_version = str(solc_versions[0])
        except Exception as init_error:
            return {
                "status": False,
                "syntax_correct": False,
                "compilable_code": False,
                "error": f"Failed to initialize solc: {str(init_error)}",
                "solidity_version": DEFAULT_SOLC_VERSION
            }
            
        # Extract pragma version from the code if present
        if "pragma solidity" in code:
            # We'll still use our installed version rather than trying to extract and install
            # a new one, as that's more reliable in the serverless environment
            pass
        else:
            # Add a default pragma if none exists
            code = f"pragma solidity ^{pragma_version};\n" + code
            
        # Compile the code
        try:
            output = solcx.compile_source(code)
            
            # Check if compilation was successful by verifying output format
            contract_found = False
            for key in output.keys():
                if 'bin' in output[key]:
                    contract_found = True
                    break
                    
            if contract_found:
                return {
                    "status": True,
                    "syntax_correct": True,
                    "compilable_code": True,
                    "error": "",
                    "solidity_version": pragma_version
                }
            else:
                return {
                    "status": False,
                    "syntax_correct": True,
                    "compilable_code": False,
                    "error": "Compilation output is missing bytecode. Check contract structure.",
                    "solidity_version": pragma_version
                }
        except Exception as compile_error:
            response = model.generate_content(f"Simplify the error , format it nicely in short sentence just telling where the error is : {str(compile_error)}")
            compile_error = response.text
            return {
                "status": False,
                "syntax_correct": False,
                "compilable_code": False,
                "error": str(compile_error),
                "solidity_version": pragma_version
            }
    except Exception as e:
        # Catch-all for any other exceptions
        return {
            "status": False,
            "syntax_correct": False,
            "compilable_code": False,
            "error": f"Unexpected error: {str(e)}",
            "solidity_version": DEFAULT_SOLC_VERSION
        }


@app.route('/freestyle-suggestions', methods=['POST'])
def freestyleSuggestions():
    """Provide suggestions to improve Solidity code"""
    data = request.get_json()
    code = data.get('code', '')
    
    prompt = f"""You are an expert Solidity mentor with years of experience in blockchain development and smart contract auditing.
    
    CODE:
    {code}
    
    Review the Solidity code and provide structured feedback in JSON format with the values being simple short strings:

    {{
        "errors": "List of syntax errors or issues that prevent compilation",
        "fixes": [ jsonOfFix("fixTitle" : "code_snippet - if applicable otherwise description")],
        "improvements": "Improvements to optimize gas usage, enhance security, or follow best practices",
        "compliments": "Compliments for well-written code or good practices",
        "summary": "Overall assessment and key points"
    }}

    Guidelines:
    1. **Be Specific** - Point to exact lines or functions needing attention.
    2. **Be Educational** - Explain why a change is needed, not just what to change.
    3. **Be Constructive** - Phrase feedback positively to encourage learning.
    4. **Be Comprehensive** - Cover syntax, security, gas optimization, and best practices.

    If the code is excellent, acknowledge it while suggesting optimizations.
    """
    
    return generate_ai_response(prompt)



@app.route('/suggestions', methods=['POST'])
def suggestions():
    """Provide suggestions to improve Solidity code"""
    data = request.get_json()
    problem_statement = data.get('problem_statement', '')
    code = data.get('code', '')
    
    prompt = f"""You are an expert Solidity mentor with years of experience in blockchain development and smart contract auditing.

    PROBLEM STATEMENT:
    {problem_statement}
    
    CODE:
    {code}
    
    Review the Solidity code against the problem statement and provide structured feedback in JSON format with the values being simple short strings:

    {{
        "errors": "List of syntax errors or issues that prevent compilation",
        "improvements": "Improvements to optimize gas usage, enhance security, or follow best practices",
        "compliments": "Compliments for well-written code or good practices",
        "summary": "Overall assessment and key points"
    }}

    Guidelines:
    1. **Be Specific** - Point to exact lines or functions needing attention.
    2. **Be Educational** - Explain why a change is needed, not just what to change.
    3. **Be Constructive** - Phrase feedback positively to encourage learning.
    4. **Be Comprehensive** - Cover syntax, security, gas optimization, and best practices.

    If the code is excellent, acknowledge it while suggesting optimizations.
    """
    
    return generate_ai_response(prompt)

@app.route("/chat", methods=["POST"])
def chat():
    """Chat with a blockchain expert AI"""
    data = request.json
    user_input = data.get('message', '')
    
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400
    
    system_instruction = """You are a blockchain expert chatbot. 
    You provide detailed and accurate answers to the specific question. At the end of each response, ask the user if they want to know more about any related topics and give some examples. 
    If a question is outside of blockchain topics, politely guide the user back to blockchain-related discussions."""
    
    prompt = f"{system_instruction}\n\nUser: {user_input}\nChatbot:"
    
    try:
        response = model.generate_content(prompt)
        return jsonify({'response': response.text})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500

def generate_ai_response(prompt):
    """Generate AI responses and return as jsonify response"""
    try:
        response = model.generate_content(prompt)
        text_response = response.text
        
        # Clean up the response to extract only the JSON part if present
        if '```json' in text_response:
            # Extract text between ```json and the next ```
            start_index = text_response.find('```json') + 7
            end_index = text_response.find('```', start_index)
            if end_index != -1:
                text_response = text_response[start_index:end_index].strip()
            else:
                # If no ending ``` is found, just remove the start
                text_response = text_response[start_index:].strip()
        
        # Try to parse the response as JSON
        try:
            json_response = json.loads(text_response)
            return jsonify(json_response)
        except json.JSONDecodeError:
            # If JSON parsing fails, return text as is
            return jsonify({'response': text_response})
            
    except Exception as e:
        print(f"Error processing response: {str(e)}")
        return jsonify({
            'error': str(e),
            'raw_text': text_response if 'text_response' in locals() else "No response generated"
        }), 500

def generate_ai_response_as_dict(prompt):
    """Generate AI responses and return as Python dictionary"""
    try:
        response = model.generate_content(prompt)
        text_response = response.text
        
        # Clean up the response to extract only the JSON part if present
        if '```json' in text_response:
            # Extract text between ```json and the next ```
            start_index = text_response.find('```json') + 7
            end_index = text_response.find('```', start_index)
            if end_index != -1:
                text_response = text_response[start_index:end_index].strip()
            else:
                # If no ending ``` is found, just remove the start
                text_response = text_response[start_index:].strip()
        
        # Try to parse the response as JSON
        try:
            return json.loads(text_response)
        except json.JSONDecodeError:
            # If JSON parsing fails, return a default dictionary
            return {"status": False, "error": "Failed to parse AI response"}
            
    except Exception as e:
        print(f"Error processing response: {str(e)}")
        return {"status": False, "error": f"AI processing error: {str(e)}"}

if __name__ == '__main__':
    app.run(port=5000, debug=True)