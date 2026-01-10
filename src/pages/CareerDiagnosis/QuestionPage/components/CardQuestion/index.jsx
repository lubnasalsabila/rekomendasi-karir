import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Option } from "./components/Option"

const CardQuestion = ({ index, question, value, onSelect }) => {
    return(
        <>
            <Card
                className="
                    group relative w-full max-w-sm sm:max-w-xl md:max-w-2xl
                    rounded-2xl
                    bg-card text-card-foreground
                    shadow-soft hover:shadow-lg
                    transition-shadow duration-300
                    overflow-hidden gap-4 border-none"
                >
                {/* Accent bar kiri */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted group-hover:bg-primary transition-colors duration-300"/>

                <CardHeader className="px-6 flex items-center gap-3 mb-3 text-start">
                    <CardTitle className="text-xs font-bold p-2.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-primary">
                        Q{index}
                    </CardTitle>

                    <CardDescription className="text-lg md:text-xl text-foreground font-medium leading-snug">
                        {question}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-center sm:gap-6 px-6 pb-3">
                    <p className="hidden sm:block text-sm sm:text-base text-muted-foreground">
                        Disagree
                    </p>

                    <Option value={value} onChange={onSelect} className="w-full sm:w-auto"/>

                    <div className="flex justify-between w-full sm:hidden text-xs text-muted-foreground">
                        <p>Disagree</p>
                        <p>Agree</p>
                    </div>

                    <p className="hidden sm:block text-sm sm:text-base text-muted-foreground">
                        Agree
                    </p>
                </CardContent>
            </Card>
        </>
    )
}
export default CardQuestion