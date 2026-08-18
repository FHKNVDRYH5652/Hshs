import React from 'react';
import { WingoItem } from '../types';
import { History, List, Circle } from 'lucide-react';

interface WingoHistoryListProps {
  history: WingoItem[];
}

export const WingoHistoryList: React.FC<WingoHistoryListProps> = ({ history = [] }) => {
  const safeHistory = history || [];
  return (
    <div className="bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#00ff66]/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#00e5ff]" />
          <h2 className="text-base font-bold font-mono text-white tracking-wide">
            05 WINGO 1M HISTORY (PAST 100 ROUNDS)
          </h2>
        </div>
        <span className="text-xs font-mono text-[#00ff66]">
          TOTAL STORED: <strong>{safeHistory.length}</strong>
        </span>
      </div>

      {/* Visual Sequence Ribbon (S / B sequence strip) */}
      <div className="mb-4 p-3 bg-[#030b12] rounded-xl border border-gray-800 overflow-x-auto custom-scrollbar">
        <div className="text-[10px] text-gray-400 font-mono uppercase mb-2">SEQUENCE VISUALIZER (NEWEST → OLDEST)</div>
        <div className="flex items-center gap-1.5 min-w-max font-mono text-[11px]">
          {safeHistory.slice(0, 40).map((item, index) => {
            const isBig = item.number >= 5;
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center w-7 h-10 rounded border font-bold ${
                  isBig
                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                    : 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                }`}
                title={`Period ${item.period}: Number ${item.number} (${isBig ? 'BIG' : 'SMALL'})`}
              >
                <span className="text-xs">{item.number}</span>
                <span className="text-[9px] opacity-80">{isBig ? 'B' : 'S'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-x-auto max-h-[300px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left font-mono text-xs text-gray-300">
          <thead className="bg-[#030d14] text-[#00ff66] sticky top-0 z-10 border-b border-[#00ff66]/30 text-[11px] uppercase">
            <tr>
              <th className="py-2.5 px-3">PERIOD #</th>
              <th className="py-2.5 px-3 text-center">NUMBER</th>
              <th className="py-2.5 px-3 text-center">SIZE (BIG/SMALL)</th>
              <th className="py-2.5 px-3 text-center">COLOR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {history.slice(0, 30).map((item) => {
              const isBig = item.number >= 5;
              let colorBg = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
              if (item.color === 'RED') colorBg = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
              if (item.color === 'RED_VIOLET' || item.color === 'GREEN_VIOLET' || item.color === 'VIOLET') {
                colorBg = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
              }

              return (
                <tr key={item.period} className="hover:bg-[#00ff66]/5 transition-colors">
                  <td className="py-2 px-3 font-semibold text-white">{item.period}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00ff66]/20 border border-[#00ff66]/50 text-[#00ff66] font-bold text-xs">
                      {item.number}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded font-bold text-[10px] border ${
                        isBig
                          ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                          : 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                      }`}
                    >
                      {item.size}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colorBg}`}>
                      {item.color.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
