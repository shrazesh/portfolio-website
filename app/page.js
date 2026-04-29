import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center py-32 px-6">
      <h1 className="text-5xl font-bold">Hi, I am Shrajesh 👋</h1>
      <p className="text-xl text-gray-600 mt-4">MERN Stack Learner</p>

      <div className="flex justify-center gap-8 mt-10">
        <Link
          href="/projects"
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80"
        >
          View My Projects
        </Link>

        <Link
          href="/blog"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-80"
        >
          Read My Blogs
        </Link>
      </div>
    </section>
  );
}