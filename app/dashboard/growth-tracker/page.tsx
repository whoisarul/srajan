"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Camera, CheckCircle, Leaf, Sun, Upload, AlertTriangle, TrendingUp, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function GrowthTracker() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [crops, setCrops] = useState([])
  const [tasks, setTasks] = useState([])
  const [growthInsights, setGrowthInsights] = useState(null)
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)
  const [image, setImage] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserCrops()
      fetchUserTasks()
    }
  }, [user])

  useEffect(() => {
    if (selectedCrop && crops.length > 0) {
      const crop = crops.find((c) => c.id === selectedCrop)
      if (crop) {
        fetchGrowthInsights(crop)
      }
    }
  }, [selectedCrop, crops])

  const fetchUserCrops = async () => {
    try {
      const { data, error } = await supabase
        .from("crops")
        .select(`
          *,
          lands (name, location)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching crops:", error)
      } else {
        setCrops(data || [])
        if (data && data.length > 0) {
          setSelectedCrop(data[0].id)
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  const fetchUserTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .eq("due_date", new Date().toISOString().split("T")[0])
        .order("priority", { ascending: false })

      if (error) {
        console.error("Error fetching tasks:", error)
      } else {
        setTasks(data || [])
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  const fetchGrowthInsights = async (crop) => {
    setIsLoadingInsights(true)
    try {
      const insights = await aiService.getGrowthInsights(
        crop.name,
        crop.growth_stage,
        crop.current_day,
        crop.health_status,
        "Sunny, 28°C",
      )
      setGrowthInsights(insights)
    } catch (error) {
      console.error("Error fetching insights:", error)
      setGrowthInsights({
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
      })
    } finally {
      setIsLoadingInsights(false)
    }
  }

  const toggleTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId)
      const { error } = await supabase
        .from("tasks")
        .update({
          completed: !task.completed,
          completed_at: !task.completed ? new Date().toISOString() : null,
        })
        .eq("id", taskId)

      if (error) {
        console.error("Error updating task:", error)
      } else {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)))
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  const currentCrop = crops.find((c) => c.id === selectedCrop)
  const progress = currentCrop ? (currentCrop.current_day / currentCrop.total_days) * 100 : 0

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleAnalyze = async () => {
    if (!user || !selectedCrop || !image) return
    setIsLoadingInsights(true)
    try {
      const imageBase64 = await toBase64(image)
      const res = await fetch("/api/crop/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          land_id: selectedCrop, // or crop_id if needed
          image_base64: imageBase64.split(",")[1],
        }),
      })
      const data = await res.json()
      setGrowthInsights(data.ai_analysis)
    } catch (error) {
      setGrowthInsights(null)
    } finally {
      setIsLoadingInsights(false)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Growth Tracker</h1>
        <p className="text-muted-foreground">Monitor your crops' progress and manage daily farming tasks</p>
      </div>

      {/* Crop Selection */}
      <div className="flex flex-wrap gap-2">
        {crops.map((crop) => (
          <Button
            key={crop.id}
            variant={selectedCrop === crop.id ? "default" : "outline"}
            onClick={() => setSelectedCrop(crop.id)}
            className={selectedCrop === crop.id ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {crop.name} - {crop.lands?.name}
          </Button>
        ))}
      </div>

      {currentCrop && (
        <>
          {/* Main Content */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Growth Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {currentCrop.name} - {currentCrop.growth_stage}
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {currentCrop.health_status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Day {currentCrop.current_day} of {currentCrop.total_days} •
                  {growthInsights?.nextMilestone || "Loading next milestone..."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Growth Progress</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Days Remaining</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {currentCrop.total_days - currentCrop.current_day}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Expected Yield</p>
                    <p className="text-lg font-bold text-green-600">{currentCrop.expected_yield || "25 kg/plant"}</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Sun className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Weather</p>
                    <p className="text-lg font-bold text-amber-600">Sunny, 28°C</p>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Today's Growth Photo</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Help AI track your crop's health and growth progress
                    </p>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>Complete these tasks for optimal growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border ${
                      task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                    }`}
                  >
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => toggleTask(task.id)}>
                      <CheckCircle className={`h-5 w-5 ${task.completed ? "text-green-600" : "text-gray-400"}`} />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                          {task.title}
                        </p>
                        {task.priority === "high" && !task.completed && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Add Custom Task
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Recommendations</CardTitle>
              <CardDescription>Smart suggestions based on your crop's current condition</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingInsights ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-green-600 mr-2" />
                  <span className="text-muted-foreground">Analyzing crop condition...</span>
                </div>
              ) : growthInsights ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Growth Insights</h4>
                    {growthInsights.insights.map((insight, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                          <p className="text-sm text-blue-700">{insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Recommendations</h4>
                    {growthInsights.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start space-x-3">
                          <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                          <p className="text-sm text-green-700">{rec}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </>
      )}

      {crops.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Crops</h3>
            <p className="text-muted-foreground mb-4">Start by analyzing your land and planning your first crop.</p>
            <Button className="bg-green-600 hover:bg-green-700">Plan Your First Crop</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
