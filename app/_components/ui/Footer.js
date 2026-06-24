import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="relative px-6 sm:px-10 lg:px-20 py-10 sm:py-12 overflow-hidden">
      <Image
        src="/bgFooter.png"
        alt="Footer Background"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between gap-10 sm:gap-8">
        <div>
          <h2 className="font-sora text-[22px] sm:text-[28px] font-semibold text-white mb-4">
            Our Locations
          </h2>
          <ul className="flex flex-col gap-2 text-white">
            <li>Zagazig, Sharkia</li>
            <li>Maadi, Cairo</li>
            <li>1st Elsalam, Cairo</li>
          </ul>
        </div>

        <div>
          <h2 className="font-sora text-[22px] sm:text-[28px] font-semibold text-white mb-4">
            Contact Us
          </h2>
          <ul className="flex flex-col gap-2 text-white">
            <li>info@vibecheck.com</li>
            <li>01555555555</li>
          </ul>
        </div>

        <div>
          <h2 className="font-sora text-[22px] sm:text-[28px] font-semibold text-white mb-4">
            Follow Us
          </h2>

          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:scale-110"
            >
              <FaFacebook size={22} color="blue" />
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:scale-110"
            >
              <FaInstagram size={22} color="#E1306C" />
            </Link>

            <Link
              href="https://x.com"
              target="_blank"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:scale-110"
            >
              <FaXTwitter size={22} color="black" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 sm:mt-12 border-t border-white/20 pt-6 text-center">
        <p className="font-sora text-white text-sm sm:text-base">
          Designed & Developed by{" "}
          <Link
            href="https://abb-three.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-white/80 transition"
          >
            Abdelrahman Khaled
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
