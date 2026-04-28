import fs from "fs/promises";
import path from "path";

// Helper to get file path
const filePath = path.join(process.cwd(), "data", "blogs.json");

// ✅ GET all blogs
export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  const blogs = JSON.parse(data);

  return Response.json(blogs);
}

// ✅ POST new blog
export async function POST(req) {
  const newBlog = await req.json();

  const data = await fs.readFile(filePath, "utf-8");
  const blogs = JSON.parse(data);

  blogs.push(newBlog);

  await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));

  return Response.json({ message: "Blog added successfully" });
}