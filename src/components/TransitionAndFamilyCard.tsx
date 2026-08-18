import React from 'react';
import { PredictionData } from '../types';
import { Network, GitCompare, Compass, Flame, ArrowRight } from 'lucide-react';

interface TransitionAndFamilyCardProps {
  prediction: PredictionData | null;
}

export const TransitionAndFamilyCard: React.FC<TransitionAndFamilyCardProps> = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Col 1: Pattern Family Cluster */}
      <div className="lg:col-span-4 bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
        <div className="flex items-center gap-2 border-b border-[#00ff66]/20 pb-3 mb-4">
          <Network className="w-5 h-5 text-[#00ff66]" />
          <h3 className="text-sm font-bold font-mono text-white">10 PATTERN FAMILY CLUSTER</h3>
        </div>

        <div className="space-y-3 font-mono text-xs">
          
          {/* Dragon Family */}
          <div className="p-3 bg-[#04121a] rounded-xl border border-amber-500/40">
            <div className="flex items-center justify-between font-bold text-amber-400 mb-1">
              <span className="flex items-center gap-1.5"><Flame className="w-4 h-4" /> DRAGON FAMILY</span>
              <span>DOMINANCE: 96.1%</span>
            </div>
            <p className="text-[11px] text-gray-400">Dragon, Double Dragon, Triple Dragon, Long Dragon, Fake Dragon</p>
          </div>

          {/* Streak Family */}
          <div className="p-3 bg-[#04121a] rounded-xl border border-emerald-500/40">
            <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
              <span>⚡ STREAK FAMILY</span>
              <span>DOMINANCE: 88.4%</span>
            </div>
            <p className="text-[11px] text-gray-400">Single, Double, Triple, Quadra, Long Streak, Ultra Long</p>
          </div>

          {/* Trend Family */}
          <div className="p-3 bg-[#04121a] rounded-xl border border-cyan-500/40">
            <div className="flex items-center justify-between font-bold text-cyan-400 mb-1">
              <span>🌊 TREND FAMILY</span>
              <span>DOMINANCE: 83.6%</span>
            </div>
            <p className="text-[11px] text-gray-400">Break, Reverse, Swing, Mirror, Wave, Zigzag, Stair</p>
          </div>

          {/* Random Family */}
          <div className="p-3 bg-[#04121a] rounded-xl border border-purple-500/40">
            <div className="flex items-center justify-between font-bold text-purple-400 mb-1">
              <span>🌀 RANDOM FAMILY</span>
              <span>DOMINANCE: 61.2%</span>
            </div>
            <p className="text-[11px] text-gray-400">Chaos, Mixed, Repeat Block, Echo, Cluster</p>
          </div>

        </div>
      </div>

      {/* Col 2: Pattern Transition Matrix */}
      <div className="lg:col-span-8 bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
        
        <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="text-sm font-bold font-mono text-white">07 AI PATTERN TRANSITION MATRIX (TOP 10)</h3>
          </div>
          <span className="text-xs text-[#00e5ff] font-mono">100 ROUND MATRIX</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="text-[11px] text-[#00ff66] bg-[#030d14] border-b border-[#00ff66]/30 uppercase">
              <tr>
                <th className="py-2 px-3">FROM STATE</th>
                <th className="py-2 px-3">TO STATE</th>
                <th className="py-2 px-3 text-center">OCCURRENCES</th>
                <th className="py-2 px-3 text-center">PROBABILITY</th>
                <th className="py-2 px-3">PROBABILITY BAR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300">
              {prediction.transitionsList.map((tr, i) => (
                <tr key={i} className="hover:bg-[#00ff66]/5 transition-colors">
                  <td className="py-2 px-3 font-semibold text-amber-300">{tr.from}</td>
                  <td className="py-2 px-3 font-semibold text-emerald-300 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-gray-500" /> {tr.to}
                  </td>
                  <td className="py-2 px-3 text-center font-bold text-[#00e5ff]">{tr.count}</td>
                  <td className="py-2 px-3 text-center font-bold text-[#00ff66]">{tr.probability}%</td>
                  <td className="py-2 px-3">
                    <div className="w-28 bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
                      <div
                        className="bg-gradient-to-r from-[#00ff66] to-[#00e5ff] h-full rounded-full"
                        style={{ width: `${tr.probability}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Timeline Sequence */}
        <div className="mt-4 pt-3 border-t border-gray-800">
          <div className="text-[11px] text-gray-400 font-mono uppercase mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#00ff66]" /> 17 PATTERN EVOLUTION TIMELINE
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {prediction.evolutionTimeline.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="px-3 py-1.5 rounded-lg bg-[#04121a] border border-[#00ff66]/30 flex items-center gap-2 shadow-[0_0_10px_rgba(0,255,102,0.1)]">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div className="text-[9px] text-gray-400">{item.roundRange}</div>
                    <div className="font-bold text-[#00ff66]">{item.pattern}</div>
                  </div>
                </div>
                {idx < prediction.evolutionTimeline.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
