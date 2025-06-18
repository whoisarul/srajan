"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, Loader2, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function LandAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [formData, setFormData] = useState({
    landName: "",
    landSize: "",
    location: "",
    gps: "",
    description: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const router = useRouter()
  const { user } = useAuth()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!user) return
    setIsAnalyzing(true)
    try {
      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await toBase64(formData.image)
      }
      const res = await fetch("/api/land/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          image_base64: imageBase64 ? imageBase64.split(",")[1] : null,
          size: formData.landSize,
          location: formData.location,
        }),
      })
      const data = await res.json()
      setAnalysisResult(data.soil_analysis)
    } catch (error) {
      setAnalysisResult(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handlePlanCrops = () => {
    router.push("/dashboard/crop-planner")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Land Analysis</h1>
        <p className="text-muted-foreground">
          Upload information about your land to get AI-powered analysis and recommendations.
        </p>
      </div>

      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">New Analysis</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Land Information</CardTitle>
              <CardDescription>Provide details about your land for accurate analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAnalyze}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="landName">Land Name</Label>
                    <Input
                      id="landName"
                      placeholder="e.g., North Field"
                      value={formData.landName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (in acres)</Label>
                    <Input
                      id="landSize"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      value={formData.landSize}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Village, District, State"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gps">GPS Coordinates (optional)</Label>
                    <Input
                      id="gps"
                      placeholder="e.g., 28.6139° N, 77.2090° E"
                      value={formData.gps}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="description">Land Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your land (e.g., previously used for wheat farming, has been fallow for 2 years, etc.)"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-4 mt-6">
                  <Label>Upload Soil Photos (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium mb-1">Upload Soil Surface Photo</p>
                      <p className="text-xs text-muted-foreground mb-4">Take a clear photo of the soil surface</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" type="button">
                        Choose File
                      </Button>
                    </div>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium mb-1">Upload Soil Depth Photo</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Dig 6 inches and take a photo of the soil profile
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" type="button">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Land <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Previous Analyses</CardTitle>
              <CardDescription>View your previous land analyses and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">North Field</h3>
                      <p className="text-sm text-muted-foreground">Analyzed on June 2, 2025</p>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Soil Type</p>
                      <p className="text-sm">Loamy Clay</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">pH Level</p>
                      <p className="text-sm">6.8 (Slightly Acidic)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommended Crops</p>
                      <p className="text-sm">Wheat, Tomatoes, Onions</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">South Plot</h3>
                      <p className="text-sm text-muted-foreground">Analyzed on May 15, 2025</p>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Soil Type</p>
                      <p className="text-sm">Sandy Loam</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">pH Level</p>
                      <p className="text-sm">7.2 (Neutral)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommended Crops</p>
                      <p className="text-sm">Potatoes, Carrots, Radish</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {analysisResult && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-green-600 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Analysis Complete!
                </CardTitle>
                <CardDescription>Here are your land analysis results</CardDescription>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {analysisResult.confidence}% Confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium">Soil Type</h3>
                <p className="text-lg font-bold text-green-600">{analysisResult.soilType}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium">pH Level</h3>
                <p className="text-lg font-bold text-blue-600">{analysisResult.phLevel}</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium">Moisture</h3>
                <p className="text-lg font-bold text-amber-600">{analysisResult.moisture}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium">Fertility</h3>
                <p className="text-lg font-bold text-purple-600">{analysisResult.fertility}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">AI Recommendations</h4>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Suggested Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.suggestedCrops.map((crop, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handlePlanCrops} className="bg-green-600 hover:bg-green-700">
                Plan Crops <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Save Analysis</Button>
              <Button variant="outline">Download Report</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
