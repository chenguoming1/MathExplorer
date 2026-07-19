import { Grade, RewardItem, MathTopic } from '../types';

export const mathTopics: MathTopic[] = [
  // Primary 1
  {
    id: 'p1_addition',
    title: 'Addition & Subtraction to 20',
    description: 'Learn to add and subtract fun items like apples and stars up to 20!',
    grade: Grade.P1,
    icon: 'Plus'
  },
  {
    id: 'p1_shapes',
    title: 'Shapes & Patterns',
    description: 'Discover circles, triangles, rectangles, and how patterns repeat.',
    grade: Grade.P1,
    icon: 'Shapes'
  },
  {
    id: 'p1_length',
    title: 'Length & Comparing Sizes',
    description: 'Learn to measure and compare lengths of objects using block units and rulers!',
    grade: Grade.P1,
    icon: 'Compass'
  },

  // Primary 2
  {
    id: 'p2_place_value',
    title: 'Place Value: Hundreds, Tens & Ones',
    description: 'Unpack numbers into hundreds, tens, and ones using modular blocks.',
    grade: Grade.P2,
    icon: 'Grid3X3'
  },
  {
    id: 'p2_multiplication',
    title: 'Groups & Multiplication',
    description: 'Learn multiplication as equal groups of items!',
    grade: Grade.P2,
    icon: 'X'
  },
  {
    id: 'p2_money',
    title: 'Money: Dollars & Cents',
    description: 'Count coins and dollar notes, buy fun toys, and practice making change!',
    grade: Grade.P2,
    icon: 'Coins'
  },

  // Primary 3
  {
    id: 'p3_division',
    title: 'Sharing & Division',
    description: 'Share cookies or toys equally to find out how division works!',
    grade: Grade.P3,
    icon: 'Divide'
  },
  {
    id: 'p3_fractions_intro',
    title: 'Introduction to Fractions',
    description: 'Slice the pizza and understand halves, quarters, and thirds!',
    grade: Grade.P3,
    icon: 'PieChart'
  },
  {
    id: 'p3_area_perimeter',
    title: 'Area & Perimeter',
    description: 'Measure the space inside and around shapes using visual grids!',
    grade: Grade.P3,
    icon: 'Grid3X3'
  },

  // Primary 4
  {
    id: 'p4_fractions_advanced',
    title: 'Equivalent Fractions & Adding',
    description: 'Find equivalent fractions and learn to add them with visual helpers.',
    grade: Grade.P4,
    icon: 'Percent'
  },
  {
    id: 'p4_angles',
    title: 'Angles & Protractor',
    description: 'Measure acute, obtuse, and right angles with an interactive protractor.',
    grade: Grade.P4,
    icon: 'Compass'
  },
  {
    id: 'p4_decimals',
    title: 'Decimals & Tenths',
    description: 'Explore parts of a whole with decimals, place values, and jumping number lines!',
    grade: Grade.P4,
    icon: 'Percent'
  },

  // Primary 5
  {
    id: 'p5_percentages',
    title: 'Percentages & Decimals',
    description: 'Convert fractions to decimals and percentages using grid displays.',
    grade: Grade.P5,
    icon: 'Sparkles'
  },
  {
    id: 'p5_ratios',
    title: 'Ratios & Averages',
    description: 'Compare quantities using ratios and find the middle average score.',
    grade: Grade.P5,
    icon: 'Scale'
  },
  {
    id: 'p5_volume',
    title: 'Volume of Cuboids',
    description: 'Build 3D shapes with unit blocks and calculate their total volume!',
    grade: Grade.P5,
    icon: 'Shapes'
  },

  // Primary 6
  {
    id: 'p6_algebra',
    title: 'Introduction to Algebra',
    description: 'Solve equations using a visual balancing scale with x blocks.',
    grade: Grade.P6,
    icon: 'Variable'
  },
  {
    id: 'p6_geometry',
    title: 'Advanced Geometry',
    description: 'Find missing angles in triangles, circles, and 3D shapes.',
    grade: Grade.P6,
    icon: 'Triangle'
  },
  {
    id: 'p6_speed',
    title: 'Speed, Distance & Time',
    description: 'Animate cars on a race track and solve Speed, Distance, and Time formulas!',
    grade: Grade.P6,
    icon: 'Flame'
  }
];

