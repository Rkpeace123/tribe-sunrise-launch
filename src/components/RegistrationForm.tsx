import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    skills: "",
    interests: "",
    location: "",
    fitnessLevel: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://forzio.app.n8n.cloud/webhook/RUNTRIBE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          form_type: "registration",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setMessage("✅ Registration submitted!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          occupation: "",
          skills: "",
          interests: "",
          location: "",
          fitnessLevel: "",
        });
      } else {
        setMessage(`❌ Failed: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "occupation", "location", "fitnessLevel"].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required={field === "name" || field === "email"}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
        ))}

        <div>
          <label>Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </div>

        <div>
          <label>Interests</label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows={3}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default Register;
