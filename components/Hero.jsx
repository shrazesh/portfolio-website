import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-accent font-semibold mb-3">Hello, I'm</p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Shrajesh Shrestha
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 mt-4">
            MERN Stack Developer
          </h2>

          <p className="mt-8 text-lg text-slate-600 leading-8">
            I build modern, responsive and scalable web applications using
            MongoDB, Express.js, React, Next.js and Node.js. I'm passionate
            about creating clean user experiences and solving real-world
            problems through software.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/projects"
              className="bg-slate-900 text-white px-7 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              View Projects
            </Link>

            <Link
              href="/blog"
              className="border border-slate-200 px-7 py-3 rounded-lg hover:bg-slate-50 transition"
            >
              Read Blogs
            </Link>

            <Link
              href="/contact"
              className="border border-blue-600 text-accent px-7 py-3 rounded-lg hover:bg-accent hover:text-white transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
