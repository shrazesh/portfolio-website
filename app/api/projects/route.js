import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "projects.json");

// GET all projects
export async function GET() {
  const data = await readFile(filePath, "utf-8");
  return Response.json(JSON.parse(data));
}

// ADD new project
export async function POST(req) {
  const newProject = await req.json();

  const data = JSON.parse(await readFile(filePath, "utf-8"));
  data.push(newProject);

  await writeFile(filePath, JSON.stringify(data, null, 2));

  return Response.json({ message: "Project added" });
}