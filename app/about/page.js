import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-5">About Me</h1>

          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-8">
            Hello! I'm Shrajesh Shrestha, a MERN Stack Developer and Computer
            Science student passionate about building modern web applications
            and learning Artificial Intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              🎯 Goal
            </h2>

            <p className="text-slate-600">
              Become a professional Full Stack Developer and AI Engineer while
              creating scalable applications.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              💻 Skills
            </h2>

            <p className="text-slate-600">
              HTML, CSS, JavaScript, React, Next.js, Node.js, Express, MongoDB,
              Tailwind CSS.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              📚 Learning
            </h2>

            <p className="text-slate-600">
              System Design, TypeScript, AI, Cloud Computing and scalable
              backend architecture.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
