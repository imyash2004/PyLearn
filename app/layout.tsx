import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "PyLearn - Learn Python Programming",
  description:
    "Master Python programming with interactive tutorials, hands-on practice problems, and an integrated online compiler.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-geist-sans: ${GeistSans.style.fontFamily};
            --font-geist-mono: ${GeistMono.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
