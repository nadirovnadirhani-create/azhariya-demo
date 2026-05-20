/**
 * Simple handwriting grading utility
 * Compares user strokes to expected letter dimensions
 */

export interface GradingResult {
  score: number; // 0-100
  feedback: string;
  level: 'excellent' | 'good' | 'needs-practice' | 'try-again';
}

export function gradeHandwriting(
  userStrokes: Array<{ points: [number, number][] }>,
  canvasSize: number
): GradingResult {
  if (!userStrokes || userStrokes.length === 0) {
    return {
      score: 0,
      feedback: 'Пожалуйста, нарисуйте букву на холсте.',
      level: 'try-again',
    };
  }

  // Get bounding box of user strokes
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  userStrokes.forEach((stroke) => {
    stroke.points.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
  });

  const strokeWidth = maxX - minX;
  const strokeHeight = maxY - minY;
  const totalPoints = userStrokes.reduce((sum, s) => sum + s.points.length, 0);

  // Score factors
  let score = 50; // Base score

  // Density: more points = more effort = higher score
  const densityRatio = totalPoints / 500; // Expect ~500 points for good letter
  score += Math.min(densityRatio * 20, 20);

  // Coverage: letter should cover significant portion of canvas
  const coverageRatio = (Math.max(strokeWidth, strokeHeight) / canvasSize) * 100;
  if (coverageRatio > 40 && coverageRatio < 90) {
    score += 15;
  } else if (coverageRatio >= 30 && coverageRatio <= 95) {
    score += 10;
  }

  // Centering: letter should be roughly centered
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const centerDistX = Math.abs(centerX - canvasSize / 2);
  const centerDistY = Math.abs(centerY - canvasSize / 2);
  const maxCenterDist = canvasSize * 0.2;

  if (centerDistX < maxCenterDist && centerDistY < maxCenterDist) {
    score += 15;
  }

  // Ensure at least 3 strokes (complexity)
  if (userStrokes.length >= 2) {
    score += 10;
  }

  // Final score bounds
  score = Math.min(100, Math.max(0, score));

  // Determine level and feedback
  let level: 'excellent' | 'good' | 'needs-practice' | 'try-again';
  let feedback: string;

  if (score >= 80) {
    level = 'excellent';
    feedback = '✨ Отлично! Ваша буква очень хорошо написана. Переходите к следующей!';
  } else if (score >= 60) {
    level = 'good';
    feedback = '👍 Хорошо! Буква узнаётся. Попробуйте сделать её чуть больше и аккуратнее.';
  } else if (score >= 40) {
    level = 'needs-practice';
    feedback =
      '✏️ Нужно потренироваться. Обратите внимание на размер и центровку буквы. Попробуйте снова!';
  } else {
    level = 'try-again';
    feedback = '🎯 Попробуйте ещё раз! Буква должна быть больше и в центре холста.';
  }

  return { score, feedback, level };
}

export function getGradingColor(
  level: 'excellent' | 'good' | 'needs-practice' | 'try-again'
) {
  switch (level) {
    case 'excellent':
      return { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700' };
    case 'good':
      return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700' };
    case 'needs-practice':
      return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700' };
    case 'try-again':
      return { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700' };
  }
}
