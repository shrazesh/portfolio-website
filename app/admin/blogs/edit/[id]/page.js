"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    tags: "",
    coverImage: "",
    featured: false,
    published: true,
  });
  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);

        const result = await res.json();

        if (!res.ok || !result.success) {
          toast.error(result.message || "Blog not found");
          router.push("/admin/blogs");
          return;
        }

        const blog = result.data;

        setForm({
          title: blog.title || "",
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          category: blog.category || "General",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          coverImage: blog.coverImage || "",
          featured: blog.featured ?? false,
          published: blog.published ?? true,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog.");
      }
    }

    if (id) {
      loadBlog();
    }
  }, [id, router]);

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed.");
        return;
      }

      toast.success("Blog updated successfully!");

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-xl">Loading blog...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold mb-8">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
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
            <label className="block mb-2 font-semibold">Content</label>

            <textarea
              rows={10}
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <Input
              label="Tags"
              name="tags"
              value={form.tags}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Cover Image URL"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
          />

          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
              />
              Published
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg"
            >
              Update Blog
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="border px-8 py-3 rounded-lg"
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
      <label className="block font-semibold mb-2">{label}</label>

      <input {...props} className="w-full border rounded-lg p-3" />
    </div>
  );
}
