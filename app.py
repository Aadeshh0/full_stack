from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

USER_ID = "your_name"
EMAIL = "cllg@email.id"
ROLL_NUMBER = "RA_number"

@app_route('/bfhl', methods = ['POST'])
def process_data():
    data = request.json.get('data', [])

    if not isinstance(data, list):
        return jsonify({"is_success": False, "message": "Invalid Input"}), 400

    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha() and len(item) == 1]
    highest_alphabet  = [max(alphabets, key=str.lower())] if alphabets else []

    