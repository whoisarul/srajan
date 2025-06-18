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
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        // Use .maybeSingle() instead of .single() to handle the case where no profile exists
        const { data, error } = await supabase
          .from("users")
          .select("first_name, last_name, location")
          .eq("id", user.id)
          .maybeSingle()

        if (error) {
          console.error("Error fetching profile:", error)
        } else if (data) {
          setProfile(data)
        } else {
          // Handle case where profile doesn't exist yet
          console.log("No profile found, using metadata from auth")
          // Use metadata from auth as fallback
          setProfile({
            first_name: user.user_metadata?.first_name || "",
            last_name: user.user_metadata?.last_name || "",
            location: user.user_metadata?.location || "",
          })
        }
      } catch (err) {
        console.error("Unexpected error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

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

  // Fallback to user email if no name is available
  const userName = profile?.first_name || user?.user_metadata?.first_name || user?.email?.split("@")[0] || "Farmer"

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
            <div className="text-2xl font-bold">2.5 Acres</div>
            <p className="text-xs text-muted-foreground">3 different plots</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Tomatoes, Wheat, Spinach, Onions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days to Harvest</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 Days</div>
            <p className="text-xs text-muted-foreground">Tomatoes ready first</p>
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
            <div className="text-2xl font-bold">₹42,500</div>
            <p className="text-xs text-muted-foreground">+12% from last season</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crop Growth Progress</CardTitle>
            <CardDescription>Track the growth stages of your active crops</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tomatoes" className="space-y-4">
              <TabsList>
                <TabsTrigger value="tomatoes">Tomatoes</TabsTrigger>
                <TabsTrigger value="wheat">Wheat</TabsTrigger>
                <TabsTrigger value="spinach">Spinach</TabsTrigger>
                <TabsTrigger value="onions">Onions</TabsTrigger>
              </TabsList>
              <TabsContent value="tomatoes" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Growth Stage: Fruiting</p>
                    <p className="text-sm text-muted-foreground">Day 42 of 60</p>
                  </div>
                  <div className="text-sm text-muted-foreground">70% Complete</div>
                </div>
                <Progress value={70} className="h-2" />

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium">Today's Tasks</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 rounded-md border p-3">
                      <Droplet className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Water plants</p>
                        <p className="text-xs text-muted-foreground">Morning, 2L per plant</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Mark Done
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 rounded-md border p-3">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Apply organic fertilizer</p>
                        <p className="text-xs text-muted-foreground">Compost tea, 500ml per plant</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Mark Done
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="wheat" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Growth Stage: Tillering</p>
                    <p className="text-sm text-muted-foreground">Day 35 of 120</p>
                  </div>
                  <div className="text-sm text-muted-foreground">29% Complete</div>
                </div>
                <Progress value={29} className="h-2" />

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium">Today's Tasks</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 rounded-md border p-3">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Check for pests</p>
                        <p className="text-xs text-muted-foreground">Look for aphids and rust</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Mark Done
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              {/* Other tabs would have similar content */}
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>AI-powered suggestions for your farm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Soil Improvement</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Your tomato plot soil analysis shows low nitrogen. Add compost or organic nitrogen fertilizer
                      within 3 days.
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="text-green-700 border-green-700 hover:bg-green-50">
                      View Solutions <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Droplet className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Irrigation Alert</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Weather forecast shows no rain for the next 5 days. Increase watering frequency for wheat plot.
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-700 hover:bg-blue-50">
                      Update Schedule <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-amber-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Planting Opportunity</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>Ideal time to plant garlic in your unused north plot. Expected profit: ₹15,000 per acre.</p>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="text-amber-700 border-amber-700 hover:bg-amber-50">
                      Plan Crop <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
