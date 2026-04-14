import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="nav">
      <h2 className="logo">Shrajesh</h2>
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </nav>
  );
}
