"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Table of Contents</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {headings.map((heading) => (
            <Button
              key={heading.id}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start text-left h-auto py-2 px-2",
                heading.level === 1 && "font-semibold",
                heading.level === 2 && "ml-2 text-sm",
                heading.level === 3 && "ml-4 text-sm text-gray-600",
              )}
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.text}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
