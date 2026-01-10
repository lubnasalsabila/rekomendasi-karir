import { cn } from "@/lib/utils"

const options = [
  { value: 1, label: "1", text: "Strongly Disagree" },
  { value: 2, label: "2", text: "Disagree" },
  { value: 3, label: "3", text: "Neutral" },
  { value: 4, label: "4", text: "Agree" },
  { value: 5, label: "5", text: "Strongly Agree" },
]

export function Option({
  value = null,
  onChange = () => {},
  className = "",
}) {
  return (
    <div
      className={cn(
        "flex w-full justify-between sm:justify-center sm:gap-3",
        className
      )}
    >
      {options.map((opt) => {
        const selected = value === opt.value

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-12 w-12 sm:w-15 sm:h-15 text-xs sm:text-lg rounded-full flex items-center justify-center font-semibold border-2 transition-all",
              "hover:border-primary hover:text-primary",
              selected
                ? "bg-[#206FB7] text-white scale-[1.03] shadow-glow hover:text-white"
                : "border-border"
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
