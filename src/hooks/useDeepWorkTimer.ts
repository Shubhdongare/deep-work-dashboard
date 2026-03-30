import { useState, useEffect, useRef } from "react";

export const useDeepWorkTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const stop = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return {
    seconds,
    isRunning,
    isBreak,
    start,
    pause,
    stop,
    setIsBreak
  };
};