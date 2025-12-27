import { useEffect, useState } from "react";
import { getQuestions } from "@/lib/question";
import { saveAnswer } from "@/lib/answer";
import { createResultAnswer } from "@/lib/result";

import CardQuestion from "./components/CardQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Option } from "./components/CardQuestion/components/Option";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PER_PAGE = 5;

const QuestionPage = () => {
  
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [flatQuestions, setFlatQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestions(1, 100);

        const flattened = res.results.flatMap(section =>
          section.questions.map(question => ({
            sectionId: section.id,
            sectionTitle: section.title,
            questionId: question.id,
            questionText: question.questionText,
          }))
        );

        setFlatQuestions(flattened);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const currentQuestions = flatQuestions.slice(start, end);

  const totalPages = Math.ceil(flatQuestions.length / PER_PAGE);
  const answeredCount = Object.keys(answers).length;

  const allFilled = currentQuestions.every(
    q => answers[q.questionId] !== undefined
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);


  return (
    <div className="text-center flex flex-col items-center sm:py-8 bg-[#F9F9F9]">
      <div className="w-full max-w-sm p-4 md:max-w-2xl sm:max-w-xl flex flex-col gap-3 md:gap-6">

        {/* HEADER */}
        <div className="flex justify-between mb-1">
          <p className="text-gray-400 text-xs sm:text-sm">
            {answeredCount}/{flatQuestions.length} Question
          </p>
          <p className="text-[#206FB7] font-semibold text-xs sm:text-sm">
            Page {page} of {totalPages}
          </p>
        </div>

        <Progress
          value={(page / totalPages) * 100}
          className="[&>div]:bg-[#206FB7]"
        />

        <h1 className="text-sm md:text-2xl sm:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h1>

        <Option
          variant="vertical"
          className="max-w-[300px] mx-auto sm:max-w-full"
        />

        {/* QUESTIONS */}
        <div className="flex flex-col items-center gap-2">
          {currentQuestions.map((q, i) => {
            let showSection = false;

            if (i === 0) {
              const prevQuestion = flatQuestions[start - 1];
              showSection = !prevQuestion || prevQuestion.sectionId !== q.sectionId;
            } else {
              showSection = q.sectionId !== currentQuestions[i - 1].sectionId;
            }

            return (
              <div key={q.questionId} className="">
                {showSection && (
                  <Card className="w-full max-w-xl bg-[#206FB7] p-4 mb-3">
                    <CardHeader className="items-center gap-0">
                      <CardTitle className="text-sm sm:text-lg text-white font-bold">
                        Section: {q.sectionTitle}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                )}

                <CardQuestion
                  index={start + i + 1}
                  question={q.questionText}
                  value={answers[q.questionId]}
                  onSelect={async (value) => {
                    setAnswers(prev => ({
                      ...prev,
                      [q.questionId]: value,
                    }));

                    try {
                      const res = await saveAnswer({
                        questionId: q.questionId,
                        pointScale: value,
                        currentPage: page, 
                      });

                      console.log("SAVE ANSWER SUCCESS:", res);
                    } catch (err) {
                      console.error(
                        "FAILED SAVE ANSWER:",
                        err.response?.data || err
                      );
                    }
                  }}
                />

              </div>
            );
          })}

          <Button
            disabled={!allFilled}
            className={ `w-full mt-6 text-white max-w-lg sm:max-w-xl ${allFilled ? "bg-[#206FB7] hover:bg-blue-500" : "bg-gray-400"}` }
            onClick={async () => {
              if (page < totalPages) {
                setPage(page + 1);
                return;
              }

              // FINAL SUBMIT
              try {
                const res = await createResultAnswer();

                const resultId = res.data.id;

                navigate(`/result/${resultId}`);
              } catch (err) {
                console.error(
                  "FAILED CREATE RESULT:",
                  err.response?.data || err
                );
              }
            }}
          >
            {page === totalPages ? "Send" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
