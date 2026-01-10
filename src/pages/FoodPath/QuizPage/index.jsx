import { useState } from "react"
import { QuizCard } from "./QuizCard"
import { QuestionList } from "./QuestionList"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Layout"
import Menu from "../../../assets/menu.svg"

const QuizPage = () => {
  const totalQuestions = 10

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [openQuestionMenu, setOpenQuestionMenu] = useState(false)

  const answeredCount = Object.keys(answers).length
  const isLastQuestion = currentIndex === totalQuestions - 1

  return (
    <Layout idPage="QuizPage">
      <div className="flex flex-col md:flex-row bg-card mx-auto my-6 w-full max-w-sm md:max-w-208 justify-between p-6 md:p-8 rounded-2xl">

        {/* LEFT SECTION */}
        <div className="flex-1 max-w-md">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold">
              FoodPath Quiz
            </h1>

            {/* MENU ICON — MOBILE ONLY */}
            <button
              onClick={() => setOpenQuestionMenu(true)}
              className="md:hidden p-2 rounded-lg bg-gray-400/20 hover:bg-muted transition"
            >
              <img src={Menu} alt="Menu" className="w-6 h-6" />
            </button>
          </div>

          {/* PROGRESS */}
          <div className="flex items-center gap-2 mb-4">
            <Progress
              value={(answeredCount / totalQuestions) * 100}
              className="[&>div]:bg-primary"
            />
            <span className="text-foreground text-sm">
              {Math.round((answeredCount / totalQuestions) * 100)}%
            </span>
          </div>

          {/* QUIZ CARD */}
          <QuizCard
            questionIndex={currentIndex}
            selectedAnswer={answers[currentIndex]}
            onAnswer={(value) =>
              setAnswers((prev) => ({
                ...prev,
                [currentIndex]: value,
              }))
            }
          />

          {/* NAV BUTTONS */}
          <div className="flex gap-3 justify-end mt-7">
            <Button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="shadow-lg shadow-primary/30 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transform hover:-translate-y-0.5 transition-all"
            >
              Previous
            </Button>

            <Button
              disabled={answers[currentIndex] == null}
              onClick={() =>
                isLastQuestion
                  ? console.log("SUBMIT", answers)
                  : setCurrentIndex((i) => i + 1)
              }
              className="shadow-lg shadow-primary/30 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none transform hover:-translate-y-0.5 transition-all"
            >
              {isLastQuestion ? "Submit" : "Next"}
            </Button>
          </div>
        </div>

        {/* QUESTION LIST — DESKTOP ONLY */}
        <div className="hidden md:block w-full max-w-[250px] max-h-[400px] bg-card rounded-2xl overflow-hidden">
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <QuestionList
                key={index}
                index={index + 1}
                active={currentIndex === index}
                answered={!!answers[index]}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* MOBILE QUESTION LIST MODAL */}
        {openQuestionMenu && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenQuestionMenu(false)}
            />

            {/* MODAL */}
            <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs bg-card p-4 rounded-l-2xl shadow-xl flex flex-col">

              <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <QuestionList
                    key={index}
                    index={index + 1}
                    active={currentIndex === index}
                    answered={!!answers[index]}
                    onClick={() => {
                      setCurrentIndex(index)
                      setOpenQuestionMenu(false)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}

export default QuizPage
