import React from 'react';

/**
 * Unified 3D Cosmic Background Layer:
 * 
 * Invariants & User Requirements:
 * 1. Single unified 8K 3D cinematic cosmic environment.
 * 2. Complete scroll isolation — When the user scrolls, ONLY the content scrolls up and down.
 * 3. Continuous autonomous moving animations — The 3D spiral galaxy breathes and slowly turns,
 *    nebula starlight pulses in deep obsidian space.
 * 4. All comet lines travelling across the screen are removed per user request.
 */
export const CosmicParallaxLayer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
    >
      {/* 1. MASTER UNIFIED 3D CINEMATIC DEEP-SPACE PANORAMA */}
      <div className="absolute -inset-8 animate-cosmic-breathe will-change-transform">
        <div
          className="w-full h-full bg-cover bg-center sm:bg-[center_right]"
          style={{
            backgroundImage: "url('/assets/cosmic/cinematic_universe_master.jpg')",
          }}
        />
      </div>

      {/* 2. ETHEREAL ATMOSPHERIC & STELLAR LUMINESCENCE (Enhances depth & text contrast) */}
      {/* Deep space vignette ensuring center-left text is 100% crisp and readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03050C]/85 via-[#03050C]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#03050C]/60 via-transparent to-[#03050C]/75 pointer-events-none" />

      {/* Core Volumetric Nebula Glow on Galaxy Nucleus */}
      <div className="absolute top-[12%] right-[10%] w-[550px] h-[550px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-radial from-purple-500/20 via-indigo-600/10 to-transparent blur-3xl animate-nebula-pulse pointer-events-none" />
      <div className="absolute top-[28%] right-[22%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan-400/15 via-blue-600/5 to-transparent blur-2xl animate-cosmic-glow pointer-events-none" />
    </div>
  );
};
