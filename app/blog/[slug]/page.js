import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

export default async function BlogDetails({ params }) {
  const { slug } = await params;

  await connectDB();

  // Get current blog
  const blog = await Blog.findOne({
    slug,
    published: true,
  }).lean();

  if (!blog) {
    notFound();
  }

  // Get all published blogs for previous/next navigation
  const blogs = await Blog.find({
    published: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  const currentIndex = blogs.findIndex(
    (b) => b._id.toString() === blog._id.toString(),
  );

  const previousBlog =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const nextBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back */}
      <Link href="/blog" className="text-accent hover:underline font-medium">
        ← Back to Blogs
      </Link>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-[450px] mt-6 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Category */}
      <div className="mt-8">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {blog.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mt-4">{blog.title}</h1>

      {/* Date */}
      <p className="text-slate-600 mt-3">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-50 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Excerpt */}
      {blog.excerpt && (
        <p className="text-xl text-slate-600 mt-8 italic">{blog.excerpt}</p>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none mt-10">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </article>

      {/* Previous / Next */}
      <div className="border-t mt-16 pt-8 flex justify-between">
        {previousBlog ? (
          <Link
            href={`/blog/${previousBlog.slug}`}
            className="text-accent hover:underline"
          >
            ← {previousBlog.title}
          </Link>
        ) : (
          <div />
        )}

        {nextBlog ? (
          <Link
            href={`/blog/${nextBlog.slug}`}
            className="text-accent hover:underline"
          >
            {nextBlog.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
