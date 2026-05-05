import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params; // ✅ VERY IMPORTANT

  await connectDB();

  const project = await Project.findOne({ slug }).lean();

  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
