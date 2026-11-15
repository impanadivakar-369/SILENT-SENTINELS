import React, { useState } from 'react';
import { PIONEER_PLAQUE_HOTSPOTS, PlaqueHotspot } from '../data/sentinelsData';
import { ArrowLeft, Award, CheckCircle2, Sparkles, Binary, Orbit } from 'lucide-react';
import { DiscoveryModal, DiscoveryOverlayData } from './DiscoveryModal';

interface PlaqueDiagramSvgProps {
  interactive?: boolean;
  decodedIds?: string[];
  activeId?: string | null;
  onSelectHotspot?: (hotspot: PlaqueHotspot) => void;
}

export const PioneerPlaqueSvg: React.FC<PlaqueDiagramSvgProps> = ({
  interactive = false,
  decodedIds = [],
  activeId = null,
  onSelectHotspot
}) => {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#F7F8FA] p-3 sm:p-5 border-2 border-[#0A0D14] select-none shadow-[8px_8px_0px_#0A0D14]">
      <svg
        viewBox="0 0 600 440"
        className="w-full h-full"
        aria-label="1972 NASA Pioneer Golden Plaque Diagram"
      >
        {/* Outer Technical Annotation Frame */}
        <rect width="600" height="440" fill="#F8FAFC" />

        {/* Gold-Anodized Aluminum Plaque Plate */}
        <rect
          x="36"
          y="48"
          width="528"
          height="336"
          rx="18"
          fill="#F5CF14"
          stroke="#1E293B"
          strokeWidth="2.5"
        />

        {/* Mounting bolt holes */}
        <circle cx="52" cy="115" r="6" fill="#1E293B" />
        <circle cx="548" cy="115" r="6" fill="#1E293B" />
        <circle cx="52" cy="312" r="6" fill="#1E293B" />
        <circle cx="548" cy="312" r="6" fill="#1E293B" />

        {/* 04: Hyperfine Transition of Neutral Hydrogen (Top Left) */}
        <g stroke="#1E293B" strokeWidth="2" fill="none">
          <circle cx="132" cy="105" r="18" />
          <circle cx="192" cy="105" r="18" />
          <line x1="150" y1="105" x2="174" y2="105" />
          {/* Electron spin arrows */}
          <line x1="132" y1="78" x2="132" y2="92" />
          <circle cx="132" cy="82" r="2" fill="#1E293B" />
          <line x1="192" y1="98" x2="192" y2="114" />
          <circle cx="192" cy="110" r="2" fill="#1E293B" />
          {/* Binary 1 below */}
          <line x1="162" y1="122" x2="162" y2="134" />
        </g>

        {/* 02: 14-Pulsar Radial Map (Center Left) */}
        <g stroke="#1E293B" strokeWidth="1.8" fill="none">
          {/* Sun center */}
          <circle cx="204" cy="222" r="3" fill="#1E293B" />
          {/* Galactic center line to right */}
          <line x1="204" y1="222" x2="365" y2="222" />
          {/* 14 Pulsar rays */}
          <line x1="204" y1="222" x2="95" y2="152" />
          <line x1="204" y1="222" x2="78" y2="196" />
          <line x1="204" y1="222" x2="68" y2="218" />
          <line x1="204" y1="222" x2="88" y2="236" />
          <line x1="204" y1="222" x2="102" y2="265" />
          <line x1="204" y1="222" x2="145" y2="312" />
          <line x1="204" y1="222" x2="178" y2="338" />
          <line x1="204" y1="222" x2="192" y2="345" />
          <line x1="204" y1="222" x2="235" y2="328" />
          <line x1="204" y1="222" x2="275" y2="340" />
          <line x1="204" y1="222" x2="255" y2="145" />
          <line x1="204" y1="222" x2="225" y2="165" />
          <line x1="204" y1="222" x2="168" y2="175" />
        </g>

        {/* 05: Pioneer Spacecraft Silhouette (Right Background) */}
        <g stroke="#1E293B" strokeWidth="1.6" fill="none">
          <path d="M385,78 L428,150 L428,265 L385,325" />
          <rect x="355" y="150" width="73" height="115" />
          <line x1="428" y1="150" x2="465" y2="207" />
          <line x1="428" y1="265" x2="465" y2="207" />
        </g>

        {/* 01: Scale Human Figures (Right Foreground) */}
        <g stroke="#1E293B" strokeWidth="2" fill="#F5CF14">
          {/* Male figure with raised greeting hand */}
          <circle cx="408" cy="152" r="11" />
          <path d="M394,168 L422,168 L425,222 L416,285 L408,285 L408,230 L400,285 L392,285 L395,222 Z" />
          {/* Raised right hand in universal greeting */}
          <path d="M394,172 L374,190 L368,162" fill="none" strokeWidth="2.4" />
          {/* Female figure */}
          <circle cx="468" cy="162" r="10.5" />
          <path d="M456,178 L480,178 L482,226 L475,285 L468,285 L468,234 L461,285 L454,285 L456,226 Z" />
        </g>

        {/* 03: Solar System & Pioneer Trajectory Arrow (Bottom) */}
        <g stroke="#1E293B" strokeWidth="1.8" fill="none">
          {/* Sun */}
          <circle cx="68" cy="348" r="9" />
          {/* Mercury, Venus, Earth, Mars */}
          <circle cx="95" cy="348" r="3" />
          <circle cx="125" cy="348" r="4.5" />
          <circle cx="160" cy="348" r="4.8" />
          <circle cx="198" cy="348" r="3.8" />
          {/* Jupiter, Saturn with ring, Uranus, Neptune, Pluto */}
          <circle cx="258" cy="348" r="8" />
          <ellipse cx="320" cy="348" rx="14" ry="4" strokeWidth="1.2" />
          <circle cx="320" cy="348" r="7" />
          <circle cx="380" cy="348" r="6" />
          <circle cx="435" cy="348" r="5.8" />
          <circle cx="488" cy="348" r="2.2" />
          {/* Pioneer trajectory curved flight path from Earth past Jupiter and out */}
          <path
            d="M160,348 Q180,312 250,305 T330,300 L445,300"
            strokeDasharray="4 3"
            strokeWidth="1.6"
          />
          {/* Arrowhead pointing out of the solar system */}
          <polygon points="445,296 455,300 445,304" fill="#1E293B" />
        </g>
      </svg>

      {/* Interactive Hotspots */}
      {interactive &&
        PIONEER_PLAQUE_HOTSPOTS.map((spot) => {
          const isDecoded = decodedIds.includes(spot.id);
          const isActive = activeId === spot.id;

          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => onSelectHotspot?.(spot)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              aria-label={`Decode plaque clue ${spot.number}: ${spot.title}`}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full font-mono text-xs font-bold transition-transform duration-150 cursor-pointer shadow-lg ${
                isActive
                  ? 'bg-[#05070C] text-[#F5D061] ring-4 ring-[#F5D061]/50 scale-110'
                  : isDecoded
                    ? 'bg-[#05070C] text-[#D2F366] border-2 border-[#D2F366] hover:scale-110 shadow-[0_0_15px_rgba(210,243,102,0.4)]'
                    : 'bg-[#05070C] text-[#F5D061] border-2 border-[#F5D061] hover:scale-110'
              }`}
            >
              <span>{spot.number}</span>
              <span className="pointer-events-none absolute left-1/2 -top-9 -translate-x-1/2 whitespace-nowrap rounded bg-[#05070C] px-2.5 py-1 text-[11px] font-sans font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-white/10">
                {spot.title}
              </span>
            </button>
          );
        })}
    </div>
  );
};

interface GoldenPlaqueViewProps {
  decodedIds: string[];
  onDecodeHotspot: (hotspotId: string) => void;
  onBack: () => void;
  hasPlaqueBadge: boolean;
}

const PLANET_BINARY_DATA = [
  { name: 'Mercury', order: '1st', binary: '1010', units: 10, au: '0.39 AU', note: 'Closest planet to the Sun' },
  { name: 'Venus', order: '2nd', binary: '10011', units: 19, au: '0.72 AU', note: 'Wrapped in thick CO2 clouds' },
  { name: 'Earth', order: '3rd', binary: '11010', units: 26, au: '1.00 AU', note: 'Pioneer’s launch point! Trajectory arrow starts here.' },
  { name: 'Mars', order: '4th', binary: '100111', units: 39, au: '1.52 AU', note: 'Home to 9 NASA landers, rovers, and Ingenuity' },
  { name: 'Jupiter', order: '5th', binary: '10000110', units: 134, au: '5.20 AU', note: 'Pioneer 10 & 11 flew past here for a gravity boost!' },
  { name: 'Saturn', order: '6th', binary: '11110111', units: 247, au: '9.54 AU', note: 'Visited by Pioneer 11 in September 1979' }
];

export const GoldenPlaqueView: React.FC<GoldenPlaqueViewProps> = ({
  decodedIds,
  onDecodeHotspot,
  onBack,
  hasPlaqueBadge
}) => {
  const [selectedSpot, setSelectedSpot] = useState<PlaqueHotspot | null>(null);
  const [selectedPlanetIdx, setSelectedPlanetIdx] = useState<number>(2); // Default Earth

  const handleOpenSpot = (spot: PlaqueHotspot) => {
    setSelectedSpot(spot);
    onDecodeHotspot(spot.id);
  };

  const handleNextSpot = () => {
    if (!selectedSpot) return;
    const currentIndex = PIONEER_PLAQUE_HOTSPOTS.findIndex((s) => s.id === selectedSpot.id);
    const nextSpot = PIONEER_PLAQUE_HOTSPOTS[(currentIndex + 1) % PIONEER_PLAQUE_HOTSPOTS.length];
    handleOpenSpot(nextSpot);
  };

  const modalData: DiscoveryOverlayData | null = selectedSpot
    ? {
        kicker: selectedSpot.kicker,
        headline: selectedSpot.headline,
        technicalSubtitle: selectedSpot.technicalFeature,
        body: selectedSpot.explanation,
        promptType: selectedSpot.promptType,
        promptQuestion: selectedSpot.promptQuestion,
        promptInsight: selectedSpot.promptAnswerHint
      }
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-slate-100">
      {/* Top navigation back */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-purple-500/20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-purple-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to exploration</span>
        </button>
        <div className="text-xs font-mono font-bold text-slate-400 tabular-nums">
          PLAQUE CLUES DECODED: <span className="text-cyan-300 font-extrabold">{decodedIds.length}</span> / {PIONEER_PLAQUE_HOTSPOTS.length}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Orbit className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '24s' }} />
            <span>02 / LOOK CLOSER · THE GOLDEN MESSAGE</span>
          </div>
          <h1 className="font-display cosmic-headline text-3xl sm:text-5xl font-black tracking-tight mb-3">
            A postcard. For the universe.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans font-medium">
            No English words. No return street address. Designed in 1972 by astronomers Carl Sagan and Frank Drake and drawn by Linda Salzman Sagan, both Pioneer 10 and 11 carry a 6-by-9-inch gold-anodized aluminum plaque telling our story. Click all 5 numbers to decode it!
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 backdrop-blur-xl shadow-lg flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-[#0A071E] font-bold shadow-[0_0_16px_rgba(245,158,11,0.5)]">
              ✦
            </div>
            <div className="font-mono text-xs">
              <div className="text-amber-300 font-bold uppercase">1972 GOLDEN PLAQUE</div>
              <div className="text-slate-400">Pioneer 10 &amp; 11 Manifest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Interactive Plaque Left + Clue Deck Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <div className="lg:col-span-7">
          <PioneerPlaqueSvg
            interactive={true}
            decodedIds={decodedIds}
            activeId={selectedSpot?.id || null}
            onSelectHotspot={handleOpenSpot}
          />
          <p className="mt-2.5 text-xs font-mono font-bold text-slate-400">
            ARCHIVE DIAGRAM / NASA AMES RESEARCH CENTER · CLICK NUMBERS 01–05 TO INVESTIGATE
          </p>
        </div>

        {/* Right Column: Progress & Clue Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {hasPlaqueBadge && (
            <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 to-purple-950/40 border border-amber-500/40 p-4 flex items-start gap-3.5 shadow-[0_4px_24px_rgba(245,158,11,0.2)] text-amber-200">
              <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  ✦ BADGE UNLOCKED · COSMIC POSTMASTER
                </div>
                <p className="text-sm text-slate-200 mt-0.5 font-medium">
                  You decoded all 5 interstellar symbols on the Pioneer Plaque!
                </p>
              </div>
            </div>
          )}

          <div className="cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-6 text-slate-100 shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-white mb-1">
              5 Symbols in Universal Science Language
            </h2>
            <p className="text-xs text-slate-400 font-medium mb-4">
              Click any clue below or directly on the golden plaque to open its discovery card:
            </p>

            <div className="space-y-3">
              {PIONEER_PLAQUE_HOTSPOTS.map((spot) => {
                const isDone = decodedIds.includes(spot.id);
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleOpenSpot(spot)}
                    className={`w-full text-left rounded-2xl p-4 border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isDone
                        ? 'bg-[#0A071E]/90 border-purple-500/40 hover:border-purple-400 text-white'
                        : 'bg-[#0A071E]/60 border-purple-500/20 hover:border-purple-500/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-600/80 border border-purple-400/50 text-white font-mono text-xs font-bold shrink-0">
                        {spot.number}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">
                          {spot.headline}
                        </div>
                        <div className="text-xs text-slate-400 truncate font-medium">
                          {spot.title}
                        </div>
                      </div>
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-xs font-mono font-bold text-purple-300 shrink-0">
                        Decode ↗
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Binary Solar System Distance Translator */}
      <div className="cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-6 sm:p-8 text-slate-100 shadow-[0_16px_56px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
              <Binary className="w-3.5 h-3.5 text-purple-400" />
              <span>INTERACTIVE LAB · BINARY DISTANCE DECODER</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              How the plaque writes planet distances without using kilometers
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-cyan-300">
            1 UNIT = 1/10TH OF MERCURY’S ORBIT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-6">
          {PLANET_BINARY_DATA.map((planet, idx) => (
            <button
              key={planet.name}
              type="button"
              onClick={() => setSelectedPlanetIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedPlanetIdx === idx
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                  : 'bg-[#0A071E]/70 border-purple-500/25 text-slate-300 hover:border-purple-400 hover:text-white'
              }`}
            >
              <div className="font-mono text-[11px] font-bold opacity-80">{planet.order} Planet</div>
              <div className="font-display font-extrabold text-sm mt-0.5">{planet.name}</div>
              <div className="font-mono text-xs mt-1 tabular-nums font-semibold">I={planet.binary}</div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-purple-950/30 border border-purple-500/30 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-inner">
          <div>
            <div className="text-xs font-mono font-bold text-purple-400 uppercase">
              ETCHED BINARY CODE ON PLAQUE
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums">
              {PLANET_BINARY_DATA[selectedPlanetIdx].binary}₂
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              In base-10 math = {PLANET_BINARY_DATA[selectedPlanetIdx].units} plaque units
            </div>
          </div>

          <div>
            <div className="text-xs font-mono font-bold text-purple-400 uppercase">
              REAL SOLAR DISTANCE
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-300 mt-1 tabular-nums">
              {PLANET_BINARY_DATA[selectedPlanetIdx].au}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Astronomical Units from the Sun
            </div>
          </div>

          <div className="bg-[#0A071E]/80 border border-purple-500/30 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why It Matters</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {PLANET_BINARY_DATA[selectedPlanetIdx].note}
            </p>
          </div>
        </div>
      </div>

      {/* Discovery Overlay Modal */}
      <DiscoveryModal
        data={modalData}
        onClose={() => setSelectedSpot(null)}
        onNext={handleNextSpot}
        hasNext={true}
      />
    </div>
  );
};
