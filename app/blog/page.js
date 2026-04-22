import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Image from "next/image";

async function getBlogs() {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10">My Blogs</h1>

      <div className="grid gap-10">
        {blogs.map((blog) => (
          <div key={blog.slug} className="border rounded-lg p-5 shadow">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-md"
            />

            <h2 className="text-2xl font-semibold mt-4">{blog.title}</h2>
            <p className="text-gray-600">{blog.description}</p>

            <Link
              href={`/blog/${blog.slug}`}
              className="text-blue-600 font-medium mt-2 inline-block"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}