import React, { useState, useEffect } from 'react';
import {
  SENTINEL_MISSIONS,
  SentinelMission
} from './data/sentinelsData';
import {
  ExplorerProgress,
  INITIAL_PROGRESS,
  RegionFilter,
  filterMissions,
  getExplorerRank
} from './utils/missionLogic';
import {
  SentinelUserProfile,
  syncUserBadgesToSupabase
} from './services/supabaseClient';
import { SpacecraftVisual } from './components/SpacecraftVisual';
import { CelestialMapSection } from './components/CelestialMapSection';
import { MissionDetailView } from './components/MissionDetailView';
import { SignalChallengeView } from './components/SignalChallengeView';
import { BadgeLockerModal } from './components/BadgeLockerModal';
import { SpaceBackground3D } from './components/SpaceBackground3D';
import { CosmicParallaxLayer } from './components/CosmicParallaxLayer';
import { SupabaseAuthGate } from './components/SupabaseAuthGate';
import { SentinelBadgeEmblem } from './components/SentinelBadgeEmblem';
import { InteractiveSentinelTimeline } from './components/InteractiveSentinelTimeline';
import { AuthenticSpacePhoto } from './components/AuthenticSpacePhoto';
import { HowItsBuiltModal } from './components/HowItsBuiltModal';
import { MISSION_PHOTOGRAPHY_ARCHIVE } from './data/missionPhotographyData';
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Database,
  ExternalLink,
  LogOut,
  Search,
  User,
  Wrench,
  Menu,
  X,
  Orbit,
  Sparkles,
  Compass,
  Radio
} from 'lucide-react';

type ActiveView = 'home' | 'mission-detail' | 'signal-challenge';
type HomeNavSection = 'missions' | 'resting-map' | 'timeline';

