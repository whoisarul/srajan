"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Download, TrendingUp, TrendingDown, Calendar, Coins, Sprout, Map, FileText } from "lucide-react"

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [selectedLand, setSelectedLand] = useState("all-lands")

  const farmStats = {
    totalRevenue: 125000,
    totalExpenses: 45000,
    netProfit: 80000,
    profitMargin: 64,
    activeCrops: 4,
    totalLand: 2.5,
    harvestsCompleted: 3,
    avgYield: 85,
  }

  const cropPerformance = [
    { name: "Tomatoes", revenue: 45000, expenses: 15000, profit: 30000, yield: 92 },
    { name: "Wheat", revenue: 35000, expenses: 12000, profit: 23000, yield: 88 },
    { name: "Spinach", revenue: 25000, expenses: 8000, profit: 17000, yield: 78 },
    { name: "Onions", revenue: 20000, expenses: 10000, profit: 10000, yield: 82 },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 15000, expenses: 8000 },
    { month: "Feb", revenue: 18000, expenses: 9000 },
    { month: "Mar", revenue: 22000, expenses: 10000 },
    { month: "Apr", revenue: 28000, expenses: 12000 },
    { month: "May", revenue: 25000, expenses: 11000 },
    { month: "Jun", revenue: 17000, expenses: 6000 },
  ]

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

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{farmStats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{farmStats.netProfit.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmStats.profitMargin}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Yield</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmStats.avgYield}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8% from last season
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financial Report</TabsTrigger>
          <TabsTrigger value="crop-performance">Crop Performance</TabsTrigger>
          <TabsTrigger value="land-utilization">Land Utilization</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue vs Expenses</CardTitle>
                <CardDescription>Track your financial performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{data.month}</span>
                        <span>₹{(data.revenue - data.expenses).toLocaleString()} profit</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Revenue: ₹{data.revenue.toLocaleString()}</span>
                          <span>Expenses: ₹{data.expenses.toLocaleString()}</span>
                        </div>
                        <Progress value={((data.revenue - data.expenses) / data.revenue) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where your money is being spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Seeds & Planting</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={35} className="w-20 h-2" />
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Organic Fertilizers</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={25} className="w-20 h-2" />
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Water & Irrigation</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={20} className="w-20 h-2" />
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tools & Equipment</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={5} className="w-20 h-2" />
                      <span className="text-sm">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crop-performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Performance Analysis</CardTitle>
              <CardDescription>Compare the performance of different crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropPerformance.map((crop, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{crop.name}</h3>
                      <Badge variant={crop.yield >= 85 ? "default" : "secondary"}>{crop.yield}% Yield</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">₹{crop.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expenses</p>
                        <p className="font-medium">₹{crop.expenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profit</p>
                        <p className="font-medium text-green-600">₹{crop.profit.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={crop.yield} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="land-utilization" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Land Usage Overview</CardTitle>
                <CardDescription>How your land is being utilized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Actively Farmed</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={80} className="w-20 h-2" />
                      <span className="text-sm">2.0 acres</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fallow/Resting</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">0.4 acres</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Infrastructure</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={5} className="w-20 h-2" />
                      <span className="text-sm">0.1 acres</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soil Health Trends</CardTitle>
                <CardDescription>Track soil quality improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Organic Matter</span>
                      <span>4.2% (+0.8%)</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>pH Balance</span>
                      <span>6.8 (Optimal)</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nitrogen Level</span>
                      <span>High (+15%)</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Water Retention</span>
                      <span>Good (+12%)</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint</CardTitle>
                <CardDescription>Environmental impact tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">-2.5t</div>
                  <p className="text-sm text-muted-foreground">CO₂ sequestered this year</p>
                  <div className="mt-4 flex items-center justify-center text-xs text-green-600">
                    <TrendingDown className="mr-1 h-3 w-3" />
                    25% reduction in emissions
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Conservation</CardTitle>
                <CardDescription>Water usage efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15%</div>
                  <p className="text-sm text-muted-foreground">Water saved vs traditional farming</p>
                  <div className="mt-4 flex items-center justify-center text-xs text-blue-600">
                    <TrendingDown className="mr-1 h-3 w-3" />
                    Improved efficiency
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biodiversity Score</CardTitle>
                <CardDescription>Ecosystem health indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">8.5/10</div>
                  <p className="text-sm text-muted-foreground">Biodiversity index</p>
                  <div className="mt-4 flex items-center justify-center text-xs text-purple-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Excellent ecosystem health
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Generate and download detailed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Financial Report</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Sprout className="h-4 w-4" />
              <span>Crop Analysis</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Map className="h-4 w-4" />
              <span>Land Report</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Seasonal Summary</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
