import React from 'react';

interface DeepWorkSession {
  id: string;
  title: string;
  duration: number;
  startTime: string;
  status: 'active' | 'completed' | 'paused';
  focusScore?: number;
}

interface DeepWorkCardProps {
  session: DeepWorkSession;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
}

const DeepWorkCard: React.FC<DeepWorkCardProps> = ({ 
  session, 
  onPause, 
  onResume, 
  onStop 
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={`deep-work-card ${session.status}`}>
      <div className="card-header">
        <h3>{session.title}</h3>
        <span className={`status-badge ${session.status}`}>
          {session.status}
        </span>
      </div>
      <div className="card-body">
        <div className="session-info">
          <div className="info-item">
            <span className="label">Duration</span>
            <span className="value">{formatDuration(session.duration)}</span>
          </div>
          <div className="info-item">
            <span className="label">Started</span>
            <span className="value">{session.startTime}</span>
          </div>
          {session.focusScore !== undefined && (
            <div className="info-item">
              <span className="label">Focus Score</span>
              <span className="value">{session.focusScore}%</span>
            </div>
          )}
        </div>
      </div>
      <div className="card-actions">
        {session.status === 'active' && onPause && (
          <button onClick={onPause} className="btn-secondary">Pause</button>
        )}
        {session.status === 'paused' && onResume && (
          <button onClick={onResume} className="btn-primary">Resume</button>
        )}
        {(session.status === 'active' || session.status === 'paused') && onStop && (
          <button onClick={onStop} className="btn-danger">Stop</button>
        )}
      </div>
    </div>
  );
};

export default DeepWorkCard;
