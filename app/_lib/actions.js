"use server";

import { addToCart } from "./apiCart";
import { updateProfile } from "./apiProfiles";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData) {
  const profileId = formData.get("profileId");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");

  await updateProfile({ id: profileId, newData: { phone, address, name } });
  revalidatePath("/account/info");
  redirect("/account/info");
}

export async function addToCartAction(orderItem) {
  try {
    const session = await auth();
    orderItem = { ...orderItem, profile_id: session.user.profileId };
    console.log(orderItem);
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

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
