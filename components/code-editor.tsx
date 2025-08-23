"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, RotateCcw, Copy, BookOpen, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

// Monaco Editor dynamic import
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Loading editor...</p>
      </div>
    </div>
  ),
})

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<any>
  }
}

interface CodeExample {
  title: string
  description: string
  code: string
  category: string
}

const codeExamples: CodeExample[] = [
  {
    title: "Hello World",
    description: "Your first Python program!",
    category: "basics",
    code: `# Your first Python program
print("Hello, World!")
print("Welcome to Python programming!")`,
  },
  {
    title: "Variables Fun",
    description: "Learn about storing information",
    category: "basics",
    code: `# Working with variables
name = "Python Learner"
age = 12
favorite_color = "blue"

print(f"Hi, I'm {name}!")
print(f"I'm {age} years old")
print(f"My favorite color is {favorite_color}")`,
  },
  {
    title: "Math Calculator",
    description: "Do some cool math with Python",
    category: "basics",
    code: `# Python as a calculator
num1 = 15
num2 = 7

print(f"{num1} + {num2} = {num1 + num2}")
print(f"{num1} - {num2} = {num1 - num2}")
print(f"{num1} × {num2} = {num1 * num2}")
print(f"{num1} ÷ {num2} = {num1 / num2}")`,
  },
  {
    title: "Fun with Strings",
    description: "Play with text and words",
    category: "strings",
    code: `# String magic
message = "Python is awesome"
name = "Alex"

print(message.upper())
print(message.lower())
print(f"Hello, {name}!")

# Count letters
print(f"The word 'awesome' has {len('awesome')} letters")`,
  },
  {
    title: "Simple Decision",
    description: "Make your program think!",
    category: "control",
    code: `# Making decisions
age = 12

if age >= 13:
    print("You're a teenager!")
elif age >= 10:
    print("You're almost a teenager!")
else:
    print("You're still a kid!")
    
print("Keep learning Python!")`,
  },
  {
    title: "Counting Loop",
    description: "Make Python count for you",
    category: "control",
    code: `# Counting with loops
print("Let's count to 5:")
for i in range(1, 6):
    print(f"Number {i}")

print("\\nLet's count by 2s:")
for i in range(2, 11, 2):
    print(f"Number {i}")`,
  },
  {
    title: "Star Pattern",
    description: "Create beautiful patterns",
    category: "fun",
    code: `# Create a star pattern
print("Star Pattern:")
for i in range(1, 6):
    stars = "⭐" * i
    print(stars)

print("\\nTriangle Pattern:")
for i in range(1, 6):
    spaces = " " * (5 - i)
    stars = "⭐" * i
    print(spaces + stars)`,
  },
  {
    title: "Simple Function",
    description: "Create your own Python function",
    category: "functions",
    code: `# Creating functions
def greet_student(name, grade):
    return f"Hello {name}! Welcome to grade {grade}!"

def calculate_area(length, width):
    area = length * width
    return f"The area is {area} square units"

# Using our functions
print(greet_student("Emma", 7))
print(calculate_area(5, 3))`,
  },
]

type CodeEditorProps = {
  initialCode?: string
  onChange?: (code: string) => void
}

export function CodeEditor({ initialCode, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode ?? `# Welcome to the Python playground!
# Try writing some code and click "Run" to see what happens

print("Hello, Python learner!")
print("Ready to code? Let's go! 🚀")`)

  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [useCloudRunner, setUseCloudRunner] = useState(true)
  const [stdin, setStdin] = useState("")
  const [selectedExample, setSelectedExample] = useState<string>("")
  const { toast } = useToast()
  const pyodideRef = useRef<any>(null)

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        // @ts-ignore
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        })

        // Redirect stdout to capture print statements
        pyodide.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.output = StringIO()
    
    def write(self, text):
        self.output.write(text)
    
    def flush(self):
        pass
    
    def get_output(self):
        return self.output.getvalue()

