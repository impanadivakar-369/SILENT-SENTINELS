import React, { useState, useEffect } from 'react';
import { SentinelMission, SENTINEL_MISSIONS, SignalMysteryOption } from '../data/sentinelsData';
import { SpacecraftVisual } from './SpacecraftVisual';
import { calculateOneWayLightMinutes } from '../utils/missionLogic';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Radio, RotateCcw, Sparkles, Orbit } from 'lucide-react';

interface SignalChallengeViewProps {
  initialMission?: SentinelMission;
  solvedMysteries: string[];
  onSolveMystery: (missionId: string) => void;
  onBack: () => void;
  onOpenGoldenMessage?: () => void;
  onOpenMissionDetail: (mission: SentinelMission) => void;
}

export const SignalChallengeView: React.FC<SignalChallengeViewProps> = ({
  initialMission,
  solvedMysteries,
  onSolveMystery,
  onBack,
  onOpenMissionDetail
}) => {
  const [currentMission, setCurrentMission] = useState<SentinelMission>(
    initialMission || SENTINEL_MISSIONS[0]
  );
  const [selectedOption, setSelectedOption] = useState<SignalMysteryOption | null>(null);
  const [distanceAu, setDistanceAu] = useState<number>(80); // Default 80 AU (Pioneer 10 final signal)

  useEffect(() => {
    if (initialMission) {
      setCurrentMission(initialMission);
      setSelectedOption(null);
    }
  }, [initialMission]);

  const handleChooseOption = (option: SignalMysteryOption) => {
    setSelectedOption(option);
    if (option.isCorrect) {
      onSolveMystery(currentMission.id);
    }
  };

  const handleSelectMissionTab = (mission: SentinelMission) => {
    setCurrentMission(mission);
    setSelectedOption(null);
  };

  const handleNextMystery = () => {
    const idx = SENTINEL_MISSIONS.findIndex((m) => m.id === currentMission.id);
    const next = SENTINEL_MISSIONS[(idx + 1) % SENTINEL_MISSIONS.length];
    handleSelectMissionTab(next);
  };

  const oneWayMinutes = calculateOneWayLightMinutes(distanceAu);
  const oneWayHours = (oneWayMinutes / 60).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-slate-100">
      {/* Top Bar navigation */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-purple-500/20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-purple-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to exploration</span>
        </button>

        <div className="font-mono text-xs font-bold text-slate-400 tabular-nums">
          MYSTERIES SOLVED: <span className="text-cyan-300 font-extrabold">{solvedMysteries.length}</span> / {SENTINEL_MISSIONS.length}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>MISSION CONTROL / SIGNAL CHALLENGE</span>
          </div>
          <h1 className="font-display cosmic-headline text-3xl sm:text-5xl font-black tracking-tight mb-2">
            Can you explain the silence?
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans font-medium">
            One mystery. Three explanations. Let the engineering evidence guide you.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 backdrop-blur-xl shadow-lg flex items-center gap-3">
            <Orbit className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="font-mono text-xs">
              <div className="text-cyan-300 font-bold uppercase">DSN TELEMETRY FEED</div>
              <div className="text-slate-400">Deep Space Network Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Switcher Strip */}
      <div className="mb-8">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 mb-2.5">
          SELECT ANY SPACECRAFT MYSTERY TO INVESTIGATE ({SENTINEL_MISSIONS.length} MISSIONS):
        </div>
        <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {SENTINEL_MISSIONS.map((m) => {
            const isCurrent = m.id === currentMission.id;
            const isSolved = solvedMysteries.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMissionTab(m)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  isCurrent
                    ? 'cosmic-btn-primary shadow-[0_0_16px_rgba(168,85,247,0.5)]'
                    : isSolved
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 font-bold'
                      : 'bg-[#0E0B22]/60 border-purple-500/20 text-slate-300 hover:border-purple-400 hover:text-white font-semibold'
                }`}
              >
                <span>{m.indexNumber}</span>
                <span className="font-sans font-medium">{m.name}</span>
                {isSolved && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
        {/* Left Card: Spacecraft Visual + 3 Evidence Clues (5 cols) */}
        <div className="lg:col-span-5 cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 overflow-hidden flex flex-col text-slate-100 shadow-[0_16px_48px_rgba(0,0,0,0.7)]">
          <div className="h-52 sm:h-60 w-full bg-[#04060E] border-b border-purple-500/25">
            <SpacecraftVisual
              mission={currentMission}
              interactive={false}
              enable3D={true}
              className="w-full h-full"
            />
          </div>

          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[11px] font-bold tracking-wider uppercase text-purple-400 mb-4">
                THE EVIDENCE / {currentMission.name.toUpperCase()}
              </p>

              <div className="space-y-4">
                {currentMission.signalMystery.evidenceItems.map((item) => (
                  <div key={item.number} className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/25 shadow-sm">
                    <div className="font-display text-sm sm:text-base font-extrabold text-white">
                      <span className="font-mono text-xs text-purple-400 mr-2">
                        {item.number}
                      </span>
                      {item.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 pl-5 font-sans leading-relaxed font-medium">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Prediction or Outcome (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {!selectedOption ? (
            <div className="cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-6 sm:p-8 h-full flex flex-col justify-between text-slate-100 shadow-[0_16px_48px_rgba(0,0,0,0.7)]">
              <div>
                <p className="font-mono text-[11px] font-bold tracking-wider uppercase text-purple-400 mb-2">
                  WHAT BEST EXPLAINS ITS FINAL STATE?
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Choose your explanation.
                </h2>
                <p className="text-sm text-slate-300 mb-6 font-sans font-medium">
                  {currentMission.signalMystery.questionTitle}
                </p>

                <div className="space-y-3.5">
                  {currentMission.signalMystery.options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleChooseOption(opt)}
                      className="w-full text-left rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 hover:border-purple-400 p-4 sm:p-5 transition-all flex items-center gap-4 group cursor-pointer shadow-sm"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-200 font-mono text-xs font-bold shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {opt.id}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Engineer Hint Box */}
              <div className="rounded-2xl bg-purple-950/40 border border-purple-500/30 p-4 mt-6 text-slate-200 shadow-sm">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">
                  THINK LIKE A TELEMETRY ENGINEER
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium">
                  {currentMission.signalMystery.engineerHint}
                </p>
              </div>
            </div>
          ) : selectedOption.isCorrect ? (
            /* STATE 2: Evidence Unlocked (Correct) */
            <div className="cosmic-card backdrop-blur-2xl bg-emerald-950/40 border border-emerald-500/50 p-6 sm:p-8 h-full flex flex-col justify-between text-slate-100 shadow-[0_16px_48px_rgba(16,185,129,0.25)]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>EVIDENCE CONFIRMED · MYSTERY SOLVED</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {selectedOption.feedbackHeadline}
                </h2>
                <div className="font-mono text-xs font-bold text-emerald-300/80 mb-4">
                  {selectedOption.feedbackSubhead}
                </div>
                <div className="p-4 rounded-xl bg-[#070514]/80 border border-emerald-500/40 text-sm font-bold text-emerald-200 mb-5">
                  {selectedOption.text}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium mb-6">
                  {selectedOption.feedbackBody}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-emerald-500/30">
                <button
                  type="button"
                  onClick={handleNextMystery}
                  className="cosmic-btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-mono font-bold cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                >
                  <span>Investigate Next Mystery</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenMissionDetail(currentMission)}
                  className="cosmic-btn-secondary inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-mono font-bold transition-colors cursor-pointer"
                >
                  <span>View Full Mission Dossier</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            </div>
          ) : (
            /* STATE 3: Keep Investigating (Incorrect) */
            <div className="cosmic-card backdrop-blur-2xl bg-rose-950/40 border border-rose-500/50 p-6 sm:p-8 h-full flex flex-col justify-between text-slate-100 shadow-[0_16px_48px_rgba(244,63,94,0.25)]">
              <div>
                <p className="font-mono text-xs font-bold text-rose-300 uppercase tracking-wider mb-2">
                  TELEMETRY DISCREPANCY
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {selectedOption.feedbackHeadline}
                </h2>
                <div className="font-mono text-xs font-bold text-rose-300/80 mb-4">
                  {selectedOption.feedbackSubhead}
                </div>
                <div className="p-4 rounded-xl bg-[#070514]/80 border border-rose-500/40 text-sm font-bold text-rose-200 mb-5">
                  {selectedOption.text}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium mb-6">
                  {selectedOption.feedbackBody}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-rose-500/30">
                <button
                  type="button"
                  onClick={() => setSelectedOption(null)}
                  className="cosmic-btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-mono font-bold cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Another Hypothesis</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* One-Way Light Travel Time Simulator */}
      <div className="cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-6 sm:p-8 text-slate-100 shadow-[0_16px_56px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>SPEED OF LIGHT · TELEMETRY PROPAGATION DELAY</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              How long did radio signals take to reach Earth?
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-cyan-300">
            c = 299,792.458 KM/S
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
            <span>Distance from Sun/Earth:</span>
            <span className="text-cyan-300 font-extrabold text-sm">{distanceAu} AU ({(distanceAu * 149.6).toFixed(0)} million km)</span>
          </div>
          <input
            type="range"
            min="0.38"
            max="160"
            step="1"
            value={distanceAu}
            onChange={(e) => setDistanceAu(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-purple-300/70 font-semibold">
            <span>Mercury (0.38 AU)</span>
            <span>Mars (1.52 AU)</span>
            <span>Jupiter (5.2 AU)</span>
            <span>Pioneer 10 Final (80 AU)</span>
            <span>Voyager 1 (160 AU)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 shadow-inner">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase block font-bold">ONE-WAY LIGHT TIME</span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1 block">
              {oneWayMinutes.toFixed(1)} minutes <span className="text-sm font-normal text-slate-300 font-sans">({oneWayHours} hours)</span>
            </span>
          </div>
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase block font-bold">ROUND-TRIP COMMAND PING</span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-300 mt-1 block">
              {(oneWayMinutes * 2).toFixed(1)} minutes <span className="text-sm font-normal text-slate-300 font-sans">({(Number(oneWayHours) * 2).toFixed(1)} hours)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
