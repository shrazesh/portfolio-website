import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getBlogs() {
  await connectDB();

  const blogs = await Blog.find({
    published: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  return blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10">My Blogs</h1>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No blogs found.</h2>
          <p className="text-slate-600 mt-2">
            Create your first blog from the Admin Dashboard.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id.toString()}
              href={`/blog/${blog.slug}`}
              className="group"
            >
              <article className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                {blog.coverImage && (
                  <div className="relative h-56">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                <div className="p-5">
                  <span className="text-sm text-accent font-medium">
                    {blog.category}
                  </span>

                  <h2 className="text-2xl font-bold mt-2 group-hover:text-accent transition">
                    {blog.title}
                  </h2>

                  <p className="text-slate-600 mt-3 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {blog.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-50 text-sm px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
