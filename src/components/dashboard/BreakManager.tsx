import { useState, useEffect } from "react";

interface BreakManagerProps {
  onClose: () => void;
}

const BreakManager = ({ onClose }: BreakManagerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedBreak, setSelectedBreak] = useState<number | null>(null);

 useEffect(() => {
  let timer: number;

  if (isRunning && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  }

  // only close when timer actually finished
  if (isRunning && timeLeft === 0) {
    setIsRunning(false);
    onClose();
  }

  return () => clearInterval(timer);
}, [isRunning, timeLeft]);

  const startBreak = () => {
    if (!selectedBreak) return;

    const seconds = selectedBreak * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setIsRunning(true);
  };

  const selectBreak = (minutes: number) => {
    setSelectedBreak(minutes);
    setTimeLeft(minutes * 60);
    setInitialTime(minutes * 60);
  };

  const pauseBreak = () => {
    setIsRunning(false);
  };

  const resumeBreak = () => {
    setIsRunning(true);
  };

  const stopBreak = () => {
    setIsRunning(false);
  };

  const resetBreak = () => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    onClose?.();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Break Manager</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => selectBreak(5)}
          className="bg-blue-600 px-6 py-2 rounded"
        >
          5 min
        </button>

        <button
          onClick={() => selectBreak(10)}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          10 min
        </button>

        <button
          onClick={() => selectBreak(15)}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          15 min
        </button>
      </div>

      <div className="flex gap-3" >
        <button onClick={startBreak} className="bg-green-600 px-8 py-2 rounded">
          Start
        </button>

        {isRunning ? (
          <button onClick={pauseBreak} className="bg-blue-600 px-8 py-2 rounded">
            Pause
          </button>
        ) : (
          <button
            onClick={resumeBreak}
            className="bg-blue-600 px-8 py-2 rounded"
            disabled={timeLeft === 0}
          >
            Resume
          </button>
        )}

        <button onClick={stopBreak} className="bg-yellow-600 px-8 py-2 rounded">
          Stop
        </button>

        <button onClick={resetBreak} className="bg-red-600 px-8 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default BreakManager;
