import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export const QuizCard = ({
  selectedAnswer,
  onAnswer,
}) => {
  return (
    <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl mt-6 p-0 md:gap-4 gap-3 border-none shadow-none">
      <CardHeader className="px-0">
        <CardDescription className="text-xs sm:text-base text-foreground">
          <span className="text-primary font-semibold">
            Question 1/15:
          </span>{" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <RadioGroup
          value={selectedAnswer ?? ""}
          onValueChange={(value) => onAnswer(value)}
          className="gap-2"
        >
          {[
            { id: "r1", value: "A", label: "Lorem ipsum dolor sit amet" },
            { id: "r2", value: "B", label: "Consectetur adipiscing elit" },
            { id: "r3", value: "C", label: "Sed do eiusmod tempor" },
          ].map((item) => {
            const isSelected = selectedAnswer === item.value

            return (
              <label
                key={item.id}
                htmlFor={item.id}
                className={cn(
                  "w-full sm:w-md flex items-center gap-3 rounded-2xl py-3 px-4 cursor-pointer transition-colors",
                  "bg-primary/10 border border-transparent hover:border-primary",
                  isSelected && "border-primary bg-primary/20"
                )}
              >
                <RadioGroupItem value={item.value} id={item.id} />

                <h3
                  className={cn(
                    "text-sm sm:text-base transition-colors",
                    isSelected
                      ? "text-primary font-medium"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                </h3>
              </label>
            )
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
