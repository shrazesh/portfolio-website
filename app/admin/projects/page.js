import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

export default async function AdminProjects() {
  await connectDB();
  const projects = await Project.find({}).lean();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>

      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">{p.slug}</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/admin/projects/edit/${p._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <DeleteButton id={p._id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
