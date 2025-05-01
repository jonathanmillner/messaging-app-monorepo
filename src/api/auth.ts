import { API_BASE_URL } from "./config";
import ENDPOINTS from "./endpoints";
import { User } from "@/types";
import { getAuthHeader } from "@/api/utils.ts";

const userLogin = async (username: string, password: string): Promise<User> => {
  const authHeader = getAuthHeader({ username, password, role: "" });

  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
  });

  if (!res.ok) throw new Error("User Login failed");

  const data = await res.json();
  return { username, password, role: data.role };
};

export { userLogin };
