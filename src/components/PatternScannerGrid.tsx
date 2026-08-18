import React from 'react';
import { PatternInfo } from '../types';
import { Layers, Activity, Flame, ShieldAlert } from 'lucide-react';

interface PatternScannerGridProps {
  patterns: PatternInfo[];
  detectedCount: number;
  activeCount: number;
}

export const PatternScannerGrid: React.FC<PatternScannerGridProps> = ({
  patterns,
  detectedCount,
  activeCount
}) => {
  return (
    <div className="bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#00ff66]/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00ff66]" />
          <h2 className="text-base font-bold font-mono text-white tracking-wide">
            09 ADVANCED PATTERN DETECTION & SCANNER (26 PATTERNS)
          </h2>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66]">
            DETECTED: <strong>{detectedCount}</strong> / 26
          </span>
          <span className="px-2.5 py-1 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#00e5ff]">
            ACTIVE: <strong>{activeCount}</strong>
          </span>
        </div>
      </div>

      {/* Table List of 26 Patterns */}
      <div className="overflow-x-auto max-h-[420px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left font-mono text-xs text-gray-300">
          <thead className="bg-[#030d14] text-[#00ff66] sticky top-0 z-10 border-b border-[#00ff66]/30 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">NO.</th>
              <th className="py-2.5 px-3">PATTERN NAME</th>
              <th className="py-2.5 px-3">EXAMPLE FORMULA</th>
              <th className="py-2.5 px-3 text-center">COUNT</th>
              <th className="py-2.5 px-3 text-center">CONFIDENCE</th>
              <th className="py-2.5 px-3 text-center">STRENGTH</th>
              <th className="py-2.5 px-3 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {patterns.map((p, index) => (
              <tr
                key={p.id}
                className={`hover:bg-[#00ff66]/5 transition-colors ${
                  p.isActive ? 'bg-[#00ff66]/10 border-l-2 border-[#00ff66]' : ''
                }`}
              >
                <td className="py-2 px-3 text-gray-500 font-bold">{String(index + 1).padStart(2, '0')}</td>
                <td className="py-2 px-3 font-semibold text-white flex items-center gap-2">
                  <span>{p.name}</span>
                  {p.family === 'DRAGON' && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                </td>
                <td className="py-2 px-3 text-gray-400 text-[11px] bg-[#030a10] px-2 rounded border border-gray-800 inline-block my-1 font-mono">
                  {p.example}
                </td>
                <td className="py-2 px-3 text-center font-bold text-[#00e5ff]">{p.count}</td>
                <td className="py-2 px-3 text-center">
                  <span className="font-bold text-[#00ff66]">{p.confidence}%</span>
                </td>
                <td className="py-2 px-3 text-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.strength === 'EXTREME'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : p.strength === 'VERY HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : p.strength === 'HIGH'
                        ? 'bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {p.strength}
                  </span>
                </td>
                <td className="py-2 px-3 text-center">
                  {p.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#00ff66] font-bold px-2 py-0.5 rounded bg-[#00ff66]/20 border border-[#00ff66]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping"></span>
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-gray-500 text-[10px]">INACTIVE</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
