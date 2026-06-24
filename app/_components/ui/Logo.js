import Image from "next/image";
import logoImage from "@/public/logo.svg";
import Link from "next/link";
function Logo() {
  return (
    <Link href="/" className="relative">
      {" "}
      <Image src={logoImage} alt="Logo" width={142} height={91} />{" "}
    </Link>
  );
}
export default Logo;
