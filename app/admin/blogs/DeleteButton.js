"use client";

export default function DeleteButton({ id }) {
  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    const res = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Delete failed");
      return;
    }

    alert("Blog deleted successfully");

    location.reload();
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
