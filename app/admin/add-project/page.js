"use client";

import { useState } from "react";

export default function AddProjectPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    tech: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()),
      }),
    });

    alert("Project Added!");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          placeholder="Project Title"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="slug"
          placeholder="project-slug"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="image"
          placeholder="/images/project.png"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="tech"
          placeholder="React, Node, MongoDB"
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button className="bg-black text-white px-6 py-3 rounded">
          Add Project
        </button>
      </form>
    </div>
  );
}