import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import fs from "fs";
import path from "path";

// GET all projects
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({}).lean();

    return Response.json(projects);
  } catch (error) {
    console.error("GET Projects Error:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// ADD new project (with image upload)
export async function POST(req) {
  try {
    await connectDB();

    // ✅ Read form data
    const data = await req.formData();

    const title = data.get("title");
    const slug = data.get("slug");
    const description = data.get("description");
    const tech = JSON.parse(data.get("tech"));
    const file = data.get("image");

    // ✅ Prepare uploads folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ✅ Save image file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // ✅ Image path to store in DB
    const imagePath = `/uploads/${fileName}`;

    // ✅ Save project to MongoDB
    await Project.create({
      title,
      slug,
      description,
      tech,
      image: imagePath,
    });

    return Response.json({ message: "Project added with image ✅" });
  } catch (error) {
    console.error("POST Project Error:", error);
    return Response.json({ error: "Failed to add project" }, { status: 500 });
  }
}
