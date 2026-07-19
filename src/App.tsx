import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Shapes, Grid3X3, X, Divide, PieChart, Percent, 
  Compass, Sparkles, Scale, Variable, Triangle, 
  Award, Flame, Coins, ShieldAlert, BookOpen, Gift, 
  Settings, CheckCircle2, RotateCcw, Volume2, User, 
  ChevronRight, Smile, Sparkle, Heart, Dumbbell 
} from 'lucide-react';
import { MathTopic, StudentProfile, ParentSettings, QuizAttempt, Grade, RewardItem } from './types';
import { mathTopics, rewardCatalog } from './data/curriculum';
import { MathExplainer } from './components/MathExplainer';
import { QuizSystem } from './components/QuizSystem';
import { ParentDashboard } from './components/ParentDashboard';
import { RewardsStore } from './components/RewardsStore';

// Dynamic icon lookup mapper
const IconMap: Record<string, React.ComponentType<any>> = {
  Plus, Shapes, Grid3X3, X, Divide, PieChart, Percent, 
  Compass, Sparkles, Scale, Variable, Triangle
};

// Default setup values
const DEFAULT_PROFILE: StudentProfile = {
  id: 'student_1',
  name: 'Math Champ',
  grade: Grade.P1,
  coins: 60,
  xp: 150,
  streak: 3,
  lastActive: new Date().toISOString(),
  purchasedAvatars: ['🦉'],
  purchasedStickers: [],
  selectedAvatar: '🦉',
  selectedPet: '🐉'
};

const DEFAULT_SETTINGS: ParentSettings = {
  parentPin: '1234',
  dailyQuestionTarget: 10,
  screenTimeLimitMinutes: 20,
  disabledTopics: {},
  difficultyMultiplier: 'medium'
};

