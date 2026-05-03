import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

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

// ADD new project
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    await Project.create(body);

    return Response.json({ message: "Project added to MongoDB ✅" });
  } catch (error) {
    console.error("POST Project Error:", error);
    return Response.json({ error: "Failed to add project" }, { status: 500 });
  }
}
