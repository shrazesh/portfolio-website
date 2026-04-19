import blogs from "@/data/blogs";
import Image from "next/image";

export default async function BlogDetails({ params }) {
  const { slug } = await params;   // ✅ IMPORTANT FIX

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <h2>Blog not found</h2>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>{blog.title}</h1>

      <p style={{ color: "gray" }}>
        By {blog.author} | {blog.date}
      </p>

        
        
      

      <p style={{ marginTop: "20px", lineHeight: "1.8" }}>
        {blog.content}
      </p>
    </div>
  );
}