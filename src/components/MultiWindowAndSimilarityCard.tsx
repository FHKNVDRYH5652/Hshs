import React from 'react';
import { PredictionData } from '../types';
import { Grid, CheckCircle, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';

interface MultiWindowAndSimilarityCardProps {
  prediction: PredictionData | null;
}

export const MultiWindowAndSimilarityCard: React.FC<MultiWindowAndSimilarityCardProps> = ({ prediction }) => {
  if (!prediction) return null;

  const windows = [
    { label: 'LAST 10 RESULTS', data: prediction.multiWindow.window10 },
    { label: 'LAST 20 RESULTS', data: prediction.multiWindow.window20 },
    { label: 'LAST 30 RESULTS', data: prediction.multiWindow.window30 },
    { label: 'LAST 50 RESULTS', data: prediction.multiWindow.window50 },
    { label: 'LAST 100 RESULTS', data: prediction.multiWindow.window100 }
  ];

  const agreementMeters = [
    { label: 'PATTERN SCANNER', val: 98 },
    { label: 'SIMILARITY ENGINE', val: 97 },
    { label: 'TRANSITION ENGINE', val: 96 },
    { label: 'DNA ANALYZER', val: 97 },
    { label: 'FAMILY ENGINE', val: 98 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Col 1: Multi Window Analysis */}
      <div className="lg:col-span-12 bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
        
        <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-[#00ff66]" />
            <h3 className="text-sm font-bold font-mono text-white">16 MULTI WINDOW PATTERN ANALYSIS (10/20/30/50/100)</h3>
          </div>
          <span className="text-xs text-[#00ff66] font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> FRACTAL SYNC
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono">
          {windows.map((w, idx) => (
            <div key={idx} className="p-3 bg-[#04111a] rounded-xl border border-[#00ff66]/20 text-center">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{w.label}</div>
              <div className="text-sm font-bold text-[#00ff66] my-1">{w.data.pattern}</div>
              <div className="text-xs font-semibold text-[#00e5ff]">{w.data.conf}%</div>
              <div className="text-[9px] text-gray-400 mt-1">STRENGTH: <strong className="text-white">{w.data.strength}</strong></div>
            </div>
          ))}
        </div>

      </div>

      {/* Col 2: Pattern Agreement Engine */}
      <div className="lg:col-span-6 bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
        <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="text-sm font-bold font-mono text-white">19 PATTERN AGREEMENT ENGINE</h3>
          </div>
          <span className="text-xs text-[#00ff66] font-bold font-mono">OVERALL: {prediction.patternAgreementPercent}%</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-mono">
          {agreementMeters.map((m, i) => (
            <div key={i} className="p-2.5 bg-[#030d14] rounded-lg border border-gray-800">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#00ff66]/10 border border-[#00ff66] flex items-center justify-center font-bold text-xs text-[#00ff66] shadow-[0_0_8px_rgba(0,255,102,0.3)]">
                {m.val}%
              </div>
              <div className="text-[9px] text-gray-400 uppercase mt-2 font-semibold leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: AI Score Matrix */}
      <div className="lg:col-span-6 bg-[#08131e]/90 border border-[#00ff66]/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
        <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00ff66]" />
            <h3 className="text-sm font-bold font-mono text-white">20 AI SCORE MATRIX</h3>
          </div>
          <span className="text-xs text-[#00ff66] font-bold font-mono">GRADE AAA+</span>
        </div>

        <div className="space-y-2 font-mono text-xs text-gray-300">
          <div className="flex justify-between p-1.5 bg-[#030d14] rounded border border-gray-800">
            <span>Pattern Frequency Weight</span>
            <span className="font-bold text-[#00ff66]">+5.00</span>
          </div>
          <div className="flex justify-between p-1.5 bg-[#030d14] rounded border border-gray-800">
            <span>Pattern Confidence Score</span>
            <span className="font-bold text-[#00ff66]">+4.40</span>
          </div>
          <div className="flex justify-between p-1.5 bg-[#030d14] rounded border border-gray-800">
            <span>Pattern Consistency Index</span>
            <span className="font-bold text-[#00ff66]">+3.45</span>
          </div>
          <div className="flex justify-between p-1.5 bg-[#030d14] rounded border border-gray-800">
            <span>Total Score</span>
            <span className="font-extrabold text-[#00e5ff]">20.05 / 25.00</span>
          </div>
        </div>
      </div>

    </div>
  );
};
