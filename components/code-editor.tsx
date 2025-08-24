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

type CodeEditorProps = {
  initialCode?: string
  onChange?: (code: string) => void
}

export function CodeEditor({ initialCode, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(
    initialCode ??
      `# Welcome to the Python playground!
# Try writing some code and click "Run" to see what happens

print("Hello, Python learner!")
print("Ready to code? Let's go! 🚀")`,
  )

  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [stdin, setStdin] = useState("")
  const [selectedExample, setSelectedExample] = useState<string>("")
  const { toast } = useToast()

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running your code...")

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
      toast({ title: "Run error", description: "Could not run code in the cloud." })
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

  // Keep internal code in sync with external initialCode
  useEffect(() => {
    if (typeof initialCode === "string") {
      setCode(initialCode)
    }
  }, [initialCode])

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Compact Header */}
      <div className="p-2 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">🐍</span>
            </div>
            <h3 className="font-medium text-gray-900 text-sm">Python Playground</h3>
            <Badge variant="outline" className="text-green-600 border-green-300 text-xs">
              Online
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={copyCode} className="h-7 px-2">
              <Copy className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={clearCode} className="h-7 px-2">
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button size="sm" onClick={runCode} disabled={isRunning} className="bg-green-600 hover:bg-green-700 h-7 px-3">
              <Play className="h-3 w-3 mr-1" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Code Editor */}
        <div className="flex-1 min-h-0">
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
              fontSize: 13,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: "on",
              folding: true,
              lineDecorationsWidth: 8,
              lineNumbersMinChars: 3,
              renderLineHighlight: "line",
              selectOnLineNumbers: true,
              bracketPairColorization: { enabled: true },
              padding: { top: 8, bottom: 8 },
            }}
          />
        </div>

        {/* Compact Output Section */}
        <div className="border-t bg-gray-50">
          <div className="px-3 py-2 border-b bg-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Output</span>
            </div>
          </div>
          <div className="p-3">
            <pre className="text-xs font-mono whitespace-pre-wrap bg-white p-3 rounded border min-h-[80px] max-h-[120px] overflow-y-auto">
              {output || "Click 'Run Code' to see the output here..."}
            </pre>
            <div className="mt-2">
              <label className="text-xs text-gray-600">Standard input (optional)</label>
              <textarea
                className="w-full mt-1 text-xs font-mono bg-white p-2 rounded border min-h-[40px] resize-none"
                placeholder="Enter input that your code reads from input()"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
