import fs from "fs/promises";
import path from "path";
import Image from "next/image";

async function getProjects() {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="border rounded-xl p-6 shadow-md hover:shadow-xl transition"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={400}
              className="rounded-lg object-cover"
            />

            <h2 className="text-2xl font-semibold mt-4">
              {project.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              className="inline-block mt-6 text-blue-600 font-medium hover:underline"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}