export default function App() {
  // Persistence state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('math_explorer_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [settings, setSettings] = useState<ParentSettings>(() => {
    const saved = localStorage.getItem('math_explorer_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [history, setHistory] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('math_explorer_history');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [currentTab, setCurrentTab] = useState<'learn' | 'rewards' | 'parent'>('learn');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [isPlayingQuiz, setIsPlayingQuiz] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  // Screen time limits & Breaks alert system
  const [startTime] = useState(() => Date.now());
  const [screenTimeElapsed, setScreenTimeElapsed] = useState(0);
  const [showBreakOverlay, setShowBreakOverlay] = useState(false);

  // Save profile & settings on change
  useEffect(() => {
    localStorage.setItem('math_explorer_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('math_explorer_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('math_explorer_history', JSON.stringify(history));
  }, [history]);

  // Track session timer for breaks
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedMins = Math.floor((Date.now() - startTime) / 60000);
      setScreenTimeElapsed(elapsedMins);

      if (elapsedMins >= settings.screenTimeLimitMinutes && !showBreakOverlay) {
        setShowBreakOverlay(true);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [startTime, settings.screenTimeLimitMinutes, showBreakOverlay]);

  // Daily target calculator
  const getTodayQuestionCount = () => {
    const todayStr = new Date().toDateString();
    return history
      .filter(item => new Date(item.date).toDateString() === todayStr)
      .reduce((sum, item) => sum + item.correctAnswers, 0);
  };

  const todayCompleted = getTodayQuestionCount();
  const dailyTargetProgress = Math.min(100, (todayCompleted / settings.dailyQuestionTarget) * 100);

  // Purchase Reward Shop Items
  const handlePurchaseItem = (item: RewardItem) => {
    if (profile.coins < item.cost) return;

    const updatedProfile = { ...profile };
    updatedProfile.coins -= item.cost;

    if (item.type === 'avatar') {
      updatedProfile.purchasedAvatars.push(item.value);
    } else if (item.type === 'pet') {
      updatedProfile.purchasedAvatars.push(item.value); // Keep in inventory
      updatedProfile.selectedPet = item.value;
    } else {
      updatedProfile.purchasedStickers.push(item.value);
    }

    setProfile(updatedProfile);
  };

  // Switch avatars/pets
  const handleEquipAvatar = (avatar: string) => {
    setProfile({ ...profile, selectedAvatar: avatar });
  };

  const handleEquipPet = (pet: string) => {
    setProfile({ ...profile, selectedPet: pet });
  };

  // Complete Quiz score calculations
  const handleQuizComplete = (scorePercentage: number, correctAnswers: number, totalQuestions: number) => {
    // Generate reward calculations
    const coinsEarned = correctAnswers * 10 + (scorePercentage === 100 ? 15 : 0); // +10 per correct, +15 perfect score bonus
    const xpGained = correctAnswers * 15;

    // Save quiz attempt
    const newAttempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      date: new Date().toISOString(),
      grade: profile.grade,
      topic: activeTopicId!,
      score: scorePercentage,
      totalQuestions,
      correctAnswers,
      timeSpentSeconds: 45 // mock estimate
    };

    // Calculate streak consistency
    let newStreak = profile.streak;
    const lastActiveDate = new Date(profile.lastActive).toDateString();
    const todayDate = new Date().toDateString();
    
    if (lastActiveDate !== todayDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastActiveDate === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1; // reset streak if missed a day
      }
    }

    setHistory(prev => [...prev, newAttempt]);
    setProfile(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      xp: prev.xp + xpGained,
      streak: newStreak,
      lastActive: new Date().toISOString()
    }));

    setIsPlayingQuiz(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Filter lessons based on parental settings & active grade selection
  const activeSyllabus = mathTopics.filter(
    topic => topic.grade === profile.grade && !settings.disabledTopics[topic.id]
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Friendly top banner */}
      <header className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Student badge combo */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center text-white font-display text-2xl font-black shadow-md shadow-indigo-100">
              ➕
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 font-display leading-tight flex items-center gap-1.5">
                Math Explorer <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-sans font-bold">Primary 1-6</span>
              </h1>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-2xl select-none">{profile.selectedAvatar}</span>
                {showEditName ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={tempName} 
                      onChange={(e) => setTempName(e.target.value)}
                      className="border border-slate-200 rounded px-1.5 py-0.5 text-xs font-bold w-24 text-slate-700"
                    />
                    <button 
                      onClick={() => {
                        if (tempName.trim()) {
                          setProfile({ ...profile, name: tempName.trim() });
                          setShowEditName(false);
                        }
                      }}
                      className="text-[10px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.5 rounded"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setTempName(profile.name);
                      setShowEditName(true);
                    }}
                    className="text-xs font-extrabold text-slate-600 hover:text-indigo-600 flex items-center gap-1"
                  >
                    {profile.name} <span className="text-[9px] text-slate-400 font-normal underline">Edit</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* User Gamification Counters (Streaks, Coins, Level) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center space-x-1.5 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full text-rose-800" title="Daily Learning Streak!">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-300 animate-pulse" />
              <span className="text-xs font-black">{profile.streak} Days</span>
            </div>

            {/* Coins Counter */}
            <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-amber-800">
              <Coins className="w-4 h-4 text-amber-500 fill-amber-300" />
              <span className="text-xs font-black">{profile.coins}</span>
            </div>

            {/* XP Level Counter */}
            <div className="flex items-center space-x-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-indigo-800">
              <Award className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-black">Level {Math.floor(profile.xp / 100) + 1}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main interactive sections wrapper */}
      <main className="max-w-6xl w-full mx-auto px-4 mt-6 flex-grow space-y-6">
        
        {/* Navigation Tabs (Primary student focus) */}
        <div className="flex bg-white p-1 rounded-2xl shadow-xs border border-slate-100 max-w-md mx-auto">
          <button
            onClick={() => { setCurrentTab('learn'); setActiveTopicId(null); setIsPlayingQuiz(false); }}
            className={`flex-1 py-2.5 text-xs font-black capitalize rounded-xl transition flex items-center justify-center gap-1.5 ${currentTab === 'learn' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <BookOpen className="w-4 h-4" /> Lessons
          </button>
          <button
            onClick={() => { setCurrentTab('rewards'); setActiveTopicId(null); setIsPlayingQuiz(false); }}
            className={`flex-1 py-2.5 text-xs font-black capitalize rounded-xl transition flex items-center justify-center gap-1.5 ${currentTab === 'rewards' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Gift className="w-4 h-4" /> Shop & Pets
          </button>
          <button
            onClick={() => { setCurrentTab('parent'); setActiveTopicId(null); setIsPlayingQuiz(false); }}
            className={`flex-1 py-2.5 text-xs font-black capitalize rounded-xl transition flex items-center justify-center gap-1.5 ${currentTab === 'parent' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Settings className="w-4 h-4" /> Parents
          </button>
        </div>

        {/* Daily Target Progress Widget (Always highly visible for encouragement) */}
        {currentTab !== 'parent' && (
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl select-none">🏆</span>
              <div>
                <h4 className="text-sm font-black text-slate-800">Your Daily Math Target Progress</h4>
                <p className="text-xs text-slate-400 font-bold">
                  {todayCompleted >= settings.dailyQuestionTarget 
                    ? '🎉 Target unlocked! Stellar work today!' 
                    : `Complete ${settings.dailyQuestionTarget - todayCompleted} more correct quiz questions to hit target.`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-48">
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                <div 
                  style={{ width: `${dailyTargetProgress}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                />
              </div>
              <span className="text-xs font-black text-amber-700 whitespace-nowrap">
                {todayCompleted} / {settings.dailyQuestionTarget}
              </span>
            </div>
          </div>
        )}

        {/* Dynamic active screen routing */}
        <div className="space-y-6">
          {currentTab === 'learn' && (
            <>
              {!activeTopicId ? (
                // Lessons Board Selection (Primary 1 to 6 Syllabus Selection)
                <div className="space-y-6">
                  {/* Grade pickers */}
                  <div className="space-y-2 text-center">
                    <span className="text-xs font-black uppercase text-indigo-500 tracking-wider">Level Selection</span>
                    <h3 className="text-2xl font-black text-slate-800 font-display">Pick Your Grade Level</h3>
                    
                    {/* Big friendly selectors */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                      {Object.values(Grade).map((gradeVal) => (
                        <button
                          key={gradeVal}
                          onClick={() => setProfile({ ...profile, grade: gradeVal })}
                          className={`py-3 rounded-2xl text-sm font-black transition cursor-pointer ${
                            profile.grade === gradeVal 
                              ? 'bg-indigo-600 text-white shadow-md border-b-4 border-indigo-800 transform -translate-y-0.5' 
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          Grade {gradeVal.substring(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active topics lists */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-base font-black text-slate-800">Your Math Chapters ({profile.grade})</h4>
                    
                    {activeSyllabus.length === 0 ? (
                      <div className="bg-white p-8 rounded-3xl text-center border border-dashed border-slate-200">
                        <span className="text-3xl block">🔒</span>
                        <h5 className="text-sm font-black text-slate-700 mt-2">All topics disabled by parents</h5>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-medium">Please enter Parents Corner settings to toggle chapter availability.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeSyllabus.map((topic) => {
                          const IconComponent = IconMap[topic.icon] || Plus;
                          const isComplete = history.some(h => h.topic === topic.id && h.score >= 80);

                          return (
                            <div 
                              key={topic.id}
                              onClick={() => {
                                setActiveTopicId(topic.id);
                                setIsPlayingQuiz(false);
                              }}
                              className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-indigo-200 transition duration-300 shadow-sm hover:shadow-md cursor-pointer flex justify-between items-center group relative overflow-hidden"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-100 group-hover:scale-110 transition duration-300">
                                  <IconComponent className="w-6 h-6" />
                                </div>
                                <div>
                                  <h5 className="text-base font-black text-slate-800 group-hover:text-indigo-600 transition leading-snug">
                                    {topic.title}
                                  </h5>
                                  <p className="text-xs text-slate-400 font-bold leading-normal mt-1 max-w-[220px] sm:max-w-[320px]">
                                    {topic.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 shrink-0">
                                {isComplete ? (
                                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-full border border-emerald-100 flex items-center gap-1 shadow-xs">
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3px]" /> Complete
                                  </span>
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Selected Lesson visualizer / playground
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTopicId(null)}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black rounded-xl transition flex items-center gap-1 cursor-pointer bg-white"
                  >
                    <X className="w-4 h-4" /> Exit Lesson
                  </button>

                  {isPlayingQuiz ? (
                    <QuizSystem 
                      topicId={activeTopicId}
                      grade={profile.grade}
                      onQuizComplete={handleQuizComplete}
                      onClose={() => setIsPlayingQuiz(false)}
                    />
                  ) : (
                    <MathExplainer 
                      topicId={activeTopicId} 
                      onStartQuiz={() => setIsPlayingQuiz(true)}
                    />
                  )}
                </div>
              )}
            </>
          )}

          {currentTab === 'rewards' && (
            <RewardsStore 
              profile={profile}
              onPurchaseItem={handlePurchaseItem}
              onEquipAvatar={handleEquipAvatar}
              onEquipPet={handleEquipPet}
            />
          )}

          {currentTab === 'parent' && (
            <ParentDashboard 
              settings={settings}
              history={history}
              onUpdateSettings={setSettings}
              onClearHistory={handleClearHistory}
              onClose={() => setCurrentTab('learn')}
            />
          )}
        </div>

      </main>

      {/* Screen break overlay if student triggers parent-defined screen time break */}
      <AnimatePresence>
        {showBreakOverlay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 text-center max-w-md w-full space-y-6 shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800 font-display">Time for a Brain Break! 🧘‍♂️</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Stellar math work! You have been calculating numbers for {settings.screenTimeLimitMinutes} minutes. Let's stand up, stretch your body, rest your eyes, and drink some water!
                </p>
              </div>

              {/* Stretch guide list */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">🌱 <span>Look out the window at something far away</span></div>
                <div className="flex items-center gap-2">🙆‍♀️ <span>Reach your hands high up to the sky</span></div>
                <div className="flex items-center gap-2">💧 <span>Take 3 big sips of refreshing water</span></div>
              </div>

              <button
                onClick={() => {
                  setShowBreakOverlay(false);
                  setScreenTimeElapsed(0);
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer"
              >
                I am Rested and Ready!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Humble Footer */}
      <footer className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-12">
        <span>Math Explorer &copy; 2026 • Crafted with love for kids everywhere</span>
      </footer>

    </div>
  );
}
