import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white justify-center">
        <li>
          <Link href="/about/bisum">Bisum</Link>
        </li>
        <li>
          <Link href="/about/anisah">Anisah</Link>
        </li>
        <li>
          <Link href="/about/sanna">Sanna</Link>
        </li>
        <li>
          <Link href="/about/josh">Josh</Link>
        </li>
        <li>
          <Link href="/about/zoe">Zoe</Link>
        </li>
        <li>
          <Link href="/about/jun">Jun</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section>{children}</section>
    </>
  );
}
