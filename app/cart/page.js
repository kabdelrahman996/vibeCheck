import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProfileCartsAction } from "../_lib/actions/cartsActions";

function formatPrice(price) {
  return `${price.toLocaleString("en-US")} EGP`;
}

async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const result = await getProfileCartsAction();

  if (!result.success) {
    return (
      <section className="min-h-screen bg-bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center border border-red/15 bg-white px-6 py-16 text-center shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red">
            Cart unavailable
          </p>
          <h1 className="font-sora text-3xl font-bold text-dark">
            Failed to load your cart
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-brown">
            Something went wrong while getting your saved items. Refresh the page
            or come back in a moment.
          </p>
        </div>
      </section>
    );
  }

  const cartItems = result.cart;

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
              Shopping Cart
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brown">
              Review your selected fits before they head out. Clean, simple,
              and almost ready to wear.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 bg-white px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-white/70">
            <span className="flex h-9 w-9 items-center justify-center bg-dark font-sora text-bg-white">
              {totalItems}
            </span>
            <span>{totalItems === 1 ? "item" : "items"} in cart</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="grid min-h-[420px] place-items-center bg-white px-6 py-16 text-center shadow-sm ring-1 ring-white/70">
            <div className="max-w-md">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-bg-white font-sora text-3xl font-bold text-brown ring-1 ring-brown/10">
                0
              </div>
              <h2 className="font-sora text-3xl font-bold text-dark">
                Your cart is empty
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-brown">
                Start with a graphic tee, an oversized essential, or one of the
                latest arrivals.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex bg-dark px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-bg-white transition hover:bg-brown"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="bg-white shadow-sm ring-1 ring-white/70">
              <div className="flex flex-col gap-2 border-b border-brown/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <h2 className="font-sora text-xl font-bold text-dark">
                    Cart items
                  </h2>
                  <p className="mt-1 text-sm text-brown">
                    {cartItems.length} selected{" "}
                    {cartItems.length === 1 ? "product" : "products"}
                  </p>
                </div>

                <Link
                  href="/"
                  className="text-sm font-semibold text-brown underline-offset-4 transition hover:text-dark hover:underline"
                >
                  Keep shopping
                </Link>
              </div>

              <div className="divide-y divide-brown/10">
                {cartItems.map((item) => {
                  const unitPrice =
                    item.price ?? item.total_price / item.quantity;

                  return (
                    <article
                      key={item.id}
                      className="grid gap-5 px-5 py-6 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:px-6"
                    >
                      <div className="relative aspect-square overflow-hidden bg-bg-white ring-1 ring-brown/10">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brown">
                          {item.category}
                        </p>
                        <h3 className="font-sora text-xl font-bold leading-tight text-dark">
                          {item.product.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2 text-sm text-brown">
                          <span className="bg-bg-white px-3 py-1 ring-1 ring-brown/10">
                            {item.color}
                          </span>
                          <span className="bg-bg-white px-3 py-1 ring-1 ring-brown/10">
                            Size {item.size}
                          </span>
                          <span className="bg-bg-white px-3 py-1 ring-1 ring-brown/10">
                            Qty {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between gap-4 sm:flex-col sm:text-right">
                        <span className="text-sm text-brown">
                          {formatPrice(unitPrice)} each
                        </span>
                        <strong className="font-sora text-2xl text-dark">
                          {formatPrice(item.total_price)}
                        </strong>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="h-fit bg-dark text-bg-white shadow-sm">
              <div className="border-b border-bg-white/10 px-6 py-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  Order summary
                </p>
                <h2 className="font-sora text-2xl font-bold">
                  Ready when you are
                </h2>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="flex justify-between text-sm text-white">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-white">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>

                <div className="flex justify-between text-sm text-white">
                  <span>Total pieces</span>
                  <span>{totalItems}</span>
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

                <Link
                  href="/checkout"
                  className="block w-full bg-bg-white px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-dark transition hover:bg-white"
                >
                  Checkout
                </Link>

                <p className="text-xs leading-5 text-white">
                  Shipping is estimated at checkout. Your cart stays saved while
                  you keep browsing.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;
