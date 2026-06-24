import Image from "next/image";
import Button from "@/app/_components/ui/Button";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

async function Buttons() {
  const session = await auth();

  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href="/cart"
        aria-label="Shopping cart"
        className="flex h-12 w-12 items-center justify-center bg-bg-white text-red/70 rounded-[50%] ring-1 ring-brown/15 transition hover:bg-white/80"
      >
        <FaShoppingBag size={25} />
      </Link>

      {!session?.user ? (
        <Button link="/account">Login</Button>
      ) : (
        <Link
          className="flex items-center justify-center gap-3 px-3 py-2  "
          href="/account/info"
        >
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={36}
            height={36}
            className="rounded-full ring-1 ring-brown/10"
          />
          <span className="hidden text-[16px] font-medium text-dark sm:inline">
            {session.user.name}
          </span>
        </Link>
      )}
    </div>
  );
}

export default Buttons;
