import { supabase } from "./supabase-client"
import type { User } from "@supabase/supabase-js"

/**
 * Ensures a user profile exists in the database
 * If it doesn't exist, creates it from auth metadata
 */
export async function ensureUserProfile(user: User) {
  if (!user) return null

  try {
    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    if (fetchError) {
      console.error("Error checking for existing profile:", fetchError)
      return null
    }

    // If profile exists, return it
    if (existingProfile) {
      return existingProfile
    }

    // If profile doesn't exist, create it from metadata
    const { data: newProfile, error: insertError } = await supabase
      .from("users")
      .insert({
        id: user.id,
        email: user.email || "",
        first_name: user.user_metadata?.first_name || "",
        last_name: user.user_metadata?.last_name || "",
        phone: user.user_metadata?.phone || "",
        location: user.user_metadata?.location || "",
      })
      .select("*")
      .single()

    if (insertError) {
      console.error("Error creating user profile:", insertError)
      return null
    }

    return newProfile
  } catch (err) {
    console.error("Unexpected error in ensureUserProfile:", err)
    return null
  }
}
