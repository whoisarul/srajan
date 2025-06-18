// Fallback service when AI is not available
export class FallbackAIService {
  async analyzeLand(landDescription: string, location: string): Promise<any> {
    // Simulate AI analysis with realistic data
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      soilType: "Loamy Clay",
      phLevel: 6.8,
      moisture: "Medium",
      fertility: "Good",
      recommendations: [
        "Add organic compost to improve nitrogen content",
        "Consider drip irrigation for water efficiency",
        "Plant nitrogen-fixing crops like legumes",
        "Test soil pH regularly and adjust as needed",
      ],
      suggestedCrops: ["Tomatoes", "Wheat", "Onions", "Spinach", "Okra", "Eggplant"],
      confidence: 85,
    }
  }

  async getCropRecommendations(soilType: string, location: string, season: string, landSize: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

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

    return summerCrops
  }

  async getGrowthInsights(cropName: string, currentStage: string, daysSincePlanting: number) {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      insights: [
        `${cropName} is progressing well for day ${daysSincePlanting}`,
        "Growth rate is within normal parameters for this stage",
        "Health indicators are positive based on current conditions",
        "Weather conditions are favorable for continued growth",
      ],
      recommendations: [
        "Continue current watering schedule",
        "Monitor for pest activity during this growth phase",
        "Apply organic fertilizer if leaf color appears pale",
        "Ensure adequate sunlight exposure",
      ],
      nextMilestone: currentStage === "Seedling" ? "Vegetative growth in 10-15 days" : "Flowering stage in 10-15 days",
      estimatedHarvestDate: `In ${Math.max(1, 90 - daysSincePlanting)} days`,
    }
  }

  async getOrganicSolution(problem: string, cropType: string, severity: string) {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const solutions = {
      pest: {
        solution: "Neem Oil Spray",
        ingredients: ["2 tbsp neem oil", "1 tsp liquid soap", "1 liter water"],
        instructions: "Mix all ingredients in spray bottle. Apply early morning or evening on affected areas.",
        effectiveness: 4.5,
        applicationMethod: "Foliar spray on affected areas",
      },
      disease: {
        solution: "Baking Soda Fungicide",
        ingredients: ["1 tbsp baking soda", "1/2 tsp liquid soap", "1 liter water"],
        instructions: "Dissolve baking soda in water, add soap. Spray on affected plants weekly.",
        effectiveness: 4.0,
        applicationMethod: "Weekly foliar application",
      },
      nutrient: {
        solution: "Compost Tea",
        ingredients: ["2 cups compost", "1 bucket water", "1 tbsp molasses"],
        instructions: "Steep compost in water for 24-48 hours. Strain and dilute 1:10 before use.",
        effectiveness: 4.8,
        applicationMethod: "Soil drench around root zone",
      },
    }

    const problemType = problem.toLowerCase().includes("pest")
      ? "pest"
      : problem.toLowerCase().includes("disease")
        ? "disease"
        : "nutrient"

    return solutions[problemType] || solutions.pest
  }
}

export const fallbackAIService = new FallbackAIService()
