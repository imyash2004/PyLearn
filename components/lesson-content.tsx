"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, BookOpen, Code2, Maximize2, Minimize2, Award } from "lucide-react"
import Link from "next/link"
import { InteractiveQuiz } from "./interactive-quiz"
import { useToast } from "@/hooks/use-toast"
import topicsData from "@/content/topics.json"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const MarkdownRenderer = dynamic(() => import("./markdown-renderer").then((mod) => mod.MarkdownRenderer), {
  ssr: false,
  loading: () => (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-full bg-gray-200" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
})

const CodeEditor = dynamic(() => import("./code-editor").then((mod) => mod.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="h-full p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <Skeleton className="h-[calc(100%-4rem)] w-full" />
    </div>
  ),
})

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
          <div className="text-xs text-gray-500 mt-2">
            {topic?.lessons.length} lessons in this topic
          </div>
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
          <div className="flex items-center gap-3 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/topics">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Topics
              </Link>
            </Button>
            <span className="text-gray-400">•</span>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/topics/${module}`}>
                {topic?.title}
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{lessonData.frontmatter.title}</h1>
            </div>
            <div className="flex items-center gap-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          {/* Code Editor - sticky on large screens, full height on mobile */}
          <div className="border-l-0 lg:border-l border-gray-200">
            <div className="lg:sticky lg:top-24 h-[400px] lg:h-[calc(100vh-140px)]">
              <CodeEditor
                initialCode={
                  topic?.lessons.find((l) => l.id === lesson)?.defaultCode ?? "// Select a lesson to see code"
                }
              />
            </div>
          </div>
        </div>

  {/* Navigation Footer */}
  <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div>
              {prevLesson && (
                <Button asChild variant="outline" className="border-gray-300 bg-transparent">
                  <Link href={`/topics/${module}/${prevLesson.id}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {prevLesson.title}
                  </Link>
                </Button>
              )}
            </div>
            <div>
              {nextLesson && (
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href={`/topics/${module}/${nextLesson.id}`}>
                    {nextLesson.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

  {/* TOC removed */}
    </div>
  )
}
