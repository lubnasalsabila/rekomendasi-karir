import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Option } from "./components/Option"

const CardQuestion = ({ value, onSelect }) => {
    return(
        <>
            <Card className="w-full max-w-sm sm:max-w-lg md:max-w-xl text-center sm:px-8 md:px-6 md:gap-4 gap-3 shadow-none border-none">
                <CardHeader className="px-0">
                    <CardTitle className="text-lg sm:text-xl text-[#206FB7]">Question </CardTitle>
                    <CardDescription className="text-base text-black">
                    Ut enim ad minima veniam, quis nostrum nisi ut aliquid ex ea commodi consequatur?
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-2
                    sm:flex-row sm:justify-center sm:items-center sm:gap-6">
                    <p className="hidden sm:block text-sm sm:text-base md:text-lg">Disagree</p>
                    <Option
                        value={value}
                        onChange={onSelect}
                        className="w-full sm:w-auto"
                    />

                    <div className="flex justify-between ps-1 pe-3 w-full sm:hidden">
                        <p className="text-sm">Disagree</p>
                        <p className="text-sm">Agree</p>
                    </div>

                    <p className="hidden sm:block text-sm sm:text-base md:text-lg">Agree</p>
                </CardContent>
            </Card>
        </>
    )
}
export default CardQuestion