import "./globals.css";
import Navbar from "@/components/Navbar";
import { poppins, eduCursive } from "@/lib/font";

export const metadata = {
  title: "Clink | URL Shortener ",
  description:
    "Turn your long, messy URLs into sleek, shareable links in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${eduCursive.variable}`}>
        <div className="fixed inset-0 -z-10 bg-white [background:radial-gradient(80%_100%_at_50%_10%,#fff_40%,#aaff6a_100%)]"></div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