const STORAGE_KEY = 'silent_sentinels_explorer_progress_v1';
const USER_SESSION_KEY = 'silent_sentinels_supabase_user_v1';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [activeHomeSection, setActiveHomeSection] = useState<HomeNavSection>('missions');
  const [selectedMission, setSelectedMission] = useState<SentinelMission>(SENTINEL_MISSIONS[0]);
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBadgeLockerOpen, setIsBadgeLockerOpen] = useState<boolean>(false);
  const [isHowItsBuiltOpen, setIsHowItsBuiltOpen] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Auto-hide header on deep scroll down; reappear smoothly on top scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsHeaderVisible(currentScrollY <= 40);
      setShowBackToTop(currentScrollY > 400);
    };

    handleWindowScroll();
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Supabase User Session & Login Gate State
  const [userProfile, setUserProfile] = useState<SentinelUserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_SESSION_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showAuthGate, setShowAuthGate] = useState<boolean>(() => {
    try {
      const savedUser = localStorage.getItem(USER_SESSION_KEY);
      return !savedUser;
    } catch {
      return true;
    }
  });

  const [progress, setProgress] = useState<ExplorerProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage error
    }
    return INITIAL_PROGRESS;
  });

  const rankInfo = getExplorerRank(progress);

  // Persist progress locally and sync to Supabase when logged in
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage error
    }

    if (
      userProfile &&
      userProfile.username &&
      userProfile.username !== 'guest' &&
      userProfile.syncedWithCloud
    ) {
      syncUserBadgesToSupabase(userProfile.username, progress, rankInfo.rankTitle).then(
        (res) => {
          if (res.synced) {
            setUserProfile((prev) =>
              prev
                ? {
                    ...prev,
                    badges_count: progress.unlockedBadges.length,
                    unlocked_badges: progress.unlockedBadges,
                    syncedWithCloud: true
                  }
                : prev
            );
          }
        }
      );
    }
  }, [progress, rankInfo.rankTitle, userProfile?.username]);

  const handleAuthenticated = (
    profile: SentinelUserProfile,
    mergedProgress: ExplorerProgress
  ) => {
    setProgress(mergedProgress);
    setUserProfile(profile);
    setShowAuthGate(false);
    try {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedProgress));
    } catch {
      // Ignore storage error
    }
  };

  const handleContinueAsGuest = () => {
    const guestProfile: SentinelUserProfile = {
      username: 'guest',
      badges_count: progress.unlockedBadges.length,
      unlocked_badges: progress.unlockedBadges,
      investigated_hotspots: progress.investigatedHotspots,
      decoded_plaque_hotspots: progress.decodedPlaqueHotspots,
      solved_mysteries: progress.solvedMysteries,
      completed_quizzes: progress.completedQuizzes,
      explorer_rank: rankInfo.rankTitle,
      syncedWithCloud: false
    };
    setUserProfile(guestProfile);
    setShowAuthGate(false);
    try {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(guestProfile));
    } catch {
      // Ignore storage error
    }
  };

  const handleOpenLoginOrSwitchUser = () => {
    setShowAuthGate(true);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleOpenMission = (mission: SentinelMission) => {
    setSelectedMission(mission);
    setActiveView('mission-detail');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleOpenSignalChallenge = (mission?: SentinelMission) => {
    if (mission) setSelectedMission(mission);
    setActiveView('signal-challenge');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleOpenGoldenMessage = () => {
    setActiveView('home');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleInvestigateHotspot = (hotspotId: string) => {
    setProgress((prev) => {
      if (prev.investigatedHotspots.includes(hotspotId)) return prev;
      return {
        ...prev,
        investigatedHotspots: [...prev.investigatedHotspots, hotspotId]
      };
    });
  };

  const handleSolveMystery = (missionId: string) => {
    setProgress((prev) => {
      if (prev.solvedMysteries.includes(missionId)) return prev;
      return {
        ...prev,
        solvedMysteries: [...prev.solvedMysteries, missionId]
      };
    });
  };

  const handleUnlockBadge = (badgeId: string, missionId: string, score: number) => {
    setProgress((prev) => {
      const updatedBadges = prev.unlockedBadges.includes(badgeId)
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, badgeId];
      return {
        ...prev,
        unlockedBadges: updatedBadges,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [missionId]: Math.max(prev.completedQuizzes[missionId] || 0, score)
        }
      };
    });
  };

  const scrollToMissions = () => {
    setActiveHomeSection('missions');
    setIsMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('choose-sentinel')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
    } else {
      document.getElementById('choose-sentinel')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMap = () => {
    setActiveHomeSection('resting-map');
    setIsMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('resting-map')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
    } else {
      document.getElementById('resting-map')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTimeline = () => {
    setActiveHomeSection('timeline');
    setIsMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('sentinel-timeline-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
    } else {
      document.getElementById('sentinel-timeline-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredMissions = filterMissions(SENTINEL_MISSIONS, regionFilter, searchQuery);
  const pioneer10 = SENTINEL_MISSIONS[0];

  return (
    <div className="min-h-screen bg-[#030508] text-[#F8FAFC] flex flex-col relative overflow-x-hidden">
      {/* Master 3D Unified Cinematic Cosmic Universe Background */}
      <CosmicParallaxLayer />
      {/* Realistic Twinkling Multi-Depth Starfield, Aurora & Cosmic Dust Overlay */}
      <SpaceBackground3D activeView={activeView} />

      {/* Start Login Gate (Supabase Authentication + Cloud Sync) */}
      {showAuthGate ? (
        <SupabaseAuthGate
          currentProgress={progress}
          currentRankTitle={rankInfo.rankTitle}
          onAuthenticated={handleAuthenticated}
          onContinueAsGuest={handleContinueAsGuest}
        />
      ) : (
        <div className="min-h-screen bg-transparent flex flex-col items-center relative z-10 w-full">
          {/* Transparent Open Space Canvas: Galaxies, Nebulas, Comets & Stars 100% visible behind text */}
          <div className="relative w-full max-w-[1600px] min-h-screen bg-transparent text-slate-100 flex flex-col justify-between overflow-x-hidden">

          {/* Top Bar: Clean Minimalist Aerospace Navigation (Zero Overlap Guaranteed) */}
          <header className="sticky top-0 z-40 bg-[#070514]/30 backdrop-blur-md border-b border-purple-500/15 transition-all duration-300">
            <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
              {/* Left Column: Brand Emblem (Orbit Icon + SILENT SENTINELS) */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('home');
                    setActiveHomeSection('missions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-2.5 font-display text-xs sm:text-sm font-black tracking-widest uppercase hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] border border-purple-400/40">
                    <Orbit className="w-3.5 h-3.5 text-white animate-spin-slow" />
                  </div>
                  <span className="cosmic-headline font-display font-black tracking-widest text-xs sm:text-sm">
                    ✦ SILENT SENTINELS
                  </span>
                </button>
              </div>

              {/* Center Column: Clean Floating Glass Pill Navigation */}
              <nav
                aria-label="Primary Navigation"
                className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#0E0A24]/70 border border-purple-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-[11px] xl:text-xs font-mono font-bold tracking-wider uppercase text-slate-300 shrink-0"
              >
                <button
                  type="button"
                  aria-current={
                    activeView === 'home' && activeHomeSection === 'missions' ? 'page' : undefined
                  }
                  onClick={scrollToMissions}
                  className={`py-1 px-3 rounded-full transition-all cursor-pointer ${
                    activeView === 'home' && activeHomeSection === 'missions'
                      ? 'bg-purple-600/30 text-white border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-black'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  Missions
                </button>
                <button
                  type="button"
                  aria-current={
                    activeView === 'home' && activeHomeSection === 'resting-map' ? 'page' : undefined
                  }
                  onClick={scrollToMap}
                  className={`py-1 px-3 rounded-full transition-all cursor-pointer ${
                    activeView === 'home' && activeHomeSection === 'resting-map'
                      ? 'bg-purple-600/30 text-white border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-black'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  Map
                </button>
                <button
                  type="button"
                  aria-current={
                    activeView === 'home' && activeHomeSection === 'timeline' ? 'page' : undefined
                  }
                  onClick={scrollToTimeline}
                  className={`py-1 px-3 rounded-full transition-all cursor-pointer ${
                    activeView === 'home' && activeHomeSection === 'timeline'
                      ? 'bg-purple-600/30 text-white border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-black'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  Timeline
                </button>
                <button
                  type="button"
                  aria-current={activeView === 'signal-challenge' ? 'page' : undefined}
                  onClick={() => handleOpenSignalChallenge()}
                  className={`py-1 px-3 rounded-full transition-all cursor-pointer ${
                    activeView === 'signal-challenge'
                      ? 'bg-purple-600/30 text-white border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-black'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  Signals
                </button>
                <button
                  type="button"
                  onClick={() => setIsBadgeLockerOpen(true)}
                  className="py-1 px-3 rounded-full transition-all cursor-pointer flex items-center gap-1.5 hover:text-white hover:bg-white/5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Badges ({rankInfo.badgesCount}/{rankInfo.totalAvailableBadges})</span>
                </button>
              </nav>

              {/* Right Column: Search, Explorer Account & Guaranteed Visible Explore Button */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* Search Quick Action Trigger */}
                <button
                  type="button"
                  onClick={scrollToMissions}
                  aria-label="Search missions"
                  className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-purple-500/30 bg-[#0E0A24]/70 text-slate-200 hover:text-white hover:border-purple-400/60 transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenLoginOrSwitchUser}
                  aria-label="Explorer Account"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-[#0E0A24]/70 text-xs font-mono font-bold text-slate-200 hover:border-purple-400/60 transition-colors cursor-pointer"
                >
                  <User className="w-3 h-3 text-purple-400" />
                  <span className="max-w-[85px] sm:max-w-[100px] truncate">
                    {userProfile && userProfile.username !== 'guest'
                      ? userProfile.username
                      : 'Explorer'}
                  </span>
                  {userProfile && userProfile.username !== 'guest' && (
                    <LogOut className="w-2.5 h-2.5 text-slate-400" />
                  )}
                </button>

                {/* Always-visible compact Explore Button */}
                <button
                  type="button"
                  onClick={scrollToMissions}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full cosmic-btn-primary text-xs font-mono font-bold uppercase transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {/* Mobile / Tablet Menu Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-label="Toggle mobile menu"
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-purple-500/30 bg-[#0E0A24]/70 text-slate-200 cursor-pointer"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mobile / Tablet Navigation Drawer */}
            {isMobileMenuOpen && (
              <div className="lg:hidden bg-[#0A071E]/95 backdrop-blur-2xl border-t border-purple-500/20 px-6 py-4 space-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <button
                  type="button"
                  onClick={scrollToMissions}
                  className="w-full text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase text-slate-200 hover:bg-white/10 transition-colors"
                >
                  Missions
                </button>
                <button
                  type="button"
                  onClick={scrollToMap}
                  className="w-full text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase text-slate-200 hover:bg-white/10 transition-colors"
                >
                  Resting sites map
                </button>
                <button
                  type="button"
                  onClick={scrollToTimeline}
                  className="w-full text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase text-slate-200 hover:bg-white/10 transition-colors"
                >
                  Timeline (1966–2021)
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenSignalChallenge()}
                  className="w-full text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase text-slate-200 hover:bg-white/10 transition-colors"
                >
                  Signal challenge
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBadgeLockerOpen(true);
                  }}
                  className="w-full text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase text-slate-200 hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>Badge Locker</span>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {rankInfo.badgesCount}/{rankInfo.totalAvailableBadges}
                  </span>
                </button>
              </div>
            )}
          </header>

          {/* Main Content Router */}
          <main className="flex-1 relative z-10 pt-[68px]">
            {activeView === 'mission-detail' && (
              <MissionDetailView
                mission={selectedMission}
                investigatedHotspots={progress.investigatedHotspots}
                unlockedBadges={progress.unlockedBadges}
                onInvestigateHotspot={handleInvestigateHotspot}
                onUnlockBadge={handleUnlockBadge}
                onBack={() => {
                  setActiveView('home');
                  window.scrollTo(0, 0);
                }}
                onOpenSignalChallenge={handleOpenSignalChallenge}
                onSelectMission={handleOpenMission}
              />
            )}

            {activeView === 'signal-challenge' && (
              <SignalChallengeView
                initialMission={selectedMission}
                solvedMysteries={progress.solvedMysteries}
                onSolveMystery={handleSolveMystery}
                onBack={() => {
                  setActiveView('home');
                  window.scrollTo(0, 0);
                }}
                onOpenMissionDetail={handleOpenMission}
              />
            )}

            {activeView === 'home' && (
              <div>
                {/* HERO SECTION — NOVA 3D Aerospace Command Layout (100% Transparent so Galaxies Shine Through) */}
                <section className="relative overflow-hidden border-b border-purple-500/15 bg-transparent">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-12 lg:pb-18 relative z-10">
                    <div className="flex flex-col 2xl:flex-row items-stretch gap-8">
                      {/* Left & Center Main Hero Area (Headline + 3D Viewport) */}
                      <div className="flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                          {/* Left: Display Typography & Action Buttons (6 cols) */}
                          <div className="lg:col-span-6 z-10 space-y-5">
                            {/* Technical Status Pill */}
                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0E0A24] border border-purple-500/30 text-slate-200 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-emerald-300">SYSTEM STATUS · NOMINAL</span>
                              <span className="text-purple-500/40">|</span>
                              <span className="text-purple-300 text-[11px]">NASA NSSDCA ARCHIVE · 15 MONUMENTS</span>
                            </div>

                            {/* 3D Isometric Luminous Display Headline (Matching Reference Photo) */}
                            <div>
                              <h1 className="cosmic-headline text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[0.92]">
                                Out of contact.
                                <br />
                                Not out of stories.
                              </h1>
                              <p className="font-heading text-base sm:text-xl font-bold text-slate-300 uppercase tracking-wider mt-3.5">
                                Some spacecraft stopped calling home.
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent underline decoration-4 decoration-purple-500/50">
                                  Their discoveries never did.
                                </span>
                              </p>
                            </div>

                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
                              Meet the quiet robotic explorers still carrying human curiosity on the Moon, across Mars, and into deep space. Inspect their verified 3D NSSDCA hardware in 360°, uncover extraordinary engineering stories, and earn all 16 Sentinel Badges.
                            </p>

                            {/* Tactile Cosmic Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2.5 pt-1">
                              {/* Round Play/Tour Button */}
                              <button
                                type="button"
                                onClick={scrollToTimeline}
                                aria-label="Auto-play timeline tour"
                                className="w-11 h-11 rounded-full border border-purple-500/30 bg-[#0E0A24] flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-400/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer shrink-0"
                                title="Explore Chronological Tour"
                              >
                                <Orbit className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={scrollToMissions}
                                className="cosmic-btn-primary inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                              >
                                <span>Explore the Sentinels</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setIsBadgeLockerOpen(true)}
                                className="cosmic-btn-secondary inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                              >
                                <Award className="w-4 h-4 text-amber-400" />
                                <span>
                                  My Badges ({rankInfo.badgesCount}/{rankInfo.totalAvailableBadges})
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setIsHowItsBuiltOpen(true)}
                                className="cosmic-btn-secondary inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                              >
                                <Wrench className="w-3.5 h-3.5 text-purple-300" />
                                <span>How It’s Built</span>
                              </button>
                            </div>

                            {/* Cosmic Telemetry Chips */}
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                              <div className="flex items-center gap-3 bg-[#0E0A24]/80 px-3.5 py-2 rounded-2xl border border-purple-500/25 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                                <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                                <div className="font-mono text-[11px] leading-tight">
                                  <div className="font-bold text-slate-100 uppercase">ACTIVE EXPLORATION</div>
                                  <div className="text-slate-400">15 silent sentinels waiting</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5 bg-[#0E0A24]/80 px-3.5 py-2 rounded-2xl border border-purple-500/25 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                                <Compass className="w-5 h-5 text-indigo-400 shrink-0" />
                                <div className="font-mono text-[11px] leading-tight">
                                  <div className="font-bold text-slate-100 uppercase">ZERO-G DRIFT</div>
                                  <div className="text-slate-400">Human curiosity in deep space</div>
                                </div>
                              </div>

                              <div className="hidden sm:flex items-center gap-2 bg-[#0E0A24]/80 px-3 py-2 rounded-2xl border border-purple-500/25 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                                <Database className="w-5 h-5 text-blue-400 shrink-0" />
                                <div className="font-mono text-[11px] leading-tight">
                                  <div className="font-bold text-slate-100 uppercase">CELESTIAL ARCHIVE</div>
                                  <div className="text-slate-400">NSSDCA 1966–2021</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right: Giant Organic Cosmic Portal Aperture with 3D Spacecraft (6 cols) */}
                          <div className="lg:col-span-6 relative">
                            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] h-[440px] sm:h-[490px] bg-[#040612]">
                              {/* Starfield Backdrop inside Portal */}
                              <div
                                className="absolute inset-0 opacity-70 pointer-events-none"
                                style={{
                                  backgroundImage: 'radial-gradient(1.5px 1.5px at 10% 20%, #ffffff, transparent), radial-gradient(1.5px 1.5px at 80% 30%, #ffffff, transparent), radial-gradient(2px 2px at 40% 70%, #ffffff, transparent), radial-gradient(1.5px 1.5px at 90% 85%, #ffffff, transparent), radial-gradient(2px 2px at 15% 90%, #ffffff, transparent)',
                                  backgroundSize: '160px 160px'
                                }}
                              />

                              {/* Glowing celestial ring in background */}
                              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-purple-500/20 opacity-40 pointer-events-none flex items-center justify-center">
                                <div className="w-64 h-16 border border-purple-400/20 rounded-full rotate-[-28deg]" />
                              </div>

                              {/* Interactive 3D WebGL Spacecraft */}
                              <SpacecraftVisual
                                mission={pioneer10}
                                interactive={true}
                                enable3D={true}
                                onSelectHotspot={() => handleOpenMission(pioneer10)}
                                className="w-full h-full"
                              />

                              {/* Top-Right HUD Target Tag */}
                              <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-2xl bg-[#070514]/90 border border-purple-500/30 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)] text-right">
                                <div className="font-mono text-[9px] tracking-widest uppercase text-purple-400 font-bold">
                                  [ TARGET ]
                                </div>
                                <div className="font-display text-xs sm:text-sm font-black text-white tracking-wider">
                                  PIONEER 10
                                </div>
                                <div className="font-mono text-[10px] text-slate-400 font-bold">
                                  INTERSTELLAR DRIFT
                                </div>
                              </div>

                              {/* Top-Left Live Indicator */}
                              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070514]/90 border border-purple-500/30 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)] text-xs font-mono font-bold text-slate-200">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                <span>LIVE 3D ORBIT</span>
                                <span className="text-purple-400">·</span>
                                <span className="text-purple-300">1972-012A</span>
                              </div>

                              {/* Floating Spotlight Card at Bottom */}
                              <div className="absolute bottom-3 right-3 left-3 rounded-2xl bg-[#070514]/90 border border-purple-500/30 backdrop-blur-md p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-white">
                                <div>
                                  <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-purple-400 mb-0.5">
                                    01 / PIONEER 10 · NSSDCA 1972-012A
                                  </div>
                                  <div className="font-display text-sm sm:text-base font-black text-slate-100">
                                    A small craft. A giant first.
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleOpenMission(pioneer10)}
                                  className="cosmic-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                                >
                                  <span>Open 3D mission story</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 4-CARD MODULAR AEROSPACE HUD DECK (NOVA Reference Design) */}
                        <div className="mt-14 pt-8 border-t border-purple-500/20">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Card 1: FLEET STATUS (Spacecraft Wireframe Hologram) */}
                            <div
                              onClick={scrollToMissions}
                              className="cosmic-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
                            >
                              <div className="flex items-center justify-between text-xs font-mono mb-3">
                                <span className="text-slate-400 font-bold tracking-wider uppercase">
                                  FLEET STATUS
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 font-bold text-[10px]">
                                  [ 15 ]
                                </span>
                              </div>

                              <div className="relative h-24 my-1 flex items-center justify-center overflow-hidden rounded-2xl bg-[#030610] border border-purple-500/20">
                                <SpacecraftVisual
                                  mission={pioneer10}
                                  interactive={false}
                                  className="w-full h-full opacity-85 group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030610] via-transparent to-transparent pointer-events-none" />
                              </div>

                              <div className="mt-3 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono">
                                <div>
                                  <div className="text-slate-100 font-black tracking-wider">PIONEER 10</div>
                                  <div className="text-[10px] text-emerald-400 font-bold">STATUS: DRIFT</div>
                                </div>
                                <div className="w-16">
                                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-purple-500/30">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[85%]" />
                                  </div>
                                  <span className="text-[9px] text-slate-400 font-bold block text-right mt-0.5">85%</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 2: NEXT MISSION / TARGET DESTINATION */}
                            <div
                              onClick={() => handleOpenMission(SENTINEL_MISSIONS[1])}
                              className="cosmic-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
                            >
                              <div className="flex items-center justify-between text-xs font-mono mb-3">
                                <span className="text-slate-400 font-bold tracking-wider uppercase">
                                  NEXT MISSION
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 font-bold text-[10px]">
                                  ETA: 23 L-YR
                                </span>
                              </div>

                              <div className="relative h-24 my-1 overflow-hidden rounded-2xl bg-[#030610] border border-purple-500/20">
                                {MISSION_PHOTOGRAPHY_ARCHIVE['apollo-lm'] && (
                                  <AuthenticSpacePhoto
                                    photo={MISSION_PHOTOGRAPHY_ARCHIVE['apollo-lm'].cardPhoto}
                                    className="w-full h-full"
                                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030610] via-transparent to-transparent pointer-events-none" />
                              </div>

                              <div className="mt-3 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono">
                                <div>
                                  <div className="text-slate-100 font-black tracking-wider">APOLLO 11 LM</div>
                                  <div className="text-[10px] text-slate-400 font-bold">TRANQUILLITY BASE</div>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-purple-500/30 bg-purple-950/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>
                            </div>

                            {/* Card 3: SYSTEM SCAN (Live Radar Scanner) */}
                            <div
                              onClick={scrollToMap}
                              className="cosmic-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
                            >
                              <div className="flex items-center justify-between text-xs font-mono mb-3">
                                <span className="text-slate-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                                  <span>SYSTEM SCAN</span>
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-[10px] flex items-center gap-1 font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>LIVE</span>
                                </span>
                              </div>

                              {/* Interactive Radar Visual */}
                              <div className="relative h-24 my-1 flex items-center justify-center rounded-2xl bg-[#030610] border border-purple-500/20 overflow-hidden">
                                {/* Concentric Radar Rings */}
                                <div className="absolute w-20 h-20 rounded-full border border-emerald-500/20" />
                                <div className="absolute w-12 h-12 rounded-full border border-emerald-500/25" />
                                <div className="absolute w-5 h-5 rounded-full border border-emerald-500/30" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-[1px] bg-emerald-500/15" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="h-full w-[1px] bg-emerald-500/15" />
                                </div>

                                {/* Rotating Radar Sweep Beam */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <div
                                    className="w-24 h-24 rounded-full radar-sweep-beam"
                                    style={{
                                      background:
                                        'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.4) 360deg)'
                                    }}
                                  />
                                </div>

                                {/* Pulsing Target Blips */}
                                <div className="absolute top-5 left-8 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-ping" />
                                <div className="absolute top-5 left-8 w-1.5 h-1.5 rounded-full bg-white" />
                                <div className="absolute bottom-6 right-7 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                                <div className="absolute top-10 right-10 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              </div>

                              <div className="mt-3 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono">
                                <div>
                                  <div className="text-slate-100 font-black tracking-wider">15 DETECTED</div>
                                  <div className="text-[10px] text-slate-400 font-bold">MOON · MARS · VOID</div>
                                </div>
                                <span className="text-[10px] font-bold text-purple-300 group-hover:text-purple-200 group-hover:underline">
                                  VIEW MAP →
                                </span>
                              </div>
                            </div>

                            {/* Card 4: MISSION TIMELINE (Chronological Nodes) */}
                            <div
                              onClick={scrollToTimeline}
                              className="cosmic-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer group"
                            >
                              <div className="flex items-center justify-between text-xs font-mono mb-3">
                                <span className="text-slate-400 font-bold tracking-wider uppercase">
                                  MISSION TIMELINE
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 font-bold text-[10px]">
                                  1966 – 2021
                                </span>
                              </div>

                              {/* Micro Timeline Track */}
                              <div className="h-24 my-1 flex flex-col justify-center space-y-1.5 text-[11px] font-mono px-3 py-1 rounded-2xl bg-[#030610] border border-purple-500/20">
                                <div className="flex items-center justify-between text-slate-400">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>Surveyor 1</span>
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-bold">1966</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                  <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                    <span>Apollo 11 LM</span>
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-bold">1969</span>
                                </div>
                                <div className="flex items-center justify-between px-2 py-0.5 rounded-lg bg-purple-900/40 border border-purple-400/30 text-white font-bold shadow-sm">
                                  <span className="flex items-center gap-1.5 text-slate-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                                    <span>Pioneer 10</span>
                                  </span>
                                  <span className="text-[10px] text-emerald-400 font-bold">[✓] 1972</span>
                                </div>
                              </div>

                              <div className="mt-3 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono">
                                <div>
                                  <div className="text-slate-100 font-black tracking-wider">CHRONOLOGY</div>
                                  <div className="text-[10px] text-slate-400 font-bold">55 YEARS ARCHIVE</div>
                                </div>
                                <span className="text-[10px] font-bold text-purple-300 group-hover:text-purple-200 group-hover:underline">
                                  TIMELINE →
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Telemetry Column (NOVA Style Counter Rail) */}
                      <div className="hidden 2xl:flex flex-col items-center justify-between py-6 pl-6 border-l border-purple-500/20 text-center font-mono shrink-0 w-28">
                        <div className="space-y-1">
                          <div className="text-3xl font-black text-slate-100 tracking-wider">15</div>
                          <div className="text-[9px] uppercase tracking-widest text-slate-400 leading-tight font-bold">
                            ACTIVE
                            <br />
                            SENTINELS
                          </div>
                        </div>

                        <div className="h-14 w-[1px] bg-purple-500/20 my-3" />

                        <div className="space-y-1">
                          <div className="text-3xl font-black text-slate-100 tracking-wider">03</div>
                          <div className="text-[9px] uppercase tracking-widest text-slate-400 leading-tight font-bold">
                            CELESTIAL
                            <br />
                            REALMS
                          </div>
                        </div>

                        <div className="h-14 w-[1px] bg-purple-500/20 my-3" />

                        <div className="space-y-1">
                          <div className="text-3xl font-black text-slate-100 tracking-wider">7.6B</div>
                          <div className="text-[9px] uppercase tracking-widest text-slate-400 leading-tight font-bold">
                            MILES
                            <br />
                            DISTANCE
                          </div>
                        </div>

                        <div className="h-14 w-[1px] bg-purple-500/20 my-3" />

                        <button
                          type="button"
                          onClick={scrollToMissions}
                          className="group flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-full border border-purple-500/30 bg-[#0E0A24] group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all">
                            <ArrowUp className="w-4 h-4 rotate-180 group-hover:translate-y-0.5 transition-transform" />
                          </div>
                          <span className="text-[8px] uppercase tracking-widest text-slate-400 group-hover:text-purple-300 font-black">
                            SCROLL
                            <br />
                            EXPLORE
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Hero Telemetry Strip */}
                    <div className="mt-12 pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                      <span className="font-mono uppercase tracking-wider flex items-center gap-2 font-bold text-slate-300">
                        <span>EXPLORE CHRONOLOGY &amp; MAP BELOW</span>
                        <span className="text-purple-400 font-bold">↓</span>
                      </span>
                      <span className="flex items-center gap-2 font-mono font-bold text-slate-300">
                        <Database className="w-3.5 h-3.5 text-purple-400" />
                        <span>
                          Explorer:{' '}
                          <strong className="text-white">
                            {userProfile?.username || 'guest'}
                          </strong>{' '}
                          · Badges Collected: {rankInfo.badgesCount}/{rankInfo.totalAvailableBadges}
                        </span>
                      </span>
                    </div>
                  </div>
                </section>

                {/* NSSDCA MISSION CONTEXT EDITORIAL BANNER */}
                <section className="py-16 lg:py-24 border-b border-purple-500/15 bg-transparent">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="cosmic-card p-8 sm:p-12 lg:p-16 relative overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                        <div className="lg:col-span-4 space-y-4">
                          <p className="font-mono text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-purple-400 leading-relaxed">
                            THE MISSION ENDED.
                            <br />
                            THE CURIOSITY NEVER WILL.
                          </p>
                          <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-[#0E0A24]/90 border border-purple-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                            <Orbit className="w-8 h-8 text-purple-400 animate-spin-slow shrink-0" />
                            <div className="font-mono text-xs leading-snug">
                              <div className="font-bold text-slate-100 uppercase">SILENT DRIFTER</div>
                              <div className="text-slate-400">Curiosity in zero gravity</div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:col-span-8">
                          <h2 className="cosmic-headline text-3xl sm:text-5xl font-black mb-4 leading-tight">
                            Silent doesn’t mean forgotten.
                          </h2>
                          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-3xl font-sans">
                            Since the 1960s, NASA and laboratories like JPL, Grumman, Boeing, TRW, and APL have sent extraordinary machines to the Moon, Mars, and deep space. When their radios grow quiet—their hardware remains as off-world monuments, and NASA’s Space Science Data Coordinated Archive (NSSDCA) preserves every discovery so your exploration can begin.
                          </p>
                          <div className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                            <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30">INSPECT 3D HARDWARE</span>
                            <span aria-hidden="true" className="text-purple-400">→</span>
                            <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30">FOLLOW THE NSSDCA TIMELINE</span>
                            <span aria-hidden="true" className="text-purple-400">→</span>
                            <span className="px-3 py-1 rounded-full border border-purple-400/40 bg-purple-600/40 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]">PASS MISSION QUIZZES &amp; SYNC BADGES</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 01: CHOOSE YOUR SENTINEL */}
                <section id="choose-sentinel" className="py-20 lg:py-28 bg-transparent relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-purple-400">
                            01 / CHOOSE YOUR SENTINEL
                          </p>
                        </div>
                        <h2 className="cosmic-headline text-3xl sm:text-5xl font-black">
                          Every silence has a story.
                        </h2>
                        <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl font-sans">
                          15 historic trailblazers on the Moon, Mars, and beyond. Pick any spacecraft to inspect its 3D components in 360°, unlock funny talking hardware facts, and take the quiz.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 bg-[#0E0A24] shadow-[0_0_15px_rgba(168,85,247,0.2)] shrink-0">
                          SELECT A MISSION ↙
                        </span>
                      </div>
                    </div>

                    {/* Filter Bar: Celestial Region Tabs + Search Input */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-purple-500/20">
                      {/* Region Filter Buttons */}
                      <div
                        className="flex flex-wrap items-center gap-2 p-1.5 rounded-full border border-purple-500/30 bg-[#0E0A24]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-x-auto scrollbar-thin"
                        role="tablist"
                        aria-label="Filter spacecraft by celestial destination"
                      >
                        {(
                          [
                            { id: 'all', label: 'All Sentinels (15)' },
                            { id: 'moon', label: 'The Moon (4)' },
                            { id: 'mars', label: 'Mars (5)' },
                            { id: 'deep-space', label: 'Deep Space & Asteroids (6)' }
                          ] as { id: RegionFilter; label: string }[]
                        ).map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={regionFilter === tab.id}
                            onClick={() => setRegionFilter(tab.id)}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              regionFilter === tab.id
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40'
                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Search Box */}
                      <div className="relative w-full lg:w-80">
                        <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search Voyager, rover, JPL, NSSDCA ID..."
                          aria-label="Search missions by name, lab, or NSSDCA ID"
                          className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0E0A24]/90 border border-purple-500/30 text-white placeholder-slate-400 text-xs sm:text-sm font-sans font-medium focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        />
                      </div>
                    </div>

                    {/* Sentinel Cards Grid */}
                    {filteredMissions.length === 0 ? (
                      <div className="cosmic-card p-12 text-center">
                        <p className="font-display text-xl font-bold text-white mb-2">
                          No spacecraft match "{searchQuery}"
                        </p>
                        <p className="text-sm text-slate-300 mb-5 font-sans">
                          Try searching for "Voyager", "JPL", "Moon", "Rover", "Pioneer", or clear the filter.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setRegionFilter('all');
                            setSearchQuery('');
                          }}
                          className="cosmic-btn-primary px-6 py-3 text-xs sm:text-sm font-mono font-bold uppercase cursor-pointer"
                        >
                          Show all 15 Sentinels
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {filteredMissions.map((mission) => {
                          const hasBadge = progress.unlockedBadges.includes(mission.badge.id);
                          const missionPhotoRecord = MISSION_PHOTOGRAPHY_ARCHIVE[mission.id];

                          return (
                            <article
                              key={mission.id}
                              onClick={() => handleOpenMission(mission)}
                              className="cosmic-card group overflow-hidden transition-all flex flex-col cursor-pointer p-0 text-white"
                            >
                              {/* Top Authentic Spacecraft Photograph */}
                              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#030610] border-b border-purple-500/20">
                                {missionPhotoRecord ? (
                                  <AuthenticSpacePhoto
                                    photo={missionPhotoRecord.cardPhoto}
                                    className="w-full h-full"
                                    imgClassName="group-hover:scale-[1.04] transition-transform duration-500"
                                  />
                                ) : (
                                  <SpacecraftVisual
                                    mission={mission}
                                    interactive={false}
                                    className="w-full h-full group-hover:scale-[1.04] transition-transform duration-500"
                                  />
                                )}
                                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#0A071E]/95 border border-purple-500/40 px-3.5 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
                                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-purple-300">
                                    ◌ {mission.statusBadge}
                                  </span>
                                </div>

                                {hasBadge && (
                                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-[#0A071E]/95 border border-emerald-500/50 px-3.5 py-1.5 text-[11px] font-mono font-bold text-emerald-400 shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>BADGE EARNED</span>
                                  </div>
                                )}
                              </div>

                              {/* Card Body */}
                              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex items-baseline gap-3">
                                      <span className="font-mono text-xs sm:text-sm text-purple-400 font-bold">
                                        {mission.indexNumber}
                                      </span>
                                      <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-purple-300 transition-colors">
                                        {mission.name}
                                      </h3>
                                    </div>
                                    <div className="w-9 h-9 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                                      <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                  </div>

                                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-sans">
                                    {mission.cardSummary}
                                  </p>
                                </div>

                                <div className="pt-5 border-t border-purple-500/15 flex items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono font-bold">
                                      <span>{mission.builtBy}</span>
                                      <span aria-hidden="true">·</span>
                                      <span className="text-purple-300">NSSDCA {mission.nssdcaId}</span>
                                    </div>
                                    <div className="font-mono text-xs font-bold tracking-wider uppercase text-slate-300">
                                      {mission.routeTrail}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2.5 shrink-0">
                                    <SentinelBadgeEmblem
                                      badgeId={mission.badge.id}
                                      unlocked={hasBadge}
                                      size="sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </section>

                {/* INTERACTIVE 3D OFF-WORLD RESTING SITES MAP */}
                <CelestialMapSection onSelectMission={handleOpenMission} />

                {/* SECTION 02: SIGNAL CHALLENGE */}
                <section className="py-20 lg:py-28 border-t border-purple-500/15 bg-transparent relative overflow-hidden">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="cosmic-card p-8 sm:p-12 lg:p-16 relative">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-7">
                          <div className="flex items-center gap-3 mb-4">
                            <p className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-purple-400">
                              02 / YOUR TURN, MISSION CONTROL
                            </p>
                          </div>
                          <h2 className="cosmic-headline text-3xl sm:text-6xl font-black leading-tight">
                            The signal fades.
                            <br />
                            What happens next?
                          </h2>
                        </div>

                        <div className="lg:col-span-5">
                          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 font-sans">
                            Step into a NASA telemetry engineer’s shoes. Use real mission evidence—not a guess—to solve why each spacecraft went silent and what its hardware is still doing today.
                          </p>
                          <div className="flex items-center gap-4 mb-5">
                            <button
                              type="button"
                              onClick={() => handleOpenSignalChallenge(pioneer10)}
                              className="cosmic-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-black uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            >
                              <span>Take the signal challenge</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-wider uppercase text-slate-400">
                            <span className="text-purple-300">15 MYSTERIES</span>
                            <span aria-hidden="true" className="text-purple-500/40">/</span>
                            <span>SCIENTIFIC EVIDENCE</span>
                            <span aria-hidden="true" className="text-purple-500/40">/</span>
                            <span className="text-purple-300">NO GRADES</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 04: A TIMELINE OF LONELY EXPLORERS */}
                <InteractiveSentinelTimeline
                  unlockedBadges={progress.unlockedBadges}
                  onSelectMission={handleOpenMission}
                  onOpenSignalChallenge={handleOpenSignalChallenge}
                />
              </div>
            )}
          </main>

          {/* FOOTER */}
          <footer className="bg-transparent border-t border-purple-500/15 py-14 relative z-10 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="pb-8 mb-8 border-b border-purple-500/15">
                <p className="font-mono text-xs font-bold tracking-wider uppercase text-purple-400 mb-2">
                  CURIOSITY, BACKED BY EVIDENCE.
                </p>
                <h3 className="cosmic-headline text-2xl sm:text-3xl font-black mb-6">
                  Stories from NASA’s archive. Discoveries for your next question.
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-mono font-bold">
                  <a
                    href="https://nssdc.gsfc.nasa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    <span>NSSDCA • Master Spacecraft Catalog</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  </a>
                  <a
                    href="https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    <span>NASA • Lunar Hardware &amp; ALSEP Archive</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  </a>
                  <a
                    href="https://nssdc.gsfc.nasa.gov/planetary/planets/marspage.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    <span>NASA • Mars Rovers &amp; Landers Archive</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono font-bold text-slate-400">
                <span className="cosmic-headline font-display font-black tracking-wider uppercase">
                  ✦ SILENT SENTINELS
                </span>
                <span>
                  An interactive 3D educational learning experience powered by NASA Space Science Data Coordinated Archive (NSSDCA) records.
                </span>
              </div>
            </div>
          </footer>
        </div>

          {/* Floating Return-to-Top Button */}
          {showBackToTop && (
            <button
              id="scroll-to-top-nav-btn"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll back to top navigation bar"
              className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full cosmic-btn-primary text-xs font-mono font-bold shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top &amp; Menu</span>
            </button>
          )}

          {/* Badge Locker Modal */}
          <BadgeLockerModal
            isOpen={isBadgeLockerOpen}
            progress={progress}
            onClose={() => setIsBadgeLockerOpen(false)}
            onSelectMission={handleOpenMission}
          />

          {/* How It's Built Glass-Morphism Modal */}
          <HowItsBuiltModal
            isOpen={isHowItsBuiltOpen}
            initialMissionId={selectedMission.id}
            onClose={() => setIsHowItsBuiltOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
