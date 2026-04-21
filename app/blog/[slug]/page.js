export const dynamic = "force-dynamic";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import blogs from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";
// import { notFound } from "next/navigation";

export default async function BlogDetails({ params }) {
  const { slug } = await params;   // ✅ important

  // ✅ use slug, NOT params.slug
  const blogIndex = blogs.findIndex((b) => b.slug === slug);

  // If blog not found → show 404 page
  if (blogIndex === -1) {
    notFound();
  }

  const blog = blogs[blogIndex];

  return (
  <div className="max-w-4xl mx-auto px-6 py-10">
    {/* 🔙 Back Button */}
    <Link
      href="/blog"
      className="text-blue-600 hover:underline font-medium"
    >
      ← Back to Blogs
    </Link>

    {/* 🖼 Blog Image */}
    <div className="mt-6">
      <Image
        src={blog.image}
        width={900}
        height={400}
        alt={blog.title}
        loading="eager"
        className="rounded-xl shadow-md w-full object-cover"
      />
    </div>

    {/* 📝 Title */}
    <h1 className="text-4xl font-bold mt-8 text-gray-900">
      {blog.title}
    </h1>

    {/* ✍️ Author & Date */}
    <p className="text-gray-500 mt-2">
      <strong>By {blog.author}</strong> | {blog.date}
    </p>

    {/* 📄 Markdown Content */}
    <div className="prose lg:prose-lg max-w-none mt-8 prose-headings:text-center">
      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </div>

    {/* ⬅️➡️ Previous / Next Navigation */}
    <div className="flex justify-between items-center mt-12 border-t pt-6">
      {blogIndex > 0 ? (
        <Link
          href={`/blog/${blogs[blogIndex - 1].slug}`}
          className="text-blue-600 hover:underline"
        >
          ← {blogs[blogIndex - 1].title}
        </Link>
      ) : <div />}

      {blogIndex < blogs.length - 1 && (
        <Link
          href={`/blog/${blogs[blogIndex + 1].slug}`}
          className="text-blue-600 hover:underline"
        >
          {blogs[blogIndex + 1].title} →
        </Link>
      )}
    </div>
  </div>
);
 }