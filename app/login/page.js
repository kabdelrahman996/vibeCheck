"use client";
import Logo from "../_components/ui/Logo";
import { signInAction } from "../_lib/actions";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] px-4">
      {/* Background glow effect */}
      <div className="absolute w-[500px] h-[500px] bg-[var(--color-brown)]/20 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md bg-[var(--color-bg-white)] rounded-2xl p-10 shadow-2xl border border-[var(--color-white)]/30">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Title */}
        <h1 className="text-center text-[var(--color-dark)] text-3xl font-bold font-sora">
          Welcome Back
        </h1>

        <p className="text-center text-[var(--color-brown)] text-sm mt-2 mb-8">
          Sign in to continue to your dashboard
        </p>

        {/* OAuth Button */}
        <form action={signInAction}>
          <button className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-[var(--color-white)] py-3 rounded-xl hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            <span className="text-[var(--color-dark)] font-medium">
              Continue with Google
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-[var(--color-white)]" />
          <span className="text-xs text-[var(--color-brown)]">
            SECURE LOGIN
          </span>
          <div className="h-px flex-1 bg-[var(--color-white)]" />
        </div>

        {/* Small note */}
        <p className="text-center text-xs text-[var(--color-brown)]">
          By continuing you agree to our terms & privacy policy
        </p>
      </div>
    </div>
  );
}
