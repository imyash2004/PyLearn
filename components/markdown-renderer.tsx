"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = content.replace(/\\`/g, "`")

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <div className="my-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <div className="bg-gray-50 text-gray-700 px-4 py-2 text-sm font-medium border-b border-gray-200 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400 mr-3"></span>
                  {match[1]}
                </div>
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  className="!m-0 !bg-white"
                  customStyle={{
                    padding: "1.25rem",
                    margin: 0,
                    background: "white",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border" {...props}>
                {children}
              </code>
            )
          },
          h1({ children, ...props }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <h1
                id={id}
                className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200 scroll-mt-20"
                {...props}
              >
                {children}
              </h1>
            )
          },
          h2({ children, ...props }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <h2 id={id} className="text-xl font-semibold text-gray-900 mt-6 mb-3 scroll-mt-20" {...props}>
                {children}
              </h2>
            )
          },
          h3({ children, ...props }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
            return (
              <h3 id={id} className="text-lg font-semibold text-gray-900 mt-5 mb-2 scroll-mt-20" {...props}>
                {children}
              </h3>
            )
          },
          p({ children, ...props }) {
            return (
              <p className="text-gray-700 leading-relaxed mb-4 text-base" {...props}>
                {children}
              </p>
            )
          },
          ul({ children, ...props }) {
            return (
              <ul className="list-disc ml-5 space-y-1 mb-4 text-gray-700" {...props}>
                {children}
              </ul>
            )
          },
          ol({ children, ...props }) {
            return (
              <ol className="list-decimal ml-5 space-y-1 mb-4 text-gray-700" {...props}>
                {children}
              </ol>
            )
          },
          li({ children, ...props }) {
            return (
              <li className="leading-relaxed" {...props}>
                {children}
              </li>
            )
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg mb-4 italic"
                {...props}
              >
                <div className="text-gray-700">{children}</div>
              </blockquote>
            )
          },
          strong({ children, ...props }) {
            return (
              <strong className="font-semibold text-gray-900" {...props}>
                {children}
              </strong>
            )
          },
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-200 rounded-lg" {...props}>
                  {children}
                </table>
              </div>
            )
          },
          thead({ children, ...props }) {
            return (
              <thead className="bg-gray-50" {...props}>
                {children}
              </thead>
            )
          },
          th({ children, ...props }) {
            return (
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                {...props}
              >
                {children}
              </th>
            )
          },
          td({ children, ...props }) {
            return (
              <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200" {...props}>
                {children}
              </td>
            )
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
