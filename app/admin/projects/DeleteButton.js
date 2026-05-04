"use client";

export default function DeleteButton({ id }) {
  const handleDelete = async () => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}
