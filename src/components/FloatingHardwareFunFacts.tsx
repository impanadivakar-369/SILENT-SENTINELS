import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Radio, Sparkles, Volume2, X } from 'lucide-react';
import { SENTINEL_FUN_FACTS, SentinelMission, VehicleFunFactPack } from '../data/sentinelsData';

interface FloatingHardwareFunFactsProps {
  mission: SentinelMission;
  isOpen: boolean;
  onClose: () => void;
}

const HardwareCharacterAvatar: React.FC<{ mission: SentinelMission }> = ({ mission }) => {
  if (mission.id === 'voyager-1') {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(250,204,21,0.55)]">
        {/* Spinning Gold Record Disc with Cute Glowing Telemetry Eyes */}
        <circle cx="60" cy="60" r="46" fill="#FACC15" stroke="#FEF08A" strokeWidth="3" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="60" cy="60" r="26" fill="none" stroke="#CA8A04" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="14" fill="#1E293B" stroke="#FDE047" strokeWidth="2" />
        {/* Expressive Visor Eyes */}
        <rect x="38" y="44" width="44" height="16" rx="8" fill="#090C10" stroke="#D2F366" strokeWidth="2" />
        <circle cx="50" cy="52" r="4" fill="#D2F366" />
        <circle cx="70" cy="52" r="4" fill="#D2F366" />
        {/* Stylus Arm */}
        <path d="M98,25 L82,58 L74,64" fill="none" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  switch (mission.badge.iconType) {
    case 'rover':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(210,243,102,0.5)]">
          {/* Camera Mast Head with Binocular Eyes */}
          <line x1="60" y1="54" x2="60" y2="76" stroke="#CBD5E1" strokeWidth="6" />
          <rect x="28" y="24" width="64" height="30" rx="8" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="46" cy="39" r="8" fill="#090C10" stroke="#D2F366" strokeWidth="2.5" />
          <circle cx="74" cy="39" r="8" fill="#090C10" stroke="#D2F366" strokeWidth="2.5" />
          <circle cx="48" cy="37" r="2.5" fill="#D2F366" />
          <circle cx="76" cy="37" r="2.5" fill="#D2F366" />
          {/* Gold Warm Electronics Box + Wheels */}
          <rect x="32" y="72" width="56" height="22" rx="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2" />
          <circle cx="34" cy="98" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="60" cy="98" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="86" cy="98" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
        </svg>
      );

    case 'rotor':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]">
          {/* Solar Hat + Twin Rotors */}
          <rect x="34" y="14" width="52" height="8" rx="3" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="2" />
          <line x1="60" y1="22" x2="60" y2="54" stroke="#E2E8F0" strokeWidth="5" />
          <ellipse cx="60" cy="32" rx="48" ry="5" fill="#0F172A" stroke="#D2F366" strokeWidth="2" />
          <ellipse cx="60" cy="43" rx="48" ry="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          {/* Gold Tissue-Box Body with Cute Eyes */}
          <rect x="38" y="52" width="44" height="36" rx="6" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2.5" />
          <circle cx="51" cy="68" r="4.5" fill="#090C10" />
          <circle cx="69" cy="68" r="4.5" fill="#090C10" />
          <circle cx="52" cy="66.5" r="1.8" fill="#D2F366" />
          <circle cx="70" cy="66.5" r="1.8" fill="#D2F366" />
          <path d="M53,77 Q60,82 67,77" fill="none" stroke="#090C10" strokeWidth="2.5" strokeLinecap="round" />
          {/* 4 Landing Legs */}
          <line x1="40" y1="86" x2="22" y2="108" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="80" y1="86" x2="98" y2="108" stroke="#CBD5E1" strokeWidth="3" />
        </svg>
      );

    case 'ion':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(56,189,248,0.65)]">
          {/* Solar Wings + Glowing Blue Xenon Plume */}
          <rect x="6" y="42" width="30" height="22" rx="3" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="2" />
          <rect x="84" y="42" width="30" height="22" rx="3" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="2" />
          <polygon points="44,78 76,78 90,114 30,114" fill="#38BDF8" opacity="0.55" />
          <rect x="36" y="32" width="48" height="46" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="50" cy="52" r="5" fill="#D2F366" />
          <circle cx="70" cy="52" r="5" fill="#D2F366" />
          <path d="M52,64 Q60,70 68,64" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'laser':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(210,243,102,0.55)]">
          {/* Laser Retroreflector Prism Grid */}
          <polygon points="20,42 84,22 102,68 38,88" fill="#0F172A" stroke="#D2F366" strokeWidth="3" />
          <circle cx="48" cy="52" r="6" fill="#D2F366" />
          <circle cx="70" cy="45" r="6" fill="#D2F366" />
          <circle cx="56" cy="68" r="5" fill="#38BDF8" />
          <circle cx="76" cy="62" r="5" fill="#38BDF8" />
          <line x1="12" y1="14" x2="46" y2="48" stroke="#D2F366" strokeWidth="3" strokeDasharray="4 3" />
        </svg>
      );

    case 'telescope':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(250,204,21,0.5)]">
          {/* Gold Kepler Barrel with Giant Staring Eye */}
          <rect x="34" y="24" width="52" height="68" rx="10" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2.5" />
          <circle cx="60" cy="50" r="18" fill="#090C10" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="60" cy="50" r="8" fill="#D2F366" />
          <circle cx="63" cy="47" r="3" fill="#090C10" />
          <rect x="28" y="90" width="64" height="14" rx="4" fill="#CBD5E1" />
        </svg>
      );

    case 'lander':
    case 'asteroid':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(245,158,11,0.5)]">
          {/* Gold Octagonal Lander Stage with Legs & Visor */}
          <polygon points="34,36 86,36 96,76 24,76" fill="#D97706" stroke="#FDE047" strokeWidth="2.5" />
          <rect x="38" y="45" width="44" height="16" rx="6" fill="#090C10" stroke="#D2F366" strokeWidth="2" />
          <circle cx="50" cy="53" r="4" fill="#D2F366" />
          <circle cx="70" cy="53" r="4" fill="#D2F366" />
          <line x1="30" y1="76" x2="14" y2="104" stroke="#E2E8F0" strokeWidth="4" />
          <line x1="90" y1="76" x2="106" y2="104" stroke="#E2E8F0" strokeWidth="4" />
          <ellipse cx="14" cy="105" rx="10" ry="4" fill="#94A3B8" />
          <ellipse cx="106" cy="105" rx="10" ry="4" fill="#94A3B8" />
        </svg>
      );

    case 'dish':
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(210,243,102,0.55)]">
          {/* High-Gain Dish Antenna with Glowing Feed Horn & Eyes */}
          <ellipse cx="60" cy="64" rx="46" ry="26" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="3" />
          <rect x="40" y="54" width="40" height="16" rx="8" fill="#090C10" stroke="#D2F366" strokeWidth="2" />
          <circle cx="51" cy="62" r="4" fill="#D2F366" />
          <circle cx="69" cy="62" r="4" fill="#D2F366" />
          <line x1="40" y1="54" x2="60" y2="20" stroke="#94A3B8" strokeWidth="3" />
          <line x1="80" y1="54" x2="60" y2="20" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="60" cy="18" r="6" fill="#D2F366" />
        </svg>
      );
  }
};

