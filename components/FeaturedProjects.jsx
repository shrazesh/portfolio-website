import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectCard from "@/components/ProjectCard";

export default async function FeaturedProjects() {
  await connectDB();

  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">
              Featured Projects
            </h2>

            <p className="text-slate-600 mt-2">
              Some of my recent work.
            </p>
          </div>

          <Link
            href="/projects"
            className="text-accent font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            No projects available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id.toString()}
                project={{
                  ...project,
                  _id: project._id.toString(),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}