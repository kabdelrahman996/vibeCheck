import { supabase } from "./supabase";

export async function createOrder(order) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function createOrderItems(orderItems) {
  const { data, error } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfileOrders(profileId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, items: order_items(*)")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfileOrder(orderId, profileId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, items: order_items(*)")
    .eq("id", orderId)
    .eq("profile_id", profileId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}
