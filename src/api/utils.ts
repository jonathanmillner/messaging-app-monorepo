import { User } from "@/types";

const getAuthHeader = (user: User): string =>
  "Basic " + btoa(`${user.username}:${user.password}`);

export { getAuthHeader };
