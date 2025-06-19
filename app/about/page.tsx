"use client"
<<<<<<< HEAD

=======
>>>>>>> e48740014176642e8d514f1c891d2e9d5de7e522
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Users, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/dashboard?user_id=public") // Replace with /api/stats if you add a stats endpoint
        const data = await res.json()
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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Srajan</h1>
          <p className="text-xl text-gray-600 mb-8">
            Empowering landowners to transform unused land into prosperous organic farms through AI-powered guidance and
            sustainable farming practices.
          </p>
          <div className="flex justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To democratize farming knowledge and make organic agriculture accessible to everyone, regardless of their
              farming experience or background.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Sustainable Agriculture</CardTitle>
                <CardDescription>
                  Promoting 100% organic farming practices that protect the environment and improve soil health
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Community Empowerment</CardTitle>
                <CardDescription>
                  Building a community of farmers who support each other and share knowledge for collective growth
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>AI-Powered Solutions</CardTitle>
                <CardDescription>
                  Leveraging artificial intelligence to provide personalized farming guidance and maximize yields
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Srajan was born from a simple observation: millions of people own land but lack the knowledge to turn it
              into productive farms. Traditional farming requires years of experience, but what if technology could
              bridge that gap?
            </p>

            <p className="mb-6">
              Our founders, a team of agricultural scientists and AI engineers, witnessed firsthand how unused land
              could be transformed into thriving organic farms with the right guidance. They realized that combining
              traditional farming wisdom with modern AI could democratize agriculture.
            </p>

            <p className="mb-6">
              Today, Srajan serves thousands of landowners across India, helping them create sustainable income streams
              while contributing to food security and environmental conservation. Every successful harvest brings us
              closer to our vision of a world where anyone can become a farmer.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Real numbers from our growing community of farmers</p>
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

      {/* Team Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability First</h3>
              <p className="text-gray-600">
                Every recommendation we make prioritizes long-term soil health and environmental protection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmer-Centric</h3>
              <p className="text-gray-600">
                Our platform is designed by farmers, for farmers, ensuring practical and actionable guidance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We continuously improve our AI models and recommendations based on real-world results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Land?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of successful farmers who started their journey with Srajan
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
