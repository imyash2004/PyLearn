"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, BookOpen, Home, Menu, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import topicsData from "@/content/topics.json"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const currentModule = topicsData.find(topic => pathname.startsWith(`/topics/${topic.module}`))?.module
    if (currentModule && !expandedModules.includes(currentModule)) {
      setExpandedModules(prev => [...prev, currentModule])
    }
  }, [pathname, expandedModules])

  const toggleModule = (module: string) => {
    setExpandedModules((prev) => (prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]))
  }

  // Automatically expand the current topic's lesson list based on the page URL
  useEffect(() => {
    const currentTopic = topicsData.find((topic) => pathname.startsWith(`/topics/${topic.module}`))
    if (currentTopic) {
      setExpandedModules((prev) => [...new Set([...prev, currentTopic.module])])
    }
  }, [pathname, topicsData])

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg group">
          <div className="relative">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:animate-bounce-gentle">
              <span className="text-white text-sm">🐍</span>
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent animate-pulse-slow" />
          </div>
          <span className="gradient-text">PyLearn Kids</span>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          <Button asChild
            variant={pathname === "/" ? "default" : "ghost"}
            className="w-full justify-start hover:bg-sidebar-accent/10"
          >
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>

          <Button asChild
            variant={pathname === "/topics" ? "default" : "ghost"}
            className="w-full justify-start hover:bg-sidebar-accent/10"
          >
            <Link href="/topics">
              <BookOpen className="h-4 w-4 mr-2" />
              All Adventures
            </Link>
          </Button>

          <Separator className="my-4" />

          {topicsData.map((topic, index) => {
            const isExpanded = expandedModules.includes(topic.module)
            const isModuleActive = pathname.startsWith(`/topics/${topic.module}`)

            return (
              <div key={topic.module} className="space-y-1">
                <Button
                  variant={isModuleActive ? "default" : "ghost"}
                  className="w-full justify-start hover:bg-sidebar-accent/10"
                  onClick={() => toggleModule(topic.module)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span className="flex-1 text-left">{topic.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                </Button>

                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {topic.lessons.map((lesson, lessonIndex) => {
                      const lessonPath = `/topics/${topic.module}/${lesson.id}`
                      const isLessonActive = pathname === lessonPath

                      return (
                        <Button asChild
                          key={lesson.id}
                          variant={isLessonActive ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start text-sm hover:bg-sidebar-accent/10"
                        >
                          <Link href={lessonPath}>
                            <div className="flex items-center gap-2 flex-1">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="flex-1 text-left">{lesson.title}</span>
                              <span className="text-xs text-muted-foreground">{lessonIndex + 1}</span>
                            </div>
                          </Link>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="text-2xl mb-2">🏆</div>
          <p className="text-xs text-muted-foreground">Keep going! You're doing great!</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white/90 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={cn("hidden md:flex w-64 border-r border-sidebar-border", className)}>{sidebarContent}</div>
    </>
  )
}
