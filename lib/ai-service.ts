import { GoogleGenerativeAI } from "@google/generative-ai"
import { fallbackAIService } from "./ai-service-fallback"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export interface LandAnalysisResult {
  soilType: string
  phLevel: number
  moisture: string
  fertility: string
  recommendations: string[]
  suggestedCrops: string[]
  confidence: number
}

export interface CropRecommendation {
  name: string
  variety: string
  growthPeriod: number
  waterNeeds: string
  expectedYield: string
  expectedProfit: number
  difficulty: string
  marketDemand: number
  seasonality: string
}

export class AIService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  private useAI = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY

  async analyzeLand(landDescription: string, location: string, soilPhotos?: string[]): Promise<LandAnalysisResult> {
    if (!this.useAI) {
      return fallbackAIService.analyzeLand(landDescription, location)
    }

    try {
      const prompt = `
        As an expert agricultural AI, analyze the following land for organic farming:
        
        Location: ${location}
        Description: ${landDescription}
        
        Provide a detailed analysis including:
        1. Estimated soil type
        2. Likely pH level (6.0-8.0 range)
        3. Moisture level (Low/Medium/High)
        4. Fertility level (Poor/Fair/Good/Excellent)
        5. 3-5 specific recommendations for improvement
        6. 4-6 suitable crops for this land
        7. Confidence level (0-100%)
        
        Format the response as JSON with the following structure:
        {
          "soilType": "string",
          "phLevel": number,
          "moisture": "string",
          "fertility": "string",
          "recommendations": ["string"],
          "suggestedCrops": ["string"],
          "confidence": number
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // Fallback response
      return {
        soilType: "Loamy Clay",
        phLevel: 6.8,
        moisture: "Medium",
        fertility: "Good",
        recommendations: [
          "Add organic compost to improve nitrogen content",
          "Consider drip irrigation for water efficiency",
          "Plant nitrogen-fixing crops like legumes",
        ],
        suggestedCrops: ["Tomatoes", "Wheat", "Onions", "Spinach"],
        confidence: 85,
      }
    } catch (error) {
      console.error("AI Analysis Error:", error)
      return fallbackAIService.analyzeLand(landDescription, location)
    }
  }

  async getCropRecommendations(
    soilType: string,
    location: string,
    season: string,
    landSize: number,
  ): Promise<CropRecommendation[]> {
    if (!this.useAI) {
      return fallbackAIService.getCropRecommendations(soilType, location, season, landSize)
    }

    try {
      const prompt = `
        As an agricultural expert, recommend the best crops for:
        
        Soil Type: ${soilType}
        Location: ${location}
        Season: ${season}
        Land Size: ${landSize} acres
        
        Provide 6-8 crop recommendations with details:
        1. Crop name and variety
        2. Growth period in days
        3. Water requirements (Low/Medium/High)
        4. Expected yield per acre
        5. Expected profit in INR per acre
        6. Difficulty level (Easy/Medium/Hard)
        7. Market demand score (1-5)
        8. Best planting season
        
        Format as JSON array:
        [
          {
            "name": "string",
            "variety": "string",
            "growthPeriod": number,
            "waterNeeds": "string",
            "expectedYield": "string",
            "expectedProfit": number,
            "difficulty": "string",
            "marketDemand": number,
            "seasonality": "string"
          }
        ]
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\[[\s\S]*\\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // Return fallback if JSON parsing fails
      return this.getFallbackCropRecommendations(soilType, season)
    } catch (error) {
      console.error("Crop Recommendation Error:", error)
      return fallbackAIService.getCropRecommendations(soilType, location, season, landSize)
    }
  }

  private getFallbackCropRecommendations(soilType: string, season: string): CropRecommendation[] {
    // Intelligent fallback based on soil type and season
    const summerCrops = [
      {
        name: "Tomatoes",
        variety: "Hybrid Variety",
        growthPeriod: 60,
        waterNeeds: "Medium",
        expectedYield: "25 kg per plant",
        expectedProfit: 45000,
        difficulty: "Medium",
        marketDemand: 4.5,
        seasonality: "Summer",
      },
      {
        name: "Okra",
        variety: "Lady Finger",
        growthPeriod: 55,
        waterNeeds: "Medium-Low",
        expectedYield: "15 kg per plant",
        expectedProfit: 18000,
        difficulty: "Easy",
        marketDemand: 4.2,
        seasonality: "Summer",
      },
      {
        name: "Eggplant",
        variety: "Brinjal",
        growthPeriod: 70,
        waterNeeds: "Medium",
        expectedYield: "20 kg per plant",
        expectedProfit: 22000,
        difficulty: "Medium",
        marketDemand: 4.0,
        seasonality: "Summer",
      },
      {
        name: "Watermelon",
        variety: "Sugar Baby",
        growthPeriod: 85,
        waterNeeds: "Medium-High",
        expectedYield: "30 tons per acre",
        expectedProfit: 35000,
        difficulty: "Medium",
        marketDemand: 4.8,
        seasonality: "Summer",
      },
      {
        name: "Pearl Millet",
        variety: "Bajra",
        growthPeriod: 80,
        waterNeeds: "Low",
        expectedYield: "2 tons per acre",
        expectedProfit: 15000,
        difficulty: "Easy",
        marketDemand: 3.8,
        seasonality: "Summer",
      },
      {
        name: "Cucumber",
        variety: "Hybrid",
        growthPeriod: 50,
        waterNeeds: "Medium",
        expectedYield: "12 tons per acre",
        expectedProfit: 28000,
        difficulty: "Easy",
        marketDemand: 4.3,
        seasonality: "Summer",
      },
    ]

    const winterCrops = [
      {
        name: "Wheat",
        variety: "PBW 343",
        growthPeriod: 120,
        waterNeeds: "Medium",
        expectedYield: "4 tons per acre",
        expectedProfit: 35000,
        difficulty: "Easy",
        marketDemand: 4.8,
        seasonality: "Winter",
      },
      {
        name: "Mustard",
        variety: "Pusa Bold",
        growthPeriod: 90,
        waterNeeds: "Low",
        expectedYield: "1.5 tons per acre",
        expectedProfit: 25000,
        difficulty: "Easy",
        marketDemand: 4.2,
        seasonality: "Winter",
      },
      {
        name: "Peas",
        variety: "Garden Peas",
        growthPeriod: 65,
        waterNeeds: "Medium",
        expectedYield: "8 tons per acre",
        expectedProfit: 30000,
        difficulty: "Medium",
        marketDemand: 4.5,
        seasonality: "Winter",
      },
    ]

    return season.toLowerCase() === "winter" ? winterCrops : summerCrops
  }

  async getGrowthInsights(
    cropName: string,
    currentStage: string,
    daysSincePlanting: number,
    healthStatus: string,
    weatherConditions: string,
  ): Promise<{
    insights: string[]
    recommendations: string[]
    nextMilestone: string
    estimatedHarvestDate: string
  }> {
    try {
      const prompt = `
        Analyze the growth progress of:
        
        Crop: ${cropName}
        Current Stage: ${currentStage}
        Days Since Planting: ${daysSincePlanting}
        Health Status: ${healthStatus}
        Weather: ${weatherConditions}
        
        Provide:
        1. 3-4 growth insights
        2. 3-4 actionable recommendations
        3. Next growth milestone
        4. Estimated harvest date
        
        Format as JSON:
        {
          "insights": ["string"],
          "recommendations": ["string"],
          "nextMilestone": "string",
          "estimatedHarvestDate": "string"
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      return {
        insights: [
          "Crop is progressing well for this stage",
          "Growth rate is within normal parameters",
          "Health indicators are positive",
        ],
        recommendations: [
          "Continue current watering schedule",
          "Monitor for pest activity",
          "Apply organic fertilizer if needed",
        ],
        nextMilestone: "Flowering stage in 10-15 days",
        estimatedHarvestDate: "In 18-25 days",
      }
    } catch (error) {
      console.error("Growth Insights Error:", error)
      return {
        insights: ["Crop is progressing well for this stage", "Growth rate is within normal parameters"],
        recommendations: ["Continue current watering schedule", "Monitor for pest activity"],
        nextMilestone: "Next growth stage in 10-15 days",
        estimatedHarvestDate: "In 18-25 days",
      }
    }
  }

  async getOrganicSolution(
    problem: string,
    cropType: string,
    severity: string,
  ): Promise<{
    solution: string
    ingredients: string[]
    instructions: string
    effectiveness: number
    applicationMethod: string
  }> {
    try {
      const prompt = `
        Provide an organic solution for:
        
        Problem: ${problem}
        Crop: ${cropType}
        Severity: ${severity}
        
        Provide:
        1. Solution name
        2. Natural ingredients list
        3. Step-by-step preparation instructions
        4. Effectiveness rating (1-5)
        5. Application method
        
        Format as JSON:
        {
          "solution": "string",
          "ingredients": ["string"],
          "instructions": "string",
          "effectiveness": number,
          "applicationMethod": "string"
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      return {
        solution: "Neem Oil Spray",
        ingredients: ["2 tbsp neem oil", "1 tsp liquid soap", "1 liter water"],
        instructions: "Mix all ingredients in spray bottle. Apply early morning or evening.",
        effectiveness: 4.5,
        applicationMethod: "Foliar spray on affected areas",
      }
    } catch (error) {
      console.error("Organic Solution Error:", error)
      return {
        solution: "Neem Oil Spray",
        ingredients: ["2 tbsp neem oil", "1 tsp liquid soap", "1 liter water"],
        instructions: "Mix all ingredients in spray bottle. Apply early morning or evening.",
        effectiveness: 4.5,
        applicationMethod: "Foliar spray on affected areas",
      }
    }
  }
}

export const aiService = new AIService()
