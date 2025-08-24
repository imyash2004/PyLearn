import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, BookOpen, Flame, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome back, Python Learner! 👋</h1>
          <p className="text-lg text-gray-600">Here's your learning progress and achievements</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                0 <span className="text-sm font-normal text-gray-500">/ 10</span>
              </CardTitle>
              <CardTitle className="text-sm font-medium text-gray-700">Problems Solved</CardTitle>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                0 <span className="text-sm font-normal text-gray-500">/ 4</span>
              </CardTitle>
              <CardTitle className="text-sm font-medium text-gray-700">Tutorials Completed</CardTitle>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">0</CardTitle>
              <CardTitle className="text-sm font-medium text-gray-700">Current Streak</CardTitle>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                0 <span className="text-sm font-normal text-gray-500">/ 100 %</span>
              </CardTitle>
              <CardTitle className="text-sm font-medium text-gray-700">Overall Progress</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-12">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Overall Progress</CardTitle>
                <span className="text-sm font-medium text-blue-600">0% Complete</span>
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
                <div>
                  <span className="font-medium">Tutorials:</span> 0 / 4
                </div>
                <div>
                  <span className="font-medium">Problems:</span> 0 / 10
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                <BookOpen className="h-4 w-4" />
                Next Tutorial
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Python Basics: Variables and Data Types</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn about Python variables, strings, numbers, and basic data types.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/topics/basics/variables">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Tutorial
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Code className="h-4 w-4 text-green-600" />
                </div>
                Practice Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <Code className="h-4 w-4" />
                Recommended Problem
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hello World</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Write a program that prints "Hello, World!" to the console.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline" className="text-xs text-green-700 border-green-200 bg-green-50">
                    beginner
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    basics
                  </Badge>
                </div>
                <Button asChild variant="outline">
                  <Link href="/problems">
                    <Code className="h-4 w-4 mr-2" />
                    Solve Problem
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
