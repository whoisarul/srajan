import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  location: string
  created_at: string
  updated_at: string
}

export interface Land {
  id: string
  user_id: string
  name: string
  size_acres: number
  location: string
  gps_coordinates?: string
  description?: string
  soil_type?: string
  ph_level?: number
  moisture_level?: string
  fertility_level?: string
  created_at: string
  updated_at: string
}

export interface Crop {
  id: string
  user_id: string
  land_id: string
  name: string
  variety?: string
  planting_date: string
  expected_harvest_date: string
  growth_stage: string
  current_day: number
  total_days: number
  health_status: string
  expected_yield?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  crop_id: string
  title: string
  description: string
  due_date: string
  completed: boolean
  urgent: boolean
  created_at: string
  updated_at: string
}

export interface LandAnalysis {
  id: string
  user_id: string
  land_id: string
  soil_type: string
  ph_level: number
  moisture_level: string
  fertility_level: string
  recommendations: string[]
  suggested_crops: string[]
  analysis_date: string
  created_at: string
}

export interface OrganicSolution {
  id: string
  name: string
  category: string
  description: string
  ingredients: string[]
  instructions: string
  target_issues: string[]
  effectiveness_rating: number
  created_at: string
}

export interface CropPlan {
  id: string
  user_id: string
  land_id: string
  crop_name: string
  planting_season: string
  expected_profit: number
  water_requirements: string
  growth_period_days: number
  plan_status: string
  created_at: string
  updated_at: string
}
