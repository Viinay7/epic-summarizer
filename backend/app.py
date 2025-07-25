from flask import Flask, request, jsonify
from summarize import summarize_pdf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "✅ Flask backend is running!"

@app.route('/summarize', methods=['POST'])
def summarize():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    summary = summarize_pdf(file)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)
