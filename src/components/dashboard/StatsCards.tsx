interface StatCard {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800"
        >
          {/* Icon */}
          {stat.icon && (
            <div className="text-xl mb-2">{stat.icon}</div>
          )}

          {/* Value */}
          <div className="text-2xl font-semibold">
            {stat.value}
          </div>

          {/* Label */}
          <div className="text-sm text-gray-400">
            {stat.label}
          </div>

          {/* Change */}
          {stat.change !== undefined && (
            <div
              className={`text-sm mt-2 ${
                stat.change >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stat.change >= 0 ? "+" : ""}
              {stat.change}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;