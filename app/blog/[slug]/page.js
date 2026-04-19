import blogs from "@/data/blogs";

export default function BlogDetails({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <p>{blog.content}</p>
    </div>
  );
}