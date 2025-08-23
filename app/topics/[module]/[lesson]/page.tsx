import { notFound } from "next/navigation"
import { LessonContent } from "@/components/lesson-content"
import topicsData from "@/content/topics.json"
import path from "path"
import fs from "fs"
import matter from "gray-matter"

export const runtime = "nodejs"

interface LessonPageProps {
  params: Promise<{
    module: string
    lesson: string
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { module, lesson: lessonId } = await params
  const topic = topicsData.find((t) => t.module === module)
  const lesson = topic?.lessons.find((l) => l.id === lessonId)

  if (!topic || !lesson) {
    notFound()
  }

  // Load markdown content directly on the server
  const filePath = path.join(process.cwd(), "content", module, `${lessonId}.md`)
  if (!fs.existsSync(filePath)) {
    notFound()
  }
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data: frontmatter, content } = matter(fileContent)

  // Build headings for TOC (h1-h3)
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: Array<{ id: string; text: string; level: number }> = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[^\w\s]/g, "").trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    headings.push({ id, text, level })
  }

  const initialData = {
    frontmatter: {
      title: frontmatter.title ?? lesson.title,
      difficulty: frontmatter.difficulty ?? "Beginner",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    },
    content,
    headings,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LessonContent module={module} lesson={lessonId} initialData={initialData} />
    </div>
  )
}
