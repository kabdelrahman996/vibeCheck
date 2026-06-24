import SubmitButton from "@/app/_components/ui/SubmitButton";
import { updateProfileAction } from "@/app/_lib/actions";
import { getProfile } from "@/app/_lib/apiProfiles";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const inputClasses =
  "border border-brown/15 bg-bg-white px-4 py-3 text-sm text-dark outline-none transition placeholder:text-brown/60 focus:border-dark focus:bg-white";

const disabledInputClasses = `${inputClasses} cursor-not-allowed text-brown`;

function Field({ label, htmlFor, children, helper }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold uppercase tracking-[0.22em] text-brown"
      >
        {label}
      </label>
      {children}
      {helper && <p className="text-xs leading-5 text-brown">{helper}</p>}
    </div>
  );
}

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(user.email);

  return (
    <section className="bg-white p-4 shadow-sm ring-1 ring-white/70 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-5 border-b border-brown/10 pb-6 sm:mb-7 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brown">
            Update profile
          </p>
          <h1 className="font-sora text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-4xl">
            Make checkout smoother
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-brown">
            Save the details you use most so your next order has fewer stops
            between cart and checkout.
          </p>
        </div>

        <Link
          href="/account/info"
          className="w-fit text-sm font-semibold text-brown underline-offset-4 transition hover:text-dark hover:underline"
        >
          Back to profile
        </Link>
      </div>

      <form className="flex flex-col gap-7" action={updateProfileAction}>
        <input type="hidden" value={user.profileId} name="profileId" />

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name" htmlFor="name">
            <input
              id="name"
              name="name"
              defaultValue={profile?.name ?? user.name ?? ""}
              className={inputClasses}
            />
          </Field>

          <Field
            label="Email address"
            htmlFor="email"
            helper="Email is connected to your login account."
          >
            <input
              id="email"
              disabled
              defaultValue={user.email ?? ""}
              className={disabledInputClasses}
            />
          </Field>
        </div>

        <div className="grid gap-5 border-t border-brown/10 pt-7 md:grid-cols-2">
          <Field label="Phone number" htmlFor="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={profile?.phone ?? ""}
              placeholder="Enter phone number"
              className={inputClasses}
            />
          </Field>

          <Field label="Address" htmlFor="address">
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={profile?.address ?? ""}
              autoComplete="street-address"
              placeholder="Enter your address"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-3 border-t border-brown/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-xs leading-5 text-brown">
            Your saved details are used only to speed up account and checkout
            flows.
          </p>
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </section>
  );
}
