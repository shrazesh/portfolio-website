import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;

  await connectDB();

  const project = await Project.findOne({ slug }).lean();

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
