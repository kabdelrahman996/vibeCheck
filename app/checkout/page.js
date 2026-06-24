import SubmitButton from "@/app/_components/ui/SubmitButton";
import { createOrderAction, getProfileCartsAction } from "@/app/_lib/actions/cartsActions";
import { getProfile } from "@/app/_lib/apiProfiles";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const inputClasses =
  "border border-brown/15 bg-bg-white px-4 py-3 text-sm text-dark outline-none transition placeholder:text-brown/60 focus:border-dark focus:bg-white";

function formatPrice(price) {
  return `${price.toLocaleString("en-US")} EGP`;
}

function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold uppercase tracking-[0.22em] text-brown"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [profile, result] = await Promise.all([
    getProfile(session.user.email),
    getProfileCartsAction(),
  ]);

  if (!result.success) {
    return (
      <section className="min-h-screen bg-bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center border border-red/15 bg-white px-6 py-16 text-center shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red">
            Checkout unavailable
          </p>
          <h1 className="font-sora text-3xl font-bold text-dark">
            Failed to load your checkout
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-brown">
            We could not get your cart details right now. Refresh the page or
            try again in a moment.
          </p>
        </div>
      </section>
    );
  }

  const cartItems = result.cart;

  if (!cartItems.length) {
    redirect("/cart");
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-bg-white px-4 py-10 text-dark sm:px-6 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-brown/15 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brown">
              Vibecheck checkout
            </p>
            <h1 className="font-sora text-4xl font-bold leading-tight sm:text-5xl">
              Checkout
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brown">
              Confirm your contact details and delivery address. Your order will
              be placed as cash on delivery.
            </p>
          </div>

          <Link
            href="/cart"
            className="w-fit text-sm font-semibold text-brown underline-offset-4 transition hover:text-dark hover:underline"
          >
            Back to cart
          </Link>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <form
            action={createOrderAction}
            className="bg-white p-5 shadow-sm ring-1 ring-white/70 sm:p-8"
          >
            <div className="border-b border-brown/10 pb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown">
                Shipping details
              </p>
              <h2 className="font-sora text-2xl font-bold text-dark">
                Where should we send it?
              </h2>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="customerName">
                <input
                  id="customerName"
                  name="customerName"
                  required
                  defaultValue={profile?.name ?? session.user.name ?? ""}
                  className={inputClasses}
                  placeholder="Enter your full name"
                />
              </Field>

              <Field label="Phone number" htmlFor="customerPhone">
                <input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  required
                  autoComplete="tel"
                  defaultValue={profile?.phone ?? ""}
                  className={inputClasses}
                  placeholder="Enter phone number"
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-5">
              <Field label="Shipping address" htmlFor="shippingAddress">
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  required
                  rows={4}
                  defaultValue={profile?.address ?? ""}
                  className={`${inputClasses} resize-none`}
                  placeholder="Building, street, city, and any delivery notes"
                />
              </Field>

              <Field label="Payment method" htmlFor="paymentMethod">
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  defaultValue="cash_on_delivery"
                  className={inputClasses}
                >
                  <option value="cash_on_delivery">Cash on delivery</option>
                </select>
              </Field>

              <Field label="Order notes" htmlFor="notes">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className={`${inputClasses} resize-none`}
                  placeholder="Optional notes for delivery"
                />
              </Field>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-brown/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-5 text-brown">
                Your total is recalculated on the server before the order is
                created.
              </p>
              <SubmitButton>Place order</SubmitButton>
            </div>
          </form>

          <aside className="h-fit bg-dark text-bg-white shadow-sm">
            <div className="border-b border-bg-white/10 px-6 py-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                Order summary
              </p>
              <h2 className="font-sora text-2xl font-bold">
                {totalItems} {totalItems === 1 ? "piece" : "pieces"}
              </h2>
            </div>

            <div className="max-h-[390px] divide-y divide-bg-white/10 overflow-y-auto px-6">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 py-5"
                >
                  <div className="relative aspect-square overflow-hidden bg-bg-white">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="line-clamp-1 font-semibold text-bg-white">
                      {item.product.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-white">
                      {item.color} / Size {item.size} / Qty {item.quantity}
                    </p>
                    <p className="mt-2 font-sora text-lg font-bold text-bg-white">
                      {formatPrice(item.total_price)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-5 border-t border-bg-white/10 px-6 py-6">
              <div className="flex justify-between text-sm text-white">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-white">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>

              <div className="border-t border-bg-white/15 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    Total
                  </span>
                  <span className="font-sora text-3xl font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
