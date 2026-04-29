"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const navLink = (href, label) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md transition ${
        path === href
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h2 className="text-2xl font-bold">Shrajesh</h2>

        {/* Links */}
        <div className="flex gap-6 text-lg font-medium">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/projects", "Projects")}
          {navLink("/blog", "Blog")}
          {navLink("/contact", "Contact")}
        </div>
      </div>
    </nav>
  );
}