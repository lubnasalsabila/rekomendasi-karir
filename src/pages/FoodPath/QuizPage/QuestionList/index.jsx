import { 
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import check from "../../../../assets/check.svg"

export const QuestionList = ({ index, active, answered, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "w-full p-2 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-primary",
        "border bg-primary/10",

        active && "border-primary border-2",

        answered && "bg-green-600/20"
      )}
    >
      <CardHeader className="p-0 flex items-center gap-2 rounded-xl">
        <CardTitle
          className={cn(
            "bg-card rounded-full transition-all",

            answered ? "p-1 bg-green-600" : "p-3"
          )}
        >
          {answered && <img src={check} alt="check" className="w-5" />}
        </CardTitle>

        <span
          className=
            "text-foreground"
        >
          Question {index + 1}
        </span>
      </CardHeader>
    </Card>
  )
}
