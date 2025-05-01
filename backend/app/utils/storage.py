from pathlib import Path
from typing import Any, Dict, List

def read_users(path: Path) -> List[Dict[str, Any]]:
    # Read users from a text file in format: username, hashed_password, role per line
    users = []
    for line in path.read_text().splitlines():
        if not line or line.startswith("#"): continue

        username, hashed_pw, role = line.strip().split(",")
        users.append({"username": username, "hashed_password": hashed_pw, "role": role})

    return users


def read_messages(path: Path) -> List[Dict[str, Any]]:
    # Read messages from a text file in format: id, userID, message per line
    msgs = []
    for line in path.read_text().splitlines():
        if not line or line.startswith("#"): continue
        parts = line.split(",", 2)

        if len(parts) != 3: continue

        id_str, userID, message = parts
        msgs.append({"id": int(id_str), "userID": userID, "message": message})

    return msgs


def write_messages(path: Path, messages: List[Dict[str, Any]]) -> None:
    # Write messages to a text file, one record per line
    lines = [f"{m['id']},{m['userID']},{m['message']}" for m in messages]
    path.write_text("\n".join(lines))