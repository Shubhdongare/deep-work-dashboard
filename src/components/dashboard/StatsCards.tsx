import React from 'react';

interface StatCard {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          {stat.icon && <span className="stat-icon">{stat.icon}</span>}
          <div className="stat-content">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
            {stat.change !== undefined && (
              <span className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
