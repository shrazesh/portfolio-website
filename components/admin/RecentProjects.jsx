import Link from "next/link";

export default function RecentProjects({ projects }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Projects
      </h2>

      <div className="space-y-4">

        {projects.map((project) => (
          <div
            key={project._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <h3 className="font-semibold">
                {project.title}
              </h3>

              <p className="text-slate-600 text-sm">
                {project.slug}
              </p>
            </div>

            <Link
              href={`/admin/projects/edit/${project._id}`}
              className="text-accent"
            >
              Edit
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}