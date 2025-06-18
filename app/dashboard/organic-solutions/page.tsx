import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bug, Leaf, Search, Sprout } from "lucide-react"
import { useState, useEffect } from "react"
"use client"
export default function OrganicSolutions() {
  const [solutions, setSolutions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/organic/solutions")
      const data = await res.json()
      setSolutions(data.solutions || [])
    } catch (error) {
      setSolutions([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading organic solutions...</div>
  if (!solutions.length) return <div>No solutions found.</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organic Solutions Hub</h1>
        <p className="text-muted-foreground">100% organic remedies and solutions for all your farming needs</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search for solutions..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Tabs defaultValue="pest-control">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pest-control">Pest Control</TabsTrigger>
          <TabsTrigger value="fertilizers">Organic Fertilizers</TabsTrigger>
          <TabsTrigger value="soil-health">Soil Health</TabsTrigger>
        </TabsList>

        <TabsContent value="pest-control" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((sol, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{sol.name}</CardTitle>
                    <Badge className="bg-green-600">Natural</Badge>
                  </div>
                  <CardDescription>{sol.use}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Bug className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Controls: {sol.controls}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {sol.ingredients.map((ing, idx) => (
                          <li key={idx}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                      <p className="text-sm">
                        {sol.instructions}
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Detailed Recipe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fertilizers" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((sol, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{sol.name}</CardTitle>
                    <Badge className="bg-blue-600">Liquid</Badge>
                  </div>
                  <CardDescription>{sol.use}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Sprout className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Provides: {sol.provides}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {sol.ingredients.map((ing, idx) => (
                          <li key={idx}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                      <p className="text-sm">
                        {sol.instructions}
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Detailed Recipe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soil-health" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((sol, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{sol.name}</CardTitle>
                    <Badge className="bg-gray-600">Soil Amendment</Badge>
                  </div>
                  <CardDescription>{sol.use}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Leaf className="h-5 w-5 text-brown-500" />
                      <span className="text-sm">{sol.improvements}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Materials:</h4>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {sol.materials.map((mat, idx) => (
                          <li key={idx}>{mat}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Process:</h4>
                      <p className="text-sm">
                        {sol.process}
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Detailed Process
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
