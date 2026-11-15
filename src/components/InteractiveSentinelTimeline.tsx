import React, { useState, useEffect } from 'react';
import { SENTINEL_MISSIONS, SentinelMission, CelestialRegion } from '../data/sentinelsData';
import { NASA_OFFICIAL_DOSSIERS } from '../data/nasaOfficialContent';
import { MISSION_PHOTOGRAPHY_ARCHIVE, AuthenticSpacecraftPhoto } from '../data/missionPhotographyData';
import { SentinelBadgeEmblem } from './SentinelBadgeEmblem';
import { SpacecraftVisual } from './SpacecraftVisual';
import { AuthenticSpacePhoto } from './AuthenticSpacePhoto';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
  Camera,
  Box,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Info,
  Orbit
} from 'lucide-react';

interface TimelineEntry {
  missionId: string;
  yearLabel: string;
  shortLabel: string;
  milestoneContext: string;
  nodeColor: string;
  sortOrder: number;
}

const CHRONOLOGICAL_TIMELINE_ORDER: TimelineEntry[] = [
  {
    missionId: 'surveyor-landers',
    yearLabel: '1966',
    shortLabel: 'Surveyor 1',
    milestoneContext: 'First true U.S. soft-landing on the Moon (June 2, 1966 · 11,240 photos)',
    nodeColor: '#10B981',
    sortOrder: 1
  },
  {
    missionId: 'apollo-lm',
    yearLabel: '1969',
    shortLabel: 'Apollo 11 Descent Stage',
    milestoneContext: 'First humans on the Moon at Tranquillity Base (July 20, 1969) & LRO archive',
    nodeColor: '#FACC15',
    sortOrder: 2
  },
  {
    missionId: 'alsep-packages',
    yearLabel: '1969',
    shortLabel: 'ALSEP & Laser Mirrors',
    milestoneContext: 'Nuclear seismic stations & passive laser mirrors still reflecting light today',
    nodeColor: '#2DD4BF',
    sortOrder: 3
  },
  {
    missionId: 'lunar-rovers',
    yearLabel: '1971',
    shortLabel: 'Lunar Roving Vehicles',
    milestoneContext: 'Apollo 15–17 electric 4WD Moon buggies with woven piano-wire mesh tires',
    nodeColor: '#38BDF8',
    sortOrder: 4
  },
  {
    missionId: 'pioneer-10',
    yearLabel: '1972',
    shortLabel: 'Pioneer 10',
    milestoneContext: 'First through the Asteroid Belt, first past Jupiter, last heard at 7.6B miles',
    nodeColor: '#D2F366',
    sortOrder: 5
  },
  {
    missionId: 'pioneer-11',
    yearLabel: '1973',
    shortLabel: 'Pioneer 11',
    milestoneContext: 'Jupiter gravity slingshot to become the first spacecraft to visit Saturn',
    nodeColor: '#A3E635',
    sortOrder: 6
  },
  {
    missionId: 'viking-landers',
    yearLabel: '1976',
    shortLabel: 'Viking 1 & 2',
    milestoneContext: 'First successful Mars landers, first surface photos & biological soil labs',
    nodeColor: '#A855F7',
    sortOrder: 7
  },
  {
    missionId: 'voyager-1',
    yearLabel: '1977',
    shortLabel: 'Voyager 1',
    milestoneContext: 'Io volcanoes, Pale Blue Dot & first human-made object in interstellar space',
    nodeColor: '#14B8A6',
    sortOrder: 8
  },
  {
    missionId: 'near-shoemaker',
    yearLabel: '1996',
    shortLabel: 'NEAR Shoemaker',
    milestoneContext: 'First spacecraft to orbit and soft-land on an asteroid (433 Eros)',
    nodeColor: '#EC4899',
    sortOrder: 9
  },
  {
    missionId: 'sojourner-rover',
    yearLabel: '1997',
    shortLabel: 'Sojourner (Pathfinder)',
    milestoneContext: 'Bounced 15 times in giant airbags to deploy the first wheeled rover on Mars',
    nodeColor: '#FB923C',
    sortOrder: 10
  },
  {
    missionId: 'spirit-opportunity',
    yearLabel: '2004',
    shortLabel: 'Spirit & Opportunity',
    milestoneContext: 'Twin rovers: Spirit found hot-spring silica; Opportunity drove 28.06 miles (45.16 km)',
    nodeColor: '#F97316',
    sortOrder: 11
  },
  {
    missionId: 'dawn-spacecraft',
    yearLabel: '2007',
    shortLabel: 'Dawn Spacecraft',
    milestoneContext: 'Ion-propelled orbiter of giant asteroid Vesta & briny dwarf planet Ceres',
    nodeColor: '#06B6D4',
    sortOrder: 12
  },
  {
    missionId: 'phoenix-insight',
    yearLabel: '2008',
    shortLabel: 'Phoenix & InSight',
    milestoneContext: 'Confirmed Martian Arctic water ice & perchlorates; recorded 1,319 marsquakes',
    nodeColor: '#60A5FA',
    sortOrder: 13
  },
  {
    missionId: 'kepler-telescope',
    yearLabel: '2009',
    shortLabel: 'Kepler / K2',
    milestoneContext: 'Surveyed 500,000+ stars and proved our galaxy has more planets than stars',
    nodeColor: '#C084FC',
    sortOrder: 14
  },
  {
    missionId: 'ingenuity-helicopter',
    yearLabel: '2021',
    shortLabel: 'Ingenuity',
    milestoneContext: 'First powered aircraft on another planet — 72 flights across Jezero Crater',
    nodeColor: '#F43F5E',
    sortOrder: 15
  }
];

