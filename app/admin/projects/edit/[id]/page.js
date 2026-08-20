"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    description: "",
    tech: "",
    github: "",
    live: "",
  });

  // Stores the newly selected image file
  const [imageFile, setImageFile] = useState(null);

  // Preview of newly selected image
  const [preview, setPreview] = useState("");

  // Load existing project
  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);

        const result = await res.json();

        if (!res.ok || !result.success) {
          toast.error(result.message || "Project not found");
          router.push("/admin/projects");
          return;
        }

        const project = result.data;

        setForm({
          title: project.title || "",
          slug: project.slug || "",
          image: project.image || "",
          description: project.description || "",
          tech: Array.isArray(project.tech) ? project.tech.join(", ") : "",
          github: project.github || "",
          live: project.live || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Load project error:", err);
        toast.error("Failed to load project.");
        setLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id, router]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle new image selection
  function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Only allow images
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

    // Remove previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);

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

      // Only send image if user selected a NEW image
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || data.error || "Failed to update project");
        return;
      }

      toast.success(data.message || "Project updated successfully!");

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error("Update project error:", err);
      toast.error("Something went wrong while updating the project.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-xl">
        Loading project...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold mb-10">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Title */}
          <Input
            label="Project Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          {/* Slug */}
          <Input
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
          />

          {/* Current Image */}
          {form.image && (
            <div>
              <label className="block mb-3 font-semibold">
                Current Project Image
              </label>

              <div className="relative w-full h-72 rounded-xl overflow-hidden border bg-slate-100">
                <Image
                  src={form.image}
                  alt={form.title || "Current project image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* New Project Image */}
          <div>
            <label className="block mb-2 font-semibold">
              Change Project Image
            </label>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-3 bg-white"
            />

            <p className="text-sm text-gray-500 mt-2">
              Leave this empty to keep the current image. Maximum size: 5 MB.
            </p>
          </div>

          {/* New Image Preview */}
          {preview && (
            <div>
              <label className="block mb-3 font-semibold">
                New Image Preview
              </label>

              <div className="relative w-full h-72 rounded-xl overflow-hidden border bg-slate-100">
                <Image
                  src={preview}
                  alt="New project image preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                />
              </div>

              <p className="text-sm text-green-600 mt-2">
                New image selected. It will replace the current image when you
                update the project.
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <Input
            label="Tech Stack"
            name="tech"
            value={form.tech}
            onChange={handleChange}
          />

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">Description</label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* GitHub */}
          <Input
            label="GitHub URL"
            name="github"
            value={form.github}
            onChange={handleChange}
          />

          {/* Live */}
          <Input
            label="Live Demo URL"
            name="live"
            value={form.live}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Updating Project..." : "Update Project"}
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
      <label className="block mb-2 font-semibold">{label}</label>

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}
