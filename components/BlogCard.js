import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="border rounded-xl p-6 shadow-md hover:shadow-xl transition">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>

      <p className="text-slate-600 mb-3">
        By {blog.author} | {blog.date}
      </p>

      <p className="mb-4">{blog.excerpt}</p>

      <Link
        href={`/blog/${blog.slug}`}
        className="text-accent font-semibold hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}
