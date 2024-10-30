import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white justify-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* <li>
          <Link href="/">notDefined</Link>
        </li>
        <li>
          <Link href="/">notDefined</Link>
        </li> */}
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/MyCenter">My Center</Link>
        </li>
        <li>
          <Link href="/testing/list">List Tasks</Link>
        </li>
        <li>
          <Link href="/testing/search">Search Tasks</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
