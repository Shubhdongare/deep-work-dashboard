import React from 'react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  type: 'start' | 'pause' | 'resume' | 'stop' | 'distraction';
  duration?: number;
}

interface MicroTimelineProps {
  events: TimelineEvent[];
  currentTime: string;
}

const MicroTimeline: React.FC<MicroTimelineProps> = ({ events, currentTime }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'start': return '▶️';
      case 'pause': return '⏸️';
      case 'resume': return '▶️';
      case 'stop': return '⏹️';
      case 'distraction': return '⚠️';
      default: return '•';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'start': return 'green';
      case 'pause': return 'yellow';
      case 'resume': return 'blue';
      case 'stop': return 'red';
      case 'distraction': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <div className="micro-timeline">
      <div className="timeline-header">
        <h3>Session Timeline</h3>
        <span className="current-time">{currentTime}</span>
      </div>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className={`timeline-event ${getEventColor(event.type)}`}
            style={{ top: `${(index / (events.length - 1)) * 100}%` }}
          >
            <div className="event-marker">
              {getEventIcon(event.type)}
            </div>
            <div className="event-content">
              <span className="event-time">{event.time}</span>
              <span className="event-title">{event.title}</span>
              {event.duration && (
                <span className="event-duration">{event.duration}m</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicroTimeline;
