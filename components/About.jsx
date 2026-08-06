import Link from "next/link";

export default function About() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me</h2>

            <p className="text-slate-600 leading-8 mb-5">
              I'm <strong>Shrajesh Shrestha</strong>, a B.Sc. CSIT student
              passionate about Full Stack Web Development and Artificial
              Intelligence. I enjoy building modern web applications that solve
              real-world problems.
            </p>

            <p className="text-slate-600 leading-8 mb-5">
              My primary stack includes React, Next.js, Node.js, Express.js,
              MongoDB, and Tailwind CSS. I'm also exploring AI integration into
              web applications.
            </p>

            <p className="text-slate-600 leading-8">
              I'm always eager to learn new technologies and improve my skills
              by working on practical projects.
            </p>

            <Link
              href="/projects"
              className="inline-block mt-8 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              View My Work
            </Link>
          </div>

          {/* Right */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h3 className="text-2xl font-semibold mb-6">Quick Information</h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Name</span>
                <span>Shrajesh Shrestha</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Education</span>
                <span>B.Sc. CSIT</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">University</span>
                <span>Tribhuvan University</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Specialization</span>
                <span>Full Stack Development</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium">Location</span>
                <span>Nepal</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Availability</span>
                <span className="text-green-600 font-semibold">
                  Open to Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
