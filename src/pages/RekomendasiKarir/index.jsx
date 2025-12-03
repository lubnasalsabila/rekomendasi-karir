import CardQuestion from "./components/CardQuestion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress"
import { Option } from "./components/CardQuestion/components/Option";

const RekomendasiKarir = () => {

    const TOTAL = 10;
    const PER_PAGE = 5;

    const [answers, setAnswers] = useState(Array(TOTAL).fill(null));
    const [page, setPage] = useState(1);

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    const currentQuestions = answers.slice(start, end);
    const answeredCount = answers.filter((a) => a !== null).length;

    const allFilled = currentQuestions.every((a) => a !== null);

    const handleSelect = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[start + index] = value;    
        setAnswers(newAnswers);
    };

    const totalPages = TOTAL / PER_PAGE;
    const isLastPage = page === totalPages;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <div className="text-center flex flex-col items-center py-6 sm:py-8">
            <div className="w-full max-w-sm md:max-w-2xl sm:max-w-xl flex flex-col gap-3 md:gap-6">

                <div className="flex justify-between mb-1">
                    <p className="text-gray-400 text-sm">
                        {answeredCount}/{TOTAL} Question
                    </p>
                    <p className="text-[#206FB7] font-semibold text-sm">
                        Page {page} of {totalPages}
                    </p>
                </div>

                <Progress 
                    value={(page / totalPages) * 100} 
                    className="[&>div]:bg-[#36B54A]"
                />

                <h1 className="text-lg md:text-2xl sm:text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h1>

                <Option variant="vertical"/>

                <div className="flex flex-col items-center gap-2">
                    
                    {currentQuestions.map((ans, i) => (
                        <CardQuestion
                            key={i}
                            value={ans}
                            onSelect={(value) => handleSelect(i, value)}
                        />
                    ))}

                    <Button
                        disabled={!allFilled}
                        className={`
                            w-full mt-6 text-white max-w-xl sm:max-w-lg
                            ${allFilled ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}
                        `}
                        onClick={() => {
                            if (!isLastPage) {
                                setPage(page + 1);
                            } else {
                                alert("Send data!");
                            }
                        }}
                    >
                        {isLastPage ? "Send" : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RekomendasiKarir;
