"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-fit bg-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-bg-white transition hover:bg-brown disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}

export default SubmitButton;
