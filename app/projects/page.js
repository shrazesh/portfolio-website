import ProjectCard from "@/components/ProjectCard";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Shrajesh Shrestha",
  description:
    "Explore my MERN Stack, Next.js, AI and Full Stack development projects.",
};

async function getProjects() {
  await connectDB();

  const projects = await Project.find({})
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-14">My Projects</h1>

      {projects.length === 0 ? (
        <p className="text-center text-slate-600">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
