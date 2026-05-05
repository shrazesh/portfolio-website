import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProject(slug) {
  const res = await fetch(`http://localhost:3000/api/projects/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function ProjectDetails({ params }) {
  const { slug } = await params; // ✅ unwrap params first

  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back */}
      <Link href="/projects" className="text-blue-600 font-medium">
        ← Back to Projects
      </Link>

      {/* Image */}
      <div className="relative w-full h-[420px] mt-6 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mt-8">{project.title}</h1>

      {/* Description */}
      <p className="text-gray-600 text-lg mt-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-3 mt-6">
        {project.tech?.map((t, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-10">
        <a
          href={project.github}
          target="_blank"
          className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:opacity-80 transition"
        >
          View GitHub
        </a>

        <a
          href={project.live}
          target="_blank"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:opacity-80 transition"
        >
          Live Demo
        </a>
      </div>
    </div>
  );
}
