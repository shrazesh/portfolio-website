import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-900">
          Let's Build Something Great Together
        </h2>

        <p className="text-lg text-slate-900 leading-8 mb-10">
          Whether you have a project, internship opportunity, freelance work, or
          simply want to connect, I'd love to hear from you.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <Link
            href="/contact"
            className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Contact Me
          </Link>

          <Link
            href="/projects"
            className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition "
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
