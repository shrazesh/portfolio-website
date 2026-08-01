"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: null,
    description: "",
    tech: "",
    github: "",
    live: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("slug", form.slug.trim());
      formData.append("description", form.description.trim());

      formData.append(
        "tech",
        JSON.stringify(
          form.tech
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append("github", form.github.trim());
      formData.append("live", form.live.trim());

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Failed to add project.");
        return;
      }

      alert(data.message || "Project added successfully!");

      // Reset form
      setForm({
        title: "",
        slug: "",
        image: null,
        description: "",
        tech: "",
        github: "",
        live: "",
      });

      // Reset file input
      if (fileRef.current) {
        fileRef.current.value = "";
      }

      // Redirect (after Sprint 3 creates this page)
      // router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Add New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Project Title"
              name="title"
              value={form.title}
              placeholder="Calorie Tracker"
              onChange={handleChange}
            />

            <Input
              label="Slug"
              name="slug"
              value={form.slug}
              placeholder="calorie-tracker"
              onChange={handleChange}
            />

            <div>
              <label className="block mb-2 font-medium">Project Image</label>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <Input
              label="Tech Stack"
              name="tech"
              value={form.tech}
              placeholder="Next.js, MongoDB, Tailwind CSS"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="GitHub URL (Optional)"
              name="github"
              value={form.github}
              placeholder="https://github.com/username/project"
              onChange={handleChange}
            />

            <Input
              label="Live Demo URL (Optional)"
              name="live"
              value={form.live}
              placeholder="https://example.com"
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-10 py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Project..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}
