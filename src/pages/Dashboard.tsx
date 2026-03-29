import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatsCards from '../components/dashboard/StatsCards';
import DeepWorkCard from '../components/dashboard/DeepWorkCard';
import FocusStreak from '../components/dashboard/FocusStreak';
import DistractionLog from '../components/dashboard/DistractionLog';
import MicroTimeline from '../components/dashboard/MicroTimeline';
import BreakManager from '../components/dashboard/BreakManager';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data
  const stats = [
    { label: 'Total Focus Time', value: '4h 30m', change: 12, icon: '⏱️' },
    { label: 'Sessions Completed', value: '3', change: 5, icon: '✅' },
    { label: 'Focus Score', value: '87%', change: -2, icon: '🎯' },
    { label: 'Distractions Blocked', value: '12', change: 8, icon: '🛡️' }
  ];

  const currentSession = {
    id: '1',
    title: 'Deep Work Session',
    duration: 90,
    startTime: '10:00 AM',
    status: 'active' as const,
    focusScore: 87
  };

  const weekData = [
    { date: '2024-01-01', minutes: 120, completed: true },
    { date: '2024-01-02', minutes: 90, completed: true },
    { date: '2024-01-03', minutes: 0, completed: false },
    { date: '2024-01-04', minutes: 150, completed: true },
    { date: '2024-01-05', minutes: 60, completed: true },
    { date: '2024-01-06', minutes: 180, completed: true },
    { date: '2024-01-07', minutes: 45, completed: false }
  ];

  const distractions = [
    { id: '1', timestamp: '2024-01-07T10:15:00', type: 'notification' as const, description: 'Slack notification', duration: 5, blocked: true },
    { id: '2', timestamp: '2024-01-07T10:30:00', type: 'website' as const, description: 'Twitter', duration: 10, blocked: false },
    { id: '3', timestamp: '2024-01-07T11:00:00', type: 'app' as const, description: 'Email app', duration: 3, blocked: true }
  ];

  const timelineEvents = [
    { id: '1', time: '10:00', title: 'Session Started', type: 'start' as const },
    { id: '2', time: '10:15', title: 'Distraction Blocked', type: 'distraction' as const },
    { id: '3', time: '10:30', title: 'Short Break', type: 'pause' as const, duration: 5 },
    { id: '4', time: '10:35', title: 'Resumed Work', type: 'resume' as const }
  ];

  const handlePause = () => console.log('Pause session');
  const handleStop = () => console.log('Stop session');
  const handleBlockDistraction = (id: string) => console.log('Block distraction:', id);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      <div className="flex-1 flex flex-col">

        <Header 
          title="Dashboard" 
          subtitle="Track your deep work sessions" 
        />

        <div className="p-6 space-y-6">

          <StatsCards stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <DeepWorkCard 
              session={currentSession} 
              onPause={handlePause}
              onStop={handleStop}
            />

            <FocusStreak 
              currentStreak={5} 
              longestStreak={12} 
              weekData={weekData} 
            />

          </div>

          <MicroTimeline 
            events={timelineEvents} 
            currentTime="10:45 AM" 
          />

          <BreakManager />

          <DistractionLog 
            distractions={distractions} 
            onBlock={handleBlockDistraction} 
          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;