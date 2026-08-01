import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogList from "./BlogList";

export default async function AdminBlogsPage() {
  await connectDB();

  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  const serializedBlogs = blogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
  }));

  return <BlogList blogs={serializedBlogs} />;
}
