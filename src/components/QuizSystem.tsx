import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, X, Sparkles, HelpCircle, ArrowRight, RotateCcw, 
  Coins, Flame, Trophy, Award 
} from 'lucide-react';
import { generateQuizQuestions, QuizQuestion } from '../data/curriculum';
import { Grade } from '../types';

interface QuizSystemProps {
  topicId: string;
  grade: Grade;
  onQuizComplete: (score: number, correctAnswers: number, totalQuestions: number) => void;
  onClose: () => void;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({ topicId, grade, onQuizComplete, onClose }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0); // correct answers count
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Animation state for correct/incorrect popups
  const [animTrigger, setAnimTrigger] = useState<'none' | 'correct' | 'incorrect'>('none');

  useEffect(() => {
    // Generate 5 questions based on current topic
    const qList = generateQuizQuestions(topicId, 5);
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setQuizFinished(false);
  }, [topicId]);

  if (questions.length === 0) {
    return <div className="text-center py-12 font-bold text-slate-500">Preparing math challenge... 🚀</div>;
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isAnswered) return;

    setIsAnswered(true);
    const correct = selectedOption === currentQuestion.correctIndex;
    if (correct) {
      setScore(prev => prev + 1);
      setAnimTrigger('correct');
    } else {
      setAnimTrigger('incorrect');
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
    setAnimTrigger('none');

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      const percentageScore = Math.round((score / questions.length) * 100);
      onQuizComplete(percentageScore, score, questions.length);
    }
  };

  // Render supporting SVGs or icons inside quiz to make it highly visual
  const renderQuestionVisual = (visualData: any) => {
    if (!visualData) return null;

    switch (visualData.type) {
      case 'addition': {
        const { num1, num2, isPlus } = visualData;
        return (
          <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 max-w-[280px] mx-auto my-2">
            <div className="flex flex-wrap gap-1 bg-white p-2 rounded-lg border border-amber-200">
              {Array.from({ length: num1 }).map((_, idx) => (
                <span key={`q_add1_${idx}`} className="text-2xl">🍎</span>
              ))}
            </div>
            <span className="text-xl font-bold text-amber-600">{isPlus ? '+' : '-'}</span>
            {isPlus ? (
              <div className="flex flex-wrap gap-1 bg-white p-2 rounded-lg border border-rose-200">
                {Array.from({ length: num2 }).map((_, idx) => (
                  <span key={`q_add2_${idx}`} className="text-2xl">🍎</span>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1 bg-white p-2 rounded-lg border border-slate-200 opacity-50">
                {Array.from({ length: num2 }).map((_, idx) => (
                  <span key={`q_sub2_${idx}`} className="text-2xl grayscale">🍎</span>
                ))}
              </div>
            )}
          </div>
        );
      }
      case 'shape': {
        const { shape } = visualData;
        return (
          <div className="flex items-center justify-center h-28 bg-indigo-50/50 rounded-2xl border border-indigo-100 max-w-[200px] mx-auto my-2 p-2">
            {shape === 'circle' && (
              <svg className="w-20 h-20 text-indigo-500 stroke-current fill-indigo-100" viewBox="0 0 100 100" strokeWidth="6">
                <circle cx="50" cy="50" r="40" />
              </svg>
            )}
            {shape === 'triangle' && (
              <svg className="w-20 h-20 text-indigo-500 stroke-current fill-indigo-100" viewBox="0 0 100 100" strokeWidth="6">
                <polygon points="50,15 15,80 85,80" />
              </svg>
            )}
            {shape === 'square' && (
              <svg className="w-20 h-20 text-indigo-500 stroke-current fill-indigo-100" viewBox="0 0 100 100" strokeWidth="6">
                <rect x="15" y="15" width="70" height="70" rx="4" />
              </svg>
            )}
            {shape === 'star' && (
              <svg className="w-20 h-20 text-amber-500 stroke-current fill-amber-100" viewBox="0 0 100 100" strokeWidth="4">
                <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" />
              </svg>
            )}
          </div>
        );
      }
      case 'place_value': {
        const { h, t, o } = visualData;
        return (
          <div className="flex gap-2 justify-center p-3 bg-teal-50/50 rounded-xl border border-teal-100 max-w-[280px] mx-auto my-2">
            {h > 0 && (
              <div className="bg-white p-1.5 rounded-md border border-teal-200 text-center">
                <div className="text-[9px] font-bold text-teal-800">Hundreds ({h})</div>
                <div className="flex gap-0.5 justify-center pt-1">
                  {Array.from({ length: h }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-teal-400 rounded-xs" />
                  ))}
                </div>
              </div>
            )}
            {t > 0 && (
              <div className="bg-white p-1.5 rounded-md border border-emerald-200 text-center">
                <div className="text-[9px] font-bold text-emerald-800">Tens ({t})</div>
                <div className="flex gap-0.5 justify-center pt-1">
                  {Array.from({ length: t }).map((_, i) => (
                    <div key={i} className="w-1.5 h-3 bg-emerald-400 rounded-xs" />
                  ))}
                </div>
              </div>
            )}
            {o > 0 && (
              <div className="bg-white p-1.5 rounded-md border border-amber-200 text-center">
                <div className="text-[9px] font-bold text-amber-800">Ones ({o})</div>
                <div className="flex gap-0.5 justify-center pt-1">
                  {Array.from({ length: o }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-xs" />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'multiplication': {
        const { groups, itemsPerGroup } = visualData;
        return (
          <div className="flex flex-col gap-1.5 items-center justify-center p-4 bg-orange-50 rounded-2xl border border-orange-100 max-w-[260px] mx-auto my-2">
            {Array.from({ length: groups }).map((_, r) => (
              <div key={r} className="flex gap-1 bg-white p-1 rounded-md border border-orange-200">
                {Array.from({ length: itemsPerGroup }).map((_, c) => (
                  <span key={c} className="text-lg">⭐</span>
                ))}
              </div>
            ))}
          </div>
        );
      }
      case 'division': {
        const { total, groups } = visualData;
        const countPerGroup = total / groups;
        return (
          <div className="flex flex-wrap gap-2 justify-center p-3 bg-sky-50 rounded-xl border border-sky-100 max-w-[280px] mx-auto my-2">
            {Array.from({ length: groups }).map((_, gIdx) => (
              <div key={gIdx} className="bg-white p-2 rounded-lg border border-sky-200 text-center">
                <span className="text-xs font-bold text-slate-500 block mb-1">Group {gIdx + 1}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: countPerGroup }).map((_, cIdx) => (
                    <span key={cIdx} className="text-base">🍪</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }
      case 'fractions': {
        const { num, den } = visualData;
        const anglePerSlice = 360 / den;
        return (
          <div className="flex items-center justify-center my-3">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
              {Array.from({ length: den }).map((_, idx) => {
                const startAngle = idx * anglePerSlice;
                const endAngle = (idx + 1) * anglePerSlice;
                const isShaded = idx < num;
                const rad = Math.PI / 180;
                const x1 = 50 + 40 * Math.cos(startAngle * rad);
                const y1 = 50 + 40 * Math.sin(startAngle * rad);
                const x2 = 50 + 40 * Math.cos(endAngle * rad);
                const y2 = 50 + 40 * Math.sin(endAngle * rad);
                const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
                const d = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                return (
                  <path
                    key={`q_f_${idx}`}
                    d={d}
                    className={`stroke-white stroke-[1.5px] ${isShaded ? 'fill-pink-400' : 'fill-slate-100'}`}
                  />
                );
              })}
              <circle cx="50" cy="50" r="40" className="fill-none stroke-pink-200 stroke-2" />
            </svg>
          </div>
        );
      }
      case 'fraction_math': {
        const { num1, num2, den, op } = visualData;
        return (
          <div className="flex items-center justify-center space-x-3 text-xl font-bold bg-pink-50 p-2 rounded-lg border border-pink-100 max-w-[180px] mx-auto my-2">
            <div className="flex flex-col items-center">
              <span>{num1}</span>
              <div className="w-6 h-0.5 bg-slate-800"></div>
              <span>{den}</span>
            </div>
            <span>{op}</span>
            {num2 && (
              <div className="flex flex-col items-center">
                <span>{num2}</span>
                <div className="w-6 h-0.5 bg-slate-800"></div>
                <span>{den}</span>
              </div>
            )}
            {op === '=' && (
              <div className="flex flex-col items-center">
                <span className="text-slate-400">?</span>
                <div className="w-6 h-0.5 bg-slate-800"></div>
                <span>{den * visualData.mult}</span>
              </div>
            )}
          </div>
        );
      }
      case 'angle': {
        const { angle } = visualData;
        const angleRad = (180 - angle) * Math.PI / 180;
        const xLine = 50 + 40 * Math.cos(angleRad);
        const yLine = 50 - 40 * Math.sin(angleRad);
        return (
          <div className="flex items-center justify-center my-3">
            <svg className="w-24 h-12 bg-sky-50 rounded-t-full border-b border-slate-300" viewBox="0 0 100 50">
              <path d="M 10 50 A 40 40 0 0 1 90 50 Z" className="fill-indigo-50/40 stroke-indigo-100" />
              <line x1="50" y1="50" x2="90" y2="50" className="stroke-slate-500 stroke-2" />
              <line x1="50" y1="50" x2={xLine} y2={yLine} className="stroke-orange-500 stroke-2" />
              <circle cx="50" cy="50" r="3" className="fill-slate-600" />
            </svg>
          </div>
        );
      }
      case 'percentage': {
        const { percent } = visualData;
        return (
          <div className="grid grid-cols-10 gap-[1px] bg-slate-100 p-1 rounded border border-slate-200 max-w-[100px] mx-auto my-2">
            {Array.from({ length: 100 }).map((_, idx) => (
              <div
                key={`q_sq_${idx}`}
                className={`w-1.5 h-1.5 ${idx < percent ? 'bg-emerald-400' : 'bg-white'}`}
              />
            ))}
          </div>
        );
      }
      case 'ratio': {
        const { totalA, totalB } = visualData;
        return (
          <div className="flex gap-3 justify-center items-center p-2 bg-purple-50 rounded-xl max-w-[200px] mx-auto my-2">
            <div className="flex flex-wrap gap-1 max-w-[70px]">
              {Array.from({ length: totalA }).map((_, idx) => (
                <div key={`b_${idx}`} className="w-3 h-3 bg-indigo-500 rounded-full" />
              ))}
            </div>
            <span className="font-black text-purple-400">:</span>
            <div className="flex flex-wrap gap-1 max-w-[70px]">
              {Array.from({ length: totalB }).map((_, idx) => (
                <div key={`g_${idx}`} className="w-3 h-3 bg-emerald-500 rounded-full" />
              ))}
            </div>
          </div>
        );
      }
      case 'algebra': {
        const { cLeft, right } = visualData;
        return (
          <div className="flex justify-center items-center space-x-2 my-2 text-sm font-bold bg-teal-50 p-2.5 rounded-lg border border-teal-100 max-w-[200px] mx-auto">
            <div className="flex items-center space-x-1.5 bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded">
              <span>x</span>
              <span className="text-xs text-slate-400">+</span>
              <span className="text-amber-600 font-extrabold">{cLeft}</span>
            </div>
            <span className="text-slate-400">=</span>
            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">{right}</span>
          </div>
        );
      }
      case 'triangle_angle': {
        const { ang1, ang2 } = visualData;
        return (
          <div className="flex items-center justify-center my-3">
            <svg className="w-20 h-16" viewBox="0 0 100 80">
              <polygon points="15,70 85,70 45,15" className="fill-orange-50 stroke-orange-400 stroke-2" />
              <text x="25" y="65" className="text-[6px] font-black fill-blue-700">{ang1}°</text>
              <text x="75" y="65" className="text-[6px] font-black fill-pink-700">{ang2}°</text>
              <text x="45" y="27" className="text-[8px] font-black fill-amber-700" textAnchor="middle">?</text>
            </svg>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const currentPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div id="quiz-system-overlay" className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 max-w-2xl mx-auto space-y-6 relative overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
            MATH MISSION
          </span>
          <h4 className="text-base font-black text-slate-800 mt-1">Quiz Station - {grade}</h4>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-400 font-black uppercase tracking-wider">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score} / {questions.length}</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${currentPercent}%` }}
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
          />
        </div>
      </div>

      {/* Main Question Panel */}
      <div className="space-y-4">
        <h5 id="quiz-question-text" className="text-lg font-bold text-slate-800 text-center leading-relaxed">
          {currentQuestion.question}
        </h5>

        {/* Dynamic Graphic */}
        {renderQuestionVisual(currentQuestion.visualData)}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                // Correct answer always flashes green
                btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm';
              } else if (isSelected) {
                // Incorrect chosen flashes red
                btnClass = 'border-rose-500 bg-rose-50 text-rose-800';
              } else {
                btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'border-indigo-500 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-200';
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                className={`py-3.5 px-4 rounded-xl border-2 text-center text-sm font-extrabold transition-all cursor-pointer ${btnClass} flex justify-center items-center gap-2`}
              >
                {isAnswered && idx === currentQuestion.correctIndex && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                {isAnswered && isSelected && idx !== currentQuestion.correctIndex && <X className="w-4 h-4 text-rose-500 shrink-0" />}
                {option}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Popups & Action Drawers */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-100">
        
        {/* Hint toggle */}
        <div>
          {!isAnswered ? (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 bg-indigo-50/50 px-2.5 py-1.5 rounded-lg border border-indigo-100 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              {animTrigger === 'correct' && (
                <span className="text-emerald-600 text-xs font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                  🎉 Fantastic job! Keep going!
                </span>
              )}
              {animTrigger === 'incorrect' && (
                <span className="text-rose-600 text-xs font-extrabold flex items-center gap-1 bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-100">
                  💡 Almost! Check out the tip.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Submit or Next Button */}
        <div>
          {!isAnswered ? (
            <button
              id="btn-quiz-submit"
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                selectedOption !== null 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              id="btn-quiz-next"
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-black rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Animated Hint drawer */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-indigo-50/80 rounded-xl p-3 border border-indigo-100 text-xs text-indigo-900 leading-relaxed font-bold"
          >
            🌟 <span className="underline">Tip</span>: {currentQuestion.hint}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
