import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Shrajesh Portfolio",
  description: "MERN Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}