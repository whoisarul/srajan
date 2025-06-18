"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Download, TrendingUp, TrendingDown, Calendar, Coins, Sprout, Map, FileText } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchDashboard()
    }
    // eslint-disable-next-line
  }, [user])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/dashboard?user_id=${user.id}`)
      const data = await res.json()
      setDashboardData(data)
    } catch (err) {
      setDashboardData(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading reports...</div>
  if (!dashboardData) return <div>No report data available.</div>

  // Example: You may need to transform dashboardData to fit the UI
  // For now, just show JSON for debugging
  // Replace the below with your actual UI using dashboardData.lands, dashboardData.tracking, dashboardData.recommendations
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farm Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your farming performance and financial insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">{JSON.stringify(dashboardData, null, 2)}</pre>
    </div>
  )
}
