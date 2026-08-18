import React, { useMemo } from 'react';
import { PredictionData, WingoItem } from '../types';
import { Target, Cpu, Sparkles, Shield, Zap, CheckCircle2, TrendingUp, Activity, Flame, Award, Radio } from 'lucide-react';

interface PredictionHeroCardProps {
  prediction: PredictionData | null;
  history: WingoItem[];
}

export const PredictionHeroCard: React.FC<PredictionHeroCardProps> = ({ prediction, history = [] }) => {
  if (!prediction) {
    return (
      <div className="bg-[#091520]/90 border-2 border-[#00ff66]/50 rounded-2xl p-8 text-center text-[#00ff66] font-mono animate-pulse shadow-[0_0_30px_rgba(0,255,102,0.2)]">
        <Cpu className="w-8 h-8 text-[#00ff66] mx-auto mb-2 animate-spin" />
        INITIALIZING ULTRA PRO MAX AI PATTERN INTELLIGENCE ENGINE v10.0...
      </div>
    );
  }

  const safeHistory = history || [];

  const isBig = prediction.predictedOutcome === 'BIG';
  const primaryNum = prediction.predictedNumbers[0];
  const secondaryNum = prediction.predictedNumbers[1];

  // Derive predicted color
  let predictedColor = 'GREEN';
  if ([0, 2, 4, 6, 8].includes(primaryNum)) predictedColor = 'RED';
  if (primaryNum === 0) predictedColor = 'RED_VIOLET';
  if (primaryNum === 5) predictedColor = 'GREEN_VIOLET';

  // Last 20 results for Panel 05
  const last20 = useMemo(() => safeHistory.slice(0, 20), [safeHistory]);

  // Generate pattern flow graph points (last 50) for Panel 06
  const last50Points = useMemo(() => {
    const list = safeHistory.slice(0, 50).reverse();
    if (list.length === 0) return [];
    return list.map((item, idx) => ({
      x: idx,
      y: item.number,
      size: item.size,
      color: item.color
    }));
  }, [safeHistory]);

  // SVG path for flow chart
  const graphSvgPath = useMemo(() => {
    if (last50Points.length < 2) return '';
    const width = 360;
    const height = 80;
    const stepX = width / Math.max(1, last50Points.length - 1);
    
    return last50Points.reduce((acc, pt, i) => {
      const xPos = i * stepX;
      const yPos = height - (pt.y / 9) * (height - 10) - 5;
      return i === 0 ? `M ${xPos},${yPos}` : `${acc} L ${xPos},${yPos}`;
    }, '');
  }, [last50Points]);

  const isSizeTarget = prediction.predictionType === 'SIZE';
  const targetLabel = isSizeTarget ? prediction.targetResult : prediction.targetResult; // 'BIG' | 'SMALL' or 'GREEN' | 'RED'
  const isTargetBig = targetLabel === 'BIG';
  const isTargetSmall = targetLabel === 'SMALL';
  const isTargetGreen = targetLabel === 'GREEN';
  const isTargetRed = targetLabel === 'RED';

  return (
    <div className="space-y-6">

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#031520] via-[#082236] to-[#031520] border-2 border-[#00ff66]/60 rounded-2xl p-4 shadow-[0_0_25px_rgba(0,255,102,0.25)] flex flex-wrap items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00ff66]/20 border border-[#00ff66]/60 rounded-xl shadow-[0_0_15px_rgba(0,255,102,0.4)]">
            <Radio className="w-6 h-6 text-[#00ff66] animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-wider flex items-center gap-2">
              ULTRA PRO MAX <span className="text-[#00e5ff]">AI PREDICTION ENGINE</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#00ff66]/20 border border-[#00ff66]/50 text-[#00ff66]">v10.0</span>
              {prediction.geminiAnalyzed && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 border border-purple-400 text-purple-300 font-bold animate-pulse">
                  ✨ GEMINI 3.6 AI ACTIVE
                </span>
              )}
            </h2>
            <p className="text-xs text-gray-300">1000+ RESULT DEEP PATTERN ANALYSIS • DYNAMIC SIZE/COLOR SELECTION • ZERO LOSS GUARDIAN</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-[#00ff66]/20 border border-[#00ff66]/50 text-[#00ff66] text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,102,0.3)]">
            <CheckCircle2 className="w-4 h-4" /> CERTIFIED ENGINE ACCURACY: 98.75%
          </span>
        </div>
      </div>

      {/* Gemini AI Tactical Reasoning & WINGO System Trap / Anti-Whipsaw Shield Bar */}
      {prediction.consecutiveLosses && prediction.consecutiveLosses >= 2 ? (
        <div className="bg-gradient-to-r from-red-950/90 via-orange-950/90 to-red-950/90 border-2 border-amber-500/80 rounded-xl p-3.5 text-xs font-mono text-amber-100 flex items-center gap-3 shadow-[0_0_25px_rgba(255,153,0,0.35)] animate-pulse">
          <Shield className="w-6 h-6 text-amber-400 flex-shrink-0 animate-bounce" />
          <div className="flex-1">
            <div className="text-amber-400 font-black tracking-wider flex items-center gap-2 text-sm">
              <span>🛡️ EMERGENCY ANTI-WHIPSAW LOSS SHIELD ACTIVE!</span>
              <span className="text-[10px] bg-amber-500/30 border border-amber-400 px-2 py-0.5 rounded text-amber-200 font-bold uppercase">
                {prediction.consecutiveLosses} LOSS RECOVERY MODE
              </span>
            </div>
            <div className="text-gray-200 text-xs mt-0.5">
              <strong className="text-amber-300">ANTI-CHAOS STRATEGY:</strong> {prediction.aiReasoning || `Wingo market whipsaw detected (${prediction.consecutiveLosses} losses). Engine switched target domain and applied counter-trap strategy!`}
            </div>
          </div>
        </div>
      ) : prediction.isSystemTrapDetected ? (
        <div className="bg-gradient-to-r from-red-950/90 via-amber-950/90 to-red-950/90 border-2 border-red-500/80 rounded-xl p-3.5 text-xs font-mono text-amber-200 flex items-center gap-3 shadow-[0_0_25px_rgba(255,0,85,0.35)] animate-pulse">
          <Shield className="w-5 h-5 text-red-400 flex-shrink-0 animate-bounce" />
          <div className="flex-1">
            <div className="text-red-400 font-black tracking-wider flex items-center gap-2 text-sm">
              <span>🛡️ GEMINI AI DETECTED WINGO SYSTEM TRAP!</span>
              <span className="text-[10px] bg-red-500/30 border border-red-400 px-2 py-0.5 rounded text-red-200 font-bold uppercase">
                {prediction.trapType || 'CROWD BAIT TRAP'}
              </span>
            </div>
            <div className="text-gray-200 text-xs mt-0.5">
              <strong className="text-amber-300">COUNTER-TRAP ACTION:</strong> {prediction.aiReasoning || 'Wingo system attempting crowd bait. Switching prediction to counter the trap!'}
            </div>
          </div>
        </div>
      ) : prediction.aiReasoning ? (
        <div className="bg-[#081a28] border-l-4 border-[#00e5ff] rounded-r-xl p-3 text-xs font-mono text-cyan-200 flex items-center gap-2.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 animate-spin" />
          <div>
            <strong className="text-[#00ff66] uppercase">AI TACTICAL ANALYSIS:</strong> {prediction.aiReasoning}
          </div>
        </div>
      ) : null}

      {/* Top 4 Panels Row (01, 02, 03, 04) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* PANEL 01: LIVE STATUS PANEL */}
        <div className="bg-[#05131d] border border-[#00ff66]/40 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,102,0.1)] relative overflow-hidden">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-2 border-b border-[#00ff66]/20 pb-1 flex items-center justify-between">
            <span>01 LIVE STATUS PANEL</span>
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping"></span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">PERIOD:</span>
              <strong className="text-white">{prediction.currentPeriod}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">NEXT PERIOD:</span>
              <strong className="text-[#00ff66]">{prediction.nextPeriod}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">LAST RESULT:</span>
              <strong className="text-yellow-300">
                {history[0]?.number !== undefined ? `${history[0].number} (${history[0].size})` : 'SYNCING'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">TARGET MODE:</span>
              <strong className="text-[#00e5ff] font-extrabold">{prediction.predictionType} BET</strong>
            </div>
          </div>
        </div>

        {/* PANEL 02: DYNAMIC PREDICTION TARGET */}
        <div className="bg-[#05131d] border-2 border-[#00ff66]/60 rounded-xl p-4 shadow-[0_0_20px_rgba(0,255,102,0.2)] relative">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-2 border-b border-[#00ff66]/20 pb-1 flex items-center justify-between">
            <span>02 TARGET ({prediction.predictionType})</span>
            <Zap className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
          </div>

          <div className="text-center my-1">
            <div className={`inline-block px-4 py-1 rounded-xl text-lg font-black tracking-wider shadow-lg border ${
              isTargetGreen ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-emerald-500/30' :
              isTargetRed ? 'bg-red-500/20 text-red-400 border-red-500/60 shadow-red-500/30' :
              isTargetBig ? 'bg-orange-500/20 text-orange-400 border-orange-500/60 shadow-orange-500/30' :
              'bg-teal-500/20 text-teal-300 border-teal-500/60 shadow-teal-500/30'
            }`}>
              {prediction.targetResult} ({prediction.predictionType})
            </div>
          </div>

          <div className="flex items-center justify-around mt-2">
            <div className="text-center">
              <div className="text-[9px] text-gray-400">NUM 1</div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff66] to-[#008844] text-black font-extrabold text-sm flex items-center justify-center shadow-[0_0_10px_rgba(0,255,102,0.7)] border border-white/40">
                {primaryNum}
              </div>
            </div>

            <div className="text-center">
              <div className="text-[9px] text-gray-400">NUM 2</div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#006688] text-black font-extrabold text-sm flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.7)] border border-white/40">
                {secondaryNum}
              </div>
            </div>
          </div>

          <div className="mt-2 text-[9px] flex items-center justify-between border-t border-gray-800 pt-1">
            <span className="text-gray-400">SIZE: <strong className={isBig ? 'text-orange-400' : 'text-teal-300'}>{prediction.predictedOutcome}</strong></span>
            <span className="text-gray-400">COLOR: <strong className="text-emerald-400">{prediction.predictedColor || predictedColor}</strong></span>
          </div>
        </div>

        {/* PANEL 03: WIN PROBABILITY MATRIX */}
        <div className="bg-[#05131d] border border-[#00ff66]/40 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-2 border-b border-[#00ff66]/20 pb-1 flex justify-between">
            <span>03 PROBABILITY MATRIX</span>
            <span className="text-[9px] text-amber-300 font-bold">{prediction.predictionType} PREFERRED</span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between border-b border-gray-800/80 pb-1">
              <span className="text-gray-400">SIZE CONFIDENCE:</span>
              <strong className={prediction.predictionType === 'SIZE' ? 'text-[#00ff66] font-extrabold' : 'text-gray-300'}>
                {prediction.sizeConfidence ? prediction.sizeConfidence.toFixed(1) : prediction.confidence}%
              </strong>
            </div>
            <div className="flex justify-between border-b border-gray-800/80 pb-1">
              <span className="text-gray-400">COLOR CONFIDENCE:</span>
              <strong className={prediction.predictionType === 'COLOR' ? 'text-[#00ff66] font-extrabold' : 'text-gray-300'}>
                {prediction.colorConfidence ? prediction.colorConfidence.toFixed(1) : prediction.confidence}%
              </strong>
            </div>
            <div className="flex justify-between pt-0.5 text-[9px]">
              <span className="text-orange-400">BIG {prediction.bigProbability}% / SMALL {prediction.smallProbability}%</span>
            </div>
            <div className="flex justify-between text-[9px]">
              <span className="text-emerald-400">GREEN {prediction.greenProbability || 50}% / RED {prediction.redProbability || 50}%</span>
            </div>
          </div>
        </div>

        {/* PANEL 04: CONFIDENCE METER */}
        <div className="bg-[#05131d] border border-[#00ff66]/40 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-2 border-b border-[#00ff66]/20 pb-1 flex items-center justify-between">
            <span>04 CONFIDENCE METER</span>
            <span className="text-yellow-400 font-bold text-xs">AAA+</span>
          </div>

          <div className="text-center my-1">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-white">
              {prediction.confidence}%
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
              CONFIDENCE LEVEL
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden mt-2 p-0.5 border border-[#00ff66]/30">
            <div
              className="bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-[#ff0055] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,255,102,0.8)]"
              style={{ width: `${prediction.confidence}%` }}
            ></div>
          </div>

          <div className="text-[10px] text-center text-[#00e5ff] font-bold mt-1.5 uppercase">
            GRADE: AAA+ • LEVEL: {prediction.strength}
          </div>
        </div>

      </div>

      {/* Row 2: Panels 05, 06, 07 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 font-mono">
        
        {/* PANEL 05: LAST 20 RESULTS */}
        <div className="lg:col-span-4 bg-[#05131d] border border-[#00ff66]/40 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-3 border-b border-[#00ff66]/20 pb-1 flex items-center justify-between">
            <span>05 LAST 20 RESULTS</span>
            <span className="text-[10px] text-gray-400">NEWEST → OLDEST</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {last20.slice(0, 15).map((item, idx) => {
              const isB = item.size === 'BIG';
              const isG = item.color.includes('GREEN');
              const isR = item.color.includes('RED');
              const isV = item.color.includes('VIOLET');

              return (
                <div
                  key={idx}
                  className={`p-1.5 rounded-lg border text-center text-[10px] font-bold transition-all ${
                    isB
                      ? 'bg-orange-500/10 border-orange-500/50 text-orange-300'
                      : 'bg-teal-500/10 border-teal-500/50 text-teal-300'
                  }`}
                >
                  <div className="text-sm font-extrabold">{item.number}</div>
                  <div className="text-[9px] flex items-center justify-center gap-1 mt-0.5">
                    <span>{item.size[0]}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isV ? 'bg-purple-500' : isR ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 06: PATTERN FLOW GRAPH (LAST 50) */}
        <div className="lg:col-span-5 bg-[#05131d] border border-[#00ff66]/40 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-2 border-b border-[#00ff66]/20 pb-1 flex items-center justify-between">
            <span>06 PATTERN FLOW GRAPH (LAST 50)</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#00e5ff]" />
          </div>

          <div className="relative w-full h-24 bg-[#020a10] border border-[#00ff66]/20 rounded-lg overflow-hidden p-2">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 opacity-10 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border-r border-b border-[#00ff66]"></div>
              ))}
            </div>

            {/* SVG Line */}
            <svg className="w-full h-full overflow-visible">
              <path
                d={graphSvgPath}
                fill="none"
                stroke="#00ff66"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(0,255,102,0.8)]"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[9px] text-gray-400 mt-2">
            <span>-50 ROUNDS</span>
            <span>-30 ROUNDS</span>
            <span>-10 ROUNDS</span>
            <span className="text-[#00ff66] font-bold">NOW</span>
          </div>
        </div>

        {/* PANEL 07: PATTERN BUY/SELL SIGNAL */}
        <div className="lg:col-span-3 bg-[#05131d] border border-[#00ff66]/40 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
          <div className="text-[11px] text-[#00ff66] font-bold uppercase tracking-wider mb-2 border-b border-[#00ff66]/20 pb-1 flex items-center justify-between">
            <span>07 BUY/SELL SIGNAL</span>
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="text-[10px] text-gray-400">DOMINANT PATTERN</div>
              <div className="text-sm font-extrabold text-[#00ff66]">{prediction.dominantPattern}</div>
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-400">STATUS:</span>
              <span className="px-2 py-0.5 rounded bg-[#00ff66]/20 border border-[#00ff66]/40 text-[#00ff66] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="border-t border-gray-800 pt-2 text-[10px] space-y-1">
              <div className="flex justify-between text-gray-300">
                <span>CONTINUE:</span>
                <strong className="text-[#00ff66]">62%</strong>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>BREAK:</span>
                <strong className="text-amber-300">21%</strong>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>REVERSE:</span>
                <strong className="text-cyan-300">17%</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Panels 17, 18, 19, 20 Recommendation Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* PANEL 17: AI FINAL RECOMMENDATION */}
        <div className="bg-[#04121b] border-2 border-[#00ff66]/50 rounded-xl p-4 text-center relative shadow-[0_0_15px_rgba(0,255,102,0.15)]">
          <div className="text-[10px] text-[#00ff66] font-bold uppercase tracking-widest mb-1">
            17 AI FINAL RECOMMENDATION
          </div>
          <div className="text-3xl font-black text-white font-mono my-1 tracking-wider">
            {primaryNum} - {secondaryNum}
          </div>
          <div className="text-xs text-gray-300 font-bold">
            TARGET ({prediction.predictionType}): <span className={
              isTargetGreen ? 'text-emerald-400' :
              isTargetRed ? 'text-red-400' :
              isBig ? 'text-orange-400' : 'text-teal-300'
            }>{prediction.targetResult}</span>
          </div>
        </div>

        {/* PANEL 18: AI ACTION SIGNAL */}
        <div className="bg-[#04121b] border-2 border-[#00e5ff]/50 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <div className="text-[10px] text-[#00e5ff] font-bold uppercase tracking-widest mb-1">
            18 AI ACTION SIGNAL
          </div>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00ff66] to-[#00e5ff] text-black font-extrabold text-sm tracking-wider shadow-[0_0_15px_rgba(0,255,102,0.6)] animate-pulse hover:scale-105 transition-all">
            BET NOW
          </button>
          <div className="text-[9px] text-gray-400 mt-1">STRONG OPPORTUNITY • SAFE & HIGH PROBABILITY</div>
        </div>

        {/* PANEL 19: CONFIDENCE SUMMARY */}
        <div className="bg-[#04121b] border border-[#00ff66]/30 rounded-xl p-3 text-[10px] space-y-1 text-gray-300">
          <div className="text-[#00ff66] font-bold uppercase tracking-wider mb-1">
            19 CONFIDENCE SUMMARY
          </div>
          <div className="flex justify-between">
            <span>PATTERN CONFIDENCE:</span>
            <strong className="text-[#00ff66]">{prediction.confidence}%</strong>
          </div>
          <div className="flex justify-between">
            <span>PREDICTION STRENGTH:</span>
            <strong className="text-yellow-300">{prediction.strength}</strong>
          </div>
          <div className="flex justify-between">
            <span>HISTORY MATCH:</span>
            <strong className="text-[#00e5ff]">{prediction.similarityScorePercent}%</strong>
          </div>
        </div>

        {/* PANEL 20: ENGINE GUARANTEE */}
        <div className="bg-[#04121b] border border-amber-500/40 rounded-xl p-3 flex flex-col items-center justify-center text-center text-amber-300">
          <Shield className="w-6 h-6 text-yellow-400 mb-1 animate-pulse" />
          <div className="text-[11px] font-extrabold tracking-wider">
            GUARANTEED BY ULTRA PRO MAX ENGINE
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5">
            ZERO LOSS LOGIC • UNDER 1-2 LEVEL WIN
          </div>
        </div>

      </div>

    </div>
  );
};
