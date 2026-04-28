"use client";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    image: "",
    author: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        date: new Date().toISOString().split("T")[0],
      }),
    });

    alert("Blog Added!");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          className="w-full border p-3 rounded"
          placeholder="Slug (react-basics)"
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Blog Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Short Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="/images/blog.jpg"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Author Name"
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <textarea
          rows="10"
          className="w-full border p-3 rounded"
          placeholder="Write blog content here..."
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button className="bg-black text-white px-6 py-3 rounded w-full">
          Add Blog
        </button>
      </form>
    </div>
  );
}