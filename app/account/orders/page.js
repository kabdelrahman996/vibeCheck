import { getProfileOrders } from "@/app/_lib/apiOrders";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

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

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const orders = await getProfileOrders(session.user.profileId);

  return (
    <section className="bg-white p-4 shadow-sm ring-1 ring-white/70 sm:p-6 lg:p-8">
      <div className="border-b border-brown/10 pb-6 sm:pb-7">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brown">
          Last orders
        </p>
        <h1 className="font-sora text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-4xl">
          Order History
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-brown">
          Track your completed checkouts, payment status, and delivery details.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="mt-7 grid min-h-70 place-items-center bg-bg-white px-5 py-10 text-center ring-1 ring-brown/10 sm:min-h-90 sm:px-6 sm:py-14">
          <div className="max-w-md">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-white font-sora text-2xl font-bold text-brown ring-1 ring-brown/10">
              0
            </div>
            <h2 className="font-sora text-3xl font-bold text-dark">
              No orders yet
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-brown">
              When you complete your first checkout, your order details and
              status will live here.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex bg-dark px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bg-white transition hover:bg-brown sm:px-7 sm:py-4"
            >
              Start shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-7 divide-y divide-brown/10">
          {orders.map((order) => (
            <Link
              href={`/account/orders/${order.id}`}
              key={order.id}
              className="grid gap-5 bg-bg-white px-4 py-5 ring-1 ring-brown/10 transition hover:bg-white hover:ring-brown/25 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-5 sm:py-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-sora text-2xl font-bold text-dark">
                    Order #{order.order_number}
                  </h2>
                  <span className="bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brown ring-1 ring-brown/10">
                    {statusLabel(order.status)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-brown">
                  Placed on {formatDate(order.created_at)} /{" "}
                  {statusLabel(order.payment_method)} / {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>

                <div className="mt-4 grid gap-2 text-sm text-brown sm:grid-cols-2">
                  <p>
                    <span className="font-semibold text-dark">Ship to:</span>{" "}
                    {order.customer_name}
                  </p>
                  <p>
                    <span className="font-semibold text-dark">Phone:</span>{" "}
                    {order.customer_phone}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-semibold text-dark">Address:</span>{" "}
                    {order.shipping_address}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span
                      key={item.id}
                      className="bg-white px-3 py-1 text-xs font-semibold text-brown ring-1 ring-brown/10"
                    >
                      {item.product_title} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:min-w-44 sm:text-right">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brown">
                  Total
                </span>
                <strong className="font-sora text-3xl text-dark">
                  {formatPrice(order.total_amount)}
                </strong>
                <span className="text-sm text-brown">
                  Payment {statusLabel(order.payment_status)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
