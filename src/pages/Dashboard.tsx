import { useEffect, useMemo, useState } from "react";
import StatsCards from "../components/dashboard/StatsCards";
import DeepWorkCard from "../components/dashboard/DeepWorkCard";
import FocusStreak from "../components/dashboard/FocusStreak";
import MicroTimeline from "../components/dashboard/MicroTimeline";
import BreakManager from "../components/dashboard/BreakManager";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";
import {
  addTask as addTaskAction,
  deleteTask as deleteTaskAction,
  loadTasksFromStorage,
  updateTaskStatus,
} from "../redux/slices/taskSlice";
import {
  incrementFocusTime,
  incrementSessionsCompleted,
  pauseSession,
  resumeSession,
  setBreakActive,
  setDailyGoal,
  stopSession,
} from "../redux/slices/deepWorkSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { tasks, currentDate } = useAppSelector((state: RootState) => state.tasks);
  const { dailyGoal, totalFocusTime, sessionsCompleted, isBreakActive, breaksTaken } =
    useAppSelector((state: RootState) => state.deepWork);

  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(dailyGoal / 3600);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState(30);

  useEffect(() => {
    dispatch(loadTasksFromStorage());
  }, [dispatch]);

  useEffect(() => {
    setGoalInput(dailyGoal / 3600);
  }, [dailyGoal]);

  const progress = Math.min((totalFocusTime / dailyGoal) * 100, 100);

  const todayTasks = useMemo(
    () => tasks.filter((task) => task.date === currentDate),
    [currentDate, tasks]
  );

  const addTask = () => {
    if (!taskTitle.trim()) return;

    dispatch(
      addTaskAction({
        title: taskTitle.trim(),
        estimatedDuration: taskDuration,
      })
    );
    setTaskTitle("");
  };

  const toggleTaskComplete = (id: string) => {
    const task = todayTasks.find((item) => item.id === id);
    if (!task) return;

    dispatch(
      updateTaskStatus({
        id,
        status: task.status === "completed" ? "pending" : "completed",
      })
    );
  };

  const deleteTask = (id: string) => {
    dispatch(deleteTaskAction(id));
  };

  const stats = [
    {
      label: "Total Focus Time",
      value: `${Math.floor(totalFocusTime / 60)}m`,
      icon: "Time",
    },
    {
      label: "Sessions Completed",
      value: sessionsCompleted,
      icon: "Done",
    },
    {
      label: "Focus Score",
      value: "87%",
      icon: "Score",
    },
    {
      label: "Breaks Taken",
      value: breaksTaken,
      icon: "Break",
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

  return (
    <div className="min-h-full bg-slate-100 p-6 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Daily Goal</h3>

            <div className="flex items-center gap-2">
              {isEditingGoal ? (
                <>
                  <input
                    type="number"
                    value={goalInput}
                    min={1}
                    onChange={(e) => setGoalInput(Number(e.target.value))}
                    className="w-16 rounded border border-slate-200 bg-white px-2 py-1 text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />

                  <button
                    onClick={() => {
                      dispatch(setDailyGoal(goalInput * 3600));
                      setIsEditingGoal(false);
                    }}
                    className="rounded bg-green-600 px-2 py-1"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm text-slate-500 dark:text-gray-400">
                    {Math.floor(totalFocusTime / 3600)}h{" "}
                    {Math.floor((totalFocusTime % 3600) / 60)}m / {dailyGoal / 3600}h
                  </span>

                  <button
                    onClick={() => setIsEditingGoal(true)}
                    className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Daily Tasks</h3>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-lg font-semibold">Add Daily Task</h3>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Task name"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="flex-1 rounded border border-slate-200 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <input
                  type="number"
                  value={taskDuration}
                  min={5}
                  onChange={(e) => setTaskDuration(Number(e.target.value))}
                  className="w-24 rounded border border-slate-200 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <button onClick={addTask} className="rounded bg-blue-600 px-4 py-2">
                  Add
                </button>
              </div>
            </div>

            {todayTasks.map((task) => (
              <DeepWorkCard
                key={task.id}
                session={{
                  id: task.id,
                  title: task.title,
                  duration: task.estimatedDuration ?? 30,
                  startTime: task.status === "completed" ? "Completed" : "Not started",
                  status: task.status === "completed" ? "completed" : "pending",
                }}
                onComplete={() => toggleTaskComplete(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>

          <div className="mt-6 h-3 w-full rounded bg-slate-200 dark:bg-slate-800">
            <div
              className="h-3 rounded bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
          <StatsCards stats={stats} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DeepWorkCard
            session={currentSession}
            onPause={() => dispatch(pauseSession())}
            onResume={() => dispatch(resumeSession())}
            onStop={() => dispatch(stopSession())}
            onBreak={() => dispatch(setBreakActive(true))}
            onTick={() => dispatch(incrementFocusTime(1))}
            onComplete={() => dispatch(incrementSessionsCompleted())}
          />

          <FocusStreak currentStreak={5} longestStreak={12} weekData={weekData} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {isBreakActive && (
            <BreakManager onClose={() => dispatch(setBreakActive(false))} />
          )}

          <MicroTimeline events={timelineEvents} currentTime="10:45 AM" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

