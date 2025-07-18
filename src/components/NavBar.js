"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-2 flex items-center justify-around">
      <div className="space-x-4">
        <Link href="/">
        <Image
        src="/LOGO.png"
        alt="Fruit Bowl"
        width={50}
        height={50}
        className="rounded-lg m-1 shadow bg-black" 
      /></Link>
      </div>
    </nav>
  );
}
