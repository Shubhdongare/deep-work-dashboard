import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addWeeklyReview } from '../../redux/slices/taskSlice';

const getWeekDates = (startDate: string): string[] => {
  const start = new Date(startDate);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const WeeklyReview = () => {
  const dispatch = useAppDispatch();
  const { tasks, dailyReviews, weeklyReviews, currentDate } = useAppSelector((state: any) => state.tasks);
  
  const [highlights, setHighlights] = useState('');
  const [improvements, setImprovements] = useState('');
  const [nextWeekGoals, setNextWeekGoals] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const getWeekStart = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekStart = new Date(date.setDate(diff));
    return weekStart.toISOString().split('T')[0];
  };

  const weekStart = getWeekStart(currentDate);
  const weekDates = getWeekDates(weekStart);
  const weekEnd = weekDates[6];

  const weekTasks = tasks.filter((task: any) => weekDates.includes(task.date));
  const completedTasks = weekTasks.filter((t: any) => t.status === 'completed').length;
  const totalTasks = weekTasks.length;

  const weekDailyReviews = dailyReviews.filter((r: any) => weekDates.includes(r.date));
  const totalFocusTime = weekDailyReviews.reduce((sum: any, r: any) => sum + r.focusTime, 0);
  const avgProductivity = weekDailyReviews.length > 0 
    ? Math.round(weekDailyReviews.reduce((sum: any, r: any) => sum + r.productivityScore, 0) / weekDailyReviews.length)
    : 0;

  const formatWeekRange = (): string => {
    const start = new Date(weekStart);
    const end = new Date(weekEnd);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const handleSaveReview = () => {
    dispatch(addWeeklyReview({
      weekStart,
      weekEnd,
      dailyReviews: weekDailyReviews,
      totalTasksCompleted: completedTasks,
      totalTasks,
      totalFocusTime,
      averageProductivityScore: avgProductivity,
      highlights: highlights.split('\n').filter(h => h.trim()),
      improvements: improvements.split('\n').filter(i => i.trim()),
      nextWeekGoals: nextWeekGoals.split('\n').filter(g => g.trim()),
    }));
    setShowReviewForm(false);
    setHighlights('');
    setImprovements('');
    setNextWeekGoals('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Weekly Review</h1>
          <p className="text-slate-400 mt-1">{formatWeekRange()}</p>
        </div>
        <button
          onClick={() => setShowReviewForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Create Review
        </button>
      </div>

      {/* Week Overview */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDates.map((date, index) => {
          const dayTasks = tasks.filter((t: any) => t.date === date);
          const completed = dayTasks.filter((t: any) => t.status === 'completed').length;
          const total = dayTasks.length;
          const isToday = date === new Date().toISOString().split('T')[0];
          
          return (
            <div
              key={date}
              className={`p-3 bg-slate-800/30 border rounded-xl text-center ${
                isToday ? 'border-blue-500/50 bg-blue-500/10' : 'border-slate-700/30'
              }`}
            >
              <div className="text-xs text-slate-500 mb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
              </div>
              <div className={`text-lg font-bold ${isToday ? 'text-blue-400' : 'text-white'}`}>
                {new Date(date).getDate()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {completed}/{total} tasks
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <span className="text-slate-400 text-sm">Tasks Completed</span>
          <div className="text-2xl font-bold text-white mt-1">
            {completedTasks}<span className="text-sm text-slate-500">/{totalTasks}</span>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <span className="text-slate-400 text-sm">Days Reviewed</span>
          <div className="text-2xl font-bold text-white mt-1">
            {weekDailyReviews.length}<span className="text-sm text-slate-500">/7</span>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <span className="text-slate-400 text-sm">Focus Time</span>
          <div className="text-2xl font-bold text-white mt-1">
            {totalFocusTime}<span className="text-sm text-slate-500"> min</span>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <span className="text-slate-400 text-sm">Avg Productivity</span>
          <div className="text-2xl font-bold text-white mt-1">
            {avgProductivity}<span className="text-sm text-slate-500">%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Weekly Completion Rate</span>
          <span className="text-white font-medium">
            {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Weekly Reflection</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Highlights (one per line)
            </label>
            <textarea
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="What went well this week?"
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Improvements (one per line)
            </label>
            <textarea
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="What could be improved?"
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Next Week Goals (one per line)
            </label>
            <textarea
              value={nextWeekGoals}
              onChange={(e) => setNextWeekGoals(e.target.value)}
              placeholder="What do you want to achieve next week?"
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveReview}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Save Review
            </button>
          </div>
        </div>
      )}

      {/* Recent Weekly Reviews */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-white mb-4">Previous Weeks</h2>
        <div className="space-y-3">
          {weeklyReviews.slice(-4).reverse().map((review: any) => (
            <div
              key={review.id}
              className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">
                  {new Date(review.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(review.weekEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                  {review.averageProductivityScore}% avg
                </span>
              </div>
              <div className="flex gap-4 text-sm text-slate-400">
                <span>{review.totalTasksCompleted}/{review.totalTasks} tasks</span>
                <span>{review.totalFocusTime} min focus</span>
              </div>
              {review.highlights.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-green-400">✓ {review.highlights[0]}</span>
                </div>
              )}
            </div>
          ))}
          {weeklyReviews.length === 0 && (
            <p className="text-slate-500 text-center py-8">No weekly reviews yet. Create your first weekly review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyReview;
