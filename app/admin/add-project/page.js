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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()),
      }),
    });

    alert("Project Added Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-12">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-14">
          Add New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">
                Project Title
              </label>
              <input
                name="title"
                onChange={handleChange}
                className="input-style"
                placeholder="e.g. E-commerce website"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">
                Project Slug
              </label>
              <input
                name="slug"
                onChange={handleChange}
                className="input-style"
                placeholder="lowercase-with-hyphens (e.g. online-food-ordering)"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Image Path</label>
            <input
              name="image"
              onChange={handleChange}
              className="input-style"
              placeholder="/images/project-name.png (image must be inside public/images)"
              required
            />
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">
              Project Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows="5"
              className="input-style"
              placeholder="Describe your project..."
              required
            />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">
              Technologies (comma separated)
            </label>
            <input
              name="tech"
              onChange={handleChange}
              className="input-style"
              placeholder="Comma separated: React, Next.js, Node.js, MongoDB, Tailwind CSS"
              required
            />
          </div>

          {/* Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}