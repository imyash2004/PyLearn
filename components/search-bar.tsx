"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, BookOpen, Code } from "lucide-react"
import Link from "next/link"
import topicsData from "@/content/topics.json"

interface SearchResult {
  type: "topic" | "lesson"
  title: string
  description: string
  module?: string
  lessonId?: string
  tags?: string[]
}

interface SearchBarProps {
  onClose?: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchResults: SearchResult[] = []

    // Search topics
    topicsData.forEach((topic) => {
      if (
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.description.toLowerCase().includes(query.toLowerCase())
      ) {
        searchResults.push({
          type: "topic",
          title: topic.title,
          description: topic.description,
          module: topic.module,
        })
      }

      // Search lessons within topics
      topic.lessons.forEach((lesson) => {
        if (
          lesson.title.toLowerCase().includes(query.toLowerCase()) ||
          lesson.description.toLowerCase().includes(query.toLowerCase())
        ) {
          searchResults.push({
            type: "lesson",
            title: lesson.title,
            description: lesson.description,
            module: topic.module,
            lessonId: lesson.id,
          })
        }
      })
    })

    setResults(searchResults.slice(0, 8)) // Limit to 8 results
    setIsOpen(true)
  }, [query])

  const handleClose = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    onClose?.()
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search lessons and topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-white border-2 border-border focus:border-primary"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-2 border-primary/20 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={
                    result.type === "topic" ? `/topics/${result.module}` : `/topics/${result.module}/${result.lessonId}`
                  }
                  onClick={handleClose}
                >
                  <div className="p-4 hover:bg-muted border-b border-border last:border-b-0 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {result.type === "topic" ? (
                          <BookOpen className="h-4 w-4 text-primary" />
                        ) : (
                          <Code className="h-4 w-4 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isOpen && results.length === 0 && query.length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-2 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">No results found for "{query}"</p>
            <p className="text-sm text-muted-foreground mt-1">Try searching for topics like "variables" or "loops"</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
