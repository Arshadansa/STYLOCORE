'use client'
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link href="/">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/images/3.png"
            alt="Logo"
            className="object-cover"
            width={100} // Set the width to match `w-60` (60 * 4px = 240px)
            height={36} // Set the height to match `h-24` (24 * 4px = 96px)
            priority // Optional: Load the image with priority
          />{" "}
        </span>
      </Link>
    </div>
  );
}

export default Logo;
