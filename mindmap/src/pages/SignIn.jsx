import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [form, setForm] = useState({
    identifier: "", // username OR email
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        emailOrUsername: form.identifier,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // data error returns "Invalid credentials"
      setError(data.error || "Login failed");
      return;
    }

    setSuccess("Success")
    setTimeout(() => navigate("/dashboard"), 600);
    

  }

  return (
    <div className="auth-container">
      <h2>sign in</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "black" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="identifier"
          placeholder="Username or Email"
          value={form.identifier}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
