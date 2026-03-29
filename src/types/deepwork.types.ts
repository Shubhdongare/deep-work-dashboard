export interface DeepWorkSession {
  id: string;
  title: string;
  description?: string;
  duration: number;
  startTime: string;
  endTime?: string;
  status: SessionStatus;
  focusScore?: number;
  distractions?: Distraction[];
  breaks?: Break[];
  tags?: string[];
  taskId?: string;
  createdAt: string;
  updatedAt: string;
}

export type SessionStatus = 'active' | 'paused' | 'completed' | 'cancelled';

export interface Distraction {
  id: string;
  timestamp: string;
  type: DistractionType;
  description: string;
  duration: number;
  blocked: boolean;
}

export type DistractionType = 'notification' | 'website' | 'app' | 'thought' | 'other';

export interface Break {
  id: string;
  startTime: string;
  endTime?: string;
  duration: number;
  type: 'short' | 'long';
}

export interface FocusStreak {
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string;
  weekData: StreakDay[];
}

export interface StreakDay {
  date: string;
  minutes: number;
  completed: boolean;
  sessions: number;
}

export interface DeepWorkStats {
  totalSessions: number;
  totalFocusTime: number;
  averageSessionDuration: number;
  averageFocusScore: number;
  totalDistractions: number;
  distractionsBlocked: number;
  mostProductiveHour: number;
  mostProductiveDay: string;
}

export interface SessionGoal {
  id: string;
  title: string;
  targetDuration: number;
  currentDuration: number;
  deadline?: string;
  completed: boolean;
}

export interface CreateSessionInput {
  title: string;
  description?: string;
  targetDuration: number;
  tags?: string[];
  taskId?: string;
}

export interface UpdateSessionInput {
  title?: string;
  description?: string;
  duration?: number;
  focusScore?: number;
  tags?: string[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  type: TimelineEventType;
  duration?: number;
  metadata?: Record<string, unknown>;
}

export type TimelineEventType = 'start' | 'pause' | 'resume' | 'stop' | 'distraction' | 'break' | 'goal_reached';
