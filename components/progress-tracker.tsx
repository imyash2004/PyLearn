"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, CheckCircle } from "lucide-react"
import topicsData from "@/content/topics.json"

interface ProgressData {
  completedLessons: string[]
  currentStreak: number
  totalPoints: number
  badges: string[]
}

export function ProgressTracker() {
  const [progress, setProgress] = useState<ProgressData>({
    completedLessons: [],
    currentStreak: 0,
    totalPoints: 0,
    badges: [],
  })

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("pylearn-progress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const totalLessons = topicsData.reduce((total, topic) => total + topic.lessons.length, 0)
  const completionPercentage = Math.round((progress.completedLessons.length / totalLessons) * 100)

  const getTopicProgress = (moduleId: string) => {
    const topic = topicsData.find((t) => t.module === moduleId)
    if (!topic) return 0

    const completedInTopic = progress.completedLessons.filter((lessonId) =>
      topic.lessons.some((lesson) => `${moduleId}/${lesson.id}` === lessonId),
    ).length

    return Math.round((completedInTopic / topic.lessons.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm text-muted-foreground">
                  {progress.completedLessons.length}/{totalLessons} lessons
                </span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">{completionPercentage}% complete</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">{progress.totalPoints}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">{progress.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-emerald-600">{progress.badges.length}</p>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Topic Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topicsData.map((topic) => {
              const topicProgress = getTopicProgress(topic.module)
              return (
                <div key={topic.module}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{topic.title}</span>
                    <Badge variant={topicProgress === 100 ? "default" : "outline"}>{topicProgress}%</Badge>
                  </div>
                  <Progress value={topicProgress} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
