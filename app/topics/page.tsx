import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Clock, Star, Trophy, Zap } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import topicsData from "@/content/topics.json"

const colorMap = {
  blue: "border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100",
  green: "border-green-200 hover:border-green-300 bg-green-50 hover:bg-green-100",
  purple: "border-purple-200 hover:border-purple-300 bg-purple-50 hover:bg-purple-100",
  orange: "border-orange-200 hover:border-orange-300 bg-orange-50 hover:bg-orange-100",
}

const iconMap = {
  blue: <BookOpen className="h-6 w-6 text-blue-600" />,
  green: <Zap className="h-6 w-6 text-green-600" />,
  purple: <Trophy className="h-6 w-6 text-purple-600" />,
  orange: <Star className="h-6 w-6 text-orange-600" />,
}

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6 hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">Choose Your Adventure!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Pick a topic to start your Python journey. Each adventure is packed with fun lessons and exciting
              challenges!
            </p>

            <div className="max-w-md mx-auto mb-6">
              <SearchBar />
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="text-2xl animate-bounce-gentle">🚀</div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {topicsData.reduce((total, topic) => total + topic.lessons.length, 0)} lessons available
              </Badge>
              <div className="text-2xl animate-wiggle">⭐</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {topicsData.map((topic, index) => (
            <Card
              key={topic.module}
              className={`card-hover border-2 transition-all duration-300 ${colorMap[topic.color as keyof typeof colorMap]}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {iconMap[topic.color as keyof typeof iconMap]}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Level {index + 1}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />~{topic.lessons.length * 15} min
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {topic.lessons.length} lessons
                    </Badge>
                    <Badge variant="outline">Interactive</Badge>
                    <Badge variant="outline">Code Practice</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">What you'll learn:</p>
                    {topic.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {lesson.title}
                      </div>
                    ))}
                    {topic.lessons.length > 3 && (
                      <div className="text-sm text-muted-foreground italic">
                        + {topic.lessons.length - 3} more exciting lessons
                      </div>
                    )}
                  </div>

                  <Link href={`/topics/${topic.module}`} className="block">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      Start Adventure
                      <div className="ml-2 text-lg">🎯</div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <div className="text-4xl mb-4">🌟</div>
              <CardTitle className="text-2xl gradient-text">Ready to Become a Python Hero?</CardTitle>
              <CardDescription className="text-base">
                Every expert was once a beginner. Start with any topic that interests you - there's no wrong choice!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
