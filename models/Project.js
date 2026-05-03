import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  image: String,
  description: String,
  tech: [String],
});

// ✅ VERY IMPORTANT LINE (prevents model overwrite in Next.js)
export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
