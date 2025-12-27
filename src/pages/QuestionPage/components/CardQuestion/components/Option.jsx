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
  variant = "horizontal",
  className = ""
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap justify-between",
        "sm:flex-nowrap sm:gap-3 sm:justify-center",
        variant === "vertical" ? " flex-wrap" : "",
        className
      )}
    >
      {options.map((opt) => {
        const selected = value === opt.value;

        if (variant === "vertical") {
          return (
            <div
              key={opt.value}
              className="flex flex-col items-center gap-2 w-12 sm:w-20"
            >
              <button
                type="button"
                className={cn(
                  "h-12 w-12 sm:w-15 sm:h-15 text-xs sm:text-lg rounded-full flex items-center justify-center font-semibold border transition-all bg-muted text-foreground/70 cursor-default"
                )}
              >
                {opt.label}
              </button>

              <span className="text-[10px] sm:text-sm text-gray-600 text-center px-2 leading-tight">
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
              "h-12 w-12 sm:w-15 sm:h-15 text-xs sm:text-lg rounded-full flex items-center justify-center font-semibold border transition-all",
              selected
                ? "bg-[#206FB7] text-white border-blue-700 scale-[1.03]"
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
