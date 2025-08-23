import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Clock } from "lucide-react"
import topicsData from "@/content/topics.json"
import { notFound } from "next/navigation"

interface ModulePageProps {
  params: Promise<{
    module: string
  }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params
  const topic = topicsData.find((t) => t.module === module);

  if (!topic) {
    notFound();
  }

  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/topics">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Topics
            </Button>
          </Link>

          <div
            className={`bg-gradient-to-r ${colorMap[topic.color as keyof typeof colorMap]} text-white rounded-lg p-6 mb-8`}
          >
            <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
            <p className="text-blue-100 mb-4">{topic.description}</p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {topic.lessons.length} lessons
              </Badge>
              <div className="flex items-center gap-1 text-blue-100">
                <Clock className="h-4 w-4" />
                <span className="text-sm">~{topic.lessons.length * 15} minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {topic.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </div>
                  </div>
                  <Link href={`/topics/${module}/${lesson.id}`}>
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Start Lesson
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
