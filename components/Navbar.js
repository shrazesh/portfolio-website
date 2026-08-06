"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
        >
          Shrajesh
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-lg font-medium transition-colors duration-300 ${
                  active
                    ? "text-blue-600"
                    : "text-slate-900 hover:text-blue-600"
                }`}
              >
                {link.label}

                {/* Active underline */}
                <span
                  className={`absolute left-0 -bottom-2 h-[2px] bg-blue-600 transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
