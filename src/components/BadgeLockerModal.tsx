import React from 'react';
import { SENTINEL_MISSIONS, SentinelMission } from '../data/sentinelsData';
import { ExplorerProgress, getExplorerRank } from '../utils/missionLogic';
import { SentinelBadgeEmblem } from './SentinelBadgeEmblem';
import { CheckCircle2, X, ArrowUpRight, Award, Shield, Sparkles } from 'lucide-react';

interface BadgeLockerModalProps {
  isOpen: boolean;
  progress: ExplorerProgress;
  onClose: () => void;
  onSelectMission: (mission: SentinelMission) => void;
  onOpenGoldenMessage?: () => void;
}

export const BadgeLockerModal: React.FC<BadgeLockerModalProps> = ({
  isOpen,
  progress,
  onClose,
  onSelectMission
}) => {
  if (!isOpen) return null;

  const rankInfo = getExplorerRank(progress);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050C]/85 backdrop-blur-xl p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-locker-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl cosmic-card backdrop-blur-2xl bg-[#0E0B22]/95 border border-purple-500/35 p-6 sm:p-9 shadow-[0_24px_80px_rgba(0,0,0,0.9)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-purple-500/20">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>NSSDCA MISSION CREDENTIALS · EXPLORER LOG</span>
            </div>
            <h2
              id="badge-locker-title"
              className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1"
            >
              Your Sentinel Mission Badge Locker
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans font-medium">
              Every spacecraft has its own custom space mission emblem. Inspect each vehicle’s 3D hardware and pass its Mission Quiz to unlock all 15 official NSSDCA badges.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close badge locker"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:text-white hover:bg-purple-900/50 cursor-pointer shrink-0 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Explorer Rank & Telemetry Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
            <div className="font-mono text-[11px] font-bold text-purple-400 uppercase">
              CURRENT EXPLORER RANK
            </div>
            <div className="font-display text-lg sm:text-xl font-extrabold text-white mt-1">
              {rankInfo.rankTitle}
            </div>
            <div className="text-xs text-slate-300 mt-1 font-medium">
              {rankInfo.nextRankTitle
                ? `Next: ${rankInfo.nextRankTitle}`
                : 'Maximum NSSDCA Rank Achieved!'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
            <div className="font-mono text-[11px] font-bold text-purple-400 uppercase">
              UNIQUE BADGES UNLOCKED
            </div>
            <div className="font-mono text-2xl font-extrabold text-cyan-300 mt-1 tabular-nums">
              {rankInfo.badgesCount} <span className="text-sm font-semibold text-slate-400">/ {rankInfo.totalAvailableBadges}</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 tabular-nums font-medium">
              {progress.investigatedHotspots.length} Hardware Hotspots Inspected
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/25 shadow-sm text-slate-100">
            <div className="font-mono text-[11px] font-bold text-purple-400 uppercase">
              TOTAL DISCOVERY SCORE
            </div>
            <div className="font-mono text-2xl font-extrabold text-amber-300 mt-1 tabular-nums">
              {rankInfo.totalPoints} <span className="text-xs font-bold text-slate-400">XP</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 tabular-nums font-medium">
              {progress.solvedMysteries.length} Signal Mysteries Solved
            </div>
          </div>
        </div>

        {/* All 15 Mission Specialist Badges Grid */}
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
            UNIQUE SPACECRAFT SPECIALIST PATCHES (15 NSSDCA MISSIONS)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SENTINEL_MISSIONS.map((mission) => {
              const isUnlocked = progress.unlockedBadges.includes(mission.badge.id);
              const score = progress.completedQuizzes[mission.id];

              return (
                <div
                  key={mission.id}
                  className={`rounded-2xl p-4 border border-purple-500/25 shadow-sm flex items-start justify-between gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-purple-950/40 to-[#0A071E] border-purple-500/40'
                      : 'bg-[#0A071E]/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <SentinelBadgeEmblem
                      badgeId={mission.badge.id}
                      unlocked={isUnlocked}
                      size="md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] font-bold text-purple-400">
                          {mission.indexNumber}
                        </span>
                        <span className="font-display font-extrabold text-sm text-white truncate">
                          {mission.badge.name}
                        </span>
                        {isUnlocked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-400 font-medium">
                        {mission.name} · NSSDCA {mission.nssdcaId}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-sans font-medium">
                        {mission.badge.description}
                      </p>
                      {typeof score === 'number' && (
                        <div className="font-mono text-[11px] font-bold text-emerald-300 mt-1">
                          Quiz Score: {score}%
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectMission(mission);
                    }}
                    className="cosmic-btn-secondary px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isUnlocked ? 'Review' : 'Earn ↗'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
