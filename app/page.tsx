"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Map, Sprout, LineChart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Plant3D } from "@/components/plant-3d"
import { useEffect, useState } from "react"

export default function Home() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/dashboard?user_id=public") // Replace with /api/stats if you add a stats endpoint
        const data = await res.json()
        // Example: calculate stats from lands, tracking, etc.
        setStats({
          farmers: data.lands ? data.lands.length : 0,
          acres: data.lands ? data.lands.reduce((sum: number, land: any) => sum + (parseFloat(land.size) || 0), 0) : 0,
          income: data.tracking ? data.tracking.reduce((sum: number, t: any) => sum + (t.estimated_earnings || 0), 0) : 0,
          success: 95 // Placeholder, replace with real calculation if available
        })
      } catch (err) {
        setStats(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Turn Your Land into <span className="text-green-600">Prosperity</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                Srajan helps you transform barren or unused land into fertile, income-generating organic farms with
                AI-powered guidance and personalized support.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative h-80 sm:h-96 lg:h-[500px] w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-200/50 to-transparent"></div>
                  <div className="relative w-full h-full p-8">
                    <Plant3D />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-12 right-8 w-2 h-2 bg-yellow-300 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-8 left-4 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How Srajan Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform guides you through every step of the farming process
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Land Analysis</h3>
              <p className="mt-2 text-gray-600">
                Upload photos of your land and soil. Our AI analyzes soil type, moisture, and fertility to recommend
                improvements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Crop Planning</h3>
              <p className="mt-2 text-gray-600">
                Get personalized crop recommendations based on your soil, location, and season for maximum yield and
                profit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Growth Tracking</h3>
              <p className="mt-2 text-gray-600">
                Track your crop's progress, receive daily task notifications, and get organic solutions for any issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Farmers Across India</h2>
            <p className="mt-4 text-lg text-gray-600">Real results from our growing community</p>
          </div>

          {loading ? (
            <div className="text-center">Loading stats...</div>
          ) : !stats ? (
            <div className="text-center text-red-500">Stats unavailable</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stats.farmers}</div>
                <p className="text-gray-600">Active Farmers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.acres}</div>
                <p className="text-gray-600">Acres Transformed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">₹{stats.income}</div>
                <p className="text-gray-600">Farmer Income Generated</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">{stats.success}%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Transform Your Land?</h2>
          <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
            Join thousands of landowners who are turning unused land into productive organic farms.
          </p>
          <div className="mt-10">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-green-600 hover:text-green-700">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Srajan</span>
          </div>
          <div className="mt-6 md:mt-0">
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/about" className="text-gray-600 hover:text-green-600">
                About
              </Link>
              <Link href="/#features" className="text-gray-600 hover:text-green-600">
                Features
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-600">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Srajan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
