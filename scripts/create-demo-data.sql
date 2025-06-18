-- First, let's create a demo user account
-- Note: You'll need to create this user through Supabase Auth first
-- Email: ram@example.com, Password: password123

-- Insert demo user profile (replace the UUID with the actual user ID from auth.users)
INSERT INTO public.users (id, email, first_name, last_name, phone, location, role, onboarding_completed) 
VALUES (
  '0cc6b875-48f8-40fe-9320-56d3e878e0f4', -- Replace with actual UUID from auth
  'ram@example.com',
  'Ram',
  'Kumar',
  '+91 98765 43210',
  'punjab',
  'farmer',
  true
) ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  location = EXCLUDED.location;

-- Insert demo lands
INSERT INTO public.lands (user_id, name, size_acres, location, gps_coordinates, description, soil_type, ph_level, moisture_level, fertility_level, status) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', 'North Field', 2.5, 'Ludhiana, Punjab', '30.9010° N, 75.8573° E', 'Main farming plot with good irrigation access', 'Loamy Clay', 6.8, 'Medium', 'Good', 'active'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', 'South Plot', 1.2, 'Ludhiana, Punjab', '30.8950° N, 75.8520° E', 'Smaller plot near the house, good for vegetables', 'Sandy Loam', 7.2, 'High', 'Excellent', 'active'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', 'East Garden', 0.8, 'Ludhiana, Punjab', '30.9020° N, 75.8600° E', 'Experimental plot for new crops', 'Clay Loam', 6.5, 'Low', 'Fair', 'planning');

-- Insert demo land analyses
INSERT INTO public.land_analyses (user_id, land_id, soil_type, ph_level, moisture_level, fertility_level, organic_matter_percentage, nitrogen_level, phosphorus_level, potassium_level, recommendations, suggested_crops, analysis_confidence) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'North Field' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Loamy Clay', 6.8, 'Medium', 'Good', 3.2, 'Medium', 'High', 'Medium', 
 ARRAY['Add organic compost to improve nitrogen content', 'Consider drip irrigation for water efficiency', 'Plant nitrogen-fixing crops like legumes'],
 ARRAY['Tomatoes', 'Wheat', 'Onions', 'Spinach'], 95.5),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'South Plot' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Sandy Loam', 7.2, 'High', 'Excellent', 4.1, 'High', 'High', 'High',
 ARRAY['Maintain current organic practices', 'Add mulch to retain moisture', 'Rotate crops seasonally'],
 ARRAY['Potatoes', 'Carrots', 'Radish', 'Lettuce'], 98.2);

-- Insert demo crops
INSERT INTO public.crops (user_id, land_id, name, variety, planting_date, expected_harvest_date, growth_stage, current_day, total_days, health_status, expected_yield, expected_profit) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'North Field' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Tomatoes', 'Hybrid Variety', '2024-04-15', '2024-06-15', 'fruiting', 42, 60, 'excellent', '25 kg per plant', 45000),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'North Field' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Wheat', 'PBW 343', '2024-11-15', '2025-04-15', 'vegetative', 35, 120, 'good', '4 tons per acre', 35000),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'South Plot' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Spinach', 'All Green', '2024-05-01', '2024-06-30', 'vegetative', 25, 60, 'excellent', '15 kg per sq meter', 25000),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'South Plot' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Onions', 'Red Onion', '2024-03-01', '2024-07-01', 'flowering', 85, 120, 'good', '20 tons per acre', 20000);

-- Insert demo tasks
INSERT INTO public.tasks (user_id, crop_id, title, description, due_date, completed, priority) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Water plants', 'Morning watering, 2L per plant', CURRENT_DATE, false, 'high'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Apply organic fertilizer', 'Compost tea, 500ml per plant', CURRENT_DATE, false, 'medium'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Check for pests', 'Look for aphids and whiteflies', CURRENT_DATE, true, 'medium'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Wheat' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Check for pests', 'Look for aphids and rust', CURRENT_DATE, false, 'medium'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Spinach' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Harvest ready leaves', 'Pick mature outer leaves', CURRENT_DATE + 1, false, 'low');

-- Insert demo crop plans
INSERT INTO public.crop_plans (user_id, land_id, crop_name, planting_season, expected_profit, water_requirements, growth_period_days, investment_required, plan_status, ai_confidence, market_demand_score, difficulty_level) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'East Garden' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Garlic', 'Winter', 15000, 'Low', 180, 8000, 'draft', 88.5, 4.2, 'easy'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.lands WHERE name = 'East Garden' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'Cauliflower', 'Winter', 22000, 'Medium', 90, 12000, 'draft', 92.1, 4.5, 'medium');

-- Insert demo growth records
INSERT INTO public.growth_records (user_id, crop_id, record_date, growth_stage, height_cm, health_score, notes, weather_conditions, temperature_celsius, humidity_percentage) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), CURRENT_DATE - 7, 'fruiting', 120.5, 4.8, 'Excellent fruit development, first tomatoes appearing', 'Sunny', 28.5, 65.2),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), CURRENT_DATE - 3, 'fruiting', 125.0, 4.9, 'Fruits growing well, good color development', 'Partly Cloudy', 26.8, 70.1),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Wheat' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), CURRENT_DATE - 5, 'vegetative', 45.2, 4.5, 'Good tillering, healthy green color', 'Sunny', 24.2, 58.9);

-- Insert demo financial records
INSERT INTO public.financial_records (user_id, crop_id, transaction_type, category, amount, description, transaction_date) VALUES
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '50cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'expense', 'seeds', 2500, 'Hybrid tomato seeds', '2024-04-10'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Tomatoes' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'expense', 'fertilizer', 3500, 'Organic compost and bio-fertilizer', '2024-04-20'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Wheat' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'expense', 'seeds', 4000, 'PBW 343 wheat seeds', '2024-11-10'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', (SELECT id FROM public.crops WHERE name = 'Spinach' AND user_id = '0cc6b875-48f8-40fe-9320-56d3e878e0f4'), 'income', 'harvest_sale', 8500, 'First spinach harvest sale', '2024-05-20'),
('0cc6b875-48f8-40fe-9320-56d3e878e0f4', NULL, 'expense', 'tools', 15000, 'Drip irrigation system', '2024-03-15');
