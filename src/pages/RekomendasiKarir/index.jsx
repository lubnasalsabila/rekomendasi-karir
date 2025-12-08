import CardQuestion from "./components/CardQuestion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress"
import { Option } from "./components/CardQuestion/components/Option";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { CardSection } from "./components/CardSection";

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
        <div className="text-center flex flex-col items-center sm:py-8">
            <div className="w-full max-w-sm p-4 md:max-w-2xl sm:max-w-xl flex flex-col gap-3 md:gap-6">

                <div className="flex justify-between mb-1">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        {answeredCount}/{TOTAL} Question
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

                <Option variant="vertical" className="max-w-[300px] mx-auto sm:max-w-full"/>

                <div className="flex flex-col items-center gap-2">
                    
                    <Card className="w-full max-w-xl bg-[#206FB7] p-4 ">
                        <CardHeader className="items-center gap-0">
                            <CardTitle className="text-sm sm:text-lg text-white font-bold ">Section 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit</CardTitle>
                        </CardHeader>
                    </Card>
                    
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
                            w-full mt-6 text-white max-w-lg sm:max-w-xl
                            ${allFilled ? "bg-[#206FB7] hover:bg-blue-500" : "bg-gray-400"}
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
