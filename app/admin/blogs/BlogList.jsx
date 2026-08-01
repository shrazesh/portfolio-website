"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/admin/SearchBar";
import DeleteBlogButton from "./DeleteBlogButton";

export default function BlogList({ blogs }) {
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    const keyword = search.toLowerCase();

    return blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(keyword) ||
        blog.slug.toLowerCase().includes(keyword) ||
        blog.category.toLowerCase().includes(keyword)
      );
    });
  }, [blogs, search]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Manage Blogs
        </h1>

        <Link
          href="/admin/add-blog"
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-900"
        >
          + Add Blog
        </Link>

      </div>

      <SearchBar
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No blogs found
          </h2>

          <p className="text-gray-500 mt-2">
            Try another keyword.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>

                <h2 className="text-xl font-bold">
                  {blog.title}
                </h2>

                <p className="text-gray-500">
                  {blog.category}
                </p>

                <p className="text-gray-400 text-sm">
                  {blog.slug}
                </p>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/admin/blogs/edit/${blog._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </Link>

                <DeleteBlogButton id={blog._id} />

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}