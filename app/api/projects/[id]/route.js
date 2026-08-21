import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { uploadBuffer } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminFromRequest } from "@/lib/auth";

// GET single project
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      {
        status: 500,
      },
    );
  }
}

// UPDATE project
// PROTECTED - admin authentication required
export async function PUT(request, { params }) {
  try {
    // ADMIN AUTHENTICATION
    // ==========================
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin login required.",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    // Read multipart/form-data
    const formData = await request.formData();

    const title = formData.get("title")?.toString().trim() || "";
    const slug = formData.get("slug")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";

    const github = formData.get("github")?.toString().trim() || "";
    const live = formData.get("live")?.toString().trim() || "";

    const techString = formData.get("tech")?.toString() || "[]";

    let tech = [];

    try {
      tech = JSON.parse(techString);

      if (!Array.isArray(tech)) {
        tech = [];
      }
    } catch {
      tech = [];
    }

    // Basic validation
    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Project title is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Project slug is required",
        },
        {
          status: 400,
        },
      );
    }

    // Build update object
    const updateData = {
      title,
      slug,
      description,
      tech,
      github,
      live,
    };

    /*
      IMPORTANT:

      We only update the image if a NEW file was selected.

      If the user does not choose a file,
      updateData.image is NOT added.

      Therefore MongoDB keeps the existing image.
    */

    const imageFile = formData.get("image");

    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      // Validate image type
      const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedImageTypes.includes(imageFile.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only JPG, PNG and WebP images are allowed.",
          },
          {
            status: 400,
          },
        );
      }

      // Maximum 5 MB
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Image size must be less than 5 MB.",
          },
          {
            status: 400,
          },
        );
      }

      // Convert File → Buffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload new image to Cloudinary
      const uploadedImage = await uploadBuffer(buffer, "portfolio/projects");

      if (!uploadedImage?.secure_url) {
        return NextResponse.json(
          {
            success: false,
            message: "Image upload failed",
          },
          {
            status: 500,
          },
        );
      }

      updateData.image = uploadedImage.secure_url;
    }

    // Update MongoDB
    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully!",
      data: project,
    });
  } catch (error) {
    console.error("PUT project error:", error);

    // Duplicate slug
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A project with this slug already exists.",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update project",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE project
// PROTECTED - admin authentication required
export async function DELETE(request, { params }) {
  try {
    // ADMIN AUTHENTICATION
    // ==========================
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin login required.",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
      },
      {
        status: 500,
      },
    );
  }
}
