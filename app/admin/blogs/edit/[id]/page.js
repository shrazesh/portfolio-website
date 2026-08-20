"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // Newly selected image file
  const [imageFile, setImageFile] = useState(null);

  // Preview of newly selected image
  const [preview, setPreview] = useState("");

  // =========================
  // LOAD BLOG
  // =========================
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
        console.error("Load blog error:", err);
        toast.error("Failed to load blog.");
        setLoading(false);
      }
    }

    if (id) {
      loadBlog();
    }
  }, [id, router]);

  // Clean preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // =========================
  // HANDLE TEXT / CHECKBOX
  // =========================
  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // =========================
  // HANDLE IMAGE
  // =========================
  function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    // Remove previous preview
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(file);

    const newPreview = URL.createObjectURL(file);
    setPreview(newPreview);
  }

  // =========================
  // SUBMIT
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("slug", form.slug.trim());
      formData.append("excerpt", form.excerpt.trim());
      formData.append("content", form.content);
      formData.append("category", form.category.trim());

      formData.append(
        "tags",
        JSON.stringify(
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      );

      formData.append("featured", String(form.featured));

      formData.append("published", String(form.published));

      // Only send image if user selected a new one
      if (imageFile) {
        formData.append("coverImage", imageFile);
      }

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || data.error || "Update failed.");
        return;
      }

      toast.success(data.message || "Blog updated successfully!");

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Update blog error:", error);
      toast.error("Something went wrong while updating the blog.");
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <div className="py-20 text-center text-xl">Loading blog...</div>;
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold mb-8">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          {/* SLUG */}
          <Input
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
          />

          {/* EXCERPT */}
          <Input
            label="Excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
          />

          {/* CONTENT */}
          <div>
            <label className="block mb-2 font-semibold">Content</label>

            <textarea
              rows={10}
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* CATEGORY + TAGS */}
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

          {/* CURRENT COVER IMAGE */}
          {form.coverImage && (
            <div>
              <label className="block mb-3 font-semibold">
                Current Cover Image
              </label>

              <div className="rounded-xl overflow-hidden border bg-slate-100">
                <img
                  src={form.coverImage}
                  alt={form.title || "Current blog cover image"}
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          )}

          {/* NEW COVER IMAGE */}
          <div>
            <label className="block mb-2 font-semibold">
              Change Cover Image
            </label>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-3 bg-white"
            />

            <p className="text-sm text-gray-500 mt-2">
              Leave this empty to keep the current cover image. Maximum size: 5
              MB.
            </p>
          </div>

          {/* NEW IMAGE PREVIEW */}
          {preview && (
            <div>
              <label className="block mb-3 font-semibold">
                New Cover Image Preview
              </label>

              <div className="rounded-xl overflow-hidden border bg-slate-100">
                <img
                  src={preview}
                  alt="New cover image preview"
                  className="w-full h-72 object-cover"
                />
              </div>

              <p className="text-sm text-green-600 mt-2">
                New image selected. It will replace the current cover image when
                you update the blog.
              </p>
            </div>
          )}

          {/* FEATURED + PUBLISHED */}
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

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Updating Blog..." : "Update Blog"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              disabled={saving}
              className="border px-8 py-3 rounded-lg hover:bg-slate-50 disabled:opacity-50"
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

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}
