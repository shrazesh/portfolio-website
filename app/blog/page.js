import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getBlogs() {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10">My Blogs</h1>

      <div className="grid gap-8">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`}>
            <div className="border rounded-xl p-5 shadow hover:shadow-lg">
              <Image
                src={blog.image}
                width={800}
                height={400}
                alt={blog.title}
                className="rounded-md"
              />
              <h2 className="text-2xl mt-4 font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}