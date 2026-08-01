import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectList from "./ProjectList";

export default async function AdminProjects() {
  await connectDB();

  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

  const serializedProjects = projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
  }));

  return <ProjectList projects={serializedProjects} />;
}
