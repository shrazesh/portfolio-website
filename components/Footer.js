import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold">Shrajesh</h2>

            <p className="text-gray-400 mt-2">MERN Stack Developer</p>
          </div>

          <div className="flex gap-8">
            <Link href="/">Home</Link>

            <Link href="/about">About</Link>

            <Link href="/projects">Projects</Link>

            <Link href="/blog">Blog</Link>

            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} Shrajesh Shrestha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
