import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// GET one project by ID
export async function GET(request, { params }) {
  const { id } = await params;

  await connectDB();

  const project = await Project.findById(id).lean();

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// UPDATE project
export async function PUT(request, { params }) {
  const { id } = await params;

  await connectDB();

  const body = await request.json();

  const project = await Project.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Project updated successfully",
    project,
  });
}

// DELETE project
export async function DELETE(request, { params }) {
  const { id } = await params;

  await connectDB();

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Project deleted successfully",
  });
}
