import React, { useState } from "react";

import { LoginProps } from "@/types";
import { userLogin } from "@/api/auth.ts";

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await userLogin(username, password);
      onLogin(user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form className="login-form" onSubmit={submitForm}>
      <h2>Sign In</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <section>
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </section>

      <section>
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </section>

      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};

export default Login;
