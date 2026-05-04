export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <a
        href="/admin/add-project"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add New Project
      </a>
    </div>
  );
}
