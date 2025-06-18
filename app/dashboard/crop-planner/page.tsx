"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, Coins, Droplet, Sun, ThermometerSun, Loader2 } from "lucide-react"
import { aiService } from "@/lib/ai-service"
import { supabase } from "@/lib/supabase-client"
import { useAuth } from "@/components/auth-provider"

export default function CropPlanner() {
  const [selectedLand, setSelectedLand] = useState("")
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [isPlanning, setIsPlanning] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [lands, setLands] = useState([])
  const [cropRecommendations, setCropRecommendations] = useState([])
  const [landDetails, setLandDetails] = useState(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserLands()
    }
  }, [user])

  useEffect(() => {
    if (selectedLand && landDetails) {
      fetchCropRecommendations()
    }
  }, [selectedLand, landDetails])

  const fetchUserLands = async () => {
    try {
      const { data, error } = await supabase.from("lands").select("*").eq("user_id", user.id)

      if (error) {
        console.error("Error fetching lands:", error)
      } else {
        setLands(data || [])
        if (data && data.length > 0) {
          setSelectedLand(data[0].id)
          setLandDetails(data[0])
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  const fetchCropRecommendations = async () => {
    if (!landDetails) return

    setIsLoadingRecommendations(true)
    try {
      const recommendations = await aiService.getCropRecommendations(
        landDetails.soil_type || "Loamy Clay",
        landDetails.location,
        "Summer", // Current season
        landDetails.size_acres,
      )
      setCropRecommendations(recommendations)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      // Fallback recommendations
      setCropRecommendations([
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
      ])
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  const handleLandChange = (landId) => {
    setSelectedLand(landId)
    const land = lands.find((l) => l.id === landId)
    setLandDetails(land)
  }

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop)
  }

  const handleCreatePlan = async () => {
    if (!selectedCrop || !selectedLand) return

    setIsPlanning(true)

    try {
      // Save crop plan to database
      const { data, error } = await supabase.from("crop_plans").insert({
        user_id: user.id,
        land_id: selectedLand,
        crop_name: selectedCrop.name,
        planting_season: selectedCrop.seasonality,
        expected_profit: selectedCrop.expectedProfit,
        water_requirements: selectedCrop.waterNeeds,
        growth_period_days: selectedCrop.growthPeriod,
        plan_status: "active",
        difficulty_level: selectedCrop.difficulty.toLowerCase(),
        market_demand_score: selectedCrop.marketDemand,
      })

      if (error) {
        console.error("Error creating plan:", error)
      } else {
        // Navigate to growth tracker
        router.push("/dashboard/growth-tracker")
      }
    } catch (error) {
      console.error("Unexpected error:", error)
    } finally {
      setIsPlanning(false)
    }
  }

  const getCropIcon = (cropName) => {
    const icons = {
      Tomatoes: "🍅",
      Okra: "🥬",
      Eggplant: "🍆",
      Watermelon: "🍉",
      Millet: "🌾",
      Wheat: "🌾",
      Rice: "🌾",
      Corn: "🌽",
      Potato: "🥔",
      Onion: "🧅",
    }
    return icons[cropName] || "🌱"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crop Planner</h1>
        <p className="text-muted-foreground">
          Plan your crops based on AI recommendations for maximum yield and profit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Land</CardTitle>
              <CardDescription>Choose the land for crop planning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedLand} onValueChange={handleLandChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select land" />
                </SelectTrigger>
                <SelectContent>
                  {lands.map((land) => (
                    <SelectItem key={land.id} value={land.id}>
                      {land.name} ({land.size_acres} acres)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {landDetails && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Land Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil Type:</span>
                      <span>{landDetails.soil_type || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">pH Level:</span>
                      <span>{landDetails.ph_level || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Moisture:</span>
                      <span>{landDetails.moisture_level || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fertility:</span>
                      <span>{landDetails.fertility_level || "Unknown"}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Season & Climate</CardTitle>
              <CardDescription>Current season and climate conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-sm">Current Season:</span>
                  </div>
                  <Badge>Summer</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ThermometerSun className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="text-sm">Temperature:</span>
                    </div>
                    <span className="text-sm">28-35°C</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm">Rainfall:</span>
                    </div>
                    <span className="text-sm">Low (10-20mm)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm">Sunlight:</span>
                    </div>
                    <span className="text-sm">High (12-14 hrs)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Crop Recommendations</CardTitle>
              <CardDescription>
                {isLoadingRecommendations
                  ? "Generating personalized recommendations..."
                  : "AI-recommended crops based on your land and current season"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRecommendations ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <span className="ml-2 text-muted-foreground">Analyzing your land...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {cropRecommendations.map((crop, index) => (
                    <div key={index} className="rounded-lg border p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <span className="text-2xl">{getCropIcon(crop.name)}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">{crop.name}</h3>
                            <p className="text-sm text-muted-foreground">{crop.variety}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="mr-2">
                                {crop.difficulty}
                              </Badge>
                              <Badge variant="outline">Market: {crop.marketDemand}/5</Badge>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleSelectCrop(crop)}>
                          Select Crop
                        </Button>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <p className="text-sm font-medium">Growth Period</p>
                            <p className="text-sm">{crop.growthPeriod} days</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">Water Needs</p>
                            <p className="text-sm">{crop.waterNeeds}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Coins className="h-5 w-5 text-amber-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">Est. Profit</p>
                            <p className="text-sm">₹{crop.expectedProfit?.toLocaleString()} per acre</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Expected Yield: {crop.expectedYield}</span>
                          <span>Season: {crop.seasonality}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="outline">Compare Crops</Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleCreatePlan}
                  disabled={!selectedCrop || isPlanning}
                >
                  {isPlanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Plan...
                    </>
                  ) : (
                    <>
                      Create Crop Plan <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {selectedCrop && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-800">
                  Selected Crop: {selectedCrop.name} ({selectedCrop.variety})
                </h4>
                <p className="text-sm text-green-600">
                  Ready to create your farming plan! Expected profit: ₹{selectedCrop.expectedProfit?.toLocaleString()}
                </p>
              </div>
              <div className="text-4xl">{getCropIcon(selectedCrop.name)}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
