import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  addDailyReview, 
  loadDailyReviewsFromStorage,
  loadTasksFromStorage 
} from '../../redux/slices/taskSlice';

const DailyReview = () => {
  const dispatch = useAppDispatch();
  const { tasks, dailyReviews, currentDate } = useAppSelector((state) => state.tasks);
  
  const [notes, setNotes] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [todayReview, setTodayReview] = useState<typeof dailyReviews[0] | null>(null);

  useEffect(() => {
    dispatch(loadTasksFromStorage());
    dispatch(loadDailyReviewsFromStorage());
  }, [dispatch]);

  const todayTasks = tasks.filter(task => task.date === currentDate);
  const completedTasks = todayTasks.filter(t => t.status === 'completed').length;
  const totalTasks = todayTasks.length;

  const tasksCompleted = completedTasks;
  const tasksTotal = totalTasks;
  const focusTime = 0;
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  useEffect(() => {
    const existingReview = dailyReviews.find(r => r.date === currentDate);
    setTodayReview(existingReview || null);
    if (existingReview) {
      setNotes(existingReview.notes);
    }
  }, [currentDate, dailyReviews]);

  const handleSaveReview = () => {
    if (todayReview) {
      dispatch(addDailyReview({
        date: currentDate,
        tasksCompleted,
        tasksTotal,
        focusTime,
        productivityScore,
        notes,
      }));
    } else {
      dispatch(addDailyReview({
        date: currentDate,
        tasksCompleted,
        tasksTotal,
        focusTime,
        productivityScore,
        notes,
      }));
    }
    setShowReviewForm(false);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Daily Review</h1>
          <p className="text-slate-400 mt-1">{formatDate(currentDate)}</p>
        </div>
        {todayReview ? (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
            Reviewed
          </span>
        ) : (
          <button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Review
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm">Tasks Completed</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {completedTasks}<span className="text-lg text-slate-500">/{totalTasks}</span>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm">Focus Time</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {focusTime}<span className="text-lg text-slate-500"> min</span>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-slate-400 text-sm">Productivity</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {productivityScore}<span className="text-lg text-slate-500">%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Daily Progress</span>
          <span className="text-white font-medium">{productivityScore}%</span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${productivityScore}%` }}
          />
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Today's Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you accomplish today? What could have been better?"
            rows={4}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none mb-4"
          />
          <div className="flex justify-end gap-2">
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

      {/* Existing Review Display */}
      {todayReview && !showReviewForm && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Today's Notes</h2>
          <p className="text-slate-300 whitespace-pre-wrap">
            {todayReview.notes || 'No notes added yet.'}
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
          >
            Edit Notes
          </button>
        </div>
      )}

      {/* Recent Reviews */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Reviews</h2>
        <div className="space-y-3">
          {dailyReviews.slice(-5).reverse().map((review) => (
            <div
              key={review.id}
              className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl"
            >
              <div>
                <p className="text-white font-medium">{formatDate(review.date)}</p>
                <p className="text-sm text-slate-400">
                  {review.tasksCompleted}/{review.tasksTotal} tasks • {review.productivityScore}% productivity
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                  {review.productivityScore}%
                </span>
              </div>
            </div>
          ))}
          {dailyReviews.length === 0 && (
            <p className="text-slate-500 text-center py-8">No reviews yet. Start your first daily review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReview;
