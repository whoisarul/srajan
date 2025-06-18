-- Insert sample organic solutions
INSERT INTO public.organic_solutions (name, category, description, ingredients, instructions, target_issues, effectiveness_rating, preparation_time_minutes, cost_estimate_inr) VALUES
('Neem Oil Spray', 'pest_control', 'Natural pesticide effective against aphids, mites, and whiteflies', 
 ARRAY['2 tablespoons neem oil', '1 teaspoon liquid soap', '1 liter water'], 
 'Mix all ingredients in a spray bottle. Apply to affected plants early morning or evening, covering both sides of leaves. Repeat every 7-10 days as needed.',
 ARRAY['aphids', 'mites', 'whiteflies', 'thrips'],
 4.5, 10, 150.00),

('Garlic Pest Spray', 'pest_control', 'Strong natural deterrent for various garden pests',
 ARRAY['10 garlic cloves', '1 onion', '1 teaspoon cayenne pepper', '1 liter water'],
 'Blend garlic and onion with water. Strain the mixture and add cayenne pepper. Spray on affected areas in the evening.',
 ARRAY['beetles', 'caterpillars', 'borers', 'aphids'],
 4.2, 20, 80.00),

('Turmeric Antifungal Paste', 'disease_treatment', 'Natural antifungal treatment for plant diseases',
 ARRAY['2 tablespoons turmeric powder', '1 tablespoon mustard oil', 'water as needed'],
 'Mix turmeric with oil to form a paste. Apply directly to affected areas or dilute with water for spraying. Use weekly until symptoms disappear.',
 ARRAY['fungal infections', 'leaf spots', 'root rot'],
 4.0, 5, 60.00),

('Compost Tea Fertilizer', 'fertilizer', 'Rich liquid fertilizer full of nutrients and beneficial microbes',
 ARRAY['2 cups mature compost', '10 liters water', '1 tablespoon molasses (optional)'],
 'Steep compost in water for 24-48 hours, stirring occasionally. Strain and dilute 1:10 before applying to plants. Use weekly during growing season.',
 ARRAY['nutrient deficiency', 'poor soil health', 'slow growth'],
 4.8, 30, 100.00),

('Banana Peel Fertilizer', 'fertilizer', 'High potassium fertilizer excellent for flowering plants',
 ARRAY['5-6 banana peels', '2 liters water'],
 'Chop banana peels and soak in water for 1 week. Strain and dilute 1:5 before use. Apply around plants monthly.',
 ARRAY['poor flowering', 'potassium deficiency', 'weak stems'],
 4.3, 10, 25.00),

('Cow Dung Compost', 'soil_health', 'Complete organic fertilizer that improves soil structure',
 ARRAY['fresh cow dung', 'dry leaves/straw', 'water for moisture'],
 'Mix cow dung with dry organic matter in 3:1 ratio. Keep moist and turn every 2 weeks. Compost for 3-4 months until dark and crumbly.',
 ARRAY['poor soil fertility', 'low organic matter', 'soil compaction'],
 4.9, 60, 200.00),

('Epsom Salt Solution', 'fertilizer', 'Magnesium supplement for healthier plant growth',
 ARRAY['1 tablespoon Epsom salt', '1 liter water'],
 'Dissolve Epsom salt in water. Apply to soil around plants monthly. Can also be used as foliar spray in early morning.',
 ARRAY['magnesium deficiency', 'yellowing leaves', 'poor fruit development'],
 4.1, 5, 40.00),

('Baking Soda Fungicide', 'disease_treatment', 'Prevents and treats fungal diseases on plants',
 ARRAY['1 teaspoon baking soda', '1 liter water', '1/2 teaspoon liquid soap'],
 'Mix all ingredients until dissolved. Spray on affected plants in the evening. Repeat every 3-4 days until symptoms clear.',
 ARRAY['powdery mildew', 'black spot', 'fungal diseases'],
 3.8, 5, 30.00),

('Cinnamon Soil Treatment', 'soil_health', 'Natural antifungal for soil and seedling protection',
 ARRAY['2 tablespoons cinnamon powder', 'soil or potting mix'],
 'Sprinkle cinnamon powder on soil surface or mix into potting soil. Particularly effective for seedling trays and newly planted areas.',
 ARRAY['damping off', 'soil fungi', 'seedling diseases'],
 4.0, 2, 120.00),

('Milk Spray for Plants', 'disease_treatment', 'Natural antifungal and nutrient supplement',
 ARRAY['1 cup milk', '9 cups water'],
 'Mix milk with water in 1:9 ratio. Spray on leaves early morning once weekly. The proteins in milk help fight fungal diseases.',
 ARRAY['powdery mildew', 'leaf spot', 'viral diseases'],
 3.9, 5, 50.00);

-- Insert sample crop data for common Indian crops
INSERT INTO public.organic_solutions (name, category, description, ingredients, instructions, target_issues, effectiveness_rating, preparation_time_minutes, cost_estimate_inr) VALUES
('Vermicompost Tea', 'fertilizer', 'Nutrient-rich liquid fertilizer from worm castings',
 ARRAY['2 cups vermicompost', '10 liters water', '1 tablespoon jaggery'],
 'Soak vermicompost in water with jaggery for 24 hours. Strain and use undiluted for soil application or dilute 1:3 for foliar spray.',
 ARRAY['nutrient deficiency', 'poor soil biology', 'slow plant growth'],
 4.7, 25, 180.00),

('Mustard Cake Fertilizer', 'fertilizer', 'Organic nitrogen-rich fertilizer from mustard oil extraction',
 ARRAY['1 kg mustard cake', '10 liters water'],
 'Soak mustard cake in water for 3-4 days. Stir daily. Strain and dilute 1:5 before application. Apply monthly during growing season.',
 ARRAY['nitrogen deficiency', 'poor vegetative growth', 'yellowing leaves'],
 4.4, 15, 250.00),

('Jeevamrut Bio-fertilizer', 'soil_health', 'Traditional Indian bio-fertilizer that enhances soil microbiology',
 ARRAY['10 kg cow dung', '10 liters cow urine', '2 kg jaggery', '2 kg gram flour', '1 handful soil'],
 'Mix all ingredients with 200 liters water. Ferment for 7 days, stirring daily. Apply 500ml per plant monthly.',
 ARRAY['poor soil health', 'low microbial activity', 'nutrient deficiency'],
 4.8, 45, 300.00);
