import React, { useEffect, useState } from "react";

import { Message, MessagesProps, Role } from "@/types";
import { addMessage, fetchMessages } from "@/api/messages.ts";

const Messages = ({ user, onLogout }: MessagesProps) => {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState({ userID: "", message: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages(user)
      .then(setMsgs)
      .catch(() => setError("Failed to load messages"));
  }, [user]);

  const handleUserID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMsg((prev) => ({ ...prev, userID: e.target.value }));
  };

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMsg((prev) => ({ ...prev, message: e.target.value }));
  };

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const added = await addMessage(user, newMsg);

      setMsgs((prev) => [...prev, added]);
      setNewMsg({ userID: "", message: "" });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="message-board">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Messages</h2>

        <button className="btn btn-secondary" onClick={onLogout}>
          Log Out
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {msgs.length === 0 ? (
        <div className="alert alert-info">No messages to display.</div>
      ) : (
        <ul className="list-group">
          {msgs.map((m) => (
            <li key={m.id} className="list-group-item">
              <strong>{m.userID}</strong>: {m.message}
            </li>
          ))}
        </ul>
      )}

      {user.role === Role.Admin && (
        <form onSubmit={submitMessage}>
          <h5>Add Message</h5>

          <section>
            <input
              type="text"
              className="form-control"
              placeholder="User ID"
              value={newMsg.userID}
              onChange={handleUserID}
              required
            />
          </section>

          <section>
            <input
              type="text"
              className="form-control"
              placeholder="Message"
              value={newMsg.message}
              onChange={handleMessage}
              required
            />
          </section>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default Messages;
