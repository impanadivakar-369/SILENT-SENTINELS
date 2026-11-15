import React, { useState, useEffect } from 'react';
import { HardwareHotspot, SentinelMission, SENTINEL_MISSIONS, SENTINEL_FUN_FACTS } from '../data/sentinelsData';
import { NASA_OFFICIAL_DOSSIERS } from '../data/nasaOfficialContent';
import { SpacecraftVisual } from './SpacecraftVisual';
import { DiscoveryModal, DiscoveryOverlayData } from './DiscoveryModal';
import { FloatingHardwareFunFacts } from './FloatingHardwareFunFacts';
import { SentinelBadgeEmblem } from './SentinelBadgeEmblem';
import { MissionPhotographyGallery } from './MissionPhotographyGallery';
import { HowItsBuiltModal } from './HowItsBuiltModal';
import { evaluateQuizSubmission } from '../utils/missionLogic';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  ExternalLink,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  MessageSquareQuote,
  Trophy,
  Wrench,
  Orbit
} from 'lucide-react';

interface MissionDetailViewProps {
  mission: SentinelMission;
  investigatedHotspots: string[];
  unlockedBadges: string[];
  onInvestigateHotspot: (hotspotId: string) => void;
  onUnlockBadge: (badgeId: string, missionId: string, score: number) => void;
  onBack: () => void;
  onOpenSignalChallenge: (mission: SentinelMission) => void;
  onSelectMission: (mission: SentinelMission) => void;
}

