import Link from "next/link";
import Logo from "@/app/_components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* 404 */}
        <h1 className="text-[90px] font-sora font-bold text-white leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-sora font-semibold text-white mt-4">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-white/70 mt-3 text-sm leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/"
            className="px-6 py-3 rounded-md bg-bg-white text-dark font-medium hover:opacity-90 transition"
          >
            Back Home
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/10 transition"
          >
            Browse Products
          </Link>
        </div>

        {/* subtle accent */}
        <div className="mt-10 text-xs text-white/30">Vibestore • 404 Error</div>
      </div>
    </div>
  );
}
