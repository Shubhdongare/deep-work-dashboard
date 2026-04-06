import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DeepWorkSession {
  id: string;
  title: string;
  duration: number;
  startTime: string;
  status: "active" | "completed" | "paused";
  focusScore?: number;
}

const loadNumber = (key: string, fallback: number): number => {
  const stored = localStorage.getItem(key);
  return stored ? Number(stored) : fallback;
};

interface DeepWorkState {
  currentSession: DeepWorkSession | null;
  sessions: DeepWorkSession[];
  totalFocusTime: number;
  sessionsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  dailyGoal: number;
  isBreakActive: boolean;
  breaksTaken: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: DeepWorkState = {
  currentSession: null,
  sessions: [],
  totalFocusTime: loadNumber("totalFocusTime", 3600),
  sessionsCompleted: loadNumber("sessionsCompleted", 0),
  currentStreak: 0,
  longestStreak: 0,
  dailyGoal: loadNumber("dailyGoal", 4 * 60 * 60),
  isBreakActive: false,
  breaksTaken: loadNumber("breaksTaken", 0),
  isLoading: false,
  error: null,
};

const deepWorkSlice = createSlice({
  name: "deepWork",
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<DeepWorkSession>) => {
      state.currentSession = action.payload;
      state.sessions.push(action.payload);
    },
    pauseSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = "paused";
      }
    },
    resumeSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = "active";
      }
    },
    stopSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = "completed";
        state.currentSession = null;
      }
    },
    incrementFocusTime: (state, action: PayloadAction<number | undefined>) => {
      const incrementBy = action.payload ?? 1;
      state.totalFocusTime += incrementBy;
      localStorage.setItem("totalFocusTime", state.totalFocusTime.toString());
    },
    incrementSessionsCompleted: (state) => {
      state.sessionsCompleted += 1;
      localStorage.setItem("sessionsCompleted", state.sessionsCompleted.toString());
    },
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
      localStorage.setItem("dailyGoal", action.payload.toString());
    },
    setBreakActive: (state, action: PayloadAction<boolean>) => {
      if (action.payload && !state.isBreakActive) {
        state.breaksTaken += 1;
        localStorage.setItem("breaksTaken", state.breaksTaken.toString());
      }

      state.isBreakActive = action.payload;
    },
    updateFocusScore: (state, action: PayloadAction<number>) => {
      if (state.currentSession) {
        state.currentSession.focusScore = action.payload;
      }
    },
    incrementStreak: (state) => {
      state.currentStreak += 1;
      if (state.currentStreak > state.longestStreak) {
        state.longestStreak = state.currentStreak;
      }
    },
    resetStreak: (state) => {
      state.currentStreak = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  startSession,
  pauseSession,
  resumeSession,
  stopSession,
  incrementFocusTime,
  incrementSessionsCompleted,
  setDailyGoal,
  setBreakActive,
  updateFocusScore,
  incrementStreak,
  resetStreak,
  setLoading,
  setError,
} = deepWorkSlice.actions;

export default deepWorkSlice.reducer;

