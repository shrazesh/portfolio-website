"use client";

import toast from "react-hot-toast";

export default function DeleteBlogButton({ id }) {
  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed.");
        return;
      }

      toast.success("Blog deleted successfully!");

      location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
    >
      Delete
    </button>
  );
}