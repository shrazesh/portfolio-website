"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/admin/SearchBar";
import DeleteButton from "./DeleteButton";

export default function ProjectList({ projects }) {
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const keyword = search.toLowerCase();

      return (
        project.title.toLowerCase().includes(keyword) ||
        project.slug.toLowerCase().includes(keyword)
      );
    });
  }, [projects, search]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Projects</h1>

        <Link
          href="/admin/add-project"
          className="bg-slate-900 text-white px-5 py-3 rounded-lg"
        >
          + Add Project
        </Link>
      </div>

      <SearchBar
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-8 text-center">
            <p className="text-slate-600">No matching projects found.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{project.title}</h2>

                <p className="text-slate-600">{project.slug}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/admin/projects/edit/${project._id}`}
                  className="bg-accent text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </Link>

                <DeleteButton id={project._id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
