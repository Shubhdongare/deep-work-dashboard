import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState, LoginCredentials, RegisterCredentials } from '../../types/auth.types';

const loadUserFromStorage = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  isLoading: false,
  error: null,
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const login = ({ email, password }: LoginCredentials) => {
  return (dispatch: any) => {
    dispatch(loginStart());
    
    // Simulate API call - replace with actual API later
    setTimeout(() => {
      const storedUsers = localStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const user = users.find(u => u.email === email);
      
      if (user) {
        const storedPassword = localStorage.getItem(`password_${user.id}`);
        if (storedPassword === password) {
          dispatch(loginSuccess(user));
        } else {
          dispatch(loginFailure('Invalid password'));
        }
      } else {
        dispatch(loginFailure('User not found'));
      }
    }, 500);
  };
};

export const register = ({ email, password, displayName }: RegisterCredentials) => {
  return (dispatch: any) => {
    dispatch(registerStart());
    
    // Simulate API call - replace with actual API later
    setTimeout(() => {
      const storedUsers = localStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        dispatch(registerFailure('Email already exists'));
        return;
      }
      
      const newUser: User = {
        id: generateId(),
        email,
        displayName,
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem(`password_${newUser.id}`, password);
      
      dispatch(registerSuccess(newUser));
    }, 500);
  };
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
