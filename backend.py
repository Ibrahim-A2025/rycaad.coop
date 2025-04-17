
from flask import Flask, request, jsonify
import json
from datetime import date
import os

app = Flask(__name__)
NOTIF_FILE = "notifications.json"

@app.route("/api/add-notification", methods=["POST"])
def add_notification():
    notif = request.json
    try:
        with open(NOTIF_FILE, encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    data.insert(0, notif)  # أضف التنبيه في الأعلى

    with open(NOTIF_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)
