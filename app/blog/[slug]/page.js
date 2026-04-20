import Image from "next/image";
import blogs from "@/data/blogs";

export default async function BlogDetails({ params }) {
  const { slug } = await params;   // ✅ IMPORTANT FIX
  const blog = blogs.find((b) => b.slug === slug);
  // const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) return <h2 className="p-6">Blog not found</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Image
        src={blog.image}
        alt={blog.title}
        width={900}
        height={450}
        className="rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>
      <p className="text-gray-500 mt-2">
        By {blog.author} | {blog.date}
      </p>

      <div className="mt-6 leading-8 text-lg whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
}

//  const { slug } = await params;   // ✅ IMPORTANT FIX