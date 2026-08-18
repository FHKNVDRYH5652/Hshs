import React from 'react';
import { PredictionHistoryItem, GlobalStats } from '../types';
import { Trophy, Award, AlertCircle, CheckCircle2, Clock, Flame, Zap } from 'lucide-react';

interface PredictionHistoryTableProps {
  history: PredictionHistoryItem[];
  stats: GlobalStats;
}

export const PredictionHistoryTable: React.FC<PredictionHistoryTableProps> = ({
  history = [],
  stats
}) => {
  const safeHistory = history || [];
  return (
    <div className="bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
      
      {/* Stats Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#00ff66]/20 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#00ff66]" />
          <h2 className="text-base font-bold font-mono text-white tracking-wide">
            PREDICTION LOGS & ACCURACY TRACKER
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] font-bold">
            WIN RATE: {stats.winRate.toFixed(1)}%
          </span>
          <span className="px-3 py-1 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#00e5ff] font-bold">
            WINS: {stats.winCount}
          </span>
          <span className="px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> JACKPOTS: {stats.jackpotCount}
          </span>
          <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500/40 text-red-400 font-bold">
            LOSS: {stats.lossCount}
          </span>
        </div>
      </div>

      {/* Prediction History Table */}
      <div className="overflow-x-auto max-h-[350px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left font-mono text-xs text-gray-300">
          <thead className="bg-[#030d14] text-[#00ff66] sticky top-0 z-10 border-b border-[#00ff66]/30 text-[11px] uppercase">
            <tr>
              <th className="py-2.5 px-3">PERIOD #</th>
              <th className="py-2.5 px-3">PREDICTED (OUTCOME + HOT 2 NUMBERS)</th>
              <th className="py-2.5 px-3">PATTERN</th>
              <th className="py-2.5 px-3 text-center">CONFIDENCE</th>
              <th className="py-2.5 px-3 text-center">ACTUAL RESULT</th>
              <th className="py-2.5 px-3 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {safeHistory.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                  No prediction logs recorded yet. Waiting for period sync...
                </td>
              </tr>
            ) : (
              safeHistory.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-[#00ff66]/5 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white">{item.period}</td>
                    
                    {/* Predicted */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                            item.predictionType === 'COLOR'
                              ? (item.targetResult === 'GREEN' || item.predictedColor === 'GREEN'
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                  : 'bg-red-500/20 border-red-500/50 text-red-400')
                              : (item.targetResult === 'BIG' || item.predictedOutcome === 'BIG'
                                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                                  : 'bg-teal-500/20 border-teal-500/50 text-teal-300')
                          }`}
                        >
                          {item.predictionType || 'SIZE'}: {item.targetResult || item.predictedOutcome}
                        </span>
                        <div className="flex items-center gap-1">
                          {item.predictedNumbers.map((num, i) => (
                            <span
                              key={i}
                              className="w-5 h-5 rounded-full bg-[#00ff66]/20 border border-[#00ff66]/60 text-[#00ff66] text-[10px] font-bold flex items-center justify-center"
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Pattern */}
                    <td className="py-2.5 px-3 text-gray-400">{item.dominantPattern}</td>

                    {/* Confidence */}
                    <td className="py-2.5 px-3 text-center font-bold text-[#00ff66]">{item.confidence}%</td>

                    {/* Actual Result */}
                    <td className="py-2.5 px-3 text-center">
                      {item.actualNumber !== undefined ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-gray-800 border border-gray-600 font-bold text-white text-[10px] flex items-center justify-center">
                            {item.actualNumber}
                          </span>
                          <span className="font-semibold text-xs text-gray-200">
                            ({item.actualOutcome})
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic text-[11px]">Awaiting result...</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-3 text-center">
                      {item.status === 'JACKPOT_WIN' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 font-bold text-[10px] shadow-[0_0_10px_rgba(245,158,11,0.4)] animate-pulse">
                          <Zap className="w-3 h-3 text-yellow-300" /> GRAND JACKPOT
                        </span>
                      )}
                      {item.status === 'WIN' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#00ff66]/20 border border-[#00ff66]/50 text-[#00ff66] font-bold text-[10px] shadow-[0_0_8px_rgba(0,255,102,0.3)]">
                          <CheckCircle2 className="w-3 h-3" /> WIN
                        </span>
                      )}
                      {item.status === 'LOSS' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-400 font-bold text-[10px]">
                          <AlertCircle className="w-3 h-3" /> LOSS
                        </span>
                      )}
                      {item.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-400 text-[10px]">
                          <Clock className="w-3 h-3 animate-spin" /> PENDING
                        </span>
                      )}
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
