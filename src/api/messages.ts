import { API_BASE_URL } from "./config";
import ENDPOINTS from "./endpoints";
import { Message, User } from "@/types";
import { getAuthHeader } from "@/api/utils.ts";

const fetchMessages = async (user: User): Promise<Message[]> => {
  const authHeader = getAuthHeader(user);

  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.MESSAGES}`, {
    headers: {
      Authorization: authHeader,
    },
  });
  if (!res.ok) throw new Error("Load Messages failed");
  return res.json();
};

const addMessage = async (
  user: User,
  newMsg: Omit<Message, "id">,
): Promise<Message> => {
  const authHeader = getAuthHeader(user);

  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.MESSAGES}`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMsg),
  });

  if (!res.ok) throw new Error("Add Message failed");

  return res.json();
};

export { fetchMessages, addMessage };
