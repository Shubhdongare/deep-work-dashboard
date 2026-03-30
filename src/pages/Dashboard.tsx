import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatsCards from "../components/dashboard/StatsCards";
import DeepWorkCard from "../components/dashboard/DeepWorkCard";
import FocusStreak from "../components/dashboard/FocusStreak";
import MicroTimeline from "../components/dashboard/MicroTimeline";
import BreakManager from "../components/dashboard/BreakManager";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [totalFocusTime, setTotalFocusTime] = useState(3600);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(4 * 60 * 60);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(4);

  const progress = Math.min((totalFocusTime / dailyGoal) * 100, 100);

  // Mock data
  const stats = [
    {
      label: "Total Focus Time",
      value: `${Math.floor(totalFocusTime / 60)}m`,
      icon: "⏱️",
    },
    {
      label: "Sessions Completed",
      value: sessionsCompleted,
      icon: "✅",
    },
    {
      label: "Focus Score",
      value: "87%",
      icon: "🎯",
    },
    {
      label: "Breaks Taken",
      value: "0",
      icon: "☕",
    },
  ];

  const currentSession = {
    id: "1",
    title: "Deep Work Session",
    duration: 90,
    startTime: "10:00 AM",
    status: "active" as const,
    focusScore: 87,
  };

  const weekData = [
    { date: "2024-01-01", minutes: 120, completed: true },
    { date: "2024-01-02", minutes: 90, completed: true },
    { date: "2024-01-03", minutes: 0, completed: false },
    { date: "2024-01-04", minutes: 150, completed: true },
    { date: "2024-01-05", minutes: 60, completed: true },
    { date: "2024-01-06", minutes: 180, completed: true },
    { date: "2024-01-07", minutes: 45, completed: false },
  ];

  const timelineEvents = [
    {
      id: "1",
      time: "10:00",
      title: "Session Started",
      type: "start" as const,
    },
    {
      id: "2",
      time: "10:15",
      title: "Distraction Blocked",
      type: "break" as const,
    },
    {
      id: "3",
      time: "10:30",
      title: "Short Break",
      type: "pause" as const,
      duration: 5,
    },
    { id: "4", time: "10:35", title: "Resumed Work", type: "resume" as const },
  ];

  const handlePause = () => console.log("Pause session");
  const handleStop = () => console.log("Stop session");

  useEffect(() => {
    const savedGoal = localStorage.getItem("dailyGoal");

    if (savedGoal) {
      setDailyGoal(Number(savedGoal));
      setGoalInput(Number(savedGoal) / 3600);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title="Dashboard" subtitle="Track your deep work sessions" />

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Daily Goal</h3>

              <div className="flex items-center gap-2">
                {isEditingGoal ? (
                  <>
                    <input
                      type="number"
                      value={goalInput}
                      onChange={(e) => setGoalInput(Number(e.target.value))}
                      className="bg-slate-800 px-2 py-1 rounded w-16"
                    />

                    <button
                      onClick={() => {
                        const newGoal = goalInput * 3600;
                        setDailyGoal(newGoal);
                        localStorage.setItem("dailyGoal", newGoal.toString());
                        setIsEditingGoal(false);
                      }}
                      className="bg-green-600 px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-gray-400">
                      {Math.floor(totalFocusTime / 3600)}h{" "}
                      {Math.floor((totalFocusTime % 3600) / 60)}m /{" "}
                      {dailyGoal / 3600}h
                    </span>

                    <button
                      onClick={() => setIsEditingGoal(true)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✏️
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-800 h-3 rounded">
              {/* THIS IS WHERE YOU ADD IT */}
              <div
                className="bg-green-500 h-3 rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* Stats Cards */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <StatsCards stats={stats} />
          </div>

          {/* Main Grid */}
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DeepWorkCard
              session={currentSession}
              onPause={handlePause}
              onStop={handleStop}
              onBreak={() => setIsBreakActive(true)}
              onTick={() => setTotalFocusTime((prev) => prev + 1)}
              onComplete={() => setSessionsCompleted((prev) => prev + 1)}
            />

            <FocusStreak
              currentStreak={5}
              longestStreak={12}
              weekData={weekData}
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isBreakActive && (
              <BreakManager onClose={() => setIsBreakActive(false)} />
            )}

            <MicroTimeline events={timelineEvents} currentTime="10:45 AM" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
