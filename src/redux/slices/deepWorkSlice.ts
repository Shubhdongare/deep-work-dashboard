import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DeepWorkSession {
  id: string;
  title: string;
  duration: number;
  startTime: string;
  status: 'active' | 'completed' | 'paused';
  focusScore?: number;
}

interface DeepWorkState {
  currentSession: DeepWorkSession | null;
  sessions: DeepWorkSession[];
  totalFocusTime: number;
  currentStreak: number;
  longestStreak: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: DeepWorkState = {
  currentSession: null,
  sessions: [],
  totalFocusTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  isLoading: false,
  error: null,
};

const deepWorkSlice = createSlice({
  name: 'deepWork',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<DeepWorkSession>) => {
      state.currentSession = action.payload;
      state.sessions.push(action.payload);
    },
    pauseSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = 'paused';
      }
    },
    resumeSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = 'active';
      }
    },
    stopSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = 'completed';
        state.totalFocusTime += state.currentSession.duration;
        state.currentSession = null;
      }
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
  updateFocusScore,
  incrementStreak,
  resetStreak,
  setLoading,
  setError,
} = deepWorkSlice.actions;

export default deepWorkSlice.reducer;
