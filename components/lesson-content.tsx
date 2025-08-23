"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, BookOpen, Code2, Maximize2, Minimize2, Award } from "lucide-react"
import Link from "next/link"
import { MarkdownRenderer } from "./markdown-renderer"
// Table of Contents removed
import { CodeEditor } from "./code-editor"
import { InteractiveQuiz } from "./interactive-quiz"
import { useToast } from "@/hooks/use-toast"
import topicsData from "@/content/topics.json"

interface LessonContentProps {
  module: string
  lesson: string
  initialData: LessonData
}

interface LessonData {
  frontmatter: {
    title: string
    difficulty: string
    tags: string[]
  }
  content: string
  headings: Array<{
    id: string
    text: string
    level: number
  }>
}

export function LessonContent({ module, lesson, initialData }: LessonContentProps) {
  const [lessonData, setLessonData] = useState<LessonData>(initialData)
  // TOC removed
  const [editorFullscreen, setEditorFullscreen] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast } = useToast()

  const topic = topicsData.find((t) => t.module === module)
  const currentLesson = topic?.lessons.find((l) => l.id === lesson)
  const currentIndex = topic?.lessons.findIndex((l) => l.id === lesson) ?? -1
  const prevLesson = currentIndex > 0 ? topic?.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < (topic?.lessons.length ?? 0) - 1 ? topic?.lessons[currentIndex + 1] : null

  // Update lesson data when navigating between lessons
  useEffect(() => {
    setLessonData(initialData)
  }, [initialData])

  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem("pylearn-progress") ||
        '{"completedLessons": [], "totalPoints": 0, "currentStreak": 0, "badges": []}',
    )
    const lessonKey = `${module}/${lesson}`
    setHasCompleted(progress.completedLessons.includes(lessonKey))
  }, [module, lesson])

  const markLessonComplete = () => {
    const lessonKey = `${module}/${lesson}`
    const progress = JSON.parse(
      localStorage.getItem("pylearn-progress") ||
        '{"completedLessons": [], "totalPoints": 0, "currentStreak": 0, "badges": []}',
    )

    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey)
      progress.totalPoints += 10
      localStorage.setItem("pylearn-progress", JSON.stringify(progress))
      setHasCompleted(true)

      toast({
        title: "Lesson Complete! 🎉",
        description: "You earned 10 points! Keep up the great work!",
      })
    }
  }

  const sampleQuiz = [
    {
      question: "What does the print() function do in Python?",
      options: [
        "It saves text to a file",
        "It displays text on the screen",
        "It deletes text from memory",
        "It converts text to numbers",
      ],
      correctAnswer: 1,
      explanation:
        "The print() function displays text on the screen. It's one of the most basic and useful functions in Python!",
      hint: "Think about what you see when you run print('Hello, World!')",
    },
    {
      question: "Which of these is a correct way to create a variable in Python?",
      options: ["variable name = 'Python'", "name = 'Python'", "create name = 'Python'", "var name = 'Python'"],
      correctAnswer: 1,
      explanation:
        "In Python, you create variables by simply writing the variable name, followed by =, then the value. No special keywords needed!",
      hint: "Python keeps it simple - no extra words needed!",
    },
  ]

  // With server-provided data, lessonData should always be present

  if (editorFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="h-full flex flex-col">
          <div className="bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Python Code Editor - Fullscreen</h2>
              <Button variant="outline" size="sm" onClick={() => setEditorFullscreen(false)}>
                <Minimize2 className="h-4 w-4 mr-2" />
                Exit Fullscreen
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <CodeEditor />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-50 relative">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-lg hover:bg-gray-50 transition-colors"
      >
        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80`}
      >
        <div className="p-4 border-b border-gray-200 pt-20">
          <Link href="/topics" className="flex items-center text-gray-600 hover:text-gray-900 mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Topics
          </Link>
          <h2 className="text-lg font-semibold text-gray-900">{topic?.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{topic?.description}</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            {topic?.lessons.map((lessonItem, index) => (
              <Link
                key={lessonItem.id}
                href={`/topics/${module}/${lessonItem.id}`}
                className={`block p-3 rounded-lg mb-2 transition-colors ${
                  lessonItem.id === lesson
                    ? "bg-blue-50 border border-blue-200 text-blue-900"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                        lessonItem.id === lesson ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{lessonItem.title}</div>
                      {lessonData.frontmatter.difficulty && (
                        <div className="text-xs text-gray-500 mt-1">{lessonData.frontmatter.difficulty}</div>
                      )}
                    </div>
                  </div>
                  {hasCompleted && lessonItem.id === lesson && <Award className="h-4 w-4 text-green-600" />}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

  <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{lessonData.frontmatter.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Contents button removed */}
              <Button variant="outline" size="sm" onClick={() => setEditorFullscreen(true)}>
                <Code2 className="h-4 w-4 mr-2" />
                Code Editor
              </Button>
              
              {!hasCompleted && (
                <Button size="sm" onClick={markLessonComplete} className="bg-blue-600 hover:bg-blue-700">
                  <Award className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              {hasCompleted && (
                <Badge className="bg-green-600 hover:bg-green-600">
                  <Award className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {lessonData.frontmatter.difficulty}
            </Badge>
            {lessonData.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-gray-300 text-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Lesson Content */}
          <div className="">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-6 bg-white">
                <div className="max-w-3xl">
                  <MarkdownRenderer content={lessonData.content} />
                  {lesson === "introduction" && (
                    <div className="mt-8">
                      <InteractiveQuiz questions={sampleQuiz} title="Test Your Knowledge!" />
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Code Editor - sticky on large screens */}
          <div className="hidden lg:block border-l border-gray-200">
            <div className="sticky top-24 h-[calc(100vh-140px)]">
              <CodeEditor />
            </div>
          </div>
        </div>

  {/* Navigation Footer */}
  <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div>
              {prevLesson && (
                <Link href={`/topics/${module}/${prevLesson.id}`}>
                  <Button variant="outline" className="border-gray-300 bg-transparent">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {prevLesson.title}
                  </Button>
                </Link>
              )}
            </div>
            <div>
              {nextLesson && (
                <Link href={`/topics/${module}/${nextLesson.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    {nextLesson.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

  {/* TOC removed */}
    </div>
  )
}
