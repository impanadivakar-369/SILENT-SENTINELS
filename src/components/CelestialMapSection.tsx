import React, { useState, useRef } from 'react';
import { SENTINEL_MISSIONS, SentinelMission } from '../data/sentinelsData';
import { SpacecraftVisual } from './SpacecraftVisual';
import { PlanetaryGlobe3D } from './PlanetaryGlobe3D';
import { FloatingHardwareFunFacts } from './FloatingHardwareFunFacts';
import {
  ArrowUpRight,
  Compass,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Globe,
  MessageSquareQuote,
  Orbit,
  Sparkles
} from 'lucide-react';

interface CelestialMapSectionProps {
  onSelectMission: (mission: SentinelMission) => void;
}

export const CelestialMapSection: React.FC<CelestialMapSectionProps> = ({
  onSelectMission
}) => {
  const [activeMapRegion, setActiveMapRegion] = useState<'moon' | 'mars' | 'deep-space'>('moon');
  const [selectedPinMission, setSelectedPinMission] = useState<SentinelMission>(
    SENTINEL_MISSIONS.find((m) => m.region === 'moon') || SENTINEL_MISSIONS[2]
  );
  const [isMapFunFactsOpen, setIsMapFunFactsOpen] = useState(false);

  // 3D Globe rotation & zoom state
  const [globeYawDeg, setGlobeYawDeg] = useState<number>(0);
  const [globeTiltDeg, setGlobeTiltDeg] = useState<number>(6);
  const [globeZoom, setGlobeZoom] = useState<number>(1);
  const [isDraggingGlobe, setIsDraggingGlobe] = useState<boolean>(false);
  const [projectedPins, setProjectedPins] = useState<
    Record<string, { x: number; y: number; visible: boolean }>
  >({});

  const dragStartRef = useRef<{ x: number; y: number; startYaw: number; startTilt: number } | null>(
    null
  );

  const regionMissions = SENTINEL_MISSIONS.filter((m) => m.region === activeMapRegion);

  const handleRegionChange = (region: 'moon' | 'mars' | 'deep-space') => {
    setActiveMapRegion(region);
    setGlobeYawDeg(0);
    setGlobeTiltDeg(6);
    setGlobeZoom(1);
    setIsMapFunFactsOpen(false);
    const firstInRegion = SENTINEL_MISSIONS.find((m) => m.region === region);
    if (firstInRegion) {
      setSelectedPinMission(firstInRegion);
    }
  };

  const handleGlobePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDraggingGlobe(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startYaw: globeYawDeg,
      startTilt: globeTiltDeg
    };
  };

  const handleGlobePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingGlobe || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setGlobeYawDeg(dragStartRef.current.startYaw + Math.round(dx * 0.55));
    setGlobeTiltDeg(Math.max(-35, Math.min(35, dragStartRef.current.startTilt + Math.round(dy * 0.35))));
  };

  const handleGlobePointerUp = () => {
    setIsDraggingGlobe(false);
    dragStartRef.current = null;
  };

  return (
    <section
      id="resting-map"
      aria-labelledby="map-heading"
      className="py-24 lg:py-32 border-t border-b border-purple-500/15 bg-transparent text-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header + Region Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold tracking-widest uppercase">
              <Orbit className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '20s' }} />
              <span>INTERACTIVE 3D PLANETARY ATLAS · NSSDCA RESTING SITES</span>
            </div>
            <h2
              id="map-heading"
              className="font-display cosmic-headline text-3xl sm:text-5xl font-black tracking-tight leading-tight"
            >
              Where are the silent sentinels right now?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-medium">
              Spin the realistic 3D Moon, 3D Mars, or Deep Space solar system globe to inspect real NASA landing coordinates, then rotate each lander or rover in 360° and zoom in on its hardware.
            </p>
          </div>

          {/* 3-Tab Region Selector (Tactile Cosmic Glass Capsule Style) */}
          <div
            role="tablist"
            aria-label="Celestial map regions"
            className="inline-flex rounded-full bg-[#0A071E]/80 border border-purple-500/30 p-1.5 self-start shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {[
              { id: 'moon', label: 'The Moon (4)' },
              { id: 'mars', label: 'Mars (5)' },
              { id: 'deep-space', label: 'Deep Space (6)' }
            ].map((tab) => {
              const isSelected = activeMapRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleRegionChange(tab.id as 'moon' | 'mars' | 'deep-space')}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'cosmic-btn-primary shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 12-Column Split: 7 Columns 3D Planetary Globe + 5 Columns Telemetry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Panel: Interactive 3D WebGL Moon / Mars / Deep Space Globe */}
          <div className="lg:col-span-7 relative rounded-3xl bg-[#04060E] border border-purple-500/30 overflow-hidden min-h-[480px] sm:min-h-[540px] flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div
              onPointerDown={handleGlobePointerDown}
              onPointerMove={handleGlobePointerMove}
              onPointerUp={handleGlobePointerUp}
              onPointerLeave={handleGlobePointerUp}
              className={`relative flex-1 w-full h-full overflow-hidden ${
                isDraggingGlobe ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <PlanetaryGlobe3D
                region={activeMapRegion}
                missions={regionMissions}
                selectedMissionId={selectedPinMission.id}
                rotationYDeg={globeYawDeg}
                tiltXDeg={globeTiltDeg}
                zoom={globeZoom}
                onProjectedPinsChange={setProjectedPins}
              />

              {/* Top HUD Label on 3D Globe */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2">
                <div className="rounded-xl bg-[#070514]/90 border border-purple-500/30 px-3.5 py-1.5 flex items-center gap-2 backdrop-blur-md shadow-lg">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-200 font-bold">
                    {activeMapRegion === 'moon' && '3D LUNAR GLOBE · MARE & CRATER TOPOGRAPHY'}
                    {activeMapRegion === 'mars' && '3D MARTIAN GLOBE · VALLES MARINERIS & THARSIS'}
                    {activeMapRegion === 'deep-space' && '3D HELIOCENTRIC ORBIT ATLAS'}
                  </span>
                </div>
                <div className="rounded-xl bg-[#070514]/90 border border-purple-500/30 px-3 py-1.5 font-mono text-[11px] text-purple-300 font-bold backdrop-blur-md">
                  DRAG GLOBE TO ROTATE 360°
                </div>
              </div>

              {/* Interactive Landing Site Pins Projected onto the 3D Globe */}
              {regionMissions.map((mission) => {
                const isSelected = selectedPinMission.id === mission.id;
                const proj = projectedPins[mission.id] || {
                  x: mission.mapPosition.x,
                  y: mission.mapPosition.y,
                  visible: true
                };

                if (!proj.visible) return null;

                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => {
                      setIsMapFunFactsOpen(false);
                      setSelectedPinMission(mission);
                    }}
                    style={{ left: `${proj.x}%`, top: `${proj.y}%` }}
                    aria-label={`Select map sentinel ${mission.name}`}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold border-white/60 shadow-[0_0_24px_rgba(168,85,247,0.8)] scale-110'
                        : 'bg-[#0A071E]/90 text-slate-200 font-semibold border-purple-500/40 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-purple-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{mission.indexNumber}</span>
                    <span className="font-sans font-bold whitespace-nowrap">
                      {mission.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom 3D Globe Rotation & Zoom Controls Bar */}
            <div className="bg-[#0A071E]/95 border-t border-purple-500/30 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 z-20 text-slate-200 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  {activeMapRegion === 'moon' && 'EARTH’S MOON · RADIUS 1,737.4 KM'}
                  {activeMapRegion === 'mars' && 'MARS · RADIUS 3,389.5 KM'}
                  {activeMapRegion === 'deep-space' && 'SOLAR ESCAPE & ASTEROID BELT'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGlobeYawDeg((prev) => prev - 35)}
                  aria-label="Rotate planet left"
                  className="p-2 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:bg-purple-800/40 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setGlobeYawDeg((prev) => prev + 35)}
                  aria-label="Rotate planet right"
                  className="p-2 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:bg-purple-800/40 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setGlobeZoom((prev) => Math.max(0.8, Number((prev - 0.2).toFixed(2))))}
                  aria-label="Zoom out planet globe"
                  className="p-2 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:bg-purple-800/40 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setGlobeZoom((prev) => Math.min(2.0, Number((prev + 0.2).toFixed(2))))}
                  aria-label="Zoom in planet globe"
                  className="p-2 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:bg-purple-800/40 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {(globeYawDeg !== 0 || globeZoom !== 1) && (
                  <button
                    type="button"
                    onClick={() => {
                      setGlobeYawDeg(0);
                      setGlobeTiltDeg(6);
                      setGlobeZoom(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-purple-500/40 bg-purple-900/30 font-mono text-xs font-bold text-purple-200 hover:bg-purple-800/50 hover:text-white transition-all cursor-pointer"
                  >
                    Reset Globe
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Selected Hardware Telemetry Card + 3D Spacecraft Preview */}
          <div className="lg:col-span-5 rounded-3xl cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 overflow-hidden flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-slate-100">
            {/* Embedded Interactive 3D 360° Preview */}
            <div className="w-full h-80 border-b border-purple-500/25 bg-[#03050C]">
              <SpacecraftVisual
                mission={selectedPinMission}
                interactive={true}
                enable3D={true}
                onSelectHotspot={() => onSelectMission(selectedPinMission)}
                className="w-full h-full"
              />
            </div>

            <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400">
                    SENTINEL {selectedPinMission.indexNumber} · NSSDCA {selectedPinMission.nssdcaId}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/40">
                    {selectedPinMission.statusBadge}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  {selectedPinMission.name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-medium mb-4">
                  {selectedPinMission.cardSummary}
                </p>

                {/* Key NSSDCA Coordinates & Builder Specs */}
                <div className="space-y-3 border-t border-b border-purple-500/20 py-4 my-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                      FINAL RESTING PLACE / TRAJECTORY
                    </span>
                    <span className="text-white font-bold mt-0.5 block">
                      {selectedPinMission.restingPlace}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                      COORDINATES / DISTANCE
                    </span>
                    <span className="font-mono text-cyan-300 font-bold mt-0.5 block tabular-nums">
                      {selectedPinMission.coordinates}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                      BUILT BY (LABORATORY &amp; MANUFACTURER)
                    </span>
                    <span className="text-white font-bold mt-0.5 block">
                      {selectedPinMission.builtBy} ({selectedPinMission.builtLocation})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMapFunFactsOpen((prev) => !prev)}
                  className="cosmic-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-purple-400" />
                  <span>{isMapFunFactsOpen ? 'Hide Fun Facts' : 'Fun Facts'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectMission(selectedPinMission)}
                  className="cosmic-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-bold cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_24px_rgba(168,85,247,0.5)]"
                >
                  <span>Step inside mission</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hardware Fun Facts Popup */}
      <FloatingHardwareFunFacts
        mission={selectedPinMission}
        isOpen={isMapFunFactsOpen}
        onClose={() => setIsMapFunFactsOpen(false)}
      />
    </section>
  );
};
