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
    <div style={{ padding: "40px" }}>
      {/* 🔙 Back Button */}
      <Link href="/blog" className="back-btn">
        ← Back to Blogs
      </Link>

      {/* 🖼 Blog Image */}
      <Image
        src={blog.image}
        width={900}
        height={400}
        alt={blog.title}
        loading="eager"
      />

      {/* 📝 Blog Content */}
      <h1>{blog.title}</h1>
      <p><strong>By {blog.author}</strong> | {blog.date}</p>
      <div className="prose max-w-none">
        <ReactMarkdown>
          {blog.content}
        </ReactMarkdown>
      </div>
      
      {/* ⬅️➡️ Previous / Next Navigation */}
      <div className="blog-nav">
        {blogIndex > 0 && (
          <Link href={`/blog/${blogs[blogIndex - 1].slug}`}>
            ← {blogs[blogIndex - 1].title}
          </Link>
        )}

        {blogIndex < blogs.length - 1 && (
          <Link href={`/blog/${blogs[blogIndex + 1].slug}`}>
            {blogs[blogIndex + 1].title} →
          </Link>
        )}
      </div>
    </div>
  );
}

//  const { slug } = await params;   // ✅ IMPORTANT FIX