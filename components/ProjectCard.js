import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group h-full">
      <div className="border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
        {/* Fixed image height */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-5 flex flex-col flex-grow">
          <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition">
            {project.title}
          </h2>

          {/* Same height description */}
          <p className="text-gray-600 mt-2 line-clamp-3 flex-grow">
            {project.description}
          </p>

          {/* Technologies always at bottom */}
          <div className="flex flex-wrap gap-2 mt-4">
            {(project.tech || []).map((tech, i) => (
              <span
                key={i}
                className="bg-gray-100 border px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
