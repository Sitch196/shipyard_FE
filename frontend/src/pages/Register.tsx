import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShipyardOwner, setIsShipyardOwner] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isShipyardOwner,
        }),
      });

      if (response.ok) {
        alert("Registration successful! Please login with your credentials.");
        navigate("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>Register</h1>
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          minWidth: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={isShipyardOwner}
            onChange={(e) => setIsShipyardOwner(e.target.checked)}
          />
          Are you a Shipyard Owner?
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Register;
