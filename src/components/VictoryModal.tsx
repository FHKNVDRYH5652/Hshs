import React, { useEffect, useState } from 'react';
import { Trophy, Zap, AlertTriangle, Sparkles, X } from 'lucide-react';
import { soundFx } from '../services/soundEffects';

interface VictoryModalProps {
  type: 'WIN' | 'JACKPOT_WIN' | 'LOSS' | null;
  period: string;
  actualNumber?: number;
  actualOutcome?: string;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  type,
  period,
  actualNumber,
  actualOutcome,
  onClose
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!type) return;

    // Trigger audio based on result type
    if (type === 'JACKPOT_WIN') {
      soundFx.playGrandJackpot();
    } else if (type === 'WIN') {
      soundFx.playVictory();
    } else if (type === 'LOSS') {
      soundFx.playDefeat();
    }

    // Auto dismiss progress timer (3 seconds)
    const startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-[#07131e] border-2 rounded-2xl p-6 shadow-2xl text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content - GRAND JACKPOT WIN */}
        {type === 'JACKPOT_WIN' && (
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.8)] animate-bounce">
              <Zap className="w-10 h-10 text-yellow-300 fill-yellow-300" />
            </div>

            <div>
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 font-bold uppercase tracking-widest">
                🎰 GRAND JACKPOT VICTORY
              </span>
              <h2 className="text-2xl font-extrabold text-amber-300 tracking-wider mt-2 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">
                EXACT NUMBER MATCHED!
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Period <strong className="text-white">{period}</strong> produced Number <strong className="text-yellow-300 font-bold">{actualNumber}</strong> ({actualOutcome})
              </p>
            </div>
          </div>
        )}

        {/* Modal Content - STANDARD WIN */}
        {type === 'WIN' && (
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-[#00ff66]/20 border-2 border-[#00ff66] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.8)] animate-pulse">
              <Trophy className="w-10 h-10 text-[#00ff66]" />
            </div>

            <div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#00ff66]/20 border border-[#00ff66]/50 text-[#00ff66] font-bold uppercase tracking-widest">
                🟢 PREDICTION VICTORY!
              </span>
              <h2 className="text-2xl font-extrabold text-[#00ff66] tracking-wider mt-2 drop-shadow-[0_0_10px_rgba(0,255,102,0.8)]">
                PATTERN PREDICTION WIN
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Period <strong className="text-white">{period}</strong> Result: <strong className="text-[#00ff66] font-bold">{actualOutcome}</strong> (Number {actualNumber})
              </p>
            </div>
          </div>
        )}

        {/* Modal Content - DEFEAT / LOSS */}
        {type === 'LOSS' && (
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.6)]">
              <AlertTriangle className="w-10 h-10 text-rose-400" />
            </div>

            <div>
              <span className="text-xs px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-400 font-bold uppercase tracking-widest">
                🔴 PATTERN DEFEAT
              </span>
              <h2 className="text-xl font-bold text-rose-400 tracking-wider mt-2">
                TREND SHIFTED
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Period <strong className="text-white">{period}</strong> Result: <strong className="text-rose-400 font-bold">{actualOutcome}</strong> (Number {actualNumber})
              </p>
            </div>
          </div>
        )}

        {/* Auto Close Timer Progress Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>AUTO CLOSING IN 3S</span>
            <span>{Math.ceil((progress / 100) * 3)}s</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-75 ${
                type === 'LOSS' ? 'bg-rose-500' : 'bg-[#00ff66]'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

      </div>

    </div>
  );
};