interface InteractiveSentinelTimelineProps {
  unlockedBadges: string[];
  onSelectMission: (mission: SentinelMission) => void;
  onOpenSignalChallenge: (mission: SentinelMission) => void;
}

export const InteractiveSentinelTimeline: React.FC<InteractiveSentinelTimelineProps> = ({
  unlockedBadges,
  onSelectMission,
  onOpenSignalChallenge
}) => {
  const [regionFilter, setRegionFilter] = useState<'all' | CelestialRegion>('all');
  const [selectedMissionId, setSelectedMissionId] = useState<string>('apollo-lm');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  const enrichedItems = CHRONOLOGICAL_TIMELINE_ORDER.map((item) => {
    const mission = SENTINEL_MISSIONS.find((m) => m.id === item.missionId)!;
    return {
      ...item,
      mission
    };
  }).filter((item) => Boolean(item.mission));

  const visibleItems =
    regionFilter === 'all'
      ? enrichedItems
      : enrichedItems.filter((item) => item.mission.region === regionFilter);

  useEffect(() => {
    if (!visibleItems.some((item) => item.missionId === selectedMissionId) && visibleItems.length > 0) {
      setSelectedMissionId(visibleItems[0].missionId);
    }
  }, [regionFilter, visibleItems, selectedMissionId]);

  // Reset photo index and default to authentic photo view on mission change
  useEffect(() => {
    setSelectedPhotoIndex(0);
    setViewMode('photo');
  }, [selectedMissionId]);

  useEffect(() => {
    if (!isAutoPlaying || visibleItems.length <= 1) return;
    const timer = window.setInterval(() => {
      setSelectedMissionId((prevId) => {
        const idx = visibleItems.findIndex((i) => i.missionId === prevId);
        const nextIdx = (idx + 1) % visibleItems.length;
        return visibleItems[nextIdx].missionId;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, visibleItems]);

  const activeIndex = Math.max(
    0,
    visibleItems.findIndex((item) => item.missionId === selectedMissionId)
  );
  const activeEntry = visibleItems[activeIndex] || visibleItems[0];
  const activeMission = activeEntry.mission;
  const activeDossier = NASA_OFFICIAL_DOSSIERS[activeMission.id];
  const isBadgeEarned = unlockedBadges.includes(activeMission.badge.id);

  // Retrieve authentic photography record
  const photoRecord = MISSION_PHOTOGRAPHY_ARCHIVE[activeMission.id];
  const allPhotos: AuthenticSpacecraftPhoto[] = photoRecord
    ? [photoRecord.cardPhoto, ...photoRecord.galleryPhotos]
    : [];
  const currentPhoto = allPhotos[selectedPhotoIndex] || photoRecord?.cardPhoto;

  const handleStep = (delta: number) => {
    setIsAutoPlaying(false);
    const nextIdx = (activeIndex + delta + visibleItems.length) % visibleItems.length;
    setSelectedMissionId(visibleItems[nextIdx].missionId);
  };

  return (
    <section
      id="sentinel-timeline-section"
      aria-label="Interactive Timeline of All 15 Space Vehicles"
      className="py-20 sm:py-28 border-t border-purple-500/15 bg-transparent relative z-10 overflow-hidden text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Unified Design Language */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/15 text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-300 mb-4 shadow-[0_0_16px_rgba(168,85,247,0.25)]">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>CHRONOLOGY · 1966 – 2021 ARCHIVE</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h2 className="font-display cosmic-headline text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              A timeline of lonely explorers
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans font-medium">
            From the first soft landing on the Moon to a 72-flight helicopter on Mars and probes in interstellar space. Tap any date on the cosmic track below to inspect authentic NASA photography and 3D hardware records.
          </p>
        </div>

        {/* Filter & Playback Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 rounded-full border border-purple-500/30 bg-[#0A071E]/80 p-2 sm:px-4 sm:py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border border-purple-500/20 bg-purple-950/30">
            {(
              [
                { id: 'all', label: `All ${enrichedItems.length} Machines` },
                { id: 'moon', label: 'The Moon (4)' },
                { id: 'mars', label: 'Mars (5)' },
                { id: 'deep-space', label: 'Deep Space (6)' }
              ] as const
            ).map((tab) => {
              const active = regionFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setRegionFilter(tab.id);
                  }}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                    active
                      ? 'cosmic-btn-primary shadow-[0_0_16px_rgba(168,85,247,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Previous spacecraft on timeline"
              className="w-9 h-9 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:bg-purple-800/40 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs font-bold uppercase cursor-pointer ${
                isAutoPlaying
                  ? 'cosmic-btn-primary shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                  : 'cosmic-btn-secondary'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause Tour' : 'Auto-Play Timeline'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Next spacecraft on timeline"
              className="w-9 h-9 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:bg-purple-800/40 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Spectrum Timeline Track */}
        <div className="relative mb-12 p-6 overflow-x-auto scrollbar-thin rounded-3xl border border-purple-500/30 bg-[#0A071E]/80 shadow-[0_12px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="min-w-[960px] px-4">
            {/* Connecting Spectrum Line */}
            <div className="relative h-14 flex items-center">
              <div
                className="w-full h-2 rounded-full shadow-[0_0_16px_rgba(168,85,247,0.4)]"
                style={{
                  background:
                    'linear-gradient(90deg, #10B981 0%, #FACC15 14%, #2DD4BF 24%, #38BDF8 34%, #D2F366 44%, #A855F7 56%, #14B8A6 66%, #FB923C 78%, #06B6D4 88%, #F43F5E 100%)'
                }}
              />
            </div>

            {/* Nodes Row */}
            <div
              className="grid gap-2 -mt-11 relative z-10"
              style={{
                gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`
              }}
            >
              {visibleItems.map((item, idx) => {
                const isSelected = item.missionId === activeEntry.missionId;
                const hasBadge = unlockedBadges.includes(item.mission.badge.id);

                return (
                  <button
                    key={item.missionId}
                    id={`timeline-node-${item.missionId}`}
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSelectedMissionId(item.missionId);
                    }}
                    className="group flex flex-col items-center text-center focus:outline-none cursor-pointer px-1"
                  >
                    {/* Glowing Circular Node on the Line */}
                    <div className="relative flex items-center justify-center h-8 mb-3">
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'w-7 h-7 ring-4 ring-purple-500/50 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                            : 'w-4 h-4 group-hover:scale-125 opacity-75 group-hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: item.nodeColor,
                          boxShadow: isSelected ? `0 0 24px ${item.nodeColor}` : 'none'
                        }}
                      />
                      {hasBadge && (
                        <span
                          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#070514] border border-white flex items-center justify-center"
                          title="Badge Earned"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        </span>
                      )}
                    </div>

                    {/* Year in Matching Neon/Spectrum Color */}
                    <span
                      className={`font-display font-extrabold tabular-nums transition-all ${
                        isSelected ? 'text-lg sm:text-xl scale-105 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]' : 'text-sm sm:text-base opacity-75 group-hover:opacity-100'
                      }`}
                      style={{ color: item.nodeColor }}
                    >
                      {item.yearLabel}
                    </span>

                    {/* Spacecraft Name */}
                    <span
                      className={`text-[11px] leading-snug mt-1 transition-colors ${
                        isSelected
                          ? 'text-white font-extrabold'
                          : 'text-slate-400 font-semibold group-hover:text-white'
                      }`}
                    >
                      {item.shortLabel}
                    </span>

                    {/* Step Index */}
                    <span className="font-mono text-[10px] text-purple-400/70 font-bold mt-1">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Machine Interactive Spotlight Card */}
        <div
          id="timeline-spotlight-card"
          className="cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-6 sm:p-10 text-slate-100 shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 5 Cols: Authentic Historical NASA Photograph + Real Archive Telemetry */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* Main Photo Viewport with Real NASA Archive Image */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-[#04060E] h-72 sm:h-80 shadow-[0_12px_36px_rgba(0,0,0,0.6)] group">
                {viewMode === 'photo' && currentPhoto ? (
                  <AuthenticSpacePhoto
                    photo={currentPhoto}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={true}
                  />
                ) : (
                  <SpacecraftVisual
                    mission={activeMission}
                    interactive={true}
                    enable3D={true}
                    className="w-full h-full"
                  />
                )}

                {/* Top Overlay Bar: Year Badge + View Switcher (Authentic Photo / 3D Model) */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070514]/90 border border-purple-500/30 text-xs font-mono backdrop-blur-md shadow-md">
                    <span style={{ color: activeEntry.nodeColor }} className="font-bold">
                      {activeEntry.yearLabel}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-200">NSSDCA {activeMission.nssdcaId}</span>
                  </div>

                  {/* Mode Toggle Switch: Authentic Photo vs 3D Model */}
                  <div className="inline-flex rounded-full bg-[#070514]/90 border border-purple-500/30 p-1 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setViewMode('photo')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        viewMode === 'photo'
                          ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Camera className="w-3 h-3" />
                      <span>NASA Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('3d')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        viewMode === '3d'
                          ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Box className="w-3 h-3" />
                      <span>3D Model</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Label for Authentic Photo */}
                {viewMode === 'photo' && currentPhoto && (
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#070514]/90 border border-purple-500/25 backdrop-blur-md text-[10px] font-mono text-slate-300">
                      <span className="text-cyan-300 font-semibold">
                        ✦ {currentPhoto.captureType}
                      </span>
                      <span>{currentPhoto.dateTaken}</span>
                      <span className="text-amber-300">{currentPhoto.nasaArchiveId}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mini Gallery Strip: Thumbnails of all Authentic NASA Photos for this Mission */}
              {viewMode === 'photo' && allPhotos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  <span className="text-[10px] font-mono text-purple-400 shrink-0 uppercase tracking-wider font-bold">
                    Archive Views ({allPhotos.length}):
                  </span>
                  {allPhotos.map((photo, pIdx) => {
                    const isSelected = selectedPhotoIndex === pIdx;
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setSelectedPhotoIndex(pIdx)}
                        className={`relative w-14 h-10 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-purple-400 ring-2 ring-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)] scale-105'
                            : 'border-purple-500/20 opacity-60 hover:opacity-100 hover:border-purple-400'
                        }`}
                        title={photo.title}
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (photo.fallbackUrl && e.currentTarget.src !== photo.fallbackUrl) {
                              e.currentTarget.src = photo.fallbackUrl;
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Verified NASA Photo Caption & Archive Source Box */}
              {viewMode === 'photo' && currentPhoto && (
                <div className="p-4 rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)] text-slate-200 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-white truncate">
                      {currentPhoto.title}
                    </span>
                    <span className="font-mono text-[10px] text-purple-300 shrink-0 font-semibold">
                      {currentPhoto.credit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {currentPhoto.caption}
                  </p>
                  {currentPhoto.sourceArchiveUrl && (
                    <div className="pt-1 flex items-center justify-between text-[11px] font-mono border-t border-purple-500/20">
                      <a
                        href={currentPhoto.sourceArchiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-purple-300 font-bold underline hover:text-white"
                      >
                        <span>Official NASA Archive Record</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-slate-400 font-semibold">ID: {currentPhoto.nasaArchiveId}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Unique Space Mission Badge Strip */}
              <div className="p-4 rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3 text-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <SentinelBadgeEmblem
                    badgeId={activeMission.badge.id}
                    unlocked={true}
                    size="md"
                  />
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">
                      {isBadgeEarned ? '✦ BADGE EARNED IN YOUR LOCKER' : 'MISSION SPECIALIST EMBLEM'}
                    </div>
                    <div className="font-display font-extrabold text-sm text-white truncate">
                      {activeMission.badge.name}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {activeMission.badge.title}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 font-mono text-[11px] text-purple-300 font-bold shrink-0">
                  {activeMission.regionLabel.split('·')[0].trim()}
                </span>
              </div>
            </div>

            {/* Right 7 Cols: Chronological Story, Official NASA Quick Facts & Action Buttons */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg border border-purple-500/30 bg-purple-500/15 text-purple-300 shadow-sm">
                  CHRONOLOGICAL SENTINEL #{String(activeEntry.sortOrder).padStart(2, '0')} OF 15 · {activeEntry.yearLabel}
                </span>
                <span className="font-mono text-xs text-purple-300/80 font-semibold">
                  {activeMission.launchDate} → {activeMission.lastContactDate}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {activeMission.name}
                </h3>
                <p className="text-sm sm:text-base font-bold text-purple-300 mt-1 font-sans">
                  {activeEntry.milestoneContext}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {activeMission.storyParagraphs[0]}
              </p>

              {/* Official NASA Quick Facts Mini-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-slate-100">
                  <div className="font-mono text-[10px] font-bold uppercase text-purple-400 flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-purple-400" />
                    <span>RESTING PLACE &amp; COORDINATES</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1">
                    {activeMission.restingPlace}
                  </div>
                  <div className="font-mono text-[11px] text-cyan-300 font-semibold mt-0.5">
                    {activeMission.coordinates}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-slate-100">
                  <div className="font-mono text-[10px] font-bold uppercase text-purple-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>POWER &amp; MASS SPECS</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1">
                    {activeMission.powerSource}
                  </div>
                  <div className="font-mono text-[11px] text-slate-300 font-semibold mt-0.5">
                    Mass: {activeMission.massKg} · Built by {activeMission.builtBy}
                  </div>
                </div>
              </div>

              {/* Historic Firsts Highlight Pill from Official NASA Dossier */}
              {activeDossier && activeDossier.historicFirsts.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#0A071E]/80 border border-purple-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-slate-100">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>NASA HISTORIC FIRSTS &amp; DISCOVERIES</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-200 font-sans">
                    {activeDossier.historicFirsts.slice(0, 2).map((first, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{first}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Direct Action Buttons with Unified Cosmic Styling */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="timeline-open-mission-btn"
                  type="button"
                  onClick={() => onSelectMission(activeMission)}
                  className="cosmic-btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_24px_rgba(168,85,247,0.5)]"
                >
                  <span>Meet {activeMission.name} in 3D &amp; Full NASA Dossier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenSignalChallenge(activeMission)}
                  className="cosmic-btn-secondary inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Solve Signal Mystery</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
