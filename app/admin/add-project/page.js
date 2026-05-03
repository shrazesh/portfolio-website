"use client";

import { useState } from "react";

export default function AddProjectPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: null,
    description: "",
    tech: "",
  });

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append(
      "tech",
      JSON.stringify(form.tech.split(",").map((t) => t.trim())),
    );
    formData.append("image", form.image); // ⭐ file

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Add New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Title"
              name="title"
              placeholder="Project title"
              onChange={handleChange}
            />
            <Input
              label="Slug (unique)"
              name="slug"
              placeholder="project-slug"
              onChange={handleChange}
            />
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Project Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <Input
              label="Tech Stack"
              name="tech"
              placeholder="Next.js, MongoDB, Tailwind"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write project description..."
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>

          {/* Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-black text-white px-10 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-gray-900 transition"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition"
      />
    </div>
  );
}
