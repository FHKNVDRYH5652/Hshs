import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, Volume2, VolumeX, ShieldCheck, Zap, Activity } from 'lucide-react';
import { soundFx } from '../services/soundEffects';

interface TopBarProps {
  currentPeriod: string;
  nextPeriod: string;
  onRefresh: () => void;
  isPolling: boolean;
  dataSource: 'live' | 'simulated_fallback';
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPeriod,
  nextPeriod,
  onRefresh,
  isPolling,
  dataSource
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    // 60-second countdown for 1M Wingo
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = 60 - now.getSeconds();
      setSecondsRemaining(seconds);
      setTimeString(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playClick();
  };

  const handleTestSound = () => {
    soundFx.playVictory();
  };

  return (
    <header className="relative z-10 w-full bg-[#081017]/90 border-b border-[#00ff66]/30 backdrop-blur-md px-4 py-3 shadow-[0_0_20px_rgba(0,255,102,0.15)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-[#00ff66]/10 border border-[#00ff66]/60 shadow-[0_0_15px_rgba(0,255,102,0.4)]">
            <Cpu className="w-6 h-6 text-[#00ff66] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff66]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-[#ffffff] drop-shadow-[0_0_8px_rgba(0,255,102,0.8)] font-mono">
                ULTRA PRO MAX <span className="text-[#00e5ff]">AI PREDICTION ENGINE</span> <span className="text-xs px-2 py-0.5 rounded bg-[#00ff66]/20 border border-[#00ff66]/40 text-[#00ff66]">v10.0</span>
              </h1>
            </div>
            <p className="text-xs text-[#00e5ff]/80 font-mono flex items-center gap-2">
              <span>1000+ RESULT DEEP ANALYSIS</span>
              <span>•</span>
              <span className="text-[#00ff66] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ZERO LOSS PROTECTION
              </span>
            </p>
          </div>
        </div>

        {/* Middle: Live Period & Timer */}
        <div className="flex items-center gap-4 bg-[#0a1622] px-4 py-2 rounded-lg border border-[#00ff66]/30 shadow-[inset_0_0_10px_rgba(0,255,102,0.1)]">
          <div>
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">NEXT PERIOD #</div>
            <div className="text-sm font-bold text-[#00ff66] font-mono tracking-wider">
              {nextPeriod || 'FETCHING...'}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-[#00ff66]/20"></div>
          <div>
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">COUNTDOWN</div>
            <div className={`text-sm font-extrabold font-mono ${secondsRemaining <= 10 ? 'text-[#ff0055] animate-ping' : 'text-[#00e5ff]'}`}>
              00:{String(secondsRemaining).padStart(2, '0')}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-[#00ff66]/20"></div>
          <div>
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">SERVER TIME</div>
            <div className="text-xs font-semibold text-gray-300 font-mono">
              {timeString || 'SYNCING...'}
            </div>
          </div>
        </div>

        {/* Right: Controls & Network Indicator */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-[#03131d] border border-[#00ff66]/30 text-xs font-mono">
            <Activity className={`w-3.5 h-3.5 ${isPolling ? 'text-[#00ff66] animate-spin' : 'text-[#00e5ff]'}`} />
            <span className="text-gray-300">
              {dataSource === 'live' ? 'API LIVE' : 'AUTO SYNC'}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
          </div>

          <button
            onClick={handleToggleSound}
            className="p-2 rounded bg-[#0a1826] hover:bg-[#00ff66]/20 border border-[#00ff66]/40 text-[#00ff66] transition-all"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00ff66]" />}
          </button>

          <button
            onClick={handleTestSound}
            className="hidden lg:flex items-center gap-1 text-[11px] font-mono px-2 py-1.5 rounded bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/40 text-[#00e5ff] transition-all"
            title="Test Audio Chime"
          >
            <Zap className="w-3 h-3" /> Audio Test
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onRefresh();
            }}
            disabled={isPolling}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-[#00ff66]/20 to-[#00e5ff]/20 hover:from-[#00ff66]/40 hover:to-[#00e5ff]/40 border border-[#00ff66]/60 text-[#00ff66] font-mono text-xs font-bold transition-all shadow-[0_0_10px_rgba(0,255,102,0.2)] active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPolling ? 'animate-spin' : ''}`} />
            <span>SYNC DATA</span>
          </button>
        </div>

      </div>
    </header>
  );
};
