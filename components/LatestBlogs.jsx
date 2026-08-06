import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogCard from "@/components/BlogCard";

export default async function LatestBlogs() {
  await connectDB();

  const blogs = await Blog.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">
              Latest Blogs
            </h2>

            <p className="text-slate-600 mt-2">
              Thoughts, tutorials and development journey.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-accent font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            No blogs available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id.toString()}
                blog={{
                  ...blog,
                  _id: blog._id.toString(),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}