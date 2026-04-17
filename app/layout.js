import './globals.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: 'Shrajesh Portfolio',
  description: 'Developer Portfolio and Blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="main">
        <Navbar />
        {children}
        <Footer />
        </div>
      </body>
    </html>
  )
}