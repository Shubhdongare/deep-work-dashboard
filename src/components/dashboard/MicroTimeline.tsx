interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  type: 'start' | 'pause' | 'resume' | 'stop' | 'break';
  duration?: number;
}

interface MicroTimelineProps {
  events: TimelineEvent[];
  currentTime: string;
}

const MicroTimeline = ({ events, currentTime }: MicroTimelineProps) => {

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'start': return '▶️';
      case 'pause': return '⏸️';
      case 'resume': return '▶️';
      case 'stop': return '⏹️';
      case 'break': return '☕';
      default: return '•';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'start': return 'text-green-500';
      case 'pause': return 'text-yellow-500';
      case 'resume': return 'text-blue-500';
      case 'stop': return 'text-red-500';
      case 'break': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Session Timeline
        </h3>

        <span className="text-sm text-gray-400">
          {currentTime}
        </span>
      </div>

      {/* Timeline */}
      <div className="space-y-4">

        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4"
          >

            {/* Icon */}
            <div
              className={`text-xl ${getEventColor(event.type)}`}
            >
              {getEventIcon(event.type)}
            </div>

            {/* Content */}
            <div className="flex-1 flex justify-between">

              <div>
                <div className="text-sm">
                  {event.title}
                </div>

                <div className="text-xs text-gray-400">
                  {event.time}
                </div>
              </div>

              {event.duration && (
                <div className="text-xs text-gray-400">
                  {event.duration}m
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MicroTimeline;