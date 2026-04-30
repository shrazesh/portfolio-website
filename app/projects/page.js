import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-14">My Projects</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}