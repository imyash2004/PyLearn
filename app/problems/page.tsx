import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Clock, ChevronDown } from "lucide-react"
import Link from "next/link"

const problems = [
  {
    id: 1,
    title: "Hello World",
    description: 'Write a program that prints "Hello, World!" to the console.',
    category: "Basics",
    difficulty: "beginner",
    estimatedTime: "~15min",
  },
  {
    id: 2,
    title: "Simple Calculator",
    description:
      "Create a simple calculator that takes two numbers and an operation (+, -, *, /) and returns the result.",
    category: "Basics",
    difficulty: "beginner",
    estimatedTime: "~15min",
  },
  {
    id: 3,
    title: "Even or Odd",
    description: "Write a program that determines if a given number is even or odd.",
    category: "Conditionals",
    difficulty: "beginner",
    estimatedTime: "~15min",
  },
  {
    id: 4,
    title: "Grade Calculator",
    description: "Create a program that calculates letter grades based on numerical scores.",
    category: "Conditionals",
    difficulty: "beginner",
    estimatedTime: "~20min",
  },
  {
    id: 5,
    title: "Sum of Numbers",
    description: "Write a program that calculates the sum of numbers from 1 to n using a loop.",
    category: "Loops",
    difficulty: "beginner",
    estimatedTime: "~20min",
  },
  {
    id: 6,
    title: "Count Vowels",
    description: "Create a program that counts the number of vowels in a given string.",
    category: "Strings",
    difficulty: "beginner",
    estimatedTime: "~25min",
  },
]

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Problems</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strengthen your Python skills by solving coding challenges. Each problem includes test cases and instant
            feedback.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-blue-600">10</CardTitle>
              <CardDescription className="text-sm font-medium">Total Problems</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-green-600">0</CardTitle>
              <CardDescription className="text-sm font-medium">Problems Solved</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-orange-600">0%</CardTitle>
              <CardDescription className="text-sm font-medium">Success Rate</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ChevronDown className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Problems</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="unsolved">Unsolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="basics">Basics</SelectItem>
                  <SelectItem value="conditionals">Conditionals</SelectItem>
                  <SelectItem value="loops">Loops</SelectItem>
                  <SelectItem value="strings">Strings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <Card key={problem.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-gray-500" />
                  <Badge variant="secondary" className="text-xs">
                    {problem.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold">{problem.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2">{problem.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs text-green-700 border-green-200 bg-green-50">
                    {problem.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {problem.estimatedTime}
                  </div>
                </div>
                <Link href={`/problems/${problem.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Code className="h-4 w-4 mr-2" />
                    Solve Problem
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
