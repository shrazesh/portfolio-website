import Link from "next/link";
import  blogs  from "@/data/blogs"; // ✅ FIX

export default function BlogPage() {
  return (
    <div style={{ padding: "60px 40px" }}>
      <h1>My Blog</h1>

      {blogs.map((blog) => (
        <div key={blog.slug} style={{ marginBottom: "30px" }}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>

          <Link href={`/blog/${blog.slug}`}>
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}