export const MissionDetailView: React.FC<MissionDetailViewProps> = ({
  mission,
  investigatedHotspots,
  unlockedBadges,
  onInvestigateHotspot,
  onUnlockBadge,
  onBack,
  onOpenSignalChallenge,
  onSelectMission
}) => {
  const [activeHotspot, setActiveHotspot] = useState<HardwareHotspot | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isFunFactsOpen, setIsFunFactsOpen] = useState(false);
  const [isHowItsBuiltOpen, setIsHowItsBuiltOpen] = useState(false);

  useEffect(() => {
    setIsFunFactsOpen(false);
    setIsHowItsBuiltOpen(false);
    setActiveHotspot(null);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  }, [mission.id]);

  const hasEarnedBadge = unlockedBadges.includes(mission.badge.id);
  const funFactPack = SENTINEL_FUN_FACTS[mission.id];
  const nasaDossier = NASA_OFFICIAL_DOSSIERS[mission.id];

  const handleClickHotspot = (hotspot: HardwareHotspot) => {
    setActiveHotspot(hotspot);
    onInvestigateHotspot(hotspot.id);
  };

  const handleNextHotspot = () => {
    if (!activeHotspot) return;
    const idx = mission.hotspots.findIndex((h) => h.id === activeHotspot.id);
    const next = mission.hotspots[(idx + 1) % mission.hotspots.length];
    handleClickHotspot(next);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    const evaluation = evaluateQuizSubmission(mission, selectedAnswers);
    setQuizSubmitted(true);
    if (evaluation.passed && evaluation.badgeUnlocked) {
      onUnlockBadge(evaluation.badgeUnlocked, mission.id, evaluation.percentage);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const quizEvaluation = quizSubmitted
    ? evaluateQuizSubmission(mission, selectedAnswers)
    : null;

  const allQuestionsAnswered =
    mission.quiz.length > 0 &&
    mission.quiz.every((q) => typeof selectedAnswers[q.id] === 'number');

  const overlayData: DiscoveryOverlayData | null = activeHotspot
    ? {
        kicker: activeHotspot.kicker,
        headline: activeHotspot.headline,
        technicalSubtitle: activeHotspot.technicalName,
        body: activeHotspot.explanation,
        secondaryBody: activeHotspot.scienceImpact,
        promptType: activeHotspot.promptType,
        promptQuestion: activeHotspot.promptQuestion,
        promptInsight: activeHotspot.promptInsight
      }
    : null;

  const currentIdx = SENTINEL_MISSIONS.findIndex((m) => m.id === mission.id);
  const nextMission = SENTINEL_MISSIONS[(currentIdx + 1) % SENTINEL_MISSIONS.length];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 overflow-x-hidden text-slate-100">
      {/* Top Bar navigation */}
      <div className="flex items-center justify-between gap-4 pb-8 mb-10 border-b border-purple-500/20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-purple-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to exploration</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-400">
          <span>NSSDCA ID: {mission.nssdcaId}</span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-300">{mission.regionLabel}</span>
        </div>
      </div>

      {/* Mission Kicker, Title & Tagline + Action Buttons */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          <Orbit className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '24s' }} />
          <span>{mission.missionKicker}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display cosmic-headline text-4xl sm:text-6xl font-black tracking-tight">
                {mission.name}
              </h1>
            </div>
            <p className="text-base sm:text-xl text-slate-300 mt-3 max-w-2xl font-sans font-medium">
              {mission.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasEarnedBadge && (
              <div className="inline-flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 shadow-sm">
                <SentinelBadgeEmblem badgeId={mission.badge.id} unlocked={true} size="sm" />
                <span>BADGE EARNED: {mission.badge.name.toUpperCase()}</span>
              </div>
            )}

            {/* How It's Built Button */}
            <button
              type="button"
              onClick={() => setIsHowItsBuiltOpen(true)}
              className="cosmic-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-purple-400" />
              <span>How It’s Built</span>
            </button>

            {/* Fun Facts Button */}
            <button
              type="button"
              onClick={() => setIsFunFactsOpen((prev) => !prev)}
              aria-expanded={isFunFactsOpen}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isFunFactsOpen
                  ? 'cosmic-btn-secondary'
                  : 'cosmic-btn-primary shadow-[0_0_20px_rgba(168,85,247,0.5)]'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>{isFunFactsOpen ? 'Hide Fun Facts' : 'Fun Facts'}</span>
              {funFactPack && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
                  {funFactPack.facts.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Interactive 3D Visual Left + Story Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
        {/* Left: Interactive 3D Spacecraft Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <SpacecraftVisual
            mission={mission}
            interactive={true}
            enable3D={true}
            activeHotspotId={activeHotspot?.id || null}
            onSelectHotspot={handleClickHotspot}
            investigatedIds={investigatedHotspots}
            className="w-full h-full min-h-[420px] sm:min-h-[490px] rounded-3xl border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#04060E]"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 text-xs text-slate-400 font-medium">
            <span>
              Interactive 3D NSSDCA Model • Drag to rotate 360°, zoom in/out, or click a numbered hotspot ({mission.hotspots.map((h) => h.number).join(', ')})
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              {mission.hotspots.filter((h) => investigatedHotspots.includes(h.id)).length} / {mission.hotspots.length} hotspots inspected
            </span>
          </div>
        </div>

        {/* Right: Narrative Story Card (5 cols) */}
        <div className="lg:col-span-5 cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-7 sm:p-10 flex flex-col justify-between text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div>
            <p className="font-mono text-xs font-bold tracking-wider uppercase text-purple-400 mb-3">
              {mission.storyKicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-5 tracking-tight">
              {mission.storyHeadline}
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-200 font-sans">
              {mission.storyParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-mono text-xs font-bold tracking-wider uppercase text-purple-300/80 leading-relaxed">
              {mission.storyFooterHighlight[0]}
              <br />
              {mission.storyFooterHighlight[1]}
            </p>

            <button
              type="button"
              onClick={() => setIsFunFactsOpen(true)}
              className="cosmic-btn-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Fun Facts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hardware Components Quick-Bar + NSSDCA Laboratory Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-14">
        {/* Where & When It Was Built (NSSDCA Dossier) */}
        <div className="lg:col-span-7 cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-7 sm:p-9 text-slate-100 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
            NSSDCA ARCHIVE DOSSIER · ORIGIN &amp; SPECIFICATIONS
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-6">
            Where it was built &amp; how it operated
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
              <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                BUILT BY (LABORATORY / CONTRACTOR)
              </span>
              <span className="text-white font-bold mt-1.5 block">
                {mission.builtBy}
              </span>
              <span className="text-xs text-slate-300 mt-0.5 block font-medium">
                Facility: {mission.builtLocation}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
              <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                POWER GENERATION SYSTEM
              </span>
              <span className="text-white font-bold mt-1.5 block">
                {mission.powerSource}
              </span>
              <span className="text-xs text-slate-300 mt-0.5 block font-medium">
                Launch Mass: {mission.massKg}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
              <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                CURRENT RESTING PLACE
              </span>
              <span className="text-white font-bold mt-1.5 block">
                {mission.restingPlace}
              </span>
              <span className="font-mono text-xs text-cyan-300 font-bold mt-0.5 block tabular-nums">
                {mission.coordinates}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
              <span className="font-mono text-[11px] text-purple-400 uppercase block font-bold">
                MISSION WINDOW &amp; NSSDCA ID
              </span>
              <span className="text-white font-bold mt-1.5 block tabular-nums">
                {mission.launchDate} → {mission.lastContactDate}
              </span>
              <span className="font-mono text-xs text-slate-400 font-medium mt-0.5 block">
                Catalog ID: {mission.nssdcaId}
              </span>
            </div>
          </div>
        </div>

        {/* Clickable Hardware Component Anatomy List */}
        <div className="lg:col-span-5 cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-7 flex flex-col justify-between text-slate-100 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
              SPACECRAFT ANATOMY · {mission.hotspots.length} KEY INSTRUMENTS
            </div>
            <h3 className="font-display text-xl font-extrabold text-white mb-4">
              Inspect onboard components
            </h3>
            <div className="space-y-3">
              {mission.hotspots.map((spot) => {
                const isVisited = investigatedHotspots.includes(spot.id);
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleClickHotspot(spot)}
                    className="w-full text-left p-4 rounded-2xl bg-[#0A071E]/70 border border-purple-500/25 hover:border-purple-400 transition-all flex items-center justify-between gap-3 cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-600/80 border border-purple-400/40 text-white font-mono text-xs font-bold shrink-0">
                        {spot.number}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">
                          {spot.label}
                        </div>
                        <div className="text-xs font-mono text-slate-400 truncate font-medium">
                          {spot.technicalName}
                        </div>
                      </div>
                    </div>
                    {isVisited ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-xs font-mono font-bold text-purple-300 shrink-0">
                        Inspect ↗
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AUTHENTIC MISSION PHOTOGRAPHY SECTION */}
      <MissionPhotographyGallery missionId={mission.id} missionName={mission.name} />

      {/* OFFICIAL NASA IN-DEPTH EDUCATIONAL ARCHIVE DOSSIER */}
      {nasaDossier && (
        <div
          id="official-nasa-dossier"
          className="mb-16 cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-7 sm:p-10 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-purple-500/20">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>OFFICIAL NASA EDUCATIONAL ARCHIVE · CROSS-VERIFIED TELEMETRY</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {nasaDossier.officialHeader}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-3xl font-sans font-medium">
                {nasaDossier.officialSubtitle}
              </p>
            </div>
            <a
              href="#mission-quiz"
              className="cosmic-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold cursor-pointer shrink-0 self-start lg:self-center shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            >
              <span>Take the {mission.quiz.length}-Question Quiz</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Facts + Instruments + Firsts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Quick Facts Table (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl bg-purple-950/30 border border-purple-500/25 p-5 sm:p-6 shadow-sm">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
                NASA QUICK FACTS &amp; LAUNCH SPECIFICATIONS
              </div>
              <dl className="divide-y divide-purple-500/20">
                {nasaDossier.quickFacts.map((fact, idx) => (
                  <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                    <dt className="font-mono text-[11px] uppercase text-purple-300/70 font-bold shrink-0">
                      {fact.label}
                    </dt>
                    <dd className="text-white font-bold sm:text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Scientific Instruments & Historic Firsts (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="rounded-2xl bg-purple-950/30 border border-purple-500/25 p-5 sm:p-6 shadow-sm">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>SCIENTIFIC INSTRUMENTS &amp; PAYLOAD MANIFEST</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200 font-sans">
                  {nasaDossier.scientificInstruments.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-mono font-bold">•</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-purple-950/30 border border-purple-500/25 p-5 sm:p-6 shadow-sm">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>HISTORIC FIRSTS &amp; MAJOR ACCOMPLISHMENTS</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-sans">
                  {nasaDossier.historicFirsts.map((first, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-mono font-bold">✦</span>
                      <span>{first}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Narrative Chapters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {nasaDossier.inDepthSections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="rounded-2xl bg-[#0A071E]/80 border border-purple-500/25 p-6 shadow-sm"
              >
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5">
                  IN-DEPTH ARCHIVE CHAPTER 0{sIdx + 1}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-white mb-3">
                  {sec.heading}
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-200 font-sans">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key Dates Strip */}
          <div className="rounded-2xl bg-purple-950/30 border border-purple-500/25 p-5 sm:p-6 shadow-sm">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
              OFFICIAL NASA KEY MISSION DATES LOG
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nasaDossier.keyDates.map((kd, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0A071E]/80 border border-purple-500/20 shadow-sm">
                  <div className="font-mono text-xs font-bold text-cyan-300">
                    {kd.date}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 leading-relaxed font-sans font-medium">
                    {kd.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Mission Timeline */}
      <div className="mb-14">
        <p className="font-mono text-xs font-bold tracking-wider uppercase text-purple-400 pb-4 border-b border-purple-500/20 mb-6">
          A FEW SMALL STEPS. ONE ENORMOUS JOURNEY.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mission.timeline.map((step, index) => (
            <div key={index} className="flex flex-col p-5 rounded-2xl bg-[#0A071E]/80 border border-purple-500/25 shadow-sm text-slate-100">
              <span className="font-mono text-xs font-bold text-cyan-300 tabular-nums mb-1.5">
                {step.date}
              </span>
              <h4 className="font-display text-lg font-extrabold text-white mb-1">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Source & Signal Challenge Action Bar */}
        <div className="mt-8 pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a
            href={mission.nssdcaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300 hover:text-white underline transition-colors"
          >
            <span>Source: {mission.nssdcaSourceLabel}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => onOpenSignalChallenge(mission)}
            className="cosmic-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            <span>Take the signal challenge</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gamified Mission Knowledge Quiz */}
      <div
        id="mission-quiz"
        className="rounded-3xl cosmic-card backdrop-blur-2xl bg-[#0E0B22]/80 border border-purple-500/30 p-6 sm:p-8 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-purple-500/20">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400">
              MISSION FIELD VERIFICATION · EARN YOUR SENTINEL EMBLEM
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Test your {mission.name} knowledge ({mission.quiz.length} Questions)
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-sans font-medium">
              Answer these vehicle-specific questions based on the official NASA dossier above to unlock the{' '}
              <strong className="text-amber-300 font-extrabold">{mission.badge.name}</strong> space mission patch!
            </p>
          </div>

          {/* Unique Badge Preview Card */}
          <div className="flex items-center gap-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 p-3.5 shadow-sm shrink-0">
            <SentinelBadgeEmblem
              badgeId={mission.badge.id}
              unlocked={hasEarnedBadge}
              size="md"
            />
            <div>
              <div className="text-xs font-mono uppercase font-bold text-purple-300">
                {hasEarnedBadge ? '✦ BADGE UNLOCKED' : 'LOCKED MISSION PATCH'}
              </div>
              <div className="font-display font-extrabold text-sm text-white">
                {mission.badge.name}
              </div>
              <div className="text-xs text-slate-400 font-medium">{mission.badge.title}</div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {mission.quiz.map((q, qIdx) => {
            const chosenIdx = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl bg-[#0A071E]/80 border border-purple-500/25 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    QUESTION 0{qIdx + 1} · {q.technicalTerm.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mb-4">
                  {q.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosenIdx === optIdx;
                    const isCorrect = q.correctIndex === optIdx;

                    let buttonStyle =
                      'bg-[#0E0B22]/70 border border-purple-500/25 text-slate-200 hover:border-purple-400 hover:bg-[#0E0B22]';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        buttonStyle =
                          'bg-emerald-950/70 text-emerald-200 border-2 border-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.4)]';
                      } else if (isSelected && !isCorrect) {
                        buttonStyle =
                          'bg-rose-950/70 text-rose-200 border-2 border-rose-500 shadow-[0_0_16px_rgba(244,63,94,0.4)]';
                      }
                    } else if (isSelected) {
                      buttonStyle =
                        'bg-purple-600 text-white border-2 border-white/60 shadow-[0_0_16px_rgba(168,85,247,0.6)] font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${buttonStyle}`}
                      >
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${isSelected ? 'bg-white text-purple-900' : 'bg-purple-950/60 text-purple-300'}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 pt-3 border-t border-purple-500/20 text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-mono uppercase text-xs mr-1.5 font-bold">
                        {chosenIdx === q.correctIndex ? 'CORRECT:' : 'ARCHIVE NOTE:'}
                      </strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Submit / Result Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-purple-500/20">
          {!quizSubmitted ? (
            <>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>Answer all {mission.quiz.length} questions above to verify your mission log.</span>
              </div>
              <button
                type="button"
                disabled={!allQuestionsAnswered}
                onClick={handleSubmitQuiz}
                className={`px-7 py-3 rounded-full font-mono font-bold text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 ${
                  allQuestionsAnswered
                    ? 'cosmic-btn-primary shadow-[0_0_20px_rgba(168,85,247,0.6)] cursor-pointer'
                    : 'bg-neutral-800/60 border border-neutral-700 text-neutral-500 cursor-not-allowed'
                }`}
              >
                Verify Answers &amp; Claim Badge ↗
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A071E]/90 border border-purple-500/30 rounded-3xl p-6 shadow-[0_16px_48px_rgba(0,0,0,0.6)] text-slate-100">
              <div className="flex items-center gap-3.5">
                <SentinelBadgeEmblem
                  badgeId={mission.badge.id}
                  unlocked={Boolean(quizEvaluation?.passed)}
                  size="lg"
                />
                <div>
                  <div className="font-mono text-xs font-bold text-white uppercase">
                    {quizEvaluation?.passed
                      ? `✦ BADGE UNLOCKED: ${mission.badge.name.toUpperCase()} (${quizEvaluation.percentage}% SCORE)`
                      : `SCORE: ${quizEvaluation?.percentage}% — REVIEW THE ARCHIVE NOTES & RETRY`}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                    {quizEvaluation?.passed
                      ? `${mission.badge.description} Added to your NSSDCA Badge Locker!`
                      : 'Take another look at the explanations above and retry to claim your unique space badge.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="cosmic-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectMission(nextMission)}
                  className="cosmic-btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono font-bold cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                >
                  <span>Next Sentinel: {nextMission.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot Discovery Overlay */}
      <DiscoveryModal
        data={overlayData}
        onClose={() => setActiveHotspot(null)}
        onNext={handleNextHotspot}
        hasNext={mission.hotspots.length > 1}
      />

      {/* Floating Space Hardware Fun Facts Popup */}
      <FloatingHardwareFunFacts
        mission={mission}
        isOpen={isFunFactsOpen}
        onClose={() => setIsFunFactsOpen(false)}
      />

      {/* How It's Built Modal */}
      <HowItsBuiltModal
        isOpen={isHowItsBuiltOpen}
        initialMissionId={mission.id}
        onClose={() => setIsHowItsBuiltOpen(false)}
      />
    </div>
  );
};