export const rewardCatalog: RewardItem[] = [
  // Avatars
  { id: 'av_owl', name: 'Smart Owl', cost: 50, type: 'avatar', value: '🦉', description: 'A wise owl ready to tackle hard math equations.' },
  { id: 'av_ninja', name: 'Math Ninja', cost: 100, type: 'avatar', value: '🥷', description: 'Silent, quick, and masters numbers in the blink of an eye.' },
  { id: 'av_dino', name: 'Pixel Dino', cost: 150, type: 'avatar', value: '🦖', description: 'A cute prehistoric friend who loves big numbers!' },
  { id: 'av_astronaut', name: 'Space Cadet', cost: 200, type: 'avatar', value: '🚀', description: 'Exploring the outer galaxies of mathematical formulas.' },
  { id: 'av_robot', name: 'Robo-Math 3000', cost: 300, type: 'avatar', value: '🤖', description: 'A futuristic computer buddy with extreme calculation power.' },

  // Pets
  { id: 'pet_dragon', name: 'Sparky the Dragon', cost: 120, type: 'pet', value: '🐉', description: 'A tiny dragon who breathes colorful mathematical sparkles.' },
  { id: 'pet_penguin', name: 'Pip the Penguin', cost: 180, type: 'pet', value: '🐧', description: 'Keeps cool during tough tests and waddles with joy.' },
  { id: 'pet_axolotl', name: 'Bubbles Axolotl', cost: 250, type: 'pet', value: '🦎', description: 'A bubbly, smiling buddy that floats around your profile.' },
  { id: 'pet_phoenix', name: 'Aero the Phoenix', cost: 350, type: 'pet', value: '🦅', description: 'A majestic bird of light representing math mastery!' },

  // Stickers
  { id: 'st_perfect', name: 'Perfect 100!', cost: 25, type: 'sticker', value: '💯', description: 'A gold emblem for scoring a perfect run.' },
  { id: 'st_streak', name: 'Streak Star', cost: 40, type: 'sticker', value: '🔥', description: 'Showcases your consistency and dedication.' },
  { id: 'st_brain', name: 'Super Brain', cost: 60, type: 'sticker', value: '🧠', description: 'Unlocked after tackling advanced brainteasers!' },
  { id: 'st_trophy', name: 'Championship Trophy', cost: 100, type: 'sticker', value: '🏆', description: 'A glorious trophy representing absolute commitment.' }
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  visualData?: any; // Extra parameters to render a custom graphic
}

