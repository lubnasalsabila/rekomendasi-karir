import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const QuizCard = () => {
    return(
        <>
        <h1>Hello this is card of quiz</h1>
        <Card className="w-full max-w-sm sm:max-w-lg md:max-w-xl sm:px-8 md:px-6 md:gap-4 gap-3 mx-auto">
                <CardHeader className="px-0">
                    <CardTitle className="text-lg sm:text-xl text-[#206FB7]">Question</CardTitle>
                    <CardDescription className="text-xs sm:text-base text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                        <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="default" id="r1" />
                            <h3 htmlFor="r1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <h3 htmlFor="r2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="compact" id="r3" />
                            <h3 htmlFor="r3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                        </div>
                        </RadioGroup>
                </CardContent>
            </Card>
        </>
    )
}
