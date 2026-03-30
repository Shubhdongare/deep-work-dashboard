import { useEffect, useState } from "react";

interface DeepWorkSession {
  id: string;
  title: string;
  duration: number;
  startTime: string;
  status: "active" | "completed" | "paused";
  focusScore?: number;
}

interface DeepWorkCardProps {
  session: DeepWorkSession;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onBreak?: () => void;
  onComplete?: () => void;
  onTick?: () => void;
}

const DeepWorkCard = ({
  session,
  onPause,
  onResume,
  onStop,
  onBreak,
  onComplete,
  onTick,
}: DeepWorkCardProps) => {
  const [timeLeft, setTimeLeft] = useState(session.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
 
  useEffect(() => {
  let timer: number;

  if (isRunning && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        onTick?.();
        return prev - 1;
      });
    }, 1000);
  }

  if (timeLeft === 0 && isRunning) {
    setIsRunning(false);
    onComplete?.();
  }

  return () => clearInterval(timer);
}, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatDuration = (minutes: number) => {
    return `${minutes} min`;
  };

  const startSession = () => {
    setIsRunning(true);
  };

  const pauseSession = () => {
    setIsRunning(false);
  };

  const resumeSession = () => {
    setIsRunning(true);
  };

  const stopSession = () => {
    setIsRunning(false);
    setTimeLeft(session.duration * 60);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{session.title}</h3>

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

      {/* Body */}
      <div className="text-3xl font-bold text-center mb-4">
        {formatTime(timeLeft)}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 justify-center">
        {!isRunning && timeLeft === session.duration * 60 && (
          <button
            onClick={startSession}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Start
          </button>
        )}

        {isRunning && (
          <button
            onClick={() => {
              pauseSession();
              onBreak?.();
            }}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Take Break
          </button>
        )}

        {isRunning && (
          <button
            onClick={pauseSession}
            className="bg-yellow-600 px-4 py-2 rounded"
          >
            Pause
          </button>
        )}

        {!isRunning && timeLeft !== session.duration * 60 && (
          <button
            onClick={resumeSession}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Resume
          </button>
        )}

        <button onClick={stopSession} className="bg-red-600 px-4 py-2 rounded">
          Stop
        </button>
      </div>
    </div>
  );
};

export default DeepWorkCard;
