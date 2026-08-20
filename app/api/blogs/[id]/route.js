import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadBuffer } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ======================
// GET SINGLE BLOG
// ======================
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const blog = await Blog.findById(id).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("GET blog error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================
// UPDATE BLOG
// ======================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID",
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

    const excerpt = formData.get("excerpt")?.toString().trim() || "";

    const content = formData.get("content")?.toString() || "";

    const category = formData.get("category")?.toString().trim() || "General";

    const featured = formData.get("featured") === "true";

    const published = formData.get("published") === "true";

    // Parse tags
    const tagsString = formData.get("tags")?.toString() || "[]";

    let tags = [];

    try {
      tags = JSON.parse(tagsString);

      if (!Array.isArray(tags)) {
        tags = [];
      }
    } catch {
      tags = [];
    }

    // ======================
    // VALIDATION
    // ======================

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog title is required",
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
          message: "Blog slug is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!content.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog content is required",
        },
        {
          status: 400,
        },
      );
    }

    // ======================
    // UPDATE DATA
    // ======================

    const updateData = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      featured,
      published,
    };

    /*
      IMPORTANT:

      We do NOT put coverImage in updateData yet.

      If the user doesn't select a new image,
      MongoDB will keep the existing coverImage.
    */

    // ======================
    // NEW COVER IMAGE
    // ======================

    const imageFile = formData.get("coverImage");

    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      // Validate image type
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          {
            success: false,
            message: "Please upload a valid image file",
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
            message: "Image size must be less than 5 MB",
          },
          {
            status: 400,
          },
        );
      }

      // Convert File to Buffer
      const arrayBuffer = await imageFile.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const uploadedImage = await uploadBuffer(buffer, "portfolio/blogs");

      if (!uploadedImage?.secure_url) {
        return NextResponse.json(
          {
            success: false,
            message: "Cover image upload failed",
          },
          {
            status: 500,
          },
        );
      }

      // Save new Cloudinary URL
      updateData.coverImage = uploadedImage.secure_url;
    }

    // ======================
    // UPDATE MONGODB
    // ======================

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("PUT blog error:", error);

    // Duplicate slug
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists.",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update blog",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================
// DELETE BLOG
// ======================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID",
        },
        {
          status: 400,
        },
      );
    }

    await connectDB();

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE blog error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
      },
      {
        status: 500,
      },
    );
  }
}
