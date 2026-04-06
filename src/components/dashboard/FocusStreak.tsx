interface StreakDay {
  date: string;
  minutes: number;
  completed: boolean;
}

interface FocusStreakProps {
  currentStreak: number;
  longestStreak: number;
  weekData: StreakDay[];
}

const FocusStreak = ({
  currentStreak,
  longestStreak,
  weekData
}: FocusStreakProps) => {

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <h3 className="text-lg font-semibold">
          Focus Streak
        </h3>

        <div className="flex gap-6">

          <div className="text-center">
            <div className="text-xl font-semibold">
              {currentStreak}
            </div>
            <div className="text-xs text-slate-500 dark:text-gray-400">
              Current
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-semibold">
              {longestStreak}
            </div>
            <div className="text-xs text-slate-500 dark:text-gray-400">
              Longest
            </div>
          </div>

        </div>

      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-2">

        {weekData.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-2 rounded-lg 
            ${
              day.completed
                ? "border border-green-600 bg-green-600/20"
                : "bg-slate-100 dark:bg-slate-800"
            }`}
          >

            <span className="text-xs text-slate-500 dark:text-gray-400">
              {getDayName(day.date)}
            </span>

            <div className="text-lg my-1">
              {day.completed ? "✓" : "-"}
            </div>

            <span className="text-xs">
              {day.minutes}m
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default FocusStreak;
