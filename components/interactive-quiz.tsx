"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, HelpCircle, Lightbulb } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  hint?: string
}

interface InteractiveQuizProps {
  questions: QuizQuestion[]
  title?: string
}

export function InteractiveQuiz({ questions, title = "Quick Quiz" }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setShowHint(false)
  }

  const isQuizComplete = currentQuestion === questions.length - 1 && showResult
  const currentQ = questions[currentQuestion]

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} / {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {!isQuizComplete ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>

              {currentQ.hint && (
                <div className="mb-4">
                  <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} className="text-xs">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                  {showHint && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">{currentQ.hint}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg border-2 ${
                    selectedAnswer === currentQ.correctAnswer
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-semibold">
                      {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Not quite right"}
                    </span>
                  </div>
                  <p className="text-sm">{currentQ.explanation}</p>
                </div>

                <Button onClick={handleNextQuestion} className="w-full" disabled={selectedAnswer === null}>
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              </div>
            )}

            {!showResult && (
              <Button onClick={handleSubmitAnswer} className="w-full" disabled={selectedAnswer === null}>
                Submit Answer
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">
              {score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🌟" : "👍"}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-lg">
                You scored <span className="font-bold text-primary">{score}</span> out of{" "}
                <span className="font-bold">{questions.length}</span>
              </p>
              <p className="text-muted-foreground mt-2">
                {score === questions.length
                  ? "Perfect! You're a Python superstar!"
                  : score >= questions.length * 0.7
                    ? "Great job! You're getting the hang of this!"
                    : "Good effort! Keep practicing and you'll improve!"}
              </p>
            </div>
            <Button onClick={handleRestartQuiz} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
