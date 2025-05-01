type Message = {
  id: number;
  userID: string;
  message: string;
};

type User = {
  username: string;
  password: string;
  role: string;
};

type LoginProps = {
  onLogin: (user: User) => void;
};

type MessagesProps = {
  user: User;
  onLogout: () => void;
};

export type { Message, User, LoginProps, MessagesProps };

export enum Role {
  Admin = "admin",
  Readonly = "readonly",
}

