import React from "react";
import Image from "next/image";
import Link from "next/link";

function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex flex-row items-center gap-2 ${className}`}>
      <Image src="/chart-donut.svg" alt="FinSights Logo" width={40} height={25} />
      <span className="text-blue-800 font-bold text-xl">FinSights</span>
    </Link>
  );
}

export default Logo; 