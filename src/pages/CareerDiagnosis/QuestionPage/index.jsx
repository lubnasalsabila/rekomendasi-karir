import { useEffect, useState } from "react";
import { getQuestions } from "@/lib/question";
import { saveAnswer } from "@/lib/answer";
import { createResultAnswer } from "@/lib/result";

import CardQuestion from "./components/CardQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
// import back from "../../../assets/back.png"
import Layout from "../../../components/Layout"


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
    <Layout idPage="QuestionPage">
      <div className="text-center flex flex-col items-center sm:py-8">
        <div className="w-full max-w-sm md:max-w-2xl sm:max-w-xl flex flex-col gap-3 md:gap-6">
          {/* <a href="/" className="text-sm text-blue-600 flex items-center gap-1 mr-auto"><img src={back} alt=""/> Home</a> */}
          <div className="bg-card text-card-foreground rounded-2xl px-8 py-4 shadow-soft">
            <h1 className="font-bold text-start text-foreground text-2xl">Career Diagnosis</h1>
          </div>

          {/* HEADER */}
          <div className="flex flex-col gap-1 md:gap-1">
            <div className="flex justify-between mb-1 text-muted-foreground">
              <p className="text-xs sm:text-sm font-medium">
                {answeredCount}/{flatQuestions.length} Question
              </p>
              <p className="font-semibold text-xs sm:text-sm">
                Page {page} of {totalPages}
              </p>
            </div>
            
            <Progress
              value={(page / totalPages) * 100}
              className="[&>div]:bg-[#206FB7]"
            />
          </div>

          <div className="flex flex-col gap-3 md:gap-6">

            <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-soft">
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed text-foreground">
                  Silakan pilih jawaban yang paling menggambarkan diri Anda sesuai dengan pernyataan di bawah ini. Tidak ada jawaban benar atau salah.
                </h1>

                <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap text-xs md:text-sm text-muted-foreground bg-muted/50 py-4 px-6 rounded-xl">
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center font-bold text-muted-foreground bg-card">
                      1
                    </span>
                    <span className="text-[10px] uppercase tracking-wide font-medium">
                      Strongly Disagree
                    </span>
                  </div>

                  <div className="h-px w-4 md:w-8 bg-border"></div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center font-bold text-muted-foreground bg-card">
                      5
                    </span>
                    <span className="text-[10px] uppercase tracking-wide font-medium">
                      Strongly Agree
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUESTIONS */}
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              {currentQuestions.map((q, i) => {
                let showSection = false;

                if (i === 0) {
                  const prevQuestion = flatQuestions[start - 1];
                  showSection = !prevQuestion || prevQuestion.sectionId !== q.sectionId;
                } else {
                  showSection = q.sectionId !== currentQuestions[i - 1].sectionId;
                }

                return (
                  <div key={q.questionId} className="w-full">
                    {showSection && (
                      <div className="relative mb-8">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-6 bg-primary text-white text-sm font-bold tracking-wider uppercase rounded-full py-2 shadow-glow">
                            {q.sectionTitle}
                          </span>
                        </div>
                      </div>
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
              
              <div className="w-full flex justify-between items-center mt-8">
                {/* PREVIOUS */}
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
                    px-6 py-5 rounded-xl
                    border-border
                    text-muted-foreground
                    hover:bg-accent hover:text-foreground
                    disabled:opacity-50 disabled:pointer-events-none
                    transition-colors
                  "
                >
                  Previous
                </Button>

                {/* NEXT / SEND */}
                <Button
                  disabled={!allFilled}
                  onClick={async () => {
                    if (page < totalPages) {
                      setPage(page + 1);
                      return;
                    }

                    try {
                      const res = await createResultAnswer();
                      navigate(`/result/${res.data.id}`);
                    } catch (err) {
                      console.error("FAILED CREATE RESULT:", err);
                    }
                  }}
                  className="
                    px-8 py-5 rounded-xl
                    bg-primary text-primary-foreground
                    shadow-lg shadow-primary/30
                    hover:bg-primary/90
                    disabled:bg-muted disabled:text-muted-foreground
                    disabled:shadow-none
                    transform hover:-translate-y-0.5
                    transition-all
                  "
                >
                  {page === totalPages ? "Send" : "Next Page"}
                </Button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionPage;
