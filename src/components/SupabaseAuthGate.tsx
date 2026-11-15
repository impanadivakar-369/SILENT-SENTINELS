import React, { useState } from 'react';
import {
  authenticateWithSupabase,
  SentinelUserProfile
} from '../services/supabaseClient';
import { ExplorerProgress } from '../utils/missionLogic';
import { SENTINEL_MISSIONS } from '../data/sentinelsData';
import { SpacecraftVisual } from './SpacecraftVisual';
import {
  ArrowUpRight,
  Box,
  Compass,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Menu,
  Orbit,
  Sparkles,
  User,
  X
} from 'lucide-react';

interface SupabaseAuthGateProps {
  currentProgress: ExplorerProgress;
  currentRankTitle: string;
  onAuthenticated: (profile: SentinelUserProfile, mergedProgress: ExplorerProgress) => void;
  onContinueAsGuest: () => void;
}

export const SupabaseAuthGate: React.FC<SupabaseAuthGateProps> = ({
  currentProgress,
  currentRankTitle,
  onAuthenticated,
  onContinueAsGuest
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal for 3D WebGL Pioneer 10 preview
  const [show3DPreview, setShow3DPreview] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  const pioneerMission = SENTINEL_MISSIONS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const res = await authenticateWithSupabase({
      mode: authMode,
      username,
      password,
      currentProgress,
      rankTitle: currentRankTitle
    });

    setIsSubmitting(false);

    if (!res.ok || !res.profile || !res.mergedProgress) {
      setErrorMessage(
        res.error || 'Could not authenticate with Mission Control. Please check your credentials.'
      );
      return;
    }

    onAuthenticated(res.profile, res.mergedProgress);
  };

  return (
    <div className="min-h-screen w-full bg-[#03050C] text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Unified High-Quality 3D Cinematic Deep Space Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -inset-8 animate-cosmic-breathe will-change-transform">
          <img
            src="/assets/cosmic/cinematic_universe_master.jpg"
            alt="Cinematic 3D Deep Space Galaxy"
            className="w-full h-full object-cover sm:object-[center_right] opacity-90 scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#03050C]/85 via-[#03050C]/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03050C]/60 via-transparent to-[#03050C]/75 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      </div>

      {/* =========================================================================
          TOP MINIMALIST NAVIGATION BAR (Zero Overlapping, Clean & Spaced)
         ========================================================================= */}
      <header className="relative z-20 w-full px-6 sm:px-12 py-4 flex items-center justify-between gap-4 border-b border-purple-500/20 bg-[#070514]/75 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        {/* Brand Identity: Glowing Orbit Icon + SILENT SENTINELS */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.6)]">
            <Orbit className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '24s' }} />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-heading text-sm sm:text-base font-black tracking-[0.2em] uppercase text-white drop-shadow-[0_2px_12px_rgba(168,85,247,0.5)]">
              ✦ SILENT SENTINELS
            </span>
            <span className="hidden md:inline-block font-mono text-[9px] font-bold uppercase tracking-widest text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
              EDUCATION ARCHIVE
            </span>
          </div>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-btn-secondary text-xs font-mono font-bold tracking-wider uppercase cursor-pointer"
          >
            <span>Guest Explorer</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />
          </button>

          <button
            type="button"
            onClick={() => setShow3DPreview(true)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-btn-primary text-xs font-mono font-bold tracking-wider uppercase cursor-pointer"
          >
            <Box className="w-3.5 h-3.5 text-white" />
            <span>Inspect 3D</span>
          </button>

          <button
            type="button"
            onClick={() => setShowMobileNav((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-purple-500/40 bg-purple-950/60 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            {showMobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {showMobileNav && (
          <div className="sm:hidden absolute top-16 right-4 left-4 rounded-2xl bg-[#0C0922]/95 border border-purple-500/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-2 z-40 backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => {
                setShowMobileNav(false);
                onContinueAsGuest();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>Continue as Guest</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setShowMobileNav(false);
                setShow3DPreview(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            >
              <span>Inspect 3D Pioneer 10</span>
              <Box className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* =========================================================================
          HERO MAIN: 3D EXTRUDED TITLE + CINEMATIC COSMIC 3D & AUTH
         ========================================================================= */}
      <main className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8 lg:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-7xl mx-auto w-full">
          
          {/* Left 7 Columns: Hero Presentation with 3D WebGL Spacecraft */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
                <span>NASA NSSDCA ARCHIVE · 15 MONUMENTS</span>
              </div>

              <h1 className="cosmic-headline text-4xl sm:text-6xl xl:text-7xl font-black">
                FIND SENTINELS TO BUILD THE FUTURE.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mt-4 max-w-xl font-normal">
                Connect with 15 historic robotic explorers and decrypt golden pulsar clues across deep space.
              </p>
            </div>

            {/* Organic Deep Space Portal Frame with 3D WebGL Pioneer 10 */}
            <div className="relative rounded-3xl border border-purple-500/30 bg-[#060416]/70 backdrop-blur-xl h-64 sm:h-80 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(139,92,246,0.15)] group">
              {/* Starfield & Nebula Glow inside portal */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(1.5px 1.5px at 15% 25%, #ffffff, transparent), radial-gradient(1.5px 1.5px at 75% 35%, #ffffff, transparent), radial-gradient(2px 2px at 45% 65%, #c084fc, transparent), radial-gradient(1.5px 1.5px at 85% 80%, #38bdf8, transparent)',
                  backgroundSize: '180px 180px'
                }}
              />

              {/* 3D WebGL Spacecraft */}
              <SpacecraftVisual
                mission={pioneerMission}
                interactive={true}
                enable3D={true}
                className="w-full h-full"
              />

              {/* Technical HUD Overlay Pill */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-3 px-4 py-2 rounded-2xl bg-[#0A071E]/90 border border-purple-500/40 backdrop-blur-md text-xs font-mono font-bold text-white z-20 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-purple-200">PIONEER 10 · 1972-012A</span>
                </div>
                <span className="text-slate-400 hidden sm:inline text-[11px] font-normal">DRAG TO ROTATE 360°</span>
              </div>
            </div>

            {/* Micro Feature Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-500/25 text-xs font-mono text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>3D WEBGL HARDWARE</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-500/25 text-xs font-mono text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>15 NASA DOSSIERS</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-500/25 text-xs font-mono text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>100% FREE ARCHIVE</span>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Glassmorphic Cosmic Authentication Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="cosmic-card w-full max-w-[460px] p-6 sm:p-9 relative z-10 border border-purple-500/35 bg-[#0A071F]/80 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(139,92,246,0.18)]">
              {/* Card Header & Switcher */}
              <div className="mb-6">
                <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-purple-300 mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>MISSION LOG AUTHENTICATION</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  {authMode === 'signup' ? 'Create Call-Sign' : 'Welcome Back'}
                </h2>
              </div>

              {/* Segmented Switcher Tabs (Sign up / Log in) */}
              <div className="grid grid-cols-2 p-1.5 rounded-full border border-purple-500/30 bg-[#060414]/90 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMessage(null);
                  }}
                  className={`py-2 px-4 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(147,51,234,0.6)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage(null);
                  }}
                  className={`py-2 px-4 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(147,51,234,0.6)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Log in
                </button>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Call-Sign / Username Field */}
                <div>
                  <label
                    htmlFor="explorer-username"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-purple-200 mb-1.5"
                  >
                    Explorer Call-Sign
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="explorer-username"
                      type="text"
                      required
                      minLength={2}
                      maxLength={40}
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        authMode === 'signup' ? 'Full name / Call-sign' : 'Your Call-Sign'
                      }
                      className="cosmic-input w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-sans placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="explorer-password"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-purple-200 mb-1.5"
                  >
                    Security Passkey
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="explorer-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={4}
                      autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (min. 4 characters)"
                      className="cosmic-input w-full pl-11 pr-11 py-3 text-xs sm:text-sm font-sans placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-2xl bg-rose-950/70 border border-rose-500/50 p-3 text-xs font-mono font-bold text-rose-300"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cosmic-btn-primary w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-black tracking-wider uppercase cursor-pointer disabled:opacity-50 mt-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying credentials...</span>
                    </>
                  ) : (
                    <span>{authMode === 'signup' ? 'Create account' : 'Log in'}</span>
                  )}
                </button>
              </form>

              {/* "or" Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-500/20" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#0A071F] px-3 font-mono font-bold text-purple-400 uppercase text-[11px]">or</span>
                </div>
              </div>

              {/* Quick Option Row (Guest Explorer & 3D Hardware Model) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onContinueAsGuest}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                  title="Continue as Guest Explorer without saving passkey"
                >
                  <Compass className="w-4 h-4 text-purple-300 group-hover:rotate-45 transition-transform" />
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-300">
                    Guest Explorer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShow3DPreview(true)}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border border-purple-500/30 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                  title="Inspect 3D Pioneer 10 WebGL hardware model in 360°"
                >
                  <Box className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-300">
                    3D Model
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="relative z-20 w-full px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-wider text-purple-300/80 border-t border-purple-500/20 bg-[#070514]/75 backdrop-blur-md">
        NASA Space Science Data Coordinated Archive (NSSDCA) • Educational Space Platform
      </footer>

      {/* =========================================================================
          FEATURE PRESERVATION MODAL: 3D WEBGL SPACECRAFT INSPECTION
         ========================================================================= */}
      {show3DPreview && (
        <div
          className="fixed inset-0 z-50 bg-[#03050C]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setShow3DPreview(false)}
        >
          <div
            className="cosmic-card relative w-full max-w-2xl p-6 sm:p-8 border border-purple-500/40 bg-[#0A071F]/90 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(139,92,246,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-purple-500/30">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-purple-200">
                <Box className="w-4 h-4 text-purple-400" />
                <span>3D WEBGL HARDWARE PREVIEW · PIONEER 10</span>
              </div>
              <button
                type="button"
                onClick={() => setShow3DPreview(false)}
                aria-label="Close 3D model preview"
                className="w-8 h-8 rounded-full border border-purple-500/40 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-[#04020C] border border-purple-500/30 mb-4 shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)]">
              <SpacecraftVisual
                mission={pioneerMission}
                interactive={true}
                enable3D={true}
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#070514]/90 border border-purple-500/40 text-xs font-mono font-bold text-white shadow-md">
                <span>PIONEER 10</span>
                <span className="text-purple-400 mx-1.5">·</span>
                <span>NSSDCA 1972-012A</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
              Inspect verified 3D spacecraft geometry in 360°. Click and drag to orbit, scroll to zoom, and examine hardware subsystems.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShow3DPreview(false)}
                className="cosmic-btn-secondary px-5 py-2 text-xs font-mono font-bold uppercase cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
