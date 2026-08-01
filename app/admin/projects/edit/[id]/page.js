"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    tech: "",
    github: "",
    live: "",
  });

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);

        if (!res.ok) {
          alert("Project not found");
          router.push("/admin/projects");
          return;
        }

        const result = await res.json();

        const project = result.data;

        setForm({
          title: project.title || "",
          slug: project.slug || "",
          image: project.image || "",
          description: project.description || "",
          tech: project.tech?.join(", ") || "",
          github: project.github || "",
          live: project.live || "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load project.");
      }
    }

    loadProject();
  }, [id, router]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        tech: form.tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Update failed");
      return;
    }

    alert(result.message);

    router.push("/admin/projects");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-xl">
        Loading project...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold mb-10">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            label="Project Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
          />

          {form.image && (
            <div>
              <label className="block mb-3 font-semibold">Current Image</label>

              <div className="relative w-full h-72 rounded-xl overflow-hidden border">
                <Image
                  src={form.image}
                  alt={form.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <Input
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
          />

          <Input
            label="Tech Stack"
            name="tech"
            value={form.tech}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 font-semibold">Description</label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-4"
            />
          </div>

          <Input
            label="GitHub URL"
            name="github"
            value={form.github}
            onChange={handleChange}
          />

          <Input
            label="Live Demo URL"
            name="live"
            value={form.live}
            onChange={handleChange}
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900"
            >
              Update Project
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="border px-8 py-3 rounded-lg hover:bg-gray-100"
            >
              Cancel
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
      <label className="block mb-2 font-semibold">{label}</label>

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}
