'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "../../Assets/Images/logo.png"

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={logo}
            alt="Logo"
            className="object-cover"
            width={100} 
            height={36} 
            priority 
          />
        </span>
      </Link>
    </div>
  );
}
