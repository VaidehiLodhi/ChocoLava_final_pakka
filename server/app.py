from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os

#app instance
app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "AIzaSyACvesfcHaCjL2b1zU4wOp3tIPhbzfO5W0"
genai.configure(api_key=GEMINI_API_KEY)

@app.route("/api/summarize", methods=["POST"])
def return_summarize():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415 
    
    data = request.get_json()
    logs = data.get("logs", [])

    if not logs:
        return jsonify({"error": "No logs provided"}), 400

    prompt = f"Summarize the following audit logs:\n{logs}"

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)

    return jsonify({"response": response.text})

@app.route("/api/home", methods=["GET","POST"])
def return_home():
    print(f"Received request: {request.method}")
    if request.method == "GET":
        return jsonify({"message": "This endpoint only supports POST for AI responses."})
    
    if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 415 
    
    data = request.get_json()
    prompt = data.get("prompt", "Tell me something interesting")

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)

    return jsonify({
        "response" : response.text
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)