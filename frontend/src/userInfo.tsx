import { useState } from "react";

export default function UserFormValidation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email) {
      setMessage("❌ Please fill out all fields.");
    } else {
      setMessage("✅ Submission successful!");
      setName("");
      setEmail("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
}
