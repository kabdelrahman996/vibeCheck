import { getProfileOrder } from "@/app/_lib/apiOrders";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

function formatPrice(price) {
  return `${Number(price).toLocaleString("en-US")} EGP`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function statusLabel(status) {
  return status.replaceAll("_", " ");
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div
      className={`flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        strong
          ? "font-sora text-xl font-bold text-dark sm:text-2xl"
          : "text-sm text-brown"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default async function Page({ params }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { orderId } = await params;
  const order = await getProfileOrder(orderId, session.user.profileId);

  if (!order) {
    notFound();
  }

  return (
    <section className="bg-white p-4 shadow-sm ring-1 ring-white/70 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-5 border-b border-brown/10 pb-6 sm:mb-7 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brown">
            Order details
          </p>
          <h1 className="font-sora text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-4xl">
            Order #{order.order_number}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-brown">
            Placed on {formatDate(order.created_at)} with{" "}
            {statusLabel(order.payment_method)}.
          </p>
        </div>

        <Link
          href="/account/orders"
          className="w-fit text-sm font-semibold text-brown underline-offset-4 transition hover:text-dark hover:underline"
        >
          Back to orders
        </Link>
      </div>

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-7">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="bg-bg-white px-5 py-4 ring-1 ring-brown/10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brown">
                Order status
              </span>
              <p className="mt-2 font-semibold capitalize text-dark">
                {statusLabel(order.status)}
              </p>
            </div>
            <div className="bg-bg-white px-5 py-4 ring-1 ring-brown/10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brown">
                Payment
              </span>
              <p className="mt-2 font-semibold capitalize text-dark">
                {statusLabel(order.payment_status)}
              </p>
            </div>
            <div className="bg-bg-white px-5 py-4 ring-1 ring-brown/10">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brown">
                Items
              </span>
              <p className="mt-2 font-semibold text-dark">
                {order.items.length}
              </p>
            </div>
          </div>

          <div>
            <div className="border-b border-brown/10 pb-4">
              <h2 className="font-sora text-2xl font-bold text-dark">
                Products
              </h2>
            </div>

            <div className="divide-y divide-brown/10">
              {order.items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 py-6 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center"
                >
                  <div className="relative aspect-square overflow-hidden bg-bg-white ring-1 ring-brown/10">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-xs font-semibold uppercase tracking-[0.2em] text-brown">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-sora text-xl font-bold text-dark">
                      {item.product_title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-brown">
                      {item.color && (
                        <span className="bg-bg-white px-3 py-1 ring-1 ring-brown/10">
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="bg-bg-white px-3 py-1 ring-1 ring-brown/10">
                          Size {item.size}
                        </span>
                      )}
                      <span className="bg-bg-white px-3 py-1 ring-1 ring-brown/10">
                        Qty {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4 md:flex-col md:text-right">
                    <span className="text-sm text-brown">
                      {formatPrice(item.unit_price)} each
                    </span>
                    <strong className="font-sora text-2xl text-dark">
                      {formatPrice(item.line_total)}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit bg-dark text-bg-white shadow-sm">
          <div className="border-b border-bg-white/10 px-6 py-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              Delivery snapshot
            </p>
            <h2 className="font-sora text-2xl font-bold">
              {order.customer_name}
            </h2>
          </div>

          <div className="space-y-5 px-6 py-6">
            <div className="text-sm leading-6 text-white">
              <p>{order.customer_phone}</p>
              <p>{order.shipping_address}</p>
            </div>

            {order.notes && (
              <div className="border-t border-bg-white/10 pt-5 text-sm leading-6 text-white">
                <span className="font-semibold text-bg-white">Notes: </span>
                {order.notes}
              </div>
            )}
          </div>

          <div className="space-y-5 bg-bg-white px-6 py-6 text-dark">
            <SummaryRow label="Subtotal" value={formatPrice(order.subtotal)} />
            <SummaryRow
              label="Shipping"
              value={formatPrice(order.shipping_fee)}
            />
            <SummaryRow
              label="Discount"
              value={formatPrice(order.discount_amount)}
            />
            <div className="border-t border-brown/15 pt-5">
              <SummaryRow
                label="Total"
                value={formatPrice(order.total_amount)}
                strong
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
