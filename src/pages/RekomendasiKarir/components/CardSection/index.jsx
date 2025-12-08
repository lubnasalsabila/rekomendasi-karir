import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardSection () {
    return (
        <Card>
            <CardHeader className="px-0">
                <CardTitle className="text-lg sm:text-xl bg-[#206FB7] text-white font-bold ">Section 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit</CardTitle>
            </CardHeader>
        </Card>
    )
}