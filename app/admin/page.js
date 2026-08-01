import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";

import StatsCard from "@/components/admin/StatsCard";
import QuickAction from "@/components/admin/QuickAction";
import RecentProjects from "@/components/admin/RecentProjects";
import RecentBlogs from "@/components/admin/RecentBlogs";

export default async function AdminDashboard() {
  await connectDB();

  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5).lean();

  const totalProjects = await Project.countDocuments();
  const totalBlogs = await Blog.countDocuments();

  const featuredProjects = await Project.countDocuments({
    featured: true,
  });

  const publishedBlogs = await Blog.countDocuments({
    published: true,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-10">Portfolio Dashboard</h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Projects" value={totalProjects} icon="📁" />

        <StatsCard title="Blogs" value={totalBlogs} icon="📝" />

        <StatsCard title="Featured" value={featuredProjects} icon="⭐" />

        <StatsCard title="Published" value={publishedBlogs} icon="🚀" />
      </div>

      {/* Quick Actions */}

      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <QuickAction
          href="/admin/add-project"
          title="Add Project"
          description="Create a new project."
          color="bg-blue-500 text-white"
        />

        <QuickAction
          href="/admin/projects"
          title="Manage Projects"
          description="Edit or delete projects."
          color="bg-indigo-500 text-white"
        />

        <QuickAction
          href="/admin/add-blog"
          title="Add Blog"
          description="Publish a new article."
          color="bg-green-500 text-white"
        />

        <QuickAction
          href="/admin/blogs"
          title="Manage Blogs"
          description="Edit or delete blogs."
          color="bg-orange-500 text-white"
        />
      </div>

      {/* Recent Data */}

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentProjects projects={projects} />

        <RecentBlogs blogs={blogs} />
      </div>
    </div>
  );
}
