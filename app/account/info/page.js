import { getProfile } from "@/app/_lib/apiProfiles";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

function AccountField({ label, value }) {
  return (
    <div className="bg-bg-white px-5 py-4 ring-1 ring-brown/10">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brown">
        {label}
      </span>
      <p className="mt-2 break-words text-base font-semibold text-dark">
        {value || "Not provided"}
      </p>
    </div>
  );
}

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const profile = await getProfile(session.user.email);
  const displayName = profile?.name ?? session.user.name ?? "User";
  const email = profile?.email ?? session.user.email;
  const hasContactInfo = Boolean(profile?.phone || profile?.address);

  return (
    <section className="bg-white p-4 shadow-sm ring-1 ring-white/70 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 border-b border-brown/10 pb-6 sm:gap-6 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brown">
            Profile info
          </p>
          <h1 className="font-sora text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-4xl">
            Welcome, {displayName}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-brown">
            Keep your account details ready so checkout feels quick whenever
            your next fit lands in the cart.
          </p>
        </div>

        <Link
          href="/account/update"
          className="w-full bg-dark px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-bg-white transition hover:bg-brown sm:w-fit sm:px-6 sm:py-4"
        >
          Edit profile
        </Link>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <AccountField label="Full name" value={displayName} />
        <AccountField label="Email address" value={email} />
        <AccountField label="Phone number" value={profile?.phone} />
        <AccountField label="Address" value={profile?.address} />
      </div>

      {!hasContactInfo && (
        <div className="mt-7 bg-dark px-5 py-5 text-bg-white">
          <p className="font-sora text-xl font-bold">Finish your profile</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white">
            Add your phone and address now, then checkout can stay focused on
            the clothes instead of forms.
          </p>
        </div>
      )}
    </section>
  );
}
