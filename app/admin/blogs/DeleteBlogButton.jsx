"use client";

export default function DeleteBlogButton({ id }) {
  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    const res = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete.");
      return;
    }

    alert("Blog deleted successfully!");

    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    >
      Delete
    </button>
  );
}