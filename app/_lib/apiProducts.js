import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error(`SUPABASE ERROR: ${error.message}`);
  }

  return data;
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`SUPABASE ERROR: ${error.message}`);
  }

  return data;
}

export async function getProductsByCategory(categoryId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    throw new Error(`SUPABASE ERROR: ${error.message}`);
  }

  return data;
}

export async function getNewArrivals() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw new Error(error.message);

  return data;
}

export async function getBestSellers() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProductsBySeason(season) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("season", season);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
