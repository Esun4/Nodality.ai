import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({
    identifier: "", // username OR email
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Sign In Data:", form);
    // backend decides if its username or email based login (do the backend here)
    // for backend just check if identifier.includes("a") => email, else => username
    /* Signin sends:
    {
        "identifier": "johndoe OR john@email.com",
        "password": "password123"
    }
    */
  }

  return (
    <div className="auth-container">
      <h2>sign in</h2>

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
