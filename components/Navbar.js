"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const navLink = (href, label) => (
    <Link href={href} className={path === href ? "active" : ""}>
      {label}
    </Link>
  );

  return (
    <nav className="nav">
      <h2 className="logo">Shrajesh</h2>
      <div className="links">
        {navLink("/", "Home")}
        {navLink("/about", "About")}
        {navLink("/projects", "Projects")}
        {navLink("/blog", "Blog")}
        {navLink("/contact", "Contact")}
      </div>
    </nav>
  );
}