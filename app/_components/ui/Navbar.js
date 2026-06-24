import { auth } from "@/app/_lib/auth";
import Link from "next/link";

async function Navbar() {
  return (
    <nav className="hidden md:flex items-center justify-center gap-5  font-medium text-[16px]">
      <Link href="#categories">Categories</Link>
      <Link href="#gallery">Gallery</Link>
    </nav>
  );
}

export default Navbar;
