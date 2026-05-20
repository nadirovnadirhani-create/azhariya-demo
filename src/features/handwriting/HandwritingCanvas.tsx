"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Path, Text, Rect } from "react-konva";
import { getStroke } from "perfect-freehand";
import { Undo2, Trash2, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from '@/shared/ui/Button';
import { useTheme } from "next-themes";
import { gradeHandwriting, getGradingColor } from './handwritingGrader';

function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

interface Props {
  letter: string;
  arabicLetter: string;
  size?: number;
  onComplete?: (points: any[]) => void;
  onCheck?: () => void;
}

export default function HandwritingCanvas({ letter, arabicLetter, size = 400, onCheck }: Props) {
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gradingResult, setGradingResult] = useState<any>(null);
  const { theme } = useTheme();
  const stageRef = useRef<any>(null);

  const handlePointerDown = (e: any) => {
    if (gradingResult) return; 
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [[pos.x, pos.y]] }]);
  };

  const handlePointerMove = (e: any) => {
    if (!isDrawing || gradingResult) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    if (lastLine) {
      lastLine.points.push([point.x, point.y]);
      const newLines = lines.slice(0, -1);
      newLines.push(lastLine);
      setLines(newLines);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setLines([]);
    setGradingResult(null);
  };

  const undo = () => {
    setLines(lines.slice(0, -1));
    setGradingResult(null);
  };

  const handleCheck = () => {
    if (gradingResult) {
      clearCanvas();
    } else {
      const result = gradeHandwriting(lines, size);
      setGradingResult(result);
      onCheck?.();
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div style={{ width: size, height: size }} className="bg-slate-100/50 dark:bg-slate-800/40 rounded-3xl animate-pulse" />;

  const inkColor = theme === 'dark' ? '#F59E0B' : '#0A3C2F';
  const letterFill = theme === 'dark' ? 'rgba(245, 158, 11, 0.06)' : 'rgba(10, 60, 47, 0.05)';
  const guideFill = theme === 'dark' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(10, 60, 47, 0.1)';

  return (
    <div className="handwriting-container flex flex-col items-center gap-6 w-full animate-scale-in">
      <div 
        className="relative rounded-3xl overflow-hidden glass shadow-2xl border border-white/20 dark:border-white/5" 
        style={{ width: '100%', maxWidth: size, aspectRatio: '1/1', touchAction: 'none' }}
      >
        {/* Dotted grid watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.1]">
          <div className="w-full h-full" style={{ 
            backgroundImage: `radial-gradient(${inkColor} 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <Stage
          width={size}
          height={size}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          ref={stageRef}
          className="absolute inset-0 w-full h-full"
        >
          <Layer>
            {/* Background Template */}
            <Text
              text={arabicLetter}
              fontSize={size * 0.65}
              fontFamily="Amiri"
              x={size / 2}
              y={size / 2}
              offsetX={size * 0.325}
              offsetY={size * 0.38}
              fill={letterFill}
              align="center"
              verticalAlign="middle"
            />
            
            {/* Guidelines */}
            <Rect 
              x={0} 
              y={size * 0.68} 
              width={size} 
              height={1.5} 
              fill={guideFill} 
              dash={[6, 6]}
            />
            
            {lines.map((line, i) => {
              const stroke = getStroke(line.points, {
                size: 10,
                thinning: 0.45,
                smoothing: 0.5,
                streamline: 0.5,
              });
              const pathData = getSvgPathFromStroke(stroke);
              return <Path key={i} data={pathData} fill={inkColor} />;
            })}
          </Layer>
        </Stage>

        {/* Floating Controls */}
        <div className="absolute bottom-4 inset-x-4 flex justify-between items-center px-2 pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={undo}
              disabled={lines.length === 0}
              className="w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-slate-900/60 text-slate-500 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-accent)] rounded-xl backdrop-blur-md transition-all shadow-sm border border-slate-100 dark:border-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Отменить"
            >
              <Undo2 className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={clearCanvas}
              disabled={lines.length === 0}
              className="w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-slate-900/60 text-slate-500 hover:text-rose-500 rounded-xl backdrop-blur-md transition-all shadow-sm border border-slate-100 dark:border-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Очистить"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>
          {lines.length > 0 && (
            <Button
              size="sm"
              onClick={handleCheck}
              variant={gradingResult ? 'outline' : 'accent'}
              className="pointer-events-auto shadow-md font-bold text-xs"
            >
              {gradingResult ? 'Нарисовать снова' : 'Проверить'} 
              <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          )}
        </div>
      </div>
      
      {gradingResult ? (
        <div
          className={`flex flex-col gap-3.5 p-5 rounded-2xl border w-full max-w-sm shadow-md animate-scale-in ${
            getGradingColor(gradingResult.level).bg
          } ${getGradingColor(gradingResult.level).border}`}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className={`w-5.5 h-5.5 mt-0.5 flex-shrink-0 ${getGradingColor(gradingResult.level).text}`} />
            <div className="flex-1">
              <p className={`font-black text-sm leading-tight ${getGradingColor(gradingResult.level).text}`}>
                {gradingResult.feedback}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-200/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      gradingResult.score >= 80
                        ? 'bg-emerald-500'
                        : gradingResult.score >= 60
                          ? 'bg-blue-500'
                          : gradingResult.score >= 40
                            ? 'bg-yellow-500'
                            : 'bg-orange-500'
                    }`}
                    style={{ width: `${gradingResult.score}%` }}
                  />
                </div>
                <span className={`text-xs font-black shrink-0 ${getGradingColor(gradingResult.level).text}`}>
                  {gradingResult.score}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 bg-emerald-500/10 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-500/10 dark:border-emerald-900/20 w-full max-w-sm shadow-inner">
          <Lightbulb className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--color-text-muted)] dark:text-emerald-450 leading-relaxed font-semibold">
            Начинайте писать справа налево и сверху вниз, точно следуя очертаниям трафарета.
          </p>
        </div>
      )}
    </div>
  );
}
