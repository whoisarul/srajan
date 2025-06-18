import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bug, Leaf, Search, Sprout } from "lucide-react"

export default function OrganicSolutions() {
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
            {/* Neem Oil Solution */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Neem Oil Solution</CardTitle>
                  <Badge className="bg-green-600">Natural</Badge>
                </div>
                <CardDescription>For aphids, mites, and whiteflies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Bug className="h-5 w-5 text-red-500" />
                    <span className="text-sm">Controls: Aphids, Mites, Whiteflies</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>2 tablespoons neem oil</li>
                      <li>1 teaspoon liquid soap</li>
                      <li>1 liter water</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                    <p className="text-sm">
                      Mix all ingredients in a spray bottle. Apply to affected plants early morning or evening, covering
                      both sides of leaves.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Garlic Spray */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Garlic Spray</CardTitle>
                  <Badge className="bg-green-600">Natural</Badge>
                </div>
                <CardDescription>For beetles, caterpillars, and borers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Bug className="h-5 w-5 text-red-500" />
                    <span className="text-sm">Controls: Beetles, Caterpillars, Borers</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>10 garlic cloves</li>
                      <li>1 onion</li>
                      <li>1 teaspoon cayenne pepper</li>
                      <li>1 liter water</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                    <p className="text-sm">
                      Blend garlic and onion with water. Strain and add cayenne pepper. Spray on affected areas.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Turmeric Paste */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Turmeric Paste</CardTitle>
                  <Badge className="bg-green-600">Natural</Badge>
                </div>
                <CardDescription>For fungal infections and diseases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">Treats: Fungal infections, Leaf spots</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>2 tablespoons turmeric powder</li>
                      <li>1 tablespoon mustard oil</li>
                      <li>Water as needed</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                    <p className="text-sm">
                      Mix turmeric with oil to form a paste. Apply directly to affected areas or dilute with water for
                      spraying.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fertilizers" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Compost Tea */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Compost Tea</CardTitle>
                  <Badge className="bg-blue-600">Liquid</Badge>
                </div>
                <CardDescription>Rich in nutrients and beneficial microbes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Provides: NPK, Micronutrients</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>2 cups mature compost</li>
                      <li>10 liters water</li>
                      <li>1 tablespoon molasses (optional)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                    <p className="text-sm">
                      Steep compost in water for 24-48 hours. Strain and dilute 1:10 before applying to plants.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Banana Peel Fertilizer */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Banana Peel Fertilizer</CardTitle>
                  <Badge className="bg-yellow-600">Potassium Rich</Badge>
                </div>
                <CardDescription>High in potassium for flowering plants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Rich in: Potassium, Phosphorus</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>5-6 banana peels</li>
                      <li>2 liters water</li>
                      <li>1 week fermentation time</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                    <p className="text-sm">
                      Chop banana peels and soak in water for 1 week. Strain and dilute 1:5 before use.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cow Dung Manure */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Cow Dung Manure</CardTitle>
                  <Badge className="bg-brown-600">Organic</Badge>
                </div>
                <CardDescription>Complete organic fertilizer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Provides: Complete nutrition</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Fresh cow dung</li>
                      <li>Dry leaves/straw</li>
                      <li>Water for moisture</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Instructions:</h4>
                    <p className="text-sm">
                      Mix cow dung with dry organic matter. Compost for 3-4 months, turning regularly.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="soil-health" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Biochar */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Biochar</CardTitle>
                  <Badge className="bg-gray-600">Soil Amendment</Badge>
                </div>
                <CardDescription>Improves soil structure and water retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-brown-500" />
                    <span className="text-sm">Improves: Water retention, Soil structure</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Materials:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Agricultural waste</li>
                      <li>Wood chips</li>
                      <li>Controlled burning setup</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Process:</h4>
                    <p className="text-sm">
                      Burn organic matter in low-oxygen environment to create charcoal. Mix with compost before
                      application.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Process
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vermicompost */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Vermicompost</CardTitle>
                  <Badge className="bg-green-600">Worm Casting</Badge>
                </div>
                <CardDescription>Nutrient-rich worm castings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Rich in: NPK, Micronutrients</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Requirements:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Earthworms (Red wigglers)</li>
                      <li>Organic kitchen waste</li>
                      <li>Bedding material</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Process:</h4>
                    <p className="text-sm">
                      Set up worm bins with bedding. Add kitchen scraps regularly. Harvest castings after 3-6 months.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Setup Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Green Manure */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Green Manure</CardTitle>
                  <Badge className="bg-green-600">Cover Crop</Badge>
                </div>
                <CardDescription>Living mulch and soil improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Adds: Nitrogen, Organic matter</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Suitable Plants:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Legumes (beans, peas)</li>
                      <li>Mustard</li>
                      <li>Sunhemp</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Method:</h4>
                    <p className="text-sm">
                      Plant cover crops during off-season. Till into soil before flowering for maximum benefit.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Planting Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