// Generate dynamic questions based on Topic and Grade
export function generateQuizQuestions(topicId: string, count: number = 5): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `${topicId}_q_${i}`;
    if (topicId === 'p1_addition') {
      const num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const isPlus = Math.random() > 0.4;
      if (isPlus) {
        const sum = num1 + num2;
        const wrongOpts = new Set<number>();
        while (wrongOpts.size < 3) {
          const bad = sum + (Math.floor(Math.random() * 5) - 2);
          if (bad !== sum && bad > 0) wrongOpts.add(bad);
        }
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, sum);

        questions.push({
          id: qId,
          question: `What is ${num1} + ${num2}? Count the visual items to help you!`,
          options: options.map(String),
          correctIndex,
          hint: `Start with ${num1} and count ${num2} more forward.`,
          visualData: { type: 'addition', num1, num2, isPlus: true }
        });
      } else {
        const max = Math.max(num1, num2);
        const min = Math.min(num1, num2);
        const diff = max - min;
        const wrongOpts = new Set<number>();
        while (wrongOpts.size < 3) {
          const bad = diff + (Math.floor(Math.random() * 5) - 2);
          if (bad !== diff && bad >= 0) wrongOpts.add(bad);
        }
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, diff);

        questions.push({
          id: qId,
          question: `What is ${max} - ${min}? Look at the circles and take some away!`,
          options: options.map(String),
          correctIndex,
          hint: `If you have ${max} items and you remove ${min}, how many are remaining?`,
          visualData: { type: 'addition', num1: max, num2: min, isPlus: false }
        });
      }
    } else if (topicId === 'p1_shapes') {
      const shapes = ['circle', 'triangle', 'square', 'star'];
      const currentShape = shapes[Math.floor(Math.random() * shapes.length)];
      let sides = 0;
      if (currentShape === 'circle') sides = 0;
      else if (currentShape === 'triangle') sides = 3;
      else if (currentShape === 'square') sides = 4;
      else if (currentShape === 'star') sides = 10; // outer corners or vertices

      const questionType = Math.random() > 0.5 ? 'sides' : 'identify';
      if (questionType === 'sides') {
        const questionText = `How many sides does a ${currentShape} have?`;
        const ans = sides;
        const wrongOpts = new Set<number>([ans + 1, ans + 2, ans - 1 >= 0 ? ans - 1 : ans + 3]);
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, ans);

        questions.push({
          id: qId,
          question: questionText,
          options: options.map(String),
          correctIndex,
          hint: `Picture a ${currentShape} in your head or on the screen. Count its straight edges!`,
          visualData: { type: 'shape', shape: currentShape }
        });
      } else {
        const questionText = `Which shape has ${sides} sides?`;
        const options = [...shapes];
        const correctIndex = options.indexOf(currentShape);

        questions.push({
          id: qId,
          question: questionText,
          options: options.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
          correctIndex,
          hint: `Look for the shape that matches the number of sides: ${sides}.`,
          visualData: { type: 'shape', shape: currentShape }
        });
      }
    } else if (topicId === 'p2_place_value') {
      const h = Math.floor(Math.random() * 3) + 1; // 100s: 1-3
      const t = Math.floor(Math.random() * 8) + 1; // 10s: 1-8
      const o = Math.floor(Math.random() * 9);     // 1s: 0-9
      const numberValue = h * 100 + t * 10 + o;

      const askType = Math.random() > 0.5 ? 'assemble' : 'disassemble';
      if (askType === 'assemble') {
        const options = [
          numberValue,
          numberValue + (Math.random() > 0.5 ? 10 : -10),
          numberValue + (Math.random() > 0.5 ? 100 : -100),
          numberValue + (Math.floor(Math.random() * 5) - 2)
        ].map(String);
        // deduplicate
        const uniqueOpts = Array.from(new Set(options));
        while (uniqueOpts.length < 4) {
          uniqueOpts.push(String(numberValue + Math.floor(Math.random() * 50) + 1));
        }
        const finalOpts = uniqueOpts.slice(0, 4);
        let correctIndex = finalOpts.indexOf(String(numberValue));
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = String(numberValue);
        }

        questions.push({
          id: qId,
          question: `What number is shown by the blocks: ${h} hundreds, ${t} tens, and ${o} ones?`,
          options: finalOpts,
          correctIndex,
          hint: `${h} hundreds is ${h * 100}. ${t} tens is ${t * 10}. ${o} ones is ${o}. Add them together!`,
          visualData: { type: 'place_value', h, t, o }
        });
      } else {
        const val = t;
        const options = [
          `${val} tens`,
          `${val} hundreds`,
          `${val} ones`,
          `${h} tens`
        ];
        const correctIndex = 0;

        questions.push({
          id: qId,
          question: `In the number ${numberValue}, what does the digit ${t} represent?`,
          options: options,
          correctIndex,
          hint: `Look at the position of ${t} in ${numberValue}. It is in the middle column!`,
          visualData: { type: 'place_value', h, t, o }
        });
      }
    } else if (topicId === 'p2_multiplication') {
      const groups = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const itemsPerGroup = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const product = groups * itemsPerGroup;

      const wrongOpts = new Set<number>();
      while (wrongOpts.size < 3) {
        const bad = product + (Math.floor(Math.random() * 5) - 2) * (Math.random() > 0.5 ? 1 : 2);
        if (bad !== product && bad > 0) wrongOpts.add(bad);
      }
      const options = Array.from(wrongOpts);
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, product);

      questions.push({
        id: qId,
        question: `We have ${groups} groups. Each group has ${itemsPerGroup} stars. How many stars in total?`,
        options: options.map(String),
        correctIndex,
        hint: `This is the same as ${groups} multiplied by ${itemsPerGroup}, or ${groups} x ${itemsPerGroup}!`,
        visualData: { type: 'multiplication', groups, itemsPerGroup }
      });
    } else if (topicId === 'p3_division') {
      const itemsPerGroup = Math.floor(Math.random() * 3) + 3; // 3 to 5
      const groups = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const total = itemsPerGroup * groups;

      const options = [
        String(itemsPerGroup),
        String(groups),
        String(total),
        String(itemsPerGroup + 1)
      ];
      // Shuffle options but maintain correct index
      const correctAns = String(itemsPerGroup);
      const uniqueOpts = Array.from(new Set(options));
      while (uniqueOpts.length < 4) {
        uniqueOpts.push(String(itemsPerGroup + Math.floor(Math.random() * 5) + 2));
      }
      const finalOpts = uniqueOpts.slice(0, 4);
      let correctIndex = finalOpts.indexOf(correctAns);
      if (correctIndex === -1) {
        correctIndex = Math.floor(Math.random() * 4);
        finalOpts[correctIndex] = correctAns;
      }

      questions.push({
        id: qId,
        question: `If you divide ${total} cookies equally among ${groups} children, how many cookies does each child get?`,
        options: finalOpts,
        correctIndex,
        hint: `Divide the total of ${total} cookies into ${groups} equal groups. ${groups} x ? = ${total}.`,
        visualData: { type: 'division', total, groups }
      });
    } else if (topicId === 'p3_fractions_intro') {
      const denominators = [2, 3, 4, 6, 8];
      const den = denominators[Math.floor(Math.random() * denominators.length)];
      const num = Math.floor(Math.random() * (den - 1)) + 1; // 1 to den-1

      const wrongOpts = new Set<string>();
      while (wrongOpts.size < 3) {
        const badNum = Math.floor(Math.random() * den) + 1;
        const badDen = denominators[Math.floor(Math.random() * denominators.length)];
        const str = `${badNum}/${badDen}`;
        if (str !== `${num}/${den}` && badNum < badDen) {
          wrongOpts.add(str);
        }
      }
      const options = Array.from(wrongOpts);
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, `${num}/${den}`);

      questions.push({
        id: qId,
        question: `What fraction of the pizza is shaded in the diagram?`,
        options,
        correctIndex,
        hint: `Count the shaded slices as the top number (numerator), and the total slices as the bottom number (denominator).`,
        visualData: { type: 'fractions', num, den }
      });
    } else if (topicId === 'p4_fractions_advanced') {
      // equivalent or add with same denominator
      const isAdd = Math.random() > 0.5;
      if (isAdd) {
        const den = Math.random() > 0.5 ? 8 : 6;
        const num1 = Math.floor(Math.random() * 3) + 1;
        const num2 = Math.floor(Math.random() * 2) + 1;
        const sumNum = num1 + num2;

        const options = [
          `${sumNum}/${den}`,
          `${num1 + num2 + 1}/${den}`,
          `${num1}/${den}`,
          `${sumNum}/${den * 2}`
        ];
        const finalOpts = Array.from(new Set(options)).slice(0, 4);
        while (finalOpts.length < 4) {
          finalOpts.push(`${Math.floor(Math.random() * 5) + 1}/${den}`);
        }
        let correctIndex = finalOpts.indexOf(`${sumNum}/${den}`);
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = `${sumNum}/${den}`;
        }

        questions.push({
          id: qId,
          question: `What is the sum of ${num1}/${den} + ${num2}/${den}?`,
          options: finalOpts,
          correctIndex,
          hint: `Since the denominators (bottom numbers) are the same, just add the numerators (top numbers) together!`,
          visualData: { type: 'fraction_math', num1, num2, den, op: '+' }
        });
      } else {
        // equivalent fraction
        const baseNum = 1 + Math.floor(Math.random() * 3); // 1 to 3
        const baseDen = baseNum + 1 + Math.floor(Math.random() * 3); // baseNum+1 to baseNum+3
        const mult = 2 + Math.floor(Math.random() * 2); // 2 or 3
        const targetNum = baseNum * mult;
        const targetDen = baseDen * mult;

        const options = [
          `${targetNum}/${targetDen}`,
          `${targetNum + 1}/${targetDen}`,
          `${targetNum}/${targetDen + 2}`,
          `${targetNum - 1}/${targetDen - 1}`
        ];
        const finalOpts = Array.from(new Set(options)).slice(0, 4);
        let correctIndex = finalOpts.indexOf(`${targetNum}/${targetDen}`);
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = `${targetNum}/${targetDen}`;
        }

        questions.push({
          id: qId,
          question: `Find the equivalent fraction! ${baseNum}/${baseDen} is equal to ? / ${targetDen}`,
          options: finalOpts,
          correctIndex,
          hint: `What do you multiply ${baseDen} by to get ${targetDen}? Multiply the top number ${baseNum} by the same amount!`,
          visualData: { type: 'fraction_math', num1: baseNum, den: baseDen, mult, op: '=' }
        });
      }
    } else if (topicId === 'p4_angles') {
      const angles = [30, 45, 60, 90, 120, 135, 150];
      const targetAngle = angles[Math.floor(Math.random() * angles.length)];

      const wrongOpts = new Set<number>();
      while (wrongOpts.size < 3) {
        const bad = targetAngle + (Math.floor(Math.random() * 4) - 2) * 15;
        if (bad !== targetAngle && bad > 0 && bad < 180) wrongOpts.add(bad);
      }
      const options = Array.from(wrongOpts);
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, targetAngle);

      questions.push({
        id: qId,
        question: `Look at the angle indicator on the protractor. What is the size of this angle in degrees?`,
        options: options.map(a => `${a}°`),
        correctIndex,
        hint: `Line up the baseline with 0 and see where the orange needle points on the outer scale. It is ${targetAngle < 90 ? 'smaller' : 'larger'} than a right angle (90°).`,
        visualData: { type: 'angle', angle: targetAngle }
      });
    } else if (topicId === 'p5_percentages') {
      const valuePercent = [10, 25, 40, 50, 75, 80][Math.floor(Math.random() * 6)];
      const decimalValue = valuePercent / 100;

      const askType = Math.random() > 0.5 ? 'percent_to_decimal' : 'decimal_to_percent';
      if (askType === 'percent_to_decimal') {
        const options = [
          String(decimalValue),
          String(decimalValue * 10),
          String(decimalValue / 10),
          String(1 - decimalValue)
        ];
        const finalOpts = Array.from(new Set(options)).slice(0, 4);
        while (finalOpts.length < 4) {
          finalOpts.push(String(Math.random().toFixed(2)));
        }
        let correctIndex = finalOpts.indexOf(String(decimalValue));
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = String(decimalValue);
        }

        questions.push({
          id: qId,
          question: `Express ${valuePercent}% as a decimal number.`,
          options: finalOpts,
          correctIndex,
          hint: `Percent means 'out of 100'. So ${valuePercent}% is ${valuePercent} divided by 100. Move the decimal point 2 spaces left!`,
          visualData: { type: 'percentage', percent: valuePercent }
        });
      } else {
        const options = [
          `${valuePercent}%`,
          `${valuePercent / 10}%`,
          `${valuePercent * 10}%`,
          `${100 - valuePercent}%`
        ];
        const finalOpts = Array.from(new Set(options)).slice(0, 4);
        let correctIndex = finalOpts.indexOf(`${valuePercent}%`);
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = `${valuePercent}%`;
        }

        questions.push({
          id: qId,
          question: `Convert the decimal ${decimalValue.toFixed(2)} into a percentage.`,
          options: finalOpts,
          correctIndex,
          hint: `Multiply the decimal by 100 and add the percentage sign (%)!`,
          visualData: { type: 'percentage', percent: valuePercent }
        });
      }
    } else if (topicId === 'p5_ratios') {
      const itemA = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const itemB = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const factor = Math.random() > 0.5 ? 2 : 3;

      const totalA = itemA * factor;
      const totalB = itemB * factor;

      const options = [
        `${itemA}:${itemB}`,
        `${itemB}:${itemA}`,
        `${itemA + 1}:${itemB}`,
        `${itemA}:${itemB + 1}`
      ];
      const finalOpts = Array.from(new Set(options)).slice(0, 4);
      let correctIndex = finalOpts.indexOf(`${itemA}:${itemB}`);
      if (correctIndex === -1) {
        correctIndex = Math.floor(Math.random() * 4);
        finalOpts[correctIndex] = `${itemA}:${itemB}`;
      }

      questions.push({
        id: qId,
        question: `There are ${totalA} blue marbles and ${totalB} green marbles. What is the simplest ratio of blue to green marbles?`,
        options: finalOpts,
        correctIndex,
        hint: `Divide both ${totalA} and ${totalB} by their common factor of ${factor} to simplify the ratio.`,
        visualData: { type: 'ratio', totalA, totalB }
      });
    } else if (topicId === 'p6_algebra') {
      const xVal = Math.floor(Math.random() * 6) + 2; // x is 2 to 7
      const constantLeft = Math.floor(Math.random() * 4) + 1; // 1 to 4
      const rightSide = xVal + constantLeft;

      const wrongOpts = new Set<number>();
      while (wrongOpts.size < 3) {
        const bad = xVal + (Math.floor(Math.random() * 5) - 2);
        if (bad !== xVal && bad > 0) wrongOpts.add(bad);
      }
      const options = Array.from(wrongOpts);
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, xVal);

      questions.push({
        id: qId,
        question: `Solve for x in the equation: x + ${constantLeft} = ${rightSide}`,
        options: options.map(String),
        correctIndex,
        hint: `Think of a balance scale. To find x, subtract ${constantLeft} from both sides of the scale!`,
        visualData: { type: 'algebra', x: xVal, cLeft: constantLeft, right: rightSide }
      });
    } else if (topicId === 'p6_geometry') {
      // find angle in triangle (180 - sum of other 2)
      const ang1 = Math.floor(Math.random() * 30) + 40; // 40 to 69
      const ang2 = Math.floor(Math.random() * 30) + 50; // 50 to 79
      const ang3 = 180 - ang1 - ang2;

      const wrongOpts = new Set<number>();
      while (wrongOpts.size < 3) {
        const bad = ang3 + (Math.floor(Math.random() * 5) - 2) * 5;
        if (bad !== ang3 && bad > 0 && bad < 180) wrongOpts.add(bad);
      }
      const options = Array.from(wrongOpts);
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, ang3);

      questions.push({
        id: qId,
        question: `In a triangle, two of the angles are ${ang1}° and ${ang2}°. What is the size of the third angle?`,
        options: options.map(a => `${a}°`),
        correctIndex,
        hint: `The sum of all angles in a triangle is always 180°. Add ${ang1} and ${ang2}, then subtract from 180!`,
        visualData: { type: 'triangle_angle', ang1, ang2, ang3 }
      });
    } else if (topicId === 'p1_length') {
      // Length comparison
      const lenA = Math.floor(Math.random() * 5) + 5; // 5 to 9
      const lenB = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const diff = lenA - lenB;
      const askLonger = Math.random() > 0.5;

      if (askLonger) {
        const wrongOpts = new Set<number>([diff + 1, diff + 2, diff - 1 >= 0 ? diff - 1 : diff + 3]);
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, diff);

        questions.push({
          id: qId,
          question: `Pencil A is ${lenA} blocks long and Pencil B is ${lenB} blocks long. How many blocks longer is Pencil A?`,
          options: options.map(String),
          correctIndex,
          hint: `Subtract the shorter length (${lenB}) from the longer length (${lenA}).`,
          visualData: { type: 'length_comp', lenA, lenB }
        });
      } else {
        const wrongOpts = new Set<number>([lenA, lenB, lenA + lenB]);
        while (wrongOpts.size < 3) {
          wrongOpts.add(Math.floor(Math.random() * 10) + 1);
        }
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, lenB);

        questions.push({
          id: qId,
          question: `Pencil A is ${lenA} blocks long and Pencil B is shorter. If Pencil B is the shorter one, which length could it be?`,
          options: options.map(String),
          correctIndex,
          hint: `Look for the number that is smaller than Pencil A's length: ${lenA} blocks.`,
          visualData: { type: 'length_comp', lenA, lenB }
        });
      }
    } else if (topicId === 'p2_money') {
      // Money math / buying toys
      const costDollar = Math.floor(Math.random() * 4) + 1; // $1 to $4
      const costCent = Math.random() > 0.5 ? 50 : 0;
      const totalCost = costDollar + costCent / 100;

      const payNote = costDollar >= 3 ? 10 : 5; // pay with $5 or $10
      const change = payNote - totalCost;

      const options = [
        `$${change.toFixed(2)}`,
        `$${(change + 0.50).toFixed(2)}`,
        `$${(change - 0.50 >= 0 ? change - 0.50 : change + 1.00).toFixed(2)}`,
        `$${(payNote - costDollar).toFixed(2)}`
      ];
      const finalOpts = Array.from(new Set(options)).slice(0, 4);
      while (finalOpts.length < 4) {
        finalOpts.push(`$${(Math.random() * 5 + 1).toFixed(2)}`);
      }
      let correctIndex = finalOpts.indexOf(`$${change.toFixed(2)}`);
      if (correctIndex === -1) {
        correctIndex = Math.floor(Math.random() * 4);
        finalOpts[correctIndex] = `$${change.toFixed(2)}`;
      }

      questions.push({
        id: qId,
        question: `You buy a toy for $${totalCost.toFixed(2)} and pay with a $${payNote} note. How much change do you get back?`,
        options: finalOpts,
        correctIndex,
        hint: `Subtract the cost of the toy ($${totalCost.toFixed(2)}) from your $${payNote} note.`,
        visualData: { type: 'money_change', cost: totalCost, pay: payNote }
      });
    } else if (topicId === 'p3_area_perimeter') {
      // Area and perimeter questions
      const width = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const height = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const isArea = Math.random() > 0.5;

      if (isArea) {
        const area = width * height;
        const wrongOpts = new Set<number>([area + 2, area - 2 > 0 ? area - 2 : area + 4, width + height]);
        while (wrongOpts.size < 3) {
          wrongOpts.add(area + Math.floor(Math.random() * 10) - 5);
        }
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, area);

        questions.push({
          id: qId,
          question: `A rectangular playground has a width of ${width} meters and a height of ${height} meters. What is its Area?`,
          options: options.map(o => `${o} sq m`),
          correctIndex,
          hint: `Area is the space inside. Use the formula: Width × Height. So multiply ${width} by ${height}!`,
          visualData: { type: 'area_peri_calc', w: width, h: height, isArea: true }
        });
      } else {
        const perimeter = 2 * (width + height);
        const wrongOpts = new Set<number>([width * height, width + height, perimeter + 2]);
        while (wrongOpts.size < 3) {
          wrongOpts.add(perimeter + Math.floor(Math.random() * 6) - 3);
        }
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, perimeter);

        questions.push({
          id: qId,
          question: `A rectangular table has a width of ${width} cm and a height of ${height} cm. What is its Perimeter (the distance around the outside)?`,
          options: options.map(o => `${o} cm`),
          correctIndex,
          hint: `Perimeter is the total length of all 4 outer sides: ${width} + ${height} + ${width} + ${height}.`,
          visualData: { type: 'area_peri_calc', w: width, h: height, isArea: false }
        });
      }
    } else if (topicId === 'p4_decimals') {
      // Fractions to decimals & tenths comparison
      const tenths = Math.floor(Math.random() * 8) + 1; // 1 to 8 tenths
      const isFractionToDecimal = Math.random() > 0.5;

      if (isFractionToDecimal) {
        const ansStr = `0.${tenths}`;
        const options = [`0.${tenths}`, `0.0${tenths}`, `${tenths}.0`, `0.${tenths + 1}`];
        const finalOpts = Array.from(new Set(options)).slice(0, 4);
        let correctIndex = finalOpts.indexOf(ansStr);
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = ansStr;
        }

        questions.push({
          id: qId,
          question: `Look at the fraction ${tenths}/10. What is this written as a decimal number?`,
          options: finalOpts,
          correctIndex,
          hint: `${tenths} tenths means ${tenths} out of 10 parts. In decimals, the first place after the dot represents tenths.`,
          visualData: { type: 'decimals_val', value: tenths }
        });
      } else {
        const targetDecimal = `0.${tenths}`;
        const options = [
          `${tenths}/10`,
          `1/${tenths}`,
          `${tenths}/100`,
          `${tenths + 1}/10`
        ];
        const finalOpts = Array.from(new Set(options)).slice(0, 4);
        let correctIndex = finalOpts.indexOf(`${tenths}/10`);
        if (correctIndex === -1) {
          correctIndex = Math.floor(Math.random() * 4);
          finalOpts[correctIndex] = `${tenths}/10`;
        }

        questions.push({
          id: qId,
          question: `What is the decimal number ${targetDecimal} written as a fraction in its simplest tenth form?`,
          options: finalOpts,
          correctIndex,
          hint: `The decimal ${targetDecimal} has ${tenths} in the tenths column, which is equivalent to ?/10.`,
          visualData: { type: 'decimals_val', value: tenths }
        });
      }
    } else if (topicId === 'p5_volume') {
      // Volume calculation
      const l = Math.floor(Math.random() * 3) + 3; // 3 to 5
      const w = Math.floor(Math.random() * 2) + 2; // 2 to 3
      const h = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const volume = l * w * h;

      const wrongOpts = new Set<number>([l + w + h, l * w, volume + 4, volume - 4 > 0 ? volume - 4 : volume + 10]);
      while (wrongOpts.size < 3) {
        wrongOpts.add(volume + Math.floor(Math.random() * 10) - 5);
      }
      const options = Array.from(wrongOpts);
      const correctIndex = Math.floor(Math.random() * 4);
      options.splice(correctIndex, 0, volume);

      questions.push({
        id: qId,
        question: `A cardboard box has length = ${l} cm, width = ${w} cm, and height = ${h} cm. What is its Volume in cubic cm?`,
        options: options.map(o => `${o} cubic cm`),
        correctIndex,
        hint: `Volume is calculated using the formula: Length × Width × Height. Multiply ${l} × ${w} × ${h}.`,
        visualData: { type: 'volume_calc', l, w, h }
      });
    } else if (topicId === 'p6_speed') {
      // Speed, distance, and time equations
      const timeSec = Math.floor(Math.random() * 4) + 2; // 2 to 5 seconds
      const speedMPS = [10, 20, 15, 25][Math.floor(Math.random() * 4)]; // m/s
      const distM = speedMPS * timeSec;

      const askType = Math.random() > 0.5 ? 'distance' : 'speed';
      if (askType === 'distance') {
        const wrongOpts = new Set<number>([speedMPS + timeSec, speedMPS / timeSec, distM + 10, distM - 10 > 0 ? distM - 10 : distM + 20]);
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, distM);

        questions.push({
          id: qId,
          question: `A model rocket travels at a constant speed of ${speedMPS} meters per second. How far (Distance) does it travel in ${timeSec} seconds?`,
          options: options.map(o => `${o} meters`),
          correctIndex,
          hint: `Distance is Speed multiplied by Time: Distance = Speed × Time. Multiply ${speedMPS} × ${timeSec}!`,
          visualData: { type: 'speed_calc', speed: speedMPS, time: timeSec, distance: distM }
        });
      } else {
        const wrongOpts = new Set<number>([speedMPS + timeSec, speedMPS - 5, speedMPS + 10]);
        while (wrongOpts.size < 3) {
          wrongOpts.add(speedMPS + Math.floor(Math.random() * 8) - 4);
        }
        const options = Array.from(wrongOpts);
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, speedMPS);

        questions.push({
          id: qId,
          question: `An RC car travels a distance of ${distM} meters in ${timeSec} seconds. What is its average Speed in meters per second?`,
          options: options.map(o => `${o} m/s`),
          correctIndex,
          hint: `Speed is Distance divided by Time: Speed = Distance ÷ Time. Divide ${distM} by ${timeSec}!`,
          visualData: { type: 'speed_calc', speed: speedMPS, time: timeSec, distance: distM }
        });
      }
    } else {
      // Default fallback
      questions.push({
        id: qId,
        question: 'Solve this primary math challenge: What is 5 + 5?',
        options: ['8', '9', '10', '11'],
        correctIndex: 2,
        hint: 'Use your fingers to count!',
        visualData: { type: 'addition', num1: 5, num2: 5, isPlus: true }
      });
    }
  }

  return questions;
}
