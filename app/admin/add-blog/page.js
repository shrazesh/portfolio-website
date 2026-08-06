"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    tags: "",
    coverImage: null,
    featured: false,
    published: true,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleImage(e) {
    setForm({
      ...form,
      coverImage: e.target.files[0],
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("category", form.category);

      formData.append(
        "tags",
        JSON.stringify(
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      );

      formData.append("featured", form.featured);
      formData.append("published", form.published);

      if (form.coverImage) {
        formData.append("coverImage", form.coverImage);
      }

      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create blog.");
        return;
      }

      toast.success("Blog created successfully!");

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold mb-10">Add New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <Input
            label="Blog Title"
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

          <Input
            label="Excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 font-semibold">Blog Content</label>

            <textarea
              rows={10}
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-4"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option>General</option>
                <option>AI</option>
                <option>MERN</option>
                <option>Next.js</option>
                <option>React</option>
                <option>Python</option>
              </select>
            </div>

            <Input
              label="Tags"
              name="tags"
              placeholder="React, AI, MERN"
              value={form.tags}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Cover Image</label>

            <input type="file" accept="image/*" onChange={handleImage} />
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured Blog
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
              />
              Publish
            </label>
          </div>

          <button
            disabled={loading}
            className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-gray-900"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );

  function Input({ label, ...props }) {
    return (
      <div>
        <label className="block mb-2 font-semibold">{label}</label>

        <input {...props} className="w-full border rounded-lg p-3" />
      </div>
    );
  }
}
