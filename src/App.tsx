import { useState } from "react";

import Login from "@/components/Login";
import Messages from "@/components/Messages";
import { User } from "@/types";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user: User) => setUser(user);
  const handleLogout = () => setUser(null);

  return (
    <div className="container messages">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Messages user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
