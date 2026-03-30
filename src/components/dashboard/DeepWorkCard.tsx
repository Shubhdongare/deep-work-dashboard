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

const DeepWorkCard = ({
  session,
  onPause,
  onResume,
  onStop
}: DeepWorkCardProps) => {

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {session.title}
        </h3>

        <span
          className={`px-2 py-1 text-xs rounded 
          ${
            session.status === "active"
              ? "bg-green-600"
              : session.status === "paused"
              ? "bg-yellow-600"
              : "bg-slate-600"
          }`}
        >
          {session.status}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-400">Duration</span>
          <span>{formatDuration(session.duration)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Started</span>
          <span>{session.startTime}</span>
        </div>

        {session.focusScore !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-400">Focus Score</span>
            <span>{session.focusScore}%</span>
          </div>
        )}

      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">

        {session.status === "active" && onPause && (
          <button
            onClick={onPause}
            className="bg-yellow-600 px-4 py-2 rounded"
          >
            Pause
          </button>
        )}

        {session.status === "paused" && onResume && (
          <button
            onClick={onResume}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Resume
          </button>
        )}

        {(session.status === "active" ||
          session.status === "paused") &&
          onStop && (
            <button
              onClick={onStop}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Stop
            </button>
          )}

      </div>

    </div>
  );
};

export default DeepWorkCard;