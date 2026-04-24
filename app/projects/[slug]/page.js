import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProjects() {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function ProjectDetails({ params }) {
  // ✅ IMPORTANT FIX
  const { slug } = await params;

  const projects = await getProjects();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link href="/projects" className="text-blue-600 hover:underline">
        ← Back to Projects
      </Link>

      <div className="mt-6">
        <Image
          src={project.image}
          alt={project.title}
          width={900}
          height={400}
          className="rounded-xl w-full object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold mt-8">{project.title}</h1>
      <p className="mt-4 text-gray-600">{project.description}</p>

      <div className="flex gap-2 mt-6 flex-wrap">
        {project.tech?.map((t, i) => (
          <span
            key={i}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}