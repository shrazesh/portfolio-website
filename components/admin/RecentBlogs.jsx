import Link from "next/link";

export default function RecentBlogs({ blogs }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Blogs
      </h2>

      <div className="space-y-4">

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <h3 className="font-semibold">
                {blog.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {blog.category}
              </p>
            </div>

            <Link
              href={`/admin/blogs/edit/${blog._id}`}
              className="text-blue-600"
            >
              Edit
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}