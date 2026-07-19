import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Check, Settings, Shield, Sliders, Calendar, 
  Trash2, Award, Clock, ArrowLeft, Plus, Minus, AlertCircle, RefreshCw 
} from 'lucide-react';
import { QuizAttempt, ParentSettings, Grade } from '../types';
import { mathTopics } from '../data/curriculum';

interface ParentDashboardProps {
  settings: ParentSettings;
  history: QuizAttempt[];
  onUpdateSettings: (newSettings: ParentSettings) => void;
  onClearHistory: () => void;
  onClose: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  settings,
  history,
  onUpdateSettings,
  onClearHistory,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [isSettingNewPin, setIsSettingNewPin] = useState(!settings.parentPin);
  const [newPin1, setNewPin1] = useState('');
  const [newPin2, setNewPin2] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Adult math gate fallback
  const [adultGateNum1] = useState(() => Math.floor(Math.random() * 6) + 6); // 6-11
  const [adultGateNum2] = useState(() => Math.floor(Math.random() * 5) + 5); // 5-9
  const [adultGateInput, setAdultGateInput] = useState('');
  const [showGateFallback, setShowGateFallback] = useState(false);

  // Authenticate PIN
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.parentPin) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect PIN! Try again or use the math gate below.');
    }
  };

  // Set New PIN
  const handleSetNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin1.length !== 4 || isNaN(Number(newPin1))) {
      setAuthError('PIN must be 4 digits!');
      return;
    }
    if (newPin1 !== newPin2) {
      setAuthError('PINs do not match!');
      return;
    }

    onUpdateSettings({
      ...settings,
      parentPin: newPin1
    });
    setIsSettingNewPin(false);
    setIsAuthenticated(true);
    setAuthError('');
  };

  // Math Gate Verification
  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAns = adultGateNum1 * adultGateNum2;
    if (parseInt(adultGateInput) === correctAns) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect answer! Are you sure you are a parent?');
    }
  };

  // Calculate statistics
  const totalQuizzes = history.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(history.reduce((sum, q) => sum + q.score, 0) / totalQuizzes) 
    : 0;
  
  // Calculate average accuracy by grade
  const gradeStats = Object.values(Grade).reduce((acc, grade) => {
    const gradeHistory = history.filter(h => h.grade === grade);
    if (gradeHistory.length > 0) {
      acc[grade] = Math.round(gradeHistory.reduce((sum, q) => sum + q.score, 0) / gradeHistory.length);
    } else {
      acc[grade] = 0;
    }
    return acc;
  }, {} as Record<Grade, number>);

  // Render Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div id="parent-lock-screen" className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-800">Parents Control Lock</h3>
          <p className="text-xs text-slate-400 font-bold leading-tight">
            Please enter your parent credentials to access progress analytics and settings.
          </p>
        </div>

        {authError && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs font-bold text-rose-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {isSettingNewPin ? (
          // Initialize New Pin Code
          <form onSubmit={handleSetNewPin} className="space-y-4">
            <div className="space-y-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-xs font-black text-slate-600 block">Setup Parent Passcode (4 Digits)</span>
              <p className="text-[10px] text-slate-400 font-bold">This passcode prevents students from changing targets or bypassing limits.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Enter 4-Digit PIN</label>
                <input 
                  type="password" 
                  maxLength={4}
                  value={newPin1}
                  onChange={(e) => setNewPin1(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 text-center py-2.5 rounded-xl text-lg font-black tracking-widest text-slate-800 focus:outline-indigo-500"
                  placeholder="••••"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Confirm PIN</label>
                <input 
                  type="password" 
                  maxLength={4}
                  value={newPin2}
                  onChange={(e) => setNewPin2(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 text-center py-2.5 rounded-xl text-lg font-black tracking-widest text-slate-800 focus:outline-indigo-500"
                  placeholder="••••"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer"
            >
              Save Passcode & Login
            </button>
          </form>
        ) : (
          // Authenticate Pin Input
          <div className="space-y-4">
            {!showGateFallback ? (
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div className="space-y-2">
                  <input 
                    type="password" 
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 text-center py-3 rounded-2xl text-2xl font-black tracking-widest text-slate-800 focus:outline-indigo-500"
                    placeholder="••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer"
                >
                  Verify Passcode
                </button>
                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => setShowGateFallback(true)}
                    className="text-[11px] font-bold text-indigo-500 hover:underline"
                  >
                    Forgot passcode? Use standard math validation.
                  </button>
                </div>
              </form>
            ) : (
              // Standard Adult math gate bypass
              <form onSubmit={handleGateSubmit} className="space-y-4">
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center space-y-2">
                  <span className="text-xs font-black text-amber-800 block uppercase">Adult Gate Fallback</span>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">Solve this equation to bypass passcode validation.</p>
                  <div className="text-xl font-extrabold text-slate-800">
                    What is {adultGateNum1} × {adultGateNum2}?
                  </div>
                </div>
                <div>
                  <input 
                    type="text" 
                    value={adultGateInput}
                    onChange={(e) => setAdultGateInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 text-center py-2.5 rounded-xl text-lg font-black text-slate-800 focus:outline-indigo-500"
                    placeholder="Write answer"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGateFallback(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-black rounded-xl hover:bg-slate-50"
                  >
                    Back to PIN
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition"
                  >
                    Submit Answer
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="text-xs font-black text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="parent-dashboard-panel" className="space-y-6">
      
      {/* Header bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Parental Controls
          </span>
          <h2 className="text-xl font-black text-slate-800 mt-1">Parents Command Portal</h2>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black rounded-xl transition flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Exit Portal
        </button>
      </div>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wide">Quizzes Taken</span>
          <span className="block text-4xl font-black text-indigo-600">{totalQuizzes}</span>
          <p className="text-[10px] text-slate-400 font-bold leading-normal">Chapters completed total</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wide">Average Score</span>
          <span className="block text-4xl font-black text-emerald-500">{averageScore}%</span>
          <p className="text-[10px] text-slate-400 font-bold leading-normal">Overall accuracy rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wide">Daily Target Goal</span>
          <span className="block text-4xl font-black text-amber-500">{settings.dailyQuestionTarget}</span>
          <p className="text-[10px] text-slate-400 font-bold leading-normal">Completed questions target</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Custom Progress SVG Graph */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <Sliders className="text-indigo-500 w-5 h-5" /> Score Performance History
          </h3>
          <p className="text-xs text-slate-400 font-bold">Chronological scoring performance across the last few quiz attempts.</p>
          
          <div className="h-48 bg-slate-50 rounded-2xl border border-slate-100 flex items-end justify-around p-4 relative pt-10">
            {history.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-bold italic">
                No quiz histories recorded yet. Complete quizzes to populate graph.
              </div>
            ) : (
              <>
                {/* Visual guidelines */}
                <div className="absolute left-0 right-0 top-10 border-t border-slate-200/50" />
                <div className="absolute left-0 right-0 top-24 border-t border-slate-200/50" />
                <div className="absolute left-0 right-0 top-36 border-t border-slate-200/50" />
                
                <span className="absolute left-3 top-2 text-[8px] font-black text-slate-400 uppercase tracking-wider">Perfect 100%</span>
                <span className="absolute left-3 top-[88px] text-[8px] font-black text-slate-400 uppercase tracking-wider">Average 50%</span>

                {history.slice(-8).map((attempt, idx) => {
                  const barHeightPercent = attempt.score; // 0 to 100
                  return (
                    <div key={idx} className="flex flex-col items-center space-y-2 z-10 w-8">
                      <div className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100 shadow-xs">
                        {attempt.score}%
                      </div>
                      <div className="w-4 bg-slate-200 rounded-t-md h-24 flex items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${barHeightPercent}%` }}
                          className={`w-full rounded-t-md ${
                            attempt.score >= 80 ? 'bg-emerald-400' : attempt.score >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                          }`}
                        />
                      </div>
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block truncate max-w-[32px]">
                        {attempt.grade}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Configurations Panel */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <Settings className="text-indigo-500 w-5 h-5" /> Target Settings & Rules
          </h3>

          <div className="space-y-4">
            {/* Daily Target Slider */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-700">
                <span>Daily Math Target (Questions)</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">{settings.dailyQuestionTarget} qns</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onUpdateSettings({ ...settings, dailyQuestionTarget: Math.max(5, settings.dailyQuestionTarget - 5) })}
                  className="p-1 bg-white hover:bg-slate-200 rounded text-slate-700 border border-slate-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  step="5"
                  value={settings.dailyQuestionTarget} 
                  onChange={(e) => onUpdateSettings({ ...settings, dailyQuestionTarget: parseInt(e.target.value) })}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <button 
                  onClick={() => onUpdateSettings({ ...settings, dailyQuestionTarget: Math.min(50, settings.dailyQuestionTarget + 5) })}
                  className="p-1 bg-white hover:bg-slate-200 rounded text-slate-700 border border-slate-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Session Time Limits */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-700">
                <span>Screen Break Alert (Minutes)</span>
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">{settings.screenTimeLimitMinutes} mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onUpdateSettings({ ...settings, screenTimeLimitMinutes: Math.max(10, settings.screenTimeLimitMinutes - 5) })}
                  className="p-1 bg-white hover:bg-slate-200 rounded text-slate-700 border border-slate-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input 
                  type="range" 
                  min="10" 
                  max="60" 
                  step="5"
                  value={settings.screenTimeLimitMinutes} 
                  onChange={(e) => onUpdateSettings({ ...settings, screenTimeLimitMinutes: parseInt(e.target.value) })}
                  className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <button 
                  onClick={() => onUpdateSettings({ ...settings, screenTimeLimitMinutes: Math.min(60, settings.screenTimeLimitMinutes + 5) })}
                  className="p-1 bg-white hover:bg-slate-200 rounded text-slate-700 border border-slate-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Multiplier selector */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <span className="block text-xs font-black text-slate-700 mb-1">Concept Difficulty Multiplier</span>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => onUpdateSettings({ ...settings, difficultyMultiplier: diff })}
                    className={`flex-1 py-1.5 text-xs font-black capitalize rounded-lg transition ${
                      settings.difficultyMultiplier === diff ? 'bg-indigo-500 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enabled Syllabus topics control */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Shield className="text-indigo-500 w-5 h-5" /> Curriculum Controller
        </h3>
        <p className="text-xs text-slate-400 font-bold">Uncheck topics that you want to hide or restrict from your student's learning queue.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {mathTopics.map((topic) => {
            const isDisabled = settings.disabledTopics[topic.id];
            return (
              <div 
                key={topic.id} 
                onClick={() => {
                  const updatedDisabled = { ...settings.disabledTopics };
                  if (isDisabled) {
                    delete updatedDisabled[topic.id];
                  } else {
                    updatedDisabled[topic.id] = true;
                  }
                  onUpdateSettings({ ...settings, disabledTopics: updatedDisabled });
                }}
                className={`p-3 rounded-xl border transition-all duration-250 flex items-center justify-between cursor-pointer select-none ${
                  isDisabled 
                    ? 'border-slate-200 bg-slate-50 opacity-60' 
                    : 'border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30'
                }`}
              >
                <div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-black px-1.5 py-0.5 rounded uppercase">
                    {topic.grade}
                  </span>
                  <h4 className="text-xs font-black text-slate-800 mt-1">{topic.title}</h4>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 ${
                  isDisabled ? 'border-slate-300 bg-white' : 'border-indigo-500 bg-indigo-500 text-white'
                }`}>
                  {!isDisabled && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log Sheet */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <Calendar className="text-indigo-500 w-5 h-5" /> Activity Log History
            </h3>
            <p className="text-xs text-slate-400 font-bold">Comprehensive list of completed math chapters, dates, and precision scores.</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all quiz attempt statistics? This cannot be undone.')) {
                  onClearHistory();
                }
              }}
              className="px-3 py-1.5 text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 border border-rose-100 rounded-lg hover:bg-rose-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Logs
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          {history.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 font-bold italic">
              Student has not completed any quizzes yet. Take chapter quizzes to view scorecards here!
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="py-2.5">Date & Time</th>
                  <th className="py-2.5">Grade</th>
                  <th className="py-2.5">Chapter Topic</th>
                  <th className="py-2.5">Accuracy Score</th>
                  <th className="py-2.5">Results</th>
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().map((attempt) => {
                  const dateStr = new Date(attempt.date).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  const topic = mathTopics.find(t => t.id === attempt.topic);

                  return (
                    <tr key={attempt.id} className="border-b border-slate-50 text-xs font-bold text-slate-700">
                      <td className="py-3 flex items-center gap-1 text-slate-400 font-mono">
                        <Clock className="w-3 h-3" /> {dateStr}
                      </td>
                      <td className="py-3">
                        <span className="bg-slate-100 text-slate-700 font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                          {attempt.grade}
                        </span>
                      </td>
                      <td className="py-3 text-slate-800 font-extrabold">{topic?.title || attempt.topic}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          attempt.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                          attempt.score >= 50 ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {attempt.score}%
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 font-mono">
                        {attempt.correctAnswers} / {attempt.totalQuestions} correct
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};
