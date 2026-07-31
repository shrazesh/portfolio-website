import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "Shrajesh Shrestha | Full Stack Developer",
    template: "%s | Shrajesh Shrestha",
  },
  description:
    "Portfolio of Shrajesh Shrestha showcasing MERN Stack, Next.js, AI and Full Stack development projects.",
  keywords: [
    "Shrajesh Shrestha",
    "Portfolio",
    "MERN Stack",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "AI",
    "Full Stack Developer",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
