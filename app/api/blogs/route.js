import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadBuffer } from "@/lib/cloudinary";

// GET ALL BLOGS
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

    return Response.json({
      success: true,
      blogs,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// CREATE BLOG
export async function POST(req) {
  try {
    await connectDB();

    const data = await req.formData();

    const title = data.get("title")?.trim();
    const slug = data.get("slug")?.trim();
    const excerpt = data.get("excerpt")?.trim();
    const content = data.get("content")?.trim();
    const category = data.get("category")?.trim();

    const tags = JSON.parse(data.get("tags") || "[]");

    const featured = data.get("featured") === "true";
    const published = data.get("published") !== "false";

    if (!title || !slug || !content) {
      return Response.json(
        {
          success: false,
          error: "Title, Slug and Content are required.",
        },
        { status: 400 },
      );
    }

    const existing = await Blog.findOne({ slug });

    if (existing) {
      return Response.json(
        {
          success: false,
          error: "Slug already exists.",
        },
        { status: 409 },
      );
    }

    let coverImage = "";

    const file = data.get("coverImage");

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await uploadBuffer(buffer);

      coverImage = uploaded.secure_url;
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      featured,
      published,
    });

    return Response.json(
      {
        success: true,
        message: "Blog created successfully.",
        blog,
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
