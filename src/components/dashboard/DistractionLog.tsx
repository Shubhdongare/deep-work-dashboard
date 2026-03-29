import React from 'react';

interface Distraction {
  id: string;
  timestamp: string;
  type: 'notification' | 'website' | 'app' | 'other';
  description: string;
  duration: number;
  blocked: boolean;
}

interface DistractionLogProps {
  distractions: Distraction[];
  onBlock?: (id: string) => void;
}

const DistractionLog: React.FC<DistractionLogProps> = ({ 
  distractions, 
  onBlock 
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notification': return '🔔';
      case 'website': return '🌐';
      case 'app': return '📱';
      default: return '⚠️';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="distraction-log">
      <div className="log-header">
        <h3>Distraction Log</h3>
        <span className="distraction-count">{distractions.length} today</span>
      </div>
      <div className="log-list">
        {distractions.length === 0 ? (
          <div className="no-distractions">
            <span className="success-icon">✓</span>
            <p>No distractions today! Great focus!</p>
          </div>
        ) : (
          distractions.map((distraction) => (
            <div 
              key={distraction.id} 
              className={`distraction-item ${distraction.blocked ? 'blocked' : ''}`}
            >
              <span className="distraction-icon">
                {getTypeIcon(distraction.type)}
              </span>
              <div className="distraction-info">
                <span className="distraction-description">
                  {distraction.description}
                </span>
                <span className="distraction-time">
                  {formatTime(distraction.timestamp)} • {distraction.duration}s
                </span>
              </div>
              {!distraction.blocked && onBlock && (
                <button 
                  onClick={() => onBlock(distraction.id)} 
                  className="btn-block"
                >
                  Block
                </button>
              )}
              {distraction.blocked && (
                <span className="blocked-badge">Blocked</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DistractionLog;
