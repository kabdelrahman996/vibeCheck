"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBox, FaEdit, FaSignOutAlt, FaUser } from "react-icons/fa";
import { signOutAction } from "@/app/_lib/actions";

export default function Sidebar() {
  const pathname = usePathname();

  const tabs = [
    { id: "info", label: "User Info", icon: FaUser, ref: "/account/info" },
    { id: "orders", label: "Last Orders", icon: FaBox, ref: "/account/orders" },
    {
      id: "update",
      label: "Update User",
      icon: FaEdit,
      ref: "/account/update",
    },
  ];

  return (
    <aside className="flex h-fit flex-col justify-between gap-4 bg-white p-3 shadow-sm ring-1 ring-white/70 sm:p-4 md:min-h-130 md:gap-6">
      <div className="flex flex-col gap-2">
        <div className="mb-4 border-b border-brown/10 px-3 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brown">
            Account
          </p>
          <h2 className="mt-2 font-sora text-2xl font-bold text-dark">
            Your space
          </h2>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.ref;

            return (
              <Link
                href={tab.ref}
                key={tab.id}
                className={`flex items-center justify-center gap-3 rounded-sm px-3 py-3 text-sm font-semibold transition-colors duration-200 sm:justify-start ${
                  isActive
                    ? "bg-dark text-bg-white"
                    : "text-dark hover:bg-brown/10"
                }`}
              >
                <Icon className={isActive ? "text-bg-white" : "text-brown"} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={signOutAction}
        className="mt-2 flex cursor-pointer items-center justify-center gap-3 bg-red/5 px-3 py-4 text-sm font-semibold text-red transition-colors duration-200 hover:bg-red/10 sm:justify-start"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}
