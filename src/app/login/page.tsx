"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
   
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email ) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log("Form Data:", formData);
    alert("Signup successful!");
    setFormData({ name: "", email: "",}); // Clear the form
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <Link href="/signup">Go to signup page</Link>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    color: "black",
  },

  formGroup: {
    marginBottom: "15px",
    color: "black",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginBottom: "15px",
  },
};

export default login;
