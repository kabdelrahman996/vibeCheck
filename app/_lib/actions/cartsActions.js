"use server";

import { auth } from "../auth";
import getProfileCarts, { addToCart, clearProfileCart } from "../apiCart";
import { createOrder, createOrderItems } from "../apiOrders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function addToCartAction(orderItem) {
  try {
    const session = await auth();
    orderItem = { ...orderItem, profile_id: session.user.profileId };
    await addToCart(orderItem);
    return {
      success: true,
      message: "Product added to cart",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getProfileCartsAction() {
  const session = await auth();
  const profileId = session.user.profileId;
  try {
    const result = await getProfileCarts(profileId);
    return {
      success: true,
      cart: result,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
}

export async function createOrderAction(formData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const cartItems = await getProfileCarts(session.user.profileId);

  if (!cartItems.length) {
    redirect("/cart");
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const shippingFee = subtotal > 0 ? 50 : 0;
  const discountAmount = 0;
  const totalAmount = subtotal + shippingFee - discountAmount;

  const order = await createOrder({
    profile_id: session.user.profileId,
    customer_name: formData.get("customerName"),
    customer_phone: formData.get("customerPhone"),
    shipping_address: formData.get("shippingAddress"),
    payment_method: formData.get("paymentMethod") || "cash_on_delivery",
    subtotal: subtotal.toFixed(2),
    shipping_fee: shippingFee.toFixed(2),
    discount_amount: discountAmount.toFixed(2),
    total_amount: totalAmount.toFixed(2),
    notes: formData.get("notes") || null,
  });

  const orderItems = cartItems.map((item) => {
    const unitPrice = Number(item.price ?? item.total_price / item.quantity);
    const lineTotal = unitPrice * item.quantity;
    const title = item.product.title;

    return {
      order_id: order.id,
      product_id: item.product_id,
      product_title: title,
      product_slug: item.product.slug ?? createSlug(title),
      product_image: item.product.image ?? null,
      color: item.color,
      size: item.size,
      unit_price: unitPrice.toFixed(2),
      quantity: item.quantity,
      line_total: lineTotal.toFixed(2),
    };
  });

  await createOrderItems(orderItems);
  await clearProfileCart(session.user.profileId);

  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/account/orders");
  redirect("/account/orders");
}