export const FloatingHardwareFunFacts: React.FC<FloatingHardwareFunFactsProps> = ({
  mission,
  isOpen,
  onClose
}) => {
  const [factIndex, setFactIndex] = useState(0);

  const pack: VehicleFunFactPack | undefined = SENTINEL_FUN_FACTS[mission.id];

  useEffect(() => {
    setFactIndex(0);
  }, [mission.id, isOpen]);

  if (!isOpen || !pack) return null;

  const currentFact = pack.facts[factIndex] || pack.facts[0];
  const totalFacts = pack.facts.length;

  const handlePrev = () => {
    setFactIndex((prev) => (prev - 1 + totalFacts) % totalFacts);
  };

  const handleNext = () => {
    setFactIndex((prev) => (prev + 1) % totalFacts);
  };

  return (
    <div
      role="dialog"
      aria-label={`Floating space hardware fun facts for ${mission.name}`}
      className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-md pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Floating Hardware Companion Header */}
      <div className="relative rounded-3xl cosmic-card backdrop-blur-2xl bg-[#0E0B22]/95 border border-purple-500/35 shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-5 sm:p-6 overflow-hidden text-slate-100">
        {/* Top Bar: Hardware Badge + Close Button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Zero-Gravity Floating Space Hardware Character */}
            <div className="relative shrink-0 rounded-2xl bg-purple-950/40 border border-purple-500/40 p-2 animate-bounce shadow-md">
              <HardwareCharacterAvatar mission={mission} />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 items-center justify-center">
                  <Radio className="w-2.5 h-2.5 text-[#070514]" />
                </span>
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold mb-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>{pack.hardwarePartBadge}</span>
              </div>
              <h3 className="font-display text-lg font-extrabold text-white leading-snug">
                {pack.hardwareSpeakerName}
              </h3>
              <p className="text-xs font-mono text-slate-300 flex items-center gap-1 mt-0.5 font-bold">
                <Volume2 className="w-3.5 h-3.5 shrink-0 text-cyan-300" />
                <span>Talking directly from {mission.name}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close floating space hardware fun facts"
            className="w-8 h-8 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:text-white hover:bg-purple-900/50 flex items-center justify-center cursor-pointer shrink-0 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Intro First-Person Hardware Catchphrase */}
        <div className="rounded-2xl bg-purple-950/30 border border-purple-500/25 px-4 py-2.5 mb-4 shadow-sm">
          <p className="text-xs text-purple-200 italic leading-relaxed font-sans font-medium">
            “{pack.introCatchphrase}”
          </p>
        </div>

        {/* Active Funny Fun Fact Bubble */}
        <div className="rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              FUN FACT #{factIndex + 1} OF {totalFacts} · {mission.name.toUpperCase()}
            </span>
          </div>

          <h4 className="font-display text-base sm:text-lg font-extrabold text-white mb-2">
            “{currentFact.title}”
          </h4>

          <p className="text-sm text-slate-200 leading-relaxed mb-3 font-sans">
            {currentFact.joke}
          </p>

          <div className="rounded-xl bg-purple-950/40 border border-purple-500/25 px-3.5 py-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-0.5">
              TRUE NSSDCA SCIENCE FACT:
            </span>
            <span className="text-xs font-mono font-bold text-cyan-300 leading-snug block">
              {currentFact.scienceTruth}
            </span>
          </div>
        </div>

        {/* Bottom Controls: Prev / Dots / Next Fun Fact */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous fun fact"
            className="cosmic-btn-secondary inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-purple-400" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5" aria-label="Fun fact progress">
            {pack.facts.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFactIndex(idx)}
                aria-label={`Jump to fun fact ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === factIndex
                    ? 'w-6 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                    : 'w-2 bg-purple-950/60 hover:bg-purple-800'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next fun fact"
            className="cosmic-btn-primary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer shadow-[0_0_16px_rgba(168,85,247,0.5)]"
          >
            <span>Next Fun Fact</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
