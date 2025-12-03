import { cn } from "@/lib/utils"

const options = [
  { value: "sd", label: "SD", text: "Strongly Disagree" },
  { value: "d", label: "D", text: "Disagree" },
  { value: "n", label: "N", text: "Neutral" },
  { value: "a", label: "A", text: "Agree" },
  { value: "sa", label: "SA", text: "Strongly Agree" },
]

export function Option({
  value = null,
  onChange = () => {},
  variant = "horizontal",
  className = ""
}) {
  return (
    <div
      className={cn(
        "flex w-full",
        variant === "vertical" ? "justify-center" : "gap-2",
        className
      )}
    >
      {options.map((opt) => {
        const selected = value === opt.value;

        if (variant === "vertical") {
          return (
            <div key={opt.value} className="flex flex-col items-center gap-2">
              <button
                type="button"
                className={cn(
                  "h-15 w-15 sm:w-12 sm:h-12 sm:text-xs rounded-full flex items-center justify-center text-sm font-semibold border transition-all bg-muted text-foreground/70 hover:bg-muted/80"
                )}
              >
                {opt.label}
              </button>

              <span className="text-xs text-gray-600 text-center w-20 leading-tight px-2">
                {opt.text}
              </span>
            </div>
          );
        }

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 h-15 sm:w-12 sm:h-12 sm:text-xs rounded-full flex items-center justify-center text-sm font-semibold border transition-all",
              selected
                ? "bg-[#36B54A] text-white border-green-700 scale-[1.03]"
                : "bg-muted text-foreground/70 hover:bg-muted/80"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
