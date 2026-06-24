import { supabase } from "./supabase";

export async function createProfile({ email, name }) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({ email, name })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfile(email) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProfile({ id, newData }) {
  if (!id) throw new Error("Profile id is required");

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...newData,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function upsertProfile({ email, name }) {
  console.log("UPSERT: ", email);
  const { data, error } = await supabase.from("profiles").upsert(
    {
      email,
      name,
    },
    { onConflict: "email" },
  );
  if (error) {
    throw new Error("UPSERT ERROR:", error.message);
  }
  return data;
}
