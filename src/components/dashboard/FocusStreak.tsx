import React from 'react';

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

const FocusStreak: React.FC<FocusStreakProps> = ({ 
  currentStreak, 
  longestStreak, 
  weekData 
}) => {
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="focus-streak">
      <div className="streak-header">
        <h3>Focus Streak</h3>
        <div className="streak-stats">
          <div className="streak-stat">
            <span className="value">{currentStreak}</span>
            <span className="label">Current</span>
          </div>
          <div className="streak-stat">
            <span className="value">{longestStreak}</span>
            <span className="label">Longest</span>
          </div>
        </div>
      </div>
      <div className="streak-week">
        {weekData.map((day, index) => (
          <div 
            key={index} 
            className={`streak-day ${day.completed ? 'completed' : ''}`}
          >
            <span className="day-name">{getDayName(day.date)}</span>
            <div className="day-indicator">
              {day.completed && <span className="checkmark">✓</span>}
            </div>
            <span className="day-minutes">{day.minutes}m</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusStreak;
