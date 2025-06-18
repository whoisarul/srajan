require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// --- Auth routes (Supabase handles most via frontend, but you can add custom logic here) ---

// --- Land analysis (Gemini AI) ---
app.post('/api/land/analyze', async (req, res) => {
  try {
    const { user_id, image_base64, size, location } = req.body;
    if (!user_id || !image_base64 || !size || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Call Gemini API for soil analysis
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent',
      {
        contents: [
          {
            parts: [
              { text: `Analyze the soil in this image. Give fertility, type, and organic potential. Land size: ${size} sqm. Location: ${location}.` },
              { inlineData: { mimeType: 'image/jpeg', data: image_base64 } }
            ]
          }
        ]
      },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    const soil_analysis = geminiRes.data;

    // Store in Supabase
    const { data, error } = await supabase
      .from('land')
      .insert([
        { user_id, size, location, soil_analysis }
      ])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Soil analysis complete', soil_analysis, land: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze soil' });
  }
});

// --- Crop recommendations ---
app.get('/api/crops/recommend', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

    // Get the latest land analysis for the user
    const { data: lands, error } = await supabase
      .from('land')
      .select('id, soil_analysis')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) return res.status(500).json({ error: error.message });
    if (!lands || lands.length === 0) return res.status(404).json({ error: 'No land analysis found' });

    // Placeholder: Recommend crops based on soil_analysis (customize as needed)
    const soil = lands[0].soil_analysis;
    // TODO: Use AI or rules to recommend crops. For now, return a static list.
    const recommended_crops = [
      { name: 'Tomato', reason: 'High organic potential' },
      { name: 'Spinach', reason: 'Good for fertile soil' },
      { name: 'Carrot', reason: 'Profitable and easy to grow' }
    ];

    // Optionally, store recommendations in Supabase
    await supabase.from('crop_recommendations').insert([
      { land_id: lands[0].id, recommended_crops }
    ]);

    res.json({ recommended_crops, soil_analysis: soil });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to recommend crops' });
  }
});

// --- Crop health analysis (Gemini AI) ---
app.post('/api/crop/analyze', async (req, res) => {
  try {
    const { user_id, land_id, image_base64 } = req.body;
    if (!user_id || !land_id || !image_base64) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Call Gemini API for crop health analysis
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent',
      {
        contents: [
          {
            parts: [
              { text: `Analyze the health and growth stage of the crop in this image. Suggest organic interventions if needed.` },
              { inlineData: { mimeType: 'image/jpeg', data: image_base64 } }
            ]
          }
        ]
      },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    const ai_analysis = geminiRes.data;

    // Store in Supabase
    const { data, error } = await supabase
      .from('crop_tracking')
      .insert([
        { user_id, land_id, ai_analysis }
      ])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Crop health analysis complete', ai_analysis, tracking: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze crop' });
  }
});

// --- Dashboard data ---
app.get('/api/dashboard', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

    // Fetch user's land
    const { data: lands, error: landError } = await supabase
      .from('land')
      .select('*')
      .eq('user_id', user_id);
    if (landError) return res.status(500).json({ error: landError.message });

    // Fetch crop tracking
    const { data: tracking, error: trackingError } = await supabase
      .from('crop_tracking')
      .select('*')
      .eq('user_id', user_id);
    if (trackingError) return res.status(500).json({ error: trackingError.message });

    // Fetch crop recommendations
    const { data: recommendations, error: recError } = await supabase
      .from('crop_recommendations')
      .select('*');
    if (recError) return res.status(500).json({ error: recError.message });

    res.json({
      lands,
      tracking,
      recommendations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// --- Organic solutions ---
app.get('/api/organic/solutions', (req, res) => {
  // Static list for now
  const solutions = [
    { name: 'Neem Oil Spray', use: 'Natural pesticide for most crops' },
    { name: 'Compost Tea', use: 'Boosts soil microbes and plant health' },
    { name: 'Garlic-Chili Spray', use: 'Repels insects organically' },
    { name: 'Vermicompost', use: 'Improves soil fertility organically' }
  ];
  res.json({ solutions });
});

// --- Notifications (stub) ---
app.post('/api/notify', (req, res) => {
  // Stub for future notification integration
  res.json({ message: 'Notification endpoint (stub)' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 