
from flask import Flask, request, jsonify
import json
import uuid
import os

app = Flask(__name__)

EVENTS_FILE = "events.json"

def load_events():
    if not os.path.exists(EVENTS_FILE):
        return []
    with open(EVENTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_events(events):
    with open(EVENTS_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, ensure_ascii=False, indent=2)

@app.route("/api/events", methods=["GET"])
def get_events():
    return jsonify(load_events())

@app.route("/api/events", methods=["POST"])
def add_event():
    data = request.json
    if not data or "title" not in data or "date" not in data:
        return jsonify({"error": "Missing fields"}), 400

    events = load_events()
    new_event = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "date": data["date"],
        "description": data.get("description", "")
    }
    events.append(new_event)
    save_events(events)
    return jsonify(new_event), 201

@app.route("/api/events/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    events = load_events()
    updated = [e for e in events if e["id"] != event_id]
    if len(updated) == len(events):
        return jsonify({"error": "Event not found"}), 404
    save_events(updated)
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)
