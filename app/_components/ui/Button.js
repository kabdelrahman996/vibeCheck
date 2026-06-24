"use client";

import Link from "next/link";

function Button({
  children,
  type,
  cta = false,
  onClick,
  disabled = false,
  link,
}) {
  const bgStyle = cta
    ? "bg-bg-white"
    : type === "secondary"
      ? "border border-white bg-transparent"
      : "bg-white";

  const sizeStyle = cta
    ? "py-[20px] px-[25px] text-[28px] font-semibold uppercase"
    : "py-[14px] px-[15px] text-[18px] font-medium";

  const className = `${bgStyle} ${sizeStyle} text-dark cursor-pointer inline-block`;

  if (link) {
    return (
      <Link href={link} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
