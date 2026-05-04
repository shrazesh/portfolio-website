"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    tech: "",
  });

  useEffect(() => {
    fetch(`/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        const project = data.find((p) => p._id === id);
        setForm({
          ...project,
          tech: project.tech.join(", "),
        });
      });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()),
      }),
    });

    alert("Updated!");
    router.push("/admin/projects");
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input"
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="input"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="input"
        />
        <input
          name="tech"
          value={form.tech}
          onChange={handleChange}
          className="input"
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Update Project
        </button>
      </form>
    </div>
  );
}
