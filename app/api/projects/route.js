import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { uploadBuffer } from "@/lib/cloudinary";

// GET all projects
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

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

    const data = await req.formData();

    const title = data.get("title")?.trim();
    const slug = data.get("slug")?.trim();
    const description = data.get("description")?.trim();

    const tech = JSON.parse(data.get("tech") || "[]");

    const github = data.get("github") || "";
    const live = data.get("live") || "";

    // Required validation
    if (!title || !slug || !description) {
      return Response.json(
        {
          success: false,
          error: "Title, Slug and Description are required.",
        },
        { status: 400 },
      );
    }

    // Duplicate slug validation
    const existing = await Project.findOne({ slug });

    if (existing) {
      return Response.json(
        {
          success: false,
          error: "This slug already exists. Please choose another slug.",
        },
        { status: 409 },
      );
    }

    let image = "";

    const file = data.get("image");

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await uploadBuffer(buffer);

      image = uploaded.secure_url;
    }

    const project = await Project.create({
      title,
      slug,
      description,
      tech,
      github,
      live,
      image,
    });

    return Response.json(
      {
        success: true,
        message: "Project added successfully!",
        project,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