output_capture = OutputCapture()
sys.stdout = output_capture
        `)

        pyodideRef.current = pyodide
        setPyodideReady(true)
        setOutput("Python is ready! Try running some code.")
      } catch (error) {
        console.error("Failed to load Pyodide:", error)
        setOutput("Error: Failed to load Python interpreter. Please refresh the page.")
      }
    }

    // Load Pyodide script
    if (typeof window !== "undefined" && !window.loadPyodide) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
      script.onload = initPyodide
      document.head.appendChild(script)
    } else if (window.loadPyodide) {
      initPyodide()
    }
  }, [])

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running your code...")

    // Prefer cloud runner; fallback to Pyodide if desired
    if (useCloudRunner) {
      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, stdin, language: "python", version: "3.10.0" }),
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.error || "Run failed")
        }
        setOutput(data.output || data.stdout || "(no output)")
        toast({ title: "Code executed!", description: "Your Python code ran successfully." })
      } catch (err: any) {
        setOutput(`Cloud run error: ${err?.message || String(err)}`)
        toast({ title: "Run error", description: "Could not run code in the cloud. Trying local runner..." })

        // Optional fallback to Pyodide
        if (pyodideReady && pyodideRef.current) {
          try {
            const pyodide = pyodideRef.current
            pyodide.runPython("output_capture.output = StringIO()")
            pyodide.runPython(code)
            const result = pyodide.runPython("output_capture.get_output()")
            setOutput(result || "(no output)")
          } catch (e: any) {
            setOutput(`Local run error: ${e?.message || String(e)}`)
          }
        }
      } finally {
        setIsRunning(false)
      }
      return
    }

    // Local runner path
    if (!pyodideReady || !pyodideRef.current) {
      setOutput("Local Python is still loading. Please wait.")
      setIsRunning(false)
      return
    }
    try {
      const pyodide = pyodideRef.current
      pyodide.runPython("output_capture.output = StringIO()")
      pyodide.runPython(code)
      const result = pyodide.runPython("output_capture.get_output()")
      setOutput(result || "(no output)")
      toast({ title: "Code executed!", description: "Your Python code ran successfully." })
    } catch (e: any) {
      setOutput(`Local run error: ${e?.message || String(e)}`)
      toast({ title: "Code error", description: "Check the output for details.", variant: "destructive" })
    } finally {
      setIsRunning(false)
    }
  }

  const clearCode = () => {
    setCode("")
    setOutput("")
    setSelectedExample("")
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
    })
  }

  const loadExample = (exampleTitle: string) => {
    const example = codeExamples.find((ex) => ex.title === exampleTitle)
    if (example) {
      setCode(example.code)
      setOutput("")
      setSelectedExample(exampleTitle)
      toast({
        title: "Example loaded!",
        description: `Loaded: ${example.title}`,
      })
    }
  }

  const categoryColors = {
    basics: "bg-blue-100 text-blue-800",
    strings: "bg-green-100 text-green-800",
    control: "bg-purple-100 text-purple-800",
    functions: "bg-orange-100 text-orange-800",
    fun: "bg-pink-100 text-pink-800",
  }

  // Keep internal code in sync with external initialCode
  useEffect(() => {
    if (typeof initialCode === "string") {
      setCode(initialCode)
    }
  }, [initialCode])

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🐍</span>
            </div>
            <h3 className="font-semibold text-gray-900">Python Playground</h3>
            {useCloudRunner ? (
              <Badge variant="outline" className="text-green-600 border-green-300">Online</Badge>
            ) : pyodideReady ? (
              <Badge variant="outline" className="text-green-600 border-green-300">Ready</Badge>
            ) : (
              <Badge variant="outline" className="text-orange-600 border-orange-300">Loading...</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyCode}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={clearCode}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Select value={useCloudRunner ? "cloud" : "local"} onValueChange={(v) => setUseCloudRunner(v === "cloud") }>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Runner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">Cloud Runner</SelectItem>
                <SelectItem value="local">Local (Pyodide)</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={runCode}
              disabled={isRunning || (!useCloudRunner && !pyodideReady)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>

        {/* Example Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium">Try an example:</span>
          </div>
          <Select value={selectedExample} onValueChange={loadExample}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose a code example..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(
                codeExamples.reduce(
                  (acc, example) => {
                    if (!acc[example.category]) acc[example.category] = []
                    acc[example.category].push(example)
                    return acc
                  },
                  {} as Record<string, CodeExample[]>,
                ),
              ).map(([category, examples]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {category}
                  </div>
                  {examples.map((example) => (
                    <SelectItem key={example.title} value={example.title}>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${categoryColors[example.category as keyof typeof categoryColors]}`}
                        >
                          {example.category}
                        </Badge>
                        <span>{example.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

  {/* Editor and Output */}
      <div className="flex-1 flex flex-col">
        {/* Code Editor */}
        <div className="flex-1 p-4">
          <MonacoEditor
            height="100%"
            language="python"
            theme="vs-light"
            value={code}
            onChange={(value) => {
              const next = value || ""
              setCode(next)
              onChange?.(next)
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: "on",
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              renderLineHighlight: "line",
              selectOnLineNumbers: true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        {/* Output Section */}
        <div className="border-t bg-gray-50">
          <Card className="rounded-none border-0 bg-transparent">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Output
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <pre className="text-sm font-mono whitespace-pre-wrap bg-white p-4 rounded border min-h-[120px] max-h-[200px] overflow-y-auto">
                {output || "Click 'Run Code' to see the output here..."}
              </pre>
              <div className="mt-2">
                <label className="text-xs text-gray-600">Standard input (optional)</label>
                <textarea
                  className="w-full mt-1 text-sm font-mono bg-white p-2 rounded border min-h-[60px]"
                  placeholder="Enter input that your code reads from input()"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Help Section */}
      <div className="border-t bg-blue-50 p-3">
        <div className="flex items-start gap-2 text-sm">
          <BookOpen className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-blue-800">
            <strong>Quick Tips:</strong> Use <code>print()</code> to display results. Try the examples above to learn
            new concepts!
          </div>
        </div>
      </div>
    </div>
  )
}
