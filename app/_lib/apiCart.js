import { supabase } from "./supabase";

export async function addToCart(orderItem) {
  const { data, error } = await supabase
    .from("carts")
    .insert(orderItem)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export default async function getProfileCarts(profileId) {
  let { data, error } = await supabase
    .from("carts")
    .select("*, product: products(*)")
    .eq("profile_id", profileId);

  if (error) throw new Error(error.message);

  return data;
}

export async function clearProfileCart(profileId) {
  const { error } = await supabase
    .from("carts")
    .delete()
    .eq("profile_id", profileId);

  if (error) throw new Error(error.message);
}
