import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Play, TrendingUp, Flame } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Learn <span className="text-blue-600">Python</span> Programming
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master Python programming with interactive tutorials, hands-on practice problems, and an integrated online
            compiler. Start your coding journey today!
          </p>
        </div>

        {/* Welcome Back Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Welcome back, Python Learner!</CardTitle>
                <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                  <span>0 solved</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>0 tutorials completed</span>
                <div className="flex items-center gap-1">
                  <span>0 day streak</span>
                  <Flame className="h-4 w-4 text-orange-500" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Link href="/topics">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link href="/problems">
                  <Button variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Practice Problems
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose PyLearn Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PyLearn?</h2>
            <p className="text-lg text-gray-600">
              Our platform provides everything you need to master Python programming
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Interactive Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn Python step-by-step with comprehensive tutorials and real-world examples.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Practice Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Solve coding challenges to reinforce your learning and build confidence.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Online Compiler</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Write and run Python code directly in your browser with instant feedback.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Monitor your learning journey and celebrate your achievements.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
