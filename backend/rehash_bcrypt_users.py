from pathlib import Path
from getpass import getpass
from app.utils.security import hash_password
import os

USERS_PATH = Path(__file__).parent / "data" / "users.txt"

def main():
    lines = USERS_PATH.read_text().splitlines()
    header = lines[0]
    new_lines = [header]

    for line in lines[1:]:
        if not line.strip() or line.startswith("#"):
            new_lines.append(line)
            continue
        username, _, role = line.split(",", 2)
        pw = getpass(f"New plaintext password for {username}: ")
        bcrypt_hash = hash_password(pw)
        new_lines.append(f"{username},{bcrypt_hash},{role}")

    USERS_PATH.write_text("\n".join(new_lines))
    print("✅ users.txt updated with bcrypt hashes.")

if __name__ == "__main__":
    # Ensure SECRET_KEY isn’t used by bcrypt; bcrypt generates its own salt
    # Just run: python rehash_bcrypt_users.py
    os.environ.pop("SECRET_KEY", None)
    main()
