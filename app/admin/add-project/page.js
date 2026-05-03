"use client";

import { useState } from "react";

export default function AddProjectPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    tech: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()), // ⭐ important
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="input"
        />
        <input
          name="slug"
          placeholder="Slug (unique)"
          onChange={handleChange}
          className="input"
        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="input"
        />

        <input
          name="tech"
          placeholder="Tech (comma separated) e.g. Next.js, MongoDB"
          onChange={handleChange}
          className="input"
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Add Project
        </button>
      </form>
    </div>
  );
}
