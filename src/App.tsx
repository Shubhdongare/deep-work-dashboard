import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useAppSelector } from './redux/hooks';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import DailyTasks from './pages/tasks/DailyTasks';
import DailyReview from './pages/reviews/DailyReview';
import WeeklyReview from './pages/reviews/WeeklyReview';

import './styles/globals.css';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/signin" 
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<DailyTasks />} />
        <Route path="daily-review" element={<DailyReview />} />
        <Route path="weekly-review" element={<WeeklyReview />} />
        <Route path="settings" element={<div className="p-6 text-white">Settings coming soon...</div>} />
      </Route>
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
