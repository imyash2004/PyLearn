"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, RotateCcw } from "lucide-react"
import Link from "next/link"
import { CodeEditor } from "@/components/code-editor"

const problems = [
  {
    id: "1",
    title: "Hello World",
    description: 'Write a program that prints "Hello, World!" to the console.',
    category: "Basics",
    difficulty: "beginner",
    estimatedTime: "~15min",
    instructions: `Write a Python program that prints "Hello, World!" to the console.

This is the traditional first program that programmers write when learning a new language.

**Requirements:**
- Use the print() function
- The output should be exactly: Hello, World!`,
    starterCode: `# Write your code here
`,
    solution: `print("Hello, World!")`,
    testCases: [
      {
        input: "",
        expectedOutput: "Hello, World!",
        description: "Should print Hello, World!",
      },
    ],
  },
  {
    id: "2",
    title: "Simple Calculator",
    description:
      "Create a simple calculator that takes two numbers and an operation (+, -, *, /) and returns the result.",
    category: "Basics",
    difficulty: "beginner",
    estimatedTime: "~15min",
    instructions: `Create a simple calculator function that performs basic arithmetic operations.

**Requirements:**
- Create a function called calculate(a, b, operation)
- Support operations: +, -, *, /
- Return the result of the calculation`,
    starterCode: `def calculate(a, b, operation):
    # Write your code here
    pass

# Test your function
result = calculate(10, 5, '+')
print(result)`,
    solution: `def calculate(a, b, operation):
    if operation == '+':
        return a + b
    elif operation == '-':
        return a - b
    elif operation == '*':
        return a * b
    elif operation == '/':
        return a / b
    else:
        return "Invalid operation"

result = calculate(10, 5, '+')
print(result)`,
    testCases: [
      {
        input: "calculate(10, 5, '+')",
        expectedOutput: "15",
        description: "Should add two numbers",
      },
    ],
  },
]

interface ProblemSolverProps {
  params: Promise<{ id: string }>
}

export default function ProblemSolver({ params }: ProblemSolverProps) {
  const { id } = React.use(params)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([])

  const problem = problems.find((p) => p.id === id)

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode)
    }
  }, [problem])

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Problem Not Found</h1>
          <Link href="/problems">
            <Button>Back to Problems</Button>
          </Link>
        </div>
      </div>
    )
  }

  const runCode = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      setOutput("Code executed successfully!")
      setIsRunning(false)
    }, 1000)
  }

  const resetCode = () => {
    setCode(problem.starterCode)
    setOutput("")
    setTestResults([])
  }

  return (
  <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/problems" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{problem.title}</h1>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{problem.category}</Badge>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                  {problem.difficulty}
                </Badge>
                <span className="text-sm text-gray-500">{problem.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{problem.description}</p>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-700">{problem.instructions}</div>
                </div>
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {problem.testCases.map((testCase, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-1">Test Case {index + 1}</div>
                      <div className="text-sm text-gray-600 mb-2">{testCase.description}</div>
                      {testCase.input && (
                        <div className="text-xs text-gray-500 mb-1">
                          Input: <code className="bg-white px-1 rounded">{testCase.input}</code>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Expected: <code className="bg-white px-1 rounded">{testCase.expectedOutput}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            {output && (
              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">{output}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Code Editor</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={resetCode}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button size="sm" onClick={runCode} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </div>

            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <CodeEditor initialCode={code} onChange={setCode} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
