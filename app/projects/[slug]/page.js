import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

/* -----------------------------
   Fetch Project
------------------------------ */

async function getProject(slug) {
  await connectDB();

  const project = await Project.findOne({ slug }).lean();

  if (!project) return null;

  return JSON.parse(JSON.stringify(project));
}

/* -----------------------------
   SEO Metadata
------------------------------ */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Shrajesh Shrestha`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

/* -----------------------------
   Page
------------------------------ */

export default async function ProjectDetails({ params }) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back Button */}

      <Link
        href="/projects"
        className="inline-flex items-center text-blue-600 font-medium hover:underline"
      >
        ← Back to Projects
      </Link>

      {/* Banner */}

      <div className="relative w-full h-[420px] mt-8 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
        />
      </div>

      {/* Title */}

      <h1 className="text-5xl font-bold mt-10">{project.title}</h1>

      {/* Description */}

      <p className="mt-6 text-lg text-gray-600 leading-8">
        {project.description}
      </p>

      {/* Tech Stack */}

      <div className="flex flex-wrap gap-3 mt-8">
        {project.tech?.map((tech) => (
          <span
            key={tech}
            className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}

      <div className="flex flex-wrap gap-5 mt-10">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:opacity-90 transition"
          >
            View GitHub
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:opacity-90 transition"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
