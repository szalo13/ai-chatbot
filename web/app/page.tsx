import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <Link href="/login">Login</Link>
        </div>
        <div>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
