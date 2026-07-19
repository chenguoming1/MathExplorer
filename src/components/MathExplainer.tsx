import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Minus, RefreshCw, HelpCircle, Sparkles, 
  ChevronRight, Compass, ShieldAlert, Slice, Smile 
} from 'lucide-react';
import { Grade } from '../types';

interface MathExplainerProps {
  topicId: string;
  onStartQuiz: () => void;
}

export const MathExplainer: React.FC<MathExplainerProps> = ({ topicId, onStartQuiz }) => {
  // Common states for interactive demonstrations
  // P1 Addition
  const [p1Num1, setP1Num1] = useState(5);
  const [p1Num2, setP1Num2] = useState(3);
  const [p1Op, setP1Op] = useState<'+' | '-'>('+');

  // P1 Shapes
  const [p1SelectedShape, setP1SelectedShape] = useState<'circle' | 'triangle' | 'square' | 'pentagon'>('triangle');

  // P2 Place Value
  const [p2Hundreds, setP2Hundreds] = useState(1);
  const [p2Tens, setP2Tens] = useState(3);
  const [p2Ones, setP2Ones] = useState(6);

  // P2 Multiplication
  const [p2Rows, setP2Rows] = useState(3);
  const [p2Cols, setP2Cols] = useState(4);

  // P3 Division
  const [p3Cookies, setP3Cookies] = useState(12);
  const [p3Kids, setP3Kids] = useState(3);
  const [p3Step, setP3Step] = useState(0); // 0 = start, 1 = shared

  // P3 & P4 Fractions
  const [fracDen, setFracDen] = useState(6);
  const [fracNum, setFracNum] = useState(3);

  // P4 Angles
  const [p4Angle, setP4Angle] = useState(60);

  // P5 Percentages
  const [p5ActiveCount, setP5ActiveCount] = useState(45); // 0-100 grid

  // P5 Ratio
  const [p5Blue, setP5Blue] = useState(4);
  const [p5Green, setP5Green] = useState(6);

  // P6 Algebra Balance
  const [p6LeftX, setP6LeftX] = useState(1);
  const [p6LeftConst, setP6LeftConst] = useState(3);
  const [p6RightConst, setP6RightConst] = useState(8);
  const [isScaleBalanced, setIsScaleBalanced] = useState(true);

  // P6 Geometry Triangle
  const [p6AngleA, setP6AngleA] = useState(60);
  const [p6AngleB, setP6AngleB] = useState(70);

  // P1 Length
  const [p1LengthA, setP1LengthA] = useState(7);
  const [p1LengthB, setP1LengthB] = useState(4);

  // P2 Money
  const [p2ToyCost, setP2ToyCost] = useState(3.50);
  const [p2PaidDollar, setP2PaidDollar] = useState(0);
  const [p2PaidCent, setP2PaidCent] = useState(0);

  // P3 Area & Perimeter
  const [p3AreaWidth, setP3AreaWidth] = useState(5);
  const [p3AreaHeight, setP3AreaHeight] = useState(3);
  const [p3ShowGrid, setP3ShowGrid] = useState(true);

  // P4 Decimals
  const [p4DeciVal, setP4DeciVal] = useState(4); // tenths

  // P5 Volume
  const [p5VolL, setP5VolL] = useState(4);
  const [p5VolW, setP5VolW] = useState(3);
  const [p5VolH, setP5VolH] = useState(2);

  // P6 Speed
  const [p6Speed, setP6Speed] = useState(20);
  const [p6Time, setP6Time] = useState(3);
  const [p6IsDriving, setP6IsDriving] = useState(false);

  // Helper to find greatest common divisor for ratio simplifying
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifiedRatio = () => {
    const divisor = gcd(p5Blue, p5Green);
    return `${p5Blue / divisor} : ${p5Green / divisor}`;
  };

  // Render different explainers depending on topicId
  const renderInteractiveVisual = () => {
    switch (topicId) {
      case 'p1_addition': {
        const total = p1Op === '+' ? p1Num1 + p1Num2 : p1Num1 - p1Num2;
        return (
          <div id="p1-addition-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Drag the sliders to change numbers. Watch how addition joins them together, and subtraction takes them away!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl border border-amber-100">
              {/* Controls */}
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-amber-800 mb-1">
                    <span>Number 1: {p1Num1} apples</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={p1Num1} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setP1Num1(val);
                      if (p1Op === '-' && val < p1Num2) setP1Num2(val);
                    }}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex justify-center space-x-2">
                  <button 
                    id="p1-op-add"
                    onClick={() => setP1Op('+')}
                    className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1 ${p1Op === '+' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    <Plus className="w-4 h-4" /> Add (+)
                  </button>
                  <button 
                    id="p1-op-sub"
                    onClick={() => {
                      setP1Op('-');
                      if (p1Num2 > p1Num1) setP1Num2(p1Num1);
                    }}
                    className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1 ${p1Op === '-' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    <Minus className="w-4 h-4" /> Subtract (-)
                  </button>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-amber-800 mb-1">
                    <span>Number 2: {p1Num2} apples</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max={p1Op === '+' ? '10' : String(p1Num1)} 
                    value={p1Num2} 
                    onChange={(e) => setP1Num2(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Equation Display */}
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-xs border border-amber-100">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Math Equation</span>
                <div className="flex items-center space-x-4 text-3xl font-extrabold text-slate-800">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md">{p1Num1}</span>
                  <span className="text-amber-500">{p1Op}</span>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md">{p1Num2}</span>
                  <span className="text-slate-400">=</span>
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-md shadow-sm">{total}</span>
                </div>
              </div>
            </div>

            {/* Graphic Representation */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-amber-200 min-h-[160px] flex flex-col justify-center items-center">
              <div className="flex flex-wrap justify-center gap-4 items-center">
                {/* Group 1 */}
                <div className="flex flex-wrap justify-center max-w-[180px] gap-2 p-2 bg-amber-50/50 rounded-xl border border-amber-100">
                  {Array.from({ length: p1Num1 }).map((_, idx) => (
                    <motion.span 
                      key={`g1_${idx}`} 
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, delay: idx * 0.05 }}
                      className="text-3xl select-none"
                    >
                      🍎
                    </motion.span>
                  ))}
                </div>

                <span className="text-2xl font-bold text-amber-600">{p1Op}</span>

                {/* Group 2 */}
                <div className="flex flex-wrap justify-center max-w-[180px] gap-2 p-2 bg-rose-50/50 rounded-xl border border-rose-100">
                  {p1Op === '+' ? (
                    Array.from({ length: p1Num2 }).map((_, idx) => (
                      <motion.span 
                        key={`g2_${idx}`} 
                        initial={{ scale: 0, rotate: 20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, delay: idx * 0.05 }}
                        className="text-3xl select-none"
                      >
                        🍎
                      </motion.span>
                    ))
                  ) : (
                    Array.from({ length: p1Num2 }).map((_, idx) => (
                      <motion.span 
                        key={`g2_sub_${idx}`}
                        animate={{ opacity: [0.8, 0.2, 0.5, 0.2], scale: [1, 0.8, 0.9, 0.8] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-3xl select-none filter grayscale opacity-40 relative"
                      >
                        🍎
                        <span className="absolute inset-0 flex items-center justify-center text-red-500 font-extrabold text-xl">✕</span>
                      </motion.span>
                    ))
                  )}
                </div>

                <span className="text-2xl font-bold text-slate-400">=</span>

                {/* Answer Group */}
                <div className="flex flex-wrap justify-center max-w-[220px] gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  {Array.from({ length: total }).map((_, idx) => (
                    <motion.span 
                      key={`g3_${idx}`} 
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 250, delay: idx * 0.03 }}
                      className="text-3xl select-none"
                    >
                      🍎
                    </motion.span>
                  ))}
                  {total === 0 && <span className="text-slate-400 italic text-sm">Nothing left!</span>}
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'p1_shapes': {
        const shapeDetails = {
          circle: { name: 'Circle', sides: 0, corners: 0, desc: 'Perfectly round, like a plate or coin! It has zero straight sides.', emoji: '🔴' },
          triangle: { name: 'Triangle', sides: 3, corners: 3, desc: 'Three straight sides joining at three corners, like a slice of pizza! 🍕', emoji: '🔺' },
          square: { name: 'Square', sides: 4, corners: 4, desc: 'Four equal sides and four square corners, like a building block!', emoji: '🟦' },
          pentagon: { name: 'Pentagon', sides: 5, corners: 5, desc: 'A five-sided shape, like a home drawing or a starfish base!', emoji: '🏠' }
        };

        const shape = shapeDetails[p1SelectedShape];

        return (
          <div id="p1-shapes-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Click a shape to inspect its mathematical properties. Count the edges and corners with the bouncy indicators!
            </p>
            <div className="flex justify-center space-x-2">
              {(Object.keys(shapeDetails) as Array<keyof typeof shapeDetails>).map((shapeKey) => (
                <button
                  key={shapeKey}
                  onClick={() => setP1SelectedShape(shapeKey)}
                  className={`px-4 py-2 capitalize font-bold rounded-xl transition ${p1SelectedShape === shapeKey ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {shapeKey}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 items-center">
              {/* Graphic Display */}
              <div className="flex justify-center items-center h-[200px] bg-white rounded-xl shadow-xs p-4 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p1SelectedShape}
                    initial={{ scale: 0.3, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.3, rotate: 45, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                    className="w-36 h-36 flex items-center justify-center"
                  >
                    {p1SelectedShape === 'circle' && (
                      <svg className="w-full h-full text-indigo-500 stroke-current fill-indigo-100" viewBox="0 0 100 100" strokeWidth="6">
                        <circle cx="50" cy="50" r="40" />
                      </svg>
                    )}
                    {p1SelectedShape === 'triangle' && (
                      <svg className="w-full h-full text-indigo-500 stroke-current fill-indigo-100 animate-pulse" viewBox="0 0 100 100" strokeWidth="6">
                        <polygon points="50,15 15,80 85,80" />
                        {/* Corner markers */}
                        <circle cx="50" cy="15" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="15" cy="80" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="85" cy="80" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                      </svg>
                    )}
                    {p1SelectedShape === 'square' && (
                      <svg className="w-full h-full text-indigo-500 stroke-current fill-indigo-100" viewBox="0 0 100 100" strokeWidth="6">
                        <rect x="15" y="15" width="70" height="70" rx="4" />
                        {/* Corner markers */}
                        <circle cx="15" cy="15" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="85" cy="15" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="85" cy="85" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="15" cy="85" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                      </svg>
                    )}
                    {p1SelectedShape === 'pentagon' && (
                      <svg className="w-full h-full text-indigo-500 stroke-current fill-indigo-100" viewBox="0 0 100 100" strokeWidth="6">
                        <polygon points="50,12 88,40 74,85 26,85 12,40" />
                        {/* Corner markers */}
                        <circle cx="50" cy="12" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="88" cy="40" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="74" cy="85" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="26" cy="85" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                        <circle cx="12" cy="40" r="5" className="fill-pink-500 stroke-white" strokeWidth="2" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
                {p1SelectedShape !== 'circle' && (
                  <span className="absolute bottom-2 right-3 text-xs bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 bg-pink-500 rounded-full"></span> Pink Dots = Corners
                  </span>
                )}
              </div>

              {/* Specs Panel */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{shape.emoji}</span>
                  <h4 className="text-xl font-extrabold text-slate-800">{shape.name}</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed bg-white/70 p-3 rounded-lg border border-indigo-50">
                  {shape.desc}
                </p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="block text-2xl font-black text-indigo-600">{shape.sides}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Sides</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="block text-2xl font-black text-pink-500">{shape.corners}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Corners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'p2_place_value': {
        const total = p2Hundreds * 100 + p2Tens * 10 + p2Ones;
        return (
          <div id="p2-place-value-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Add or remove units, tens, or hundreds. Watch how separate blocks bundle to form a full 3-digit number!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
              {/* Hundreds Column */}
              <div className="bg-white p-4 rounded-xl border border-teal-100 text-center space-y-3">
                <div className="text-xs font-black text-teal-800 uppercase tracking-wide">Hundreds (100)</div>
                <div className="flex justify-center items-center space-x-2">
                  <button 
                    onClick={() => setP2Hundreds(Math.max(1, p2Hundreds - 1))}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-extrabold text-teal-600">{p2Hundreds}</span>
                  <button 
                    onClick={() => setP2Hundreds(Math.min(5, p2Hundreds + 1))}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {/* Visual grid representing hundred blocks */}
                <div className="grid grid-cols-3 gap-1.5 justify-center pt-2 max-w-[120px] mx-auto">
                  {Array.from({ length: p2Hundreds }).map((_, idx) => (
                    <div key={`h_${idx}`} className="w-8 h-8 bg-teal-100 rounded-sm border border-teal-300 flex flex-wrap p-0.5 gap-[1px]">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span key={i} className="block w-1.5 h-1.5 bg-teal-400 rounded-[1px]"></span>
                      ))}
                    </div>
                  ))}
                </div>
                <span className="block text-sm text-slate-500 font-bold">= {p2Hundreds * 100}</span>
              </div>

              {/* Tens Column */}
              <div className="bg-white p-4 rounded-xl border border-teal-100 text-center space-y-3">
                <div className="text-xs font-black text-emerald-800 uppercase tracking-wide">Tens (10)</div>
                <div className="flex justify-center items-center space-x-2">
                  <button 
                    onClick={() => setP2Tens(Math.max(0, p2Tens - 1))}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-extrabold text-emerald-600">{p2Tens}</span>
                  <button 
                    onClick={() => setP2Tens(Math.min(9, p2Tens + 1))}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {/* Visual strips representing tens */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-2 max-w-[120px] mx-auto min-h-[44px]">
                  {Array.from({ length: p2Tens }).map((_, idx) => (
                    <div key={`t_${idx}`} className="w-2.5 h-10 bg-emerald-100 rounded-sm border border-emerald-300 flex flex-col justify-between p-[1px]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="block w-full h-1 bg-emerald-400 rounded-[1px]"></span>
                      ))}
                    </div>
                  ))}
                  {p2Tens === 0 && <span className="text-xs text-slate-300 italic">No tens</span>}
                </div>
                <span className="block text-sm text-slate-500 font-bold">= {p2Tens * 10}</span>
              </div>

              {/* Ones Column */}
              <div className="bg-white p-4 rounded-xl border border-teal-100 text-center space-y-3">
                <div className="text-xs font-black text-amber-800 uppercase tracking-wide">Ones (1)</div>
                <div className="flex justify-center items-center space-x-2">
                  <button 
                    onClick={() => setP2Ones(Math.max(0, p2Ones - 1))}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-extrabold text-amber-600">{p2Ones}</span>
                  <button 
                    onClick={() => setP2Ones(Math.min(9, p2Ones + 1))}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {/* Visual cubes representing ones */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-2 max-w-[120px] mx-auto min-h-[44px]">
                  {Array.from({ length: p2Ones }).map((_, idx) => (
                    <div key={`o_${idx}`} className="w-3.5 h-3.5 bg-amber-100 rounded-sm border border-amber-300 flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-[1px]"></span>
                    </div>
                  ))}
                  {p2Ones === 0 && <span className="text-xs text-slate-300 italic">No ones</span>}
                </div>
                <span className="block text-sm text-slate-500 font-bold">= {p2Ones}</span>
              </div>
            </div>

            {/* Sum Output Board */}
            <div className="bg-teal-900 text-white rounded-2xl p-6 text-center shadow-lg flex flex-col md:flex-row md:items-center md:justify-around space-y-4 md:space-y-0">
              <div>
                <span className="block text-xs uppercase tracking-widest text-teal-300 font-black">Sum Formula</span>
                <span className="text-xl md:text-2xl font-bold tracking-wide">
                  {p2Hundreds * 100} + {p2Tens * 10} + {p2Ones}
                </span>
              </div>
              <div className="h-px md:h-12 w-full md:w-px bg-teal-800"></div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-emerald-300 font-black">Assembled Value</span>
                <span className="text-4xl md:text-5xl font-black text-amber-300 tracking-wider">
                  {total}
                </span>
              </div>
            </div>
          </div>
        );
      }
      case 'p2_multiplication': {
        const total = p2Rows * p2Cols;
        return (
          <div id="p2-multiplication-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Multiplication is repeated addition. Use rows and columns to make a grid of stars!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
              {/* Sliders */}
              <div className="space-y-4 justify-center flex flex-col">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-orange-800 mb-1">
                    <span>Rows: {p2Rows}</span>
                    <span className="text-slate-400">(groups)</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="6" 
                    value={p2Rows} 
                    onChange={(e) => setP2Rows(parseInt(e.target.value))}
                    className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-orange-800 mb-1">
                    <span>Columns: {p2Cols}</span>
                    <span className="text-slate-400">(items per group)</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="8" 
                    value={p2Cols} 
                    onChange={(e) => setP2Cols(parseInt(e.target.value))}
                    className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Equation */}
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-xs border border-orange-100 text-center">
                <span className="text-xs font-black text-orange-600 uppercase tracking-wider mb-2">Equation</span>
                <div className="text-4xl font-black text-slate-800 flex items-center space-x-2">
                  <span className="text-orange-500">{p2Rows}</span>
                  <span className="text-slate-400">×</span>
                  <span className="text-orange-500">{p2Cols}</span>
                  <span className="text-slate-400">=</span>
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-xl shadow-xs">{total}</span>
                </div>
                <p className="text-xs text-slate-400 font-bold mt-3">
                  Adding {p2Cols} stars, {p2Rows} times over!
                </p>
              </div>
            </div>

            {/* Grid display with framer motion animations */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-orange-200 min-h-[220px] flex justify-center items-center overflow-x-auto">
              <div className="flex flex-col gap-3">
                {Array.from({ length: p2Rows }).map((_, rIdx) => (
                  <div key={`row_${rIdx}`} className="flex items-center gap-3">
                    <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-md w-16 text-center">
                      Group {rIdx + 1}
                    </span>
                    <div className="flex gap-2">
                      {Array.from({ length: p2Cols }).map((_, cIdx) => (
                        <motion.div
                          key={`star_${rIdx}_${cIdx}`}
                          initial={{ scale: 0, y: -10 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 200, delay: (rIdx * p2Cols + cIdx) * 0.02 }}
                          className="w-10 h-10 bg-orange-100 hover:bg-orange-200 border border-orange-300 rounded-lg flex items-center justify-center text-xl shadow-xs cursor-pointer select-none"
                        >
                          ⭐
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 'p3_division': {
        const shareResult = Math.floor(p3Cookies / p3Kids);
        const remainder = p3Cookies % p3Kids;

        return (
          <div id="p3-division-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Division means sharing equally. Take a look at cookies divided equally among friendly characters!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-sky-50 p-4 rounded-xl border border-sky-100">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-sky-800 mb-1">
                    <span>Cookies to Share: {p3Cookies}</span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="18" 
                    value={p3Cookies} 
                    onChange={(e) => {
                      setP3Cookies(parseInt(e.target.value));
                      setP3Step(0);
                    }}
                    className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-sky-800 mb-1">
                    <span>Number of Kids: {p3Kids}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="4" 
                    value={p3Kids} 
                    onChange={(e) => {
                      setP3Kids(parseInt(e.target.value));
                      setP3Step(0);
                    }}
                    className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setP3Step(p3Step === 0 ? 1 : 0)}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-extrabold rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${p3Step === 1 ? 'animate-spin' : ''}`} />
                    {p3Step === 0 ? 'Click to Share Cookies!' : 'Reset Cookie Bag'}
                  </button>
                </div>
              </div>

              {/* Formula display */}
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-xs border border-sky-100 text-center">
                <span className="text-xs font-black text-sky-600 uppercase tracking-wider mb-2">Math Equation</span>
                <div className="text-3xl font-black text-slate-800 flex items-center justify-center flex-wrap gap-2">
                  <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-md">{p3Cookies}</span>
                  <span className="text-slate-400">÷</span>
                  <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-md">{p3Kids}</span>
                  <span className="text-slate-400">=</span>
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-md shadow-xs">{shareResult}</span>
                </div>
                {remainder > 0 && (
                  <p className="text-xs text-amber-600 font-extrabold mt-2 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                    Remaining: {remainder} left over!
                  </p>
                )}
              </div>
            </div>

            {/* Shared Visual Area */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-sky-200 min-h-[220px]">
              {p3Step === 0 ? (
                // Display cookies in the bag/pile
                <div className="space-y-4 text-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Pile of Cookies ({p3Cookies})</span>
                  <div className="flex flex-wrap justify-center gap-2 max-w-[350px] mx-auto bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                    {Array.from({ length: p3Cookies }).map((_, idx) => (
                      <motion.span 
                        key={`cookie_${idx}`} 
                        layoutId={`c_${idx}`}
                        className="text-3xl cursor-pointer select-none"
                        whileHover={{ scale: 1.2 }}
                      >
                        🍪
                      </motion.span>
                    ))}
                  </div>
                </div>
              ) : (
                // Show cookies distributed to the kids
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                  {Array.from({ length: p3Kids }).map((_, kidIdx) => {
                    const kidEmojis = ['🧒', '👧', '🦁', '🐻'];
                    return (
                      <div key={`kid_${kidIdx}`} className="bg-sky-50/50 p-4 rounded-xl border border-sky-100 w-full text-center space-y-3 relative overflow-hidden">
                        <span className="text-4xl block">{kidEmojis[kidIdx]}</span>
                        <div className="text-xs font-bold text-slate-600">Kid {kidIdx + 1}</div>
                        <div className="flex flex-wrap justify-center gap-1.5 min-h-[50px]">
                          {Array.from({ length: shareResult }).map((_, cookieIdx) => (
                            <motion.span 
                              key={`kid_cookie_${kidIdx}_${cookieIdx}`}
                              initial={{ scale: 0, y: -40 }}
                              animate={{ scale: 1, y: 0 }}
                              transition={{ type: 'spring', stiffness: 180, delay: cookieIdx * 0.1 }}
                              className="text-2xl"
                            >
                              🍪
                            </motion.span>
                          ))}
                        </div>
                        <span className="block text-xs bg-sky-200 text-sky-800 font-extrabold py-0.5 px-2 rounded-md">
                          Got {shareResult}
                        </span>
                      </div>
                    );
                  })}

                  {/* Remainder box */}
                  {remainder > 0 && (
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 w-full text-center space-y-3 flex flex-col justify-center items-center">
                      <span className="text-3xl block">🎒</span>
                      <span className="text-xs font-extrabold text-amber-800">Remainder Bag</span>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {Array.from({ length: remainder }).map((_, rIdx) => (
                          <motion.span 
                            key={`rem_c_${rIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl"
                          >
                            🍪
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'p3_fractions_intro':
      case 'p4_fractions_advanced': {
        const isIntro = topicId === 'p3_fractions_intro';
        const anglePerSlice = 360 / fracDen;

        return (
          <div id="fractions-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              {isIntro 
                ? 'Slice the pizza and color sections to form fractions. The numerator is the colored parts; the denominator is the total parts!'
                : 'Advanced fractions! Observe equivalent fractions by doubling both numerator and denominator!'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-pink-50/40 p-4 rounded-xl border border-pink-100">
              {/* Controls */}
              <div className="space-y-4 justify-center flex flex-col">
                <div className="bg-white p-4 rounded-xl border border-pink-100 space-y-3">
                  <div className="flex justify-between items-center text-xs font-black text-pink-900">
                    <span>DENOMINATOR (Total Slices)</span>
                    <span className="bg-pink-100 px-2 py-0.5 rounded text-pink-700">{fracDen}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        const newDen = Math.max(2, fracDen - 1);
                        setFracDen(newDen);
                        if (fracNum > newDen) setFracNum(newDen);
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input 
                      type="range" 
                      min="2" 
                      max="12" 
                      value={fracDen} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setFracDen(val);
                        if (fracNum > val) setFracNum(val);
                      }}
                      className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button 
                      onClick={() => {
                        const newDen = Math.min(12, fracDen + 1);
                        setFracDen(newDen);
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-pink-100 space-y-3">
                  <div className="flex justify-between items-center text-xs font-black text-pink-900">
                    <span>NUMERATOR (Shaded Slices)</span>
                    <span className="bg-pink-100 px-2 py-0.5 rounded text-pink-700">{fracNum}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setFracNum(Math.max(0, fracNum - 1))}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max={fracDen} 
                      value={fracNum} 
                      onChange={(e) => setFracNum(parseInt(e.target.value))}
                      className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <button 
                      onClick={() => setFracNum(Math.min(fracDen, fracNum + 1))}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fraction Display panel */}
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-pink-100 text-center">
                <span className="text-xs font-black text-pink-600 uppercase tracking-wider mb-2">Mathematical Value</span>
                <div className="flex items-center space-x-4">
                  {/* Big fraction layout */}
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-pink-600">{fracNum}</span>
                    <div className="w-12 h-1 bg-slate-800 rounded my-1"></div>
                    <span className="text-4xl font-black text-slate-800">{fracDen}</span>
                  </div>

                  {!isIntro && (
                    <>
                      <span className="text-2xl font-bold text-slate-400">=</span>
                      {/* Show Equivalent (multiplied by 2) */}
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-black text-emerald-600">{fracNum * 2}</span>
                        <div className="w-10 h-1 bg-slate-800 rounded my-1"></div>
                        <span className="text-3xl font-black text-slate-800">{fracDen * 2}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-extrabold max-w-[80px]">
                        Multipled top and bottom by 2!
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* SVG Visual Pie */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-pink-200 flex justify-center items-center min-h-[220px]">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
                  {/* Draw each slice */}
                  {Array.from({ length: fracDen }).map((_, idx) => {
                    const startAngle = idx * anglePerSlice;
                    const endAngle = (idx + 1) * anglePerSlice;
                    const isShaded = idx < fracNum;

                    // Convert polar to cartesian coordinates
                    const rad = Math.PI / 180;
                    const x1 = 50 + 42 * Math.cos(startAngle * rad);
                    const y1 = 50 + 42 * Math.sin(startAngle * rad);
                    const x2 = 50 + 42 * Math.cos(endAngle * rad);
                    const y2 = 50 + 42 * Math.sin(endAngle * rad);

                    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

                    // Path for a pie slice
                    const d = `M 50 50 L ${x1} ${y1} A 42 42 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                    return (
                      <motion.path
                        key={`slice_${idx}`}
                        d={d}
                        className={`stroke-white stroke-[1.5px] cursor-pointer ${
                          isShaded ? 'fill-pink-400 hover:fill-pink-500' : 'fill-slate-100 hover:fill-slate-200'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="42" className="fill-none stroke-pink-200 stroke-2" />
                </svg>

                {/* Shaded indicator count overlay */}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-100 text-pink-700 text-xs font-extrabold px-3 py-1 rounded-full border border-pink-200 whitespace-nowrap shadow-xs">
                  {fracNum} of {fracDen} slices shaded
                </span>
              </div>
            </div>
          </div>
        );
      }
      case 'p4_angles': {
        // Determine type of angle
        let angleType = 'Acute Angle';
        let angleDesc = 'Less than 90 degrees. Pointy and sharp!';
        if (p4Angle === 90) {
          angleType = 'Right Angle';
          angleDesc = 'Exactly 90 degrees. Formed like the corner of a square!';
        } else if (p4Angle > 90) {
          angleType = 'Obtuse Angle';
          angleDesc = 'Greater than 90 degrees but less than 180 degrees. Wide and open!';
        }

        return (
          <div id="p4-angles-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Rotate the dial to measure angles in degrees (0° - 180°). Learn to identify acute, right, and obtuse angles!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-sky-50 p-4 rounded-xl border border-sky-100">
              {/* Slider dial */}
              <div className="space-y-4 justify-center flex flex-col">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-sky-800 mb-1">
                    <span>Angle size: {p4Angle}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="170" 
                    step="5"
                    value={p4Angle} 
                    onChange={(e) => setP4Angle(parseInt(e.target.value))}
                    className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => setP4Angle(45)}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200"
                  >
                    45° (Acute)
                  </button>
                  <button 
                    onClick={() => setP4Angle(90)}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200"
                  >
                    90° (Right)
                  </button>
                  <button 
                    onClick={() => setP4Angle(135)}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200"
                  >
                    135° (Obtuse)
                  </button>
                </div>
              </div>

              {/* Angle status description */}
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-xs border border-sky-100 text-center">
                <span className="text-xs font-black text-sky-600 uppercase tracking-wider mb-1">Category</span>
                <span className="text-2xl font-black text-indigo-700">{angleType}</span>
                <p className="text-xs text-slate-500 font-bold mt-1 max-w-[200px]">
                  {angleDesc}
                </p>
              </div>
            </div>

            {/* Graphic SVG Protractor */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-sky-200 min-h-[220px] flex justify-center items-center">
              <div className="relative w-72 h-36 border-b border-slate-300">
                {/* D-shaped Semi-Circle protractor */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
                  {/* Outer curve */}
                  <path d="M 10 100 A 90 90 0 0 1 190 100 Z" className="fill-indigo-50/40 stroke-indigo-200 stroke-2" />

                  {/* Tick Marks (0 to 180 degrees in increments of 15) */}
                  {Array.from({ length: 13 }).map((_, i) => {
                    const angleDeg = i * 15;
                    const angleRad = (180 - angleDeg) * Math.PI / 180;
                    const xStart = 100 + 82 * Math.cos(angleRad);
                    const yStart = 100 - 82 * Math.sin(angleRad);
                    const xEnd = 100 + 90 * Math.cos(angleRad);
                    const yEnd = 100 - 90 * Math.sin(angleRad);

                    const xText = 100 + 74 * Math.cos(angleRad);
                    const yText = 100 - 74 * Math.sin(angleRad);

                    return (
                      <g key={`tick_${i}`}>
                        <line x1={xStart} y1={yStart} x2={xEnd} y2={yEnd} className="stroke-indigo-300 stroke-[1.5px]" />
                        <text x={xText} y={yText} className="text-[6px] font-black fill-indigo-800 text-center select-none" textAnchor="middle" alignmentBaseline="middle">
                          {angleDeg}
                        </text>
                      </g>
                    );
                  })}

                  {/* Draw the target angle line */}
                  {(() => {
                    const angleRad = (180 - p4Angle) * Math.PI / 180;
                    const xLine = 100 + 85 * Math.cos(angleRad);
                    const yLine = 100 - 85 * Math.sin(angleRad);

                    return (
                      <g>
                        {/* Shaded Angle Area */}
                        <path 
                          d={`M 100 100 L 190 100 A 90 90 0 0 0 ${100 + 90 * Math.cos(angleRad)} ${100 - 90 * Math.sin(angleRad)} Z`} 
                          className="fill-sky-100 opacity-60" 
                        />
                        {/* Angle Arc symbol */}
                        <path 
                          d={`M 100 100 L 130 100 A 30 30 0 0 0 ${100 + 30 * Math.cos(angleRad)} ${100 - 30 * Math.sin(angleRad)} Z`} 
                          className="fill-amber-100 stroke-amber-500 stroke" 
                        />
                        {/* Target needle */}
                        <line x1="100" y1="100" x2={xLine} y2={yLine} className="stroke-orange-500 stroke-[3px]" strokeLinecap="round" />
                        <circle cx={xLine} cy={yLine} r="3" className="fill-orange-600" />
                      </g>
                    );
                  })()}

                  {/* Baseline and Center point */}
                  <line x1="10" y1="100" x2="190" y2="100" className="stroke-slate-400 stroke-2" />
                  <circle cx="100" cy="100" r="5" className="fill-indigo-600 stroke-white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        );
      }
      case 'p5_percentages': {
        const fractionRep = `${p5ActiveCount}/100`;
        const decimalRep = (p5ActiveCount / 100).toFixed(2);

        return (
          <div id="p5-percentages-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Percentages are fractions of 100. Click on grid blocks, or use the slider to see how Fractions, Decimals, and Percentages align!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="space-y-4 justify-center flex flex-col">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-emerald-800 mb-1">
                    <span>Shaded Units: {p5ActiveCount}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={p5ActiveCount} 
                    onChange={(e) => setP5ActiveCount(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex justify-center space-x-2">
                  <button onClick={() => setP5ActiveCount(10)} className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200">10%</button>
                  <button onClick={() => setP5ActiveCount(25)} className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200">25%</button>
                  <button onClick={() => setP5ActiveCount(50)} className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200">50%</button>
                  <button onClick={() => setP5ActiveCount(75)} className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black rounded border border-slate-200">75%</button>
                </div>
              </div>

              {/* Formats board */}
              <div className="bg-white p-4 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-slate-50 rounded border border-slate-100 flex flex-col justify-center">
                  <span className="block text-xs font-black text-slate-400 uppercase tracking-wider">Fraction</span>
                  <span className="text-xl font-bold text-indigo-600">{fractionRep}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 flex flex-col justify-center">
                  <span className="block text-xs font-black text-slate-400 uppercase tracking-wider">Decimal</span>
                  <span className="text-xl font-bold text-amber-600">{decimalRep}</span>
                </div>
                <div className="p-2 bg-emerald-50 rounded border border-emerald-100 flex flex-col justify-center">
                  <span className="block text-xs font-black text-emerald-800 uppercase tracking-wider">Percent</span>
                  <span className="text-xl font-extrabold text-emerald-600">{p5ActiveCount}%</span>
                </div>
              </div>
            </div>

            {/* 100-Grid block visualizer */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-emerald-200 flex justify-center items-center">
              <div className="grid grid-cols-10 gap-[2px] bg-slate-100 p-2 rounded-lg border border-slate-200 max-w-[220px]">
                {Array.from({ length: 100 }).map((_, idx) => {
                  const isActive = idx < p5ActiveCount;
                  return (
                    <motion.div
                      key={`grid_sq_${idx}`}
                      onClick={() => setP5ActiveCount(idx + 1)}
                      className={`w-4.5 h-4.5 rounded-[1px] cursor-pointer transition duration-150 ${
                        isActive ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-white hover:bg-slate-100'
                      }`}
                      whileHover={{ scale: 1.15 }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
      case 'p5_ratios': {
        const simRatio = simplifiedRatio();
        return (
          <div id="p5-ratios-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Ratios compare sizes. Sliders adjust counts of Blue and Green marbles, and our math helper simplifies the ratio to its lowest form!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50 p-4 rounded-xl border border-purple-100">
              {/* Sliders */}
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-indigo-800 mb-1">
                    <span>Blue Marbles: {p5Blue}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    value={p5Blue} 
                    onChange={(e) => setP5Blue(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-emerald-800 mb-1">
                    <span>Green Marbles: {p5Green}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    value={p5Green} 
                    onChange={(e) => setP5Green(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Ratios Outputs */}
              <div className="bg-white p-4 rounded-xl border border-purple-100 flex flex-col justify-center items-center text-center space-y-2">
                <div>
                  <span className="block text-xs font-black text-slate-400 uppercase tracking-wider">Raw Comparison Ratio</span>
                  <span className="text-2xl font-black text-slate-700">{p5Blue} : {p5Green}</span>
                </div>
                <div className="w-full h-px bg-slate-100 my-2"></div>
                <div>
                  <span className="block text-xs font-black text-purple-600 uppercase tracking-widest">Simplified Ratio</span>
                  <span className="text-3xl font-black text-purple-700 bg-purple-100 px-4 py-1 rounded-xl block shadow-xs mt-1">
                    {simRatio}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Marbles Board */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-purple-200 min-h-[160px] flex flex-wrap gap-4 items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-indigo-600 uppercase mb-2">Blue Group ({p5Blue})</span>
                <div className="flex flex-wrap justify-center gap-2 max-w-[150px] p-2 bg-indigo-50 rounded-xl border border-indigo-100 min-h-[44px]">
                  {Array.from({ length: p5Blue }).map((_, idx) => (
                    <motion.div
                      key={`blue_m_${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-7 h-7 bg-indigo-500 rounded-full shadow-inner border border-indigo-600"
                    />
                  ))}
                </div>
              </div>

              <div className="text-xl font-black text-purple-400">:</div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-black text-emerald-600 uppercase mb-2">Green Group ({p5Green})</span>
                <div className="flex flex-wrap justify-center gap-2 max-w-[150px] p-2 bg-emerald-50 rounded-xl border border-emerald-100 min-h-[44px]">
                  {Array.from({ length: p5Green }).map((_, idx) => (
                    <motion.div
                      key={`green_m_${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-7 h-7 bg-emerald-500 rounded-full shadow-inner border border-emerald-600"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'p6_algebra': {
        const targetX = p6RightConst - p6LeftConst;

        return (
          <div id="p6-algebra-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Welcome to Algebra! Solve x + {p6LeftConst} = {p6RightConst} using a visual balance scale. Subtract {p6LeftConst} blocks from both sides to balance the scale and reveal x!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50 p-4 rounded-xl border border-teal-100">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-teal-800 mb-1">
                    <span>X value: ?</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">We want to solve the scale equation below!</p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs space-y-2">
                  <span className="text-xs font-black text-teal-800 block">Configure Left Side:</span>
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                    <span>Left Constants: {p6LeftConst}</span>
                    <button onClick={() => setP6LeftConst(Math.max(1, p6LeftConst - 1))} className="p-1 bg-slate-100 rounded">-</button>
                    <button onClick={() => setP6LeftConst(Math.min(9, p6LeftConst + 1))} className="p-1 bg-slate-100 rounded">+</button>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs space-y-2">
                  <span className="text-xs font-black text-teal-800 block">Configure Right Side:</span>
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                    <span>Right Constants: {p6RightConst}</span>
                    <button onClick={() => setP6RightConst(Math.max(p6LeftConst + 1, p6RightConst - 1))} className="p-1 bg-slate-100 rounded">-</button>
                    <button onClick={() => setP6RightConst(Math.min(15, p6RightConst + 1))} className="p-1 bg-slate-100 rounded">+</button>
                  </div>
                </div>
              </div>

              {/* Equation */}
              <div className="flex flex-col items-center justify-center bg-teal-900 text-white p-4 rounded-xl shadow-md text-center">
                <span className="text-xs text-teal-300 font-extrabold uppercase mb-1">Balanced Equation</span>
                <div className="text-3xl font-black">
                  x + <span className="text-amber-300">{p6LeftConst}</span> = <span className="text-teal-300">{p6RightConst}</span>
                </div>
                <div className="w-full h-px bg-teal-800 my-3"></div>
                <div className="text-sm font-bold">
                  Therefore, x = <span className="text-amber-300 text-xl">{targetX}</span>
                </div>
                <p className="text-[11px] text-teal-200 mt-2 italic font-medium">
                  We took {p6LeftConst} blocks off both sides!
                </p>
              </div>
            </div>

            {/* SVG Interactive Balance scale */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-teal-200 min-h-[220px] flex flex-col justify-center items-center">
              <svg className="w-full max-w-[320px] overflow-visible" viewBox="0 0 200 120">
                {/* Stand */}
                <rect x="96" y="60" width="8" height="50" className="fill-slate-400" />
                <rect x="80" y="110" width="40" height="6" rx="2" className="fill-slate-500" />

                {/* Pivot pivot ball */}
                <circle cx="100" cy="60" r="5" className="fill-teal-600" />

                {/* Lever arm beam */}
                <line x1="40" y1="60" x2="160" y2="60" className="stroke-slate-500 stroke-[4px]" strokeLinecap="round" />

                {/* Left Pan */}
                <g>
                  {/* Hangers */}
                  <line x1="40" y1="60" x2="25" y2="90" className="stroke-slate-400 stroke" />
                  <line x1="40" y1="60" x2="55" y2="90" className="stroke-slate-400 stroke" />
                  {/* Plate */}
                  <rect x="20" y="90" width="40" height="4" rx="1" className="fill-teal-500" />

                  {/* Contents: x box & c boxes */}
                  <g transform="translate(25, 68)">
                    {/* x Box */}
                    <g>
                      <rect x="0" y="5" width="14" height="14" className="fill-indigo-500 stroke-indigo-600" rx="2" />
                      <text x="7" y="15" className="text-[9px] font-black fill-white" textAnchor="middle">x</text>
                    </g>
                    {/* c blocks */}
                    {Array.from({ length: p6LeftConst }).map((_, idx) => {
                      const row = Math.floor(idx / 3);
                      const col = idx % 3;
                      return (
                        <rect 
                          key={`left_b_${idx}`} 
                          x={16 + col * 7} 
                          y={13 - row * 7} 
                          width="5" 
                          height="5" 
                          className="fill-amber-400 stroke-amber-500" 
                          rx="0.5" 
                        />
                      );
                    })}
                  </g>
                </g>

                {/* Right Pan */}
                <g>
                  {/* Hangers */}
                  <line x1="160" y1="60" x2="145" y2="90" className="stroke-slate-400 stroke" />
                  <line x1="160" y1="60" x2="175" y2="90" className="stroke-slate-400 stroke" />
                  {/* Plate */}
                  <rect x="140" y="90" width="40" height="4" rx="1" className="fill-teal-500" />

                  {/* Contents: c boxes */}
                  <g transform="translate(144, 68)">
                    {Array.from({ length: p6RightConst }).map((_, idx) => {
                      const row = Math.floor(idx / 4);
                      const col = idx % 4;
                      return (
                        <rect 
                          key={`right_b_${idx}`} 
                          x={col * 7} 
                          y={13 - row * 7} 
                          width="5" 
                          height="5" 
                          className="fill-emerald-400 stroke-emerald-500" 
                          rx="0.5" 
                        />
                      );
                    })}
                  </g>
                </g>
              </svg>
            </div>
          </div>
        );
      }
      case 'p6_geometry': {
        const angleC = 180 - p6AngleA - p6AngleB;

        return (
          <div id="p6-geometry-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              The internal angles of ANY triangle always add up to exactly 180 degrees! Adjust angles A and B to see angle C calculate itself.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
              {/* Sliders */}
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-orange-800 mb-1">
                    <span>Angle A (Blue): {p6AngleA}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="110" 
                    value={p6AngleA} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setP6AngleA(val);
                      if (val + p6AngleB >= 160) setP6AngleB(160 - val);
                    }}
                    className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-black text-rose-800 mb-1">
                    <span>Angle B (Pink): {p6AngleB}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="110" 
                    value={p6AngleB} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setP6AngleB(val);
                      if (p6AngleA + val >= 160) setP6AngleA(160 - val);
                    }}
                    className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Triangle Formula Display */}
              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md text-center flex flex-col justify-center">
                <span className="text-[10px] text-orange-300 font-black uppercase tracking-wider mb-2">Triangle Angle Sum</span>
                <div className="text-2xl font-black text-slate-100">
                  <span className="text-blue-400">{p6AngleA}°</span> + <span className="text-pink-400">{p6AngleB}°</span> + <span className="text-amber-400">{angleC}°</span>
                </div>
                <div className="text-3xl font-black text-emerald-400 mt-2">
                  = 180°
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-2">
                  No matter the shape, the sum is always 180°!
                </p>
              </div>
            </div>

            {/* Interactive Triangle Diagram SVG */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-orange-200 min-h-[220px] flex justify-center items-center">
              <svg className="w-full max-w-[240px] overflow-visible" viewBox="0 0 100 90">
                {/* Dynamically construct triangle vertices based on angles */}
                {(() => {
                  // base is along x from (10, 80) to (90, 80)
                  const xA = 15;
                  const yA = 80;
                  const xB = 85;
                  const yB = 80;

                  // Find vertex C using trigonometry
                  // angles: A is at vertex A, B is at vertex B
                  const lengthAB = xB - xA;
                  const radA = p6AngleA * Math.PI / 180;
                  const radB = p6AngleB * Math.PI / 180;
                  const radC = Math.PI - radA - radB;

                  // Using Sine rule: b / sin(B) = c / sin(C) => b = c * sin(B) / sin(C)
                  const bSide = lengthAB * Math.sin(radB) / Math.sin(radC);
                  const xC = xA + bSide * Math.cos(radA);
                  const yC = yA - bSide * Math.sin(radA);

                  return (
                    <g>
                      {/* Triangle fill & borders */}
                      <polygon points={`${xA},${yA} ${xB},${yB} ${xC},${yC}`} className="fill-orange-50 stroke-orange-500 stroke-2" />

                      {/* Vertex markers with bouncy effect */}
                      <circle cx={xA} cy={yA} r="4.5" className="fill-blue-500 stroke-white" strokeWidth="1.5" />
                      <circle cx={xB} cy={yB} r="4.5" className="fill-pink-500 stroke-white" strokeWidth="1.5" />
                      <circle cx={xC} cy={yC} r="4.5" className="fill-amber-500 stroke-white" strokeWidth="1.5" />

                      {/* Label values inside triangle */}
                      <text x={xA + 8} y={yA - 4} className="text-[6px] font-black fill-blue-800">A ({p6AngleA}°)</text>
                      <text x={xB - 22} y={yB - 4} className="text-[6px] font-black fill-pink-800">B ({p6AngleB}°)</text>
                      <text x={xC - 5} y={yC + 11} className="text-[6px] font-black fill-amber-800" textAnchor="middle">C ({angleC}°)</text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        );
      }
      case 'p1_length': {
        const diff = p1LengthA - p1LengthB;
        const stateMsg = diff > 0 
          ? `Pencil A is ${diff} blocks longer than Pencil B!` 
          : diff < 0 
            ? `Pencil B is ${Math.abs(diff)} blocks longer than Pencil A!` 
            : "Both pencils are exactly the same length!";
        return (
          <div id="p1-length-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Drag the sliders to compare the lengths of Pencil A and Pencil B. Counting block units is how we learn to measure!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl border border-amber-100">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-amber-800 mb-1">
                    <span>Pencil A: {p1LengthA} blocks</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={p1LengthA} 
                    onChange={(e) => setP1LengthA(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Pencil B: {p1LengthB} blocks</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={p1LengthB} 
                    onChange={(e) => setP1LengthB(parseInt(e.target.value))}
                    className="w-full accent-slate-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md text-center flex flex-col justify-center">
                <span className="text-[10px] text-amber-300 font-black uppercase tracking-wider mb-2">Length Comparison</span>
                <div className="text-base font-bold text-emerald-400">
                  {stateMsg}
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Subtract lengths: {Math.max(p1LengthA, p1LengthB)} - {Math.min(p1LengthA, p1LengthB)} = {Math.abs(diff)} unit difference!
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-amber-200 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-16 font-bold text-xs text-amber-700">Pencil A:</span>
                <div className="flex gap-1 flex-1 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                  {Array.from({ length: p1LengthA }).map((_, idx) => (
                    <motion.div 
                      key={`a_${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-8 flex-1 bg-amber-400 rounded-md border border-amber-500/20 flex items-center justify-center text-[10px] font-black text-amber-900 shadow-xs"
                    >
                      {idx + 1}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-16 font-bold text-xs text-slate-600">Pencil B:</span>
                <div className="flex gap-1 flex-1 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                  {Array.from({ length: p1LengthB }).map((_, idx) => (
                    <motion.div 
                      key={`b_${idx}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-8 flex-1 bg-slate-400 rounded-md border border-slate-500/20 flex items-center justify-center text-[10px] font-black text-slate-100 shadow-xs"
                    >
                      {idx + 1}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'p2_money': {
        const totalPaid = p2PaidDollar + (p2PaidCent / 100);
        const change = totalPaid - p2ToyCost;
        const isEnough = totalPaid >= p2ToyCost;

        return (
          <div id="p2-money-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Let's buy a Toy! Select a toy, then click the coins and dollar notes to place them into the cash tray to pay.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Toy selector */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-3">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider block">1. Select Toy</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: '🧸 Teddy Bear', price: 2.50 },
                    { name: '🤖 Toy Robot', price: 4.80 },
                    { name: '🚗 Race Car', price: 3.20 },
                    { name: '🎈 Balloon Set', price: 1.50 }
                  ].map((toy) => (
                    <button
                      key={toy.name}
                      onClick={() => {
                        setP2ToyCost(toy.price);
                        setP2PaidDollar(0);
                        setP2PaidCent(0);
                      }}
                      className={`p-2 rounded-lg text-xs font-black border-2 transition text-left cursor-pointer ${
                        p2ToyCost === toy.price 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>{toy.name}</div>
                      <div className="text-indigo-600 mt-0.5">${toy.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment interface */}
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">2. Put Cash in Tray</span>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setP2PaidDollar(prev => prev + 1)}
                      className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 py-1.5 rounded-lg font-black text-xs text-slate-800 shadow-xs cursor-pointer"
                    >
                      +$1.00 Note
                    </button>
                    <button 
                      onClick={() => setP2PaidDollar(prev => prev + 2)}
                      className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 py-1.5 rounded-lg font-black text-xs text-slate-800 shadow-xs cursor-pointer"
                    >
                      +$2.00 Note
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setP2PaidCent(prev => prev + 50)}
                      className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 py-1.5 rounded-lg font-black text-xs text-slate-800 shadow-xs cursor-pointer"
                    >
                      +50¢ Coin
                    </button>
                    <button 
                      onClick={() => setP2PaidCent(prev => prev + 20)}
                      className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 py-1.5 rounded-lg font-black text-xs text-slate-800 shadow-xs cursor-pointer"
                    >
                      +20¢ Coin
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setP2PaidDollar(0);
                      setP2PaidCent(0);
                    }}
                    className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-1 rounded-lg font-bold text-[10px] uppercase cursor-pointer"
                  >
                    Reset Tray
                  </button>
                </div>
              </div>

              {/* Checkout monitor */}
              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md flex flex-col justify-between text-center">
                <div>
                  <span className="text-[10px] text-indigo-300 font-black uppercase tracking-wider block mb-1">Receipt & Change</span>
                  <div className="space-y-1 text-xs border-b border-slate-700 pb-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Item Cost:</span>
                      <span className="font-bold">${p2ToyCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cash Tray:</span>
                      <span className="font-bold text-emerald-400">${totalPaid.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  {isEnough ? (
                    <div className="space-y-1">
                      <div className="text-2xl font-black text-emerald-400 animate-bounce">
                        Change: ${change.toFixed(2)}
                      </div>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-black">
                        COMPLETED! 🎉
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-lg font-black text-rose-400">
                        Need ${(p2ToyCost - totalPaid).toFixed(2)} more
                      </div>
                      <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full font-black">
                        WAITING FOR CASH...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'p3_area_perimeter': {
        const area = p3AreaWidth * p3AreaHeight;
        const perimeter = 2 * (p3AreaWidth + p3AreaHeight);

        return (
          <div id="p3-area-peri-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Adjust the Width and Height to see how Area (inside squares) and Perimeter (outer border) change dynamically!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-indigo-800 mb-1">
                    <span>Width: {p3AreaWidth} meters</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="8" 
                    value={p3AreaWidth} 
                    onChange={(e) => setP3AreaWidth(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-pink-800 mb-1">
                    <span>Height: {p3AreaHeight} meters</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="6" 
                    value={p3AreaHeight} 
                    onChange={(e) => setP3AreaHeight(parseInt(e.target.value))}
                    className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={() => setP3ShowGrid(!p3ShowGrid)}
                    className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-black text-slate-700 shadow-xs cursor-pointer"
                  >
                    {p3ShowGrid ? 'Hide Grid Numbers' : 'Show Grid Numbers'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md text-center flex flex-col justify-center space-y-3">
                <div>
                  <span className="text-[10px] text-indigo-300 font-black uppercase tracking-wider">Area (Inside Space)</span>
                  <div className="text-2xl font-black text-indigo-400">
                    {p3AreaWidth} × {p3AreaHeight} = {area} sq m
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-2">
                  <span className="text-[10px] text-rose-300 font-black uppercase tracking-wider">Perimeter (Outer Border)</span>
                  <div className="text-2xl font-black text-rose-400">
                    2 × ({p3AreaWidth} + {p3AreaHeight}) = {perimeter} m
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-indigo-200 flex justify-center items-center">
              <div className="flex flex-col gap-1 p-2 bg-indigo-50/20 rounded-xl border border-indigo-100">
                {Array.from({ length: p3AreaHeight }).map((_, rIdx) => (
                  <div key={rIdx} className="flex gap-1">
                    {Array.from({ length: p3AreaWidth }).map((_, cIdx) => {
                      const count = rIdx * p3AreaWidth + cIdx + 1;
                      const isBorder = rIdx === 0 || rIdx === p3AreaHeight - 1 || cIdx === 0 || cIdx === p3AreaWidth - 1;
                      return (
                        <motion.div 
                          key={cIdx}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black border transition ${
                            isBorder 
                              ? 'border-rose-400 bg-rose-50 text-rose-800 shadow-xs' 
                              : 'border-indigo-200 bg-indigo-50/50 text-indigo-800'
                          }`}
                        >
                          {p3ShowGrid ? count : ''}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 'p4_decimals': {
        const fracStr = `${p4DeciVal}/10`;
        const decimalStr = `0.${p4DeciVal}`;

        return (
          <div id="p4-decimals-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Move the slider to shade the fraction. See how Tenths translate directly into decimals on the jumping number line!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-pink-50/50 p-4 rounded-xl border border-pink-100">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-pink-800 mb-1">
                    <span>Shaded Parts: {p4DeciVal} Tenths</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={p4DeciVal} 
                    onChange={(e) => setP4DeciVal(parseInt(e.target.value))}
                    className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md text-center flex flex-col justify-center gap-3">
                <div className="flex justify-around items-center">
                  <div>
                    <span className="text-[10px] text-pink-300 font-black uppercase tracking-wider block mb-1">Fraction</span>
                    <span className="text-3xl font-black text-pink-400">{fracStr}</span>
                  </div>
                  <div className="text-xl text-slate-500 font-black">=</div>
                  <div>
                    <span className="text-[10px] text-emerald-300 font-black uppercase tracking-wider block mb-1">Decimal</span>
                    <span className="text-3xl font-black text-emerald-400">{decimalStr}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shaded blocks display */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-pink-200 space-y-4">
              <div className="w-full flex h-10 bg-slate-100 rounded-xl border border-pink-100 overflow-hidden shadow-xs">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-full flex-1 border-r border-pink-100 last:border-0 transition-colors ${
                      idx < p4DeciVal ? 'bg-pink-400' : 'bg-slate-50'
                    }`}
                  />
                ))}
              </div>

              {/* Number Line with animal avatar jumping */}
              <div className="relative h-16 bg-slate-50 rounded-xl border border-slate-100 px-4 flex flex-col justify-end pb-2 overflow-visible">
                <div className="absolute left-0 right-0 h-0.5 bg-slate-300 bottom-4 mx-4"></div>
                {/* Tick marks */}
                <div className="flex justify-between relative px-2">
                  {Array.from({ length: 11 }).map((_, idx) => {
                    const val = idx / 10;
                    const isJumpTarget = idx === p4DeciVal;
                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        <div className={`w-0.5 h-2 ${isJumpTarget ? 'bg-emerald-500 h-3' : 'bg-slate-400'} mb-1`}></div>
                        <span className={`text-[9px] font-black ${isJumpTarget ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {val.toFixed(1)}
                        </span>
                        {isJumpTarget && (
                          <motion.span 
                            key={idx}
                            initial={{ y: -25, scale: 0.5 }}
                            animate={{ y: -38, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="absolute text-xl select-none"
                          >
                            🐸
                          </motion.span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'p5_volume': {
        const volume = p5VolL * p5VolW * p5VolH;

        return (
          <div id="p5-volume-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Build a 3D cuboid with 1-cm blocks! Adjust the sliders to see how Length, Width, and Height combine to make Volume.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50/50 p-4 rounded-xl border border-teal-100">
              <div className="space-y-3">
                <div className="bg-white px-3 py-2 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-teal-800 mb-0.5">
                    <span>Length (l): {p5VolL} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={p5VolL} 
                    onChange={(e) => setP5VolL(parseInt(e.target.value))}
                    className="w-full accent-teal-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="bg-white px-3 py-2 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-teal-800 mb-0.5">
                    <span>Width (w): {p5VolW} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={p5VolW} 
                    onChange={(e) => setP5VolW(parseInt(e.target.value))}
                    className="w-full accent-teal-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="bg-white px-3 py-2 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-teal-800 mb-0.5">
                    <span>Height (h): {p5VolH} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={p5VolH} 
                    onChange={(e) => setP5VolH(parseInt(e.target.value))}
                    className="w-full accent-teal-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md text-center flex flex-col justify-center space-y-2">
                <span className="text-[10px] text-teal-300 font-black uppercase tracking-wider block">Volume Formula</span>
                <div className="text-xs font-medium text-slate-300">
                  Length × Width × Height
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  {p5VolL} × {p5VolW} × {p5VolH}
                </div>
                <div className="text-3xl font-black text-white mt-1">
                  = {volume} <span className="text-xs text-slate-400 font-bold">cubic cm</span>
                </div>
              </div>
            </div>

            {/* Isometric 3D styled blocks stacking render */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-teal-200 flex flex-col items-center gap-4">
              <span className="text-xs font-black text-teal-800 uppercase tracking-wider">
                Layers Visualizer: {p5VolH} layers of ({p5VolL}×{p5VolW}) blocks
              </span>
              <div className="flex flex-wrap gap-4 justify-center">
                {Array.from({ length: p5VolH }).map((_, layerIdx) => (
                  <div key={layerIdx} className="bg-teal-50 p-2 rounded-xl border border-teal-200 text-center relative shadow-xs">
                    <span className="text-[9px] font-black text-teal-800 absolute -top-2 left-2 bg-white px-1 border border-teal-200 rounded">
                      Layer {layerIdx + 1}
                    </span>
                    <div className="flex flex-col gap-1 mt-1">
                      {Array.from({ length: p5VolW }).map((_, rIdx) => (
                        <div key={rIdx} className="flex gap-1">
                          {Array.from({ length: p5VolL }).map((_, cIdx) => (
                            <motion.div 
                              key={cIdx}
                              initial={{ scale: 0.7 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-teal-400 rounded border border-teal-500 shadow-xs"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 'p6_speed': {
        const distance = p6Speed * p6Time;

        return (
          <div id="p6-speed-explainer" className="space-y-6">
            <p className="text-sm text-slate-600 font-medium text-center">
              Explore Constant Speed motion! Set the Car Speed and the Travel Time, then click "Go Car Go!" to watch the simulation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-orange-800 mb-1">
                    <span>Speed (S): {p6Speed} meters / second</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="50" 
                    step="5"
                    value={p6Speed} 
                    onChange={(e) => setP6Speed(parseInt(e.target.value))}
                    className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-orange-800 mb-1">
                    <span>Time (T): {p6Time} seconds</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={p6Time} 
                    onChange={(e) => setP6Time(parseInt(e.target.value))}
                    className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setP6IsDriving(true);
                      setTimeout(() => setP6IsDriving(false), p6Time * 1000);
                    }}
                    disabled={p6IsDriving}
                    className={`px-6 py-2.5 rounded-xl font-black text-sm shadow-md transition ${
                      p6IsDriving 
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white cursor-pointer'
                    }`}
                  >
                    {p6IsDriving ? '🏎️ Zooming...' : 'Go Car Go! 🏎️'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md text-center flex flex-col justify-center space-y-2">
                <span className="text-[10px] text-orange-300 font-black uppercase tracking-wider block">Formula: Distance = Speed × Time</span>
                <div className="text-xs text-slate-400">
                  {p6Speed} m/s for {p6Time}s
                </div>
                <div className="text-4xl font-black text-orange-400 mt-2">
                  {distance} <span className="text-lg text-slate-200 font-extrabold">meters</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  A faster speed or more time lets the car travel further!
                </p>
              </div>
            </div>

            {/* Racetrack Visual Animation */}
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-orange-200 min-h-[160px] flex flex-col justify-center relative overflow-hidden">
              <div className="w-full h-8 bg-slate-800 rounded-lg relative flex items-center border-y-4 border-dashed border-yellow-400">
                {/* Distance markers */}
                <div className="absolute inset-0 flex justify-between px-6 opacity-40 text-[9px] font-mono text-white items-center pointer-events-none">
                  <span>0m</span>
                  <span>50m</span>
                  <span>100m</span>
                  <span>150m</span>
                  <span>200m</span>
                  <span>250m</span>
                </div>

                <motion.div 
                  key={p6IsDriving ? "driving" : "stopped"}
                  initial={{ x: 10 }}
                  animate={p6IsDriving ? { x: '85%' } : { x: 10 }}
                  transition={{ duration: p6Time, ease: "linear" }}
                  className="text-2xl select-none relative z-10"
                >
                  🏎️
                </motion.div>
              </div>

              {p6IsDriving && (
                <div className="text-center mt-3 text-xs font-black text-orange-600 animate-pulse">
                  Driving at {p6Speed} meters/second... Time elapsed!
                </div>
              )}
            </div>
          </div>
        );
      }
      default:
        return (
          <div className="p-4 bg-amber-50 rounded-lg flex items-center gap-2">
            <ShieldAlert className="text-amber-500 w-5 h-5" />
            <span className="text-sm text-amber-800 font-bold">Interactive demonstration coming soon! Let's build it next.</span>
          </div>
        );
    }
  };

  return (
    <div id="math-explainer-panel" className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Lesson Station
          </span>
          <h3 className="text-xl font-black text-slate-800 mt-1">Interactive Lesson Playground</h3>
        </div>
        <button
          id="btn-quiz-start"
          onClick={onStartQuiz}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-extrabold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-200" /> Take Chapter Quiz
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="border-t border-slate-100 pt-4">
        {renderInteractiveVisual()}
      </div>
    </div>
  );
};
