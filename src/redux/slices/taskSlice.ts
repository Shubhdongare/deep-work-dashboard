import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskStatus, TaskPriority, CreateTaskInput, UpdateTaskInput, TaskFilter, TaskSort } from '../../types/task.types';

export interface DailyTask extends Task {
  date: string;
  completedAt?: string;
}

export interface DailyReview {
  id: string;
  date: string;
  tasksCompleted: number;
  tasksTotal: number;
  focusTime: number;
  productivityScore: number;
  notes: string;
  createdAt: string;
}

export interface WeeklyReview {
  id: string;
  weekStart: string;
  weekEnd: string;
  dailyReviews: DailyReview[];
  totalTasksCompleted: number;
  totalTasks: number;
  totalFocusTime: number;
  averageProductivityScore: number;
  highlights: string[];
  improvements: string[];
  nextWeekGoals: string[];
  createdAt: string;
}

interface TaskState {
  tasks: DailyTask[];
  dailyReviews: DailyReview[];
  weeklyReviews: WeeklyReview[];
  selectedTask: DailyTask | null;
  isLoading: boolean;
  error: string | null;
  filter: TaskFilter;
  sort: TaskSort;
  currentDate: string;
}

const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const initialState: TaskState = {
  tasks: [],
  dailyReviews: [],
  weeklyReviews: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  filter: {},
  sort: { field: 'createdAt', order: 'desc' },
  currentDate: getTodayDate(),
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<DailyTask[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<CreateTaskInput>) => {
      const newTask: DailyTask = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description,
        status: 'pending',
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate,
        estimatedDuration: action.payload.estimatedDuration,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: action.payload.tags,
        date: state.currentDate,
      };
      state.tasks.push(newTask);
      
      // Save to localStorage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: UpdateTaskInput }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        };
        
        // Save to localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    selectTask: (state, action: PayloadAction<DailyTask | null>) => {
      state.selectedTask = action.payload;
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
        
        if (action.payload.status === 'completed') {
          task.completedAt = new Date().toISOString();
        }
        
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setFilter: (state, action: PayloadAction<Partial<TaskFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: (state) => {
      state.filter = {};
    },
    setSort: (state, action: PayloadAction<TaskSort>) => {
      state.sort = action.payload;
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    loadTasksFromStorage: (state) => {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        state.tasks = JSON.parse(stored);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addDailyReview: (state, action: PayloadAction<Omit<DailyReview, 'id' | 'createdAt'>>) => {
      const newReview: DailyReview = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.dailyReviews.push(newReview);
      localStorage.setItem('dailyReviews', JSON.stringify(state.dailyReviews));
    },
    updateDailyReview: (state, action: PayloadAction<{ id: string; updates: Partial<DailyReview> }>) => {
      const index = state.dailyReviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.dailyReviews[index] = {
          ...state.dailyReviews[index],
          ...action.payload.updates,
        };
        localStorage.setItem('dailyReviews', JSON.stringify(state.dailyReviews));
      }
    },
    loadDailyReviewsFromStorage: (state) => {
      const stored = localStorage.getItem('dailyReviews');
      if (stored) {
        state.dailyReviews = JSON.parse(stored);
      }
    },
    addWeeklyReview: (state, action: PayloadAction<Omit<WeeklyReview, 'id' | 'createdAt'>>) => {
      const newReview: WeeklyReview = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.weeklyReviews.push(newReview);
      localStorage.setItem('weeklyReviews', JSON.stringify(state.weeklyReviews));
    },
    updateWeeklyReview: (state, action: PayloadAction<{ id: string; updates: Partial<WeeklyReview> }>) => {
      const index = state.weeklyReviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.weeklyReviews[index] = {
          ...state.weeklyReviews[index],
          ...action.payload.updates,
        };
        localStorage.setItem('weeklyReviews', JSON.stringify(state.weeklyReviews));
      }
    },
    loadWeeklyReviewsFromStorage: (state) => {
      const stored = localStorage.getItem('weeklyReviews');
      if (stored) {
        state.weeklyReviews = JSON.parse(stored);
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  selectTask,
  updateTaskStatus,
  setFilter,
  clearFilter,
  setSort,
  setCurrentDate,
  loadTasksFromStorage,
  setLoading,
  setError,
  addDailyReview,
  updateDailyReview,
  loadDailyReviewsFromStorage,
  addWeeklyReview,
  updateWeeklyReview,
  loadWeeklyReviewsFromStorage,
} = taskSlice.actions;

export default taskSlice.reducer;
