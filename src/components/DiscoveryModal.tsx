import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';

export interface DiscoveryOverlayData {
  kicker: string;
  headline: string;
  technicalSubtitle: string;
  body: string;
  secondaryBody?: string;
  promptType: 'THINK ABOUT IT' | 'CONNECT THE CLUES' | 'YOUR TURN' | 'LOOK AGAIN';
  promptQuestion: string;
  promptInsight: string;
}

interface DiscoveryModalProps {
  data: DiscoveryOverlayData | null;
  onClose: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({
  data,
  onClose,
  onNext,
  hasNext = false
}) => {
  const [showInsight, setShowInsight] = useState(false);

  useEffect(() => {
    setShowInsight(false);
  }, [data]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050C]/85 backdrop-blur-xl p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discovery-overlay-headline"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl cosmic-card backdrop-blur-2xl bg-[#0E0B22]/95 border border-purple-500/35 p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Kicker & Close Button */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-purple-400">
            {data.kicker}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close discovery overlay"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 hover:text-white hover:bg-purple-900/50 cursor-pointer transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display Headline */}
        <h3
          id="discovery-overlay-headline"
          className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1.5"
        >
          {data.headline}
        </h3>

        {/* Technical Component Name */}
        <p className="font-mono text-xs text-cyan-300 mb-4 font-bold">
          HARDWARE SPEC · {data.technicalSubtitle}
        </p>

        {/* Main Explanation */}
        <p className="text-[15px] sm:text-base leading-relaxed text-slate-200 mb-3 font-sans">
          {data.body}
        </p>

        {data.secondaryBody && (
          <p className="text-sm leading-relaxed text-slate-300 mb-5 font-sans font-medium">
            {data.secondaryBody}
          </p>
        )}

        {/* Reflection Box */}
        <div className="rounded-2xl bg-purple-950/40 border border-purple-500/30 p-5 mt-4 text-slate-100 shadow-sm">
          <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-purple-400 mb-1.5">
            {data.promptType}
          </div>
          <p className="text-sm sm:text-[15px] font-bold text-white leading-snug font-sans">
            {data.promptQuestion}
          </p>

          {!showInsight ? (
            <button
              type="button"
              onClick={() => setShowInsight(true)}
              className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 underline hover:text-white cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reveal NSSDCA engineer’s clue</span>
            </button>
          ) : (
            <div className="mt-3.5 pt-3 border-t border-purple-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">
              <strong className="text-purple-300 font-mono uppercase text-[11px] mr-1.5 font-bold">
                ENGINEER INSIGHT:
              </strong>
              {data.promptInsight}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-purple-500/20">
          <span className="text-xs font-mono font-bold text-cyan-300">
            +15 DISCOVERY XP LOGGED
          </span>
          <div className="flex items-center gap-3">
            {hasNext && onNext && (
              <button
                type="button"
                onClick={onNext}
                className="cosmic-btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_16px_rgba(168,85,247,0.5)]"
              >
                <span>Next hotspot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="cosmic-btn-secondary px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer whitespace-nowrap shrink-0"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
