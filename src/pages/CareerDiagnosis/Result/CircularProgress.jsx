export default function CircularProgress({
  value = 0,
  maxValue = 245,
}) {
  const radius = 65
  const circumference = 2 * Math.PI * radius

  const percentage = Math.min((value / maxValue) * 100, 100)
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-42 h-42">
      <svg className="w-full h-full -rotate-90">
        {/* background */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth="18"
          className="fill-none stroke-gray-200"
        />

        {/* progress */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth="18"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="fill-none stroke-blue-600 transition-all duration-300"
          strokeLinecap="round"
        />
      </svg>

      {/* text tengah */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs text-gray-500">
          Total Score
        </span>
        <span className="text-xl font-bold text-gray-900">
          {value}
        </span>
      </div>
    </div>
  )
}
