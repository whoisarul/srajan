-- Create custom types
CREATE TYPE user_role AS ENUM ('farmer', 'admin', 'expert');
CREATE TYPE land_status AS ENUM ('active', 'fallow', 'planning');
CREATE TYPE crop_stage AS ENUM ('planning', 'planted', 'germination', 'seedling', 'vegetative', 'flowering', 'fruiting', 'harvest', 'completed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE solution_category AS ENUM ('pest_control', 'fertilizer', 'soil_health', 'disease_treatment');

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    role user_role DEFAULT 'farmer',
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lands table
CREATE TABLE IF NOT EXISTS public.lands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    size_acres DECIMAL(10,2) NOT NULL,
    location TEXT NOT NULL,
    gps_coordinates TEXT,
    description TEXT,
    soil_type TEXT,
    ph_level DECIMAL(3,1),
    moisture_level TEXT,
    fertility_level TEXT,
    status land_status DEFAULT 'planning',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Land analyses table
CREATE TABLE IF NOT EXISTS public.land_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    land_id UUID REFERENCES public.lands(id) ON DELETE CASCADE NOT NULL,
    soil_type TEXT NOT NULL,
    ph_level DECIMAL(3,1) NOT NULL,
    moisture_level TEXT NOT NULL,
    fertility_level TEXT NOT NULL,
    organic_matter_percentage DECIMAL(5,2),
    nitrogen_level TEXT,
    phosphorus_level TEXT,
    potassium_level TEXT,
    recommendations TEXT[] DEFAULT '{}',
    suggested_crops TEXT[] DEFAULT '{}',
    analysis_confidence DECIMAL(5,2) DEFAULT 95.0,
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crops table
CREATE TABLE IF NOT EXISTS public.crops (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    land_id UUID REFERENCES public.lands(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    variety TEXT,
    planting_date DATE NOT NULL,
    expected_harvest_date DATE NOT NULL,
    actual_harvest_date DATE,
    growth_stage crop_stage DEFAULT 'planning',
    current_day INTEGER DEFAULT 0,
    total_days INTEGER NOT NULL,
    health_status TEXT DEFAULT 'excellent',
    expected_yield TEXT,
    actual_yield TEXT,
    expected_profit DECIMAL(10,2),
    actual_profit DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
    land_id UUID REFERENCES public.lands(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    priority task_priority DEFAULT 'medium',
    estimated_duration_minutes INTEGER,
    actual_duration_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organic solutions table
CREATE TABLE IF NOT EXISTS public.organic_solutions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category solution_category NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT[] NOT NULL DEFAULT '{}',
    instructions TEXT NOT NULL,
    target_issues TEXT[] DEFAULT '{}',
    effectiveness_rating DECIMAL(3,1) DEFAULT 5.0,
    preparation_time_minutes INTEGER,
    application_method TEXT,
    safety_notes TEXT,
    cost_estimate_inr DECIMAL(8,2),
    created_by UUID REFERENCES public.users(id),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crop plans table
CREATE TABLE IF NOT EXISTS public.crop_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    land_id UUID REFERENCES public.lands(id) ON DELETE CASCADE NOT NULL,
    crop_name TEXT NOT NULL,
    planting_season TEXT NOT NULL,
    expected_profit DECIMAL(10,2),
    water_requirements TEXT,
    growth_period_days INTEGER NOT NULL,
    investment_required DECIMAL(10,2),
    plan_status TEXT DEFAULT 'draft',
    ai_confidence DECIMAL(5,2) DEFAULT 85.0,
    market_demand_score DECIMAL(3,1) DEFAULT 5.0,
    difficulty_level TEXT DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Growth tracking table
CREATE TABLE IF NOT EXISTS public.growth_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
    record_date DATE NOT NULL,
    growth_stage crop_stage NOT NULL,
    height_cm DECIMAL(6,2),
    health_score DECIMAL(3,1) DEFAULT 5.0,
    notes TEXT,
    photo_urls TEXT[] DEFAULT '{}',
    weather_conditions TEXT,
    temperature_celsius DECIMAL(4,1),
    humidity_percentage DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial records table
CREATE TABLE IF NOT EXISTS public.financial_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
    land_id UUID REFERENCES public.lands(id) ON DELETE CASCADE,
    transaction_type TEXT NOT NULL, -- 'expense' or 'income'
    category TEXT NOT NULL, -- 'seeds', 'fertilizer', 'tools', 'harvest_sale', etc.
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.land_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organic_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Lands policies
CREATE POLICY "Users can view own lands" ON public.lands
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lands" ON public.lands
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lands" ON public.lands
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lands" ON public.lands
    FOR DELETE USING (auth.uid() = user_id);

-- Land analyses policies
CREATE POLICY "Users can view own land analyses" ON public.land_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own land analyses" ON public.land_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Crops policies
CREATE POLICY "Users can view own crops" ON public.crops
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own crops" ON public.crops
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own crops" ON public.crops
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own crops" ON public.crops
    FOR DELETE USING (auth.uid() = user_id);

-- Tasks policies
CREATE POLICY "Users can view own tasks" ON public.tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Organic solutions policies (public read, authenticated write)
CREATE POLICY "Anyone can view organic solutions" ON public.organic_solutions
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert solutions" ON public.organic_solutions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Crop plans policies
CREATE POLICY "Users can view own crop plans" ON public.crop_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own crop plans" ON public.crop_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own crop plans" ON public.crop_plans
    FOR UPDATE USING (auth.uid() = user_id);

-- Growth records policies
CREATE POLICY "Users can view own growth records" ON public.growth_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own growth records" ON public.growth_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Financial records policies
CREATE POLICY "Users can view own financial records" ON public.financial_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own financial records" ON public.financial_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own financial records" ON public.financial_records
    FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lands_user_id ON public.lands(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_user_id ON public.crops(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_land_id ON public.crops(land_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_crop_id ON public.tasks(crop_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_land_analyses_user_id ON public.land_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_land_analyses_land_id ON public.land_analyses(land_id);
CREATE INDEX IF NOT EXISTS idx_crop_plans_user_id ON public.crop_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_growth_records_crop_id ON public.growth_records(crop_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_user_id ON public.financial_records(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lands_updated_at BEFORE UPDATE ON public.lands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON public.crops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organic_solutions_updated_at BEFORE UPDATE ON public.organic_solutions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crop_plans_updated_at BEFORE UPDATE ON public.crop_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
