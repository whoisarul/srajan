"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, CloudSun, Droplet, Leaf, Sprout, Sun, Map } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabase-client"

interface UserProfile {
  first_name: string
  last_name: string
  location: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      if (!user) return;
      const res = await fetch(`/api/dashboard?user_id=${user.id}`)
      const data = await res.json()
      setDashboardData(data)
    } catch (err) {
      setDashboardData(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!user || !dashboardData) {
    return <div>No dashboard data available.</div>
  }

  // Extract stats from dashboardData
  const lands = (dashboardData.lands || []) as any[]
  const tracking = (dashboardData.tracking || []) as any[]
  const recommendations = (dashboardData.recommendations || []) as any[]

  // Calculate stats
  const totalLand = lands.reduce((sum: number, land: any) => sum + (parseFloat(land.size) || 0), 0)
  const activeCrops = tracking.length
  const daysToHarvest = tracking.length > 0 ? Math.min(...tracking.map((t: any) => t.days_to_harvest || 0)) : 0
  const estEarnings = tracking.reduce((sum: number, t: any) => sum + (t.estimated_earnings || 0), 0)

  // Fallback to user email if no name is available
  const userName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "Farmer"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
          <p className="text-muted-foreground">Here's an overview of your farming activities and progress.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <CloudSun className="h-4 w-4" />
            <span>28°C</span>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">Add New Land</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Land</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLand} Acres</div>
            <p className="text-xs text-muted-foreground">{lands.length} different plots</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCrops}</div>
            <p className="text-xs text-muted-foreground">{tracking.map((t: any) => t.crop_name).join(", ")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days to Harvest</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysToHarvest} Days</div>
            <p className="text-xs text-muted-foreground">{tracking.length > 0 ? `${tracking[0].crop_name} ready first` : "No crops"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Earnings</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{estEarnings}</div>
            <p className="text-xs text-muted-foreground">Based on current crops</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content: Crop Progress and Tasks */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crop Growth Progress</CardTitle>
            <CardDescription>Track the growth stages of your active crops</CardDescription>
          </CardHeader>
          <CardContent>
            {tracking.length === 0 ? (
              <div>No active crops found.</div>
            ) : (
              <Tabs defaultValue={tracking[0].crop_name} className="space-y-4">
                <TabsList>
                  {tracking.map((t: any) => (
                    <TabsTrigger key={t.crop_name} value={t.crop_name}>{t.crop_name}</TabsTrigger>
                  ))}
                </TabsList>
                {tracking.map((t: any) => (
                  <TabsContent key={t.crop_name} value={t.crop_name} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Growth Stage: {t.growth_stage || "Unknown"}</p>
                        <p className="text-sm text-muted-foreground">Day {t.current_day || 0} of {t.total_days || 0}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{t.total_days ? `${Math.round((t.current_day / t.total_days) * 100)}% Complete` : ""}</div>
                    </div>
                    <Progress value={t.total_days ? (t.current_day / t.total_days) * 100 : 0} className="h-2" />
                    {/* Today's Tasks (if available) */}
                    <div className="mt-6 space-y-4">
                      <h4 className="text-sm font-medium">Today's Tasks</h4>
                      <div className="grid gap-3">
                        {t.tasks && t.tasks.length > 0 ? (
                          t.tasks.map((task: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 rounded-md border p-3">
                              <Droplet className="h-5 w-5 text-blue-500" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{task.name}</p>
                                <p className="text-xs text-muted-foreground">{task.details}</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Mark Done
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div>No tasks for today.</div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
        {/* Recommendations */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Crop Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions for your farm</CardDescription>
          </CardHeader>
          <CardContent>
            {recommendations.length === 0 ? (
              <div>No recommendations available.</div>
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {recommendations.map((rec: any, idx: number) => (
                  <li key={idx}>
                    <span className="font-medium">{rec.name}:</span> {rec.reason}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
