import React from 'react';
import { Lock } from 'lucide-react';

interface SentinelBadgeEmblemProps {
  badgeId: string;
  unlocked?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-9 h-9',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

/**
 * Renders a unique, custom-crafted SVG space mission patch emblem for each of the 16 NSSDCA badges.
 */
export const SentinelBadgeEmblem: React.FC<SentinelBadgeEmblemProps> = ({
  badgeId,
  unlocked = true,
  size = 'md',
  className = ''
}) => {
  const sizeClass = SIZE_MAP[size];

  const renderEmblemArtwork = () => {
    switch (badgeId) {
      case 'badge-pioneer-10':
        // Jovian Trailblazer: Jupiter Great Red Spot + Parabolic Dish + Aldebaran Star
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <defs>
              <radialGradient id="p10-bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#090D16" />
              </radialGradient>
            </defs>
            <polygon
              points="32,3 57,17 57,47 32,61 7,47 7,17"
              fill="url(#p10-bg)"
              stroke="#D2F366"
              strokeWidth="2.5"
            />
            {/* Jupiter banded crescent */}
            <circle cx="42" cy="24" r="11" fill="#EA580C" opacity="0.85" />
            <path d="M32 21 Q42 19 52 21" stroke="#FDE047" strokeWidth="2" fill="none" />
            <path d="M31 25 Q42 23 53 25" stroke="#FED7AA" strokeWidth="1.8" fill="none" />
            <ellipse cx="45" cy="27" rx="3.2" ry="2" fill="#DC2626" />
            {/* Pioneer Dish & RTG Boom */}
            <path d="M14 42 Q24 44 28 32 L18 28 Z" fill="#FACC15" stroke="#FEF08A" strokeWidth="1.2" />
            <line x1="21" y1="36" x2="11" y2="50" stroke="#94A3B8" strokeWidth="2" />
            <rect x="8" y="48" width="5" height="4" rx="1" fill="#F97316" />
            <line x1="23" y1="30" x2="36" y2="15" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Aldebaran red star */}
            <circle cx="18" cy="16" r="2.5" fill="#F87171" />
            <path d="M18 11 L18 21 M13 16 L23 16" stroke="#FCA5A5" strokeWidth="1" />
          </svg>
        );

      case 'badge-pioneer-11':
        // Ring Pathfinder: Saturn Rings + Gravity Assist Slingshot Arc
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#0F172A" stroke="#A3E635" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="24" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Saturn & Rings */}
            <ellipse
              cx="32"
              cy="33"
              rx="22"
              ry="7"
              transform="rotate(-22 32 33)"
              fill="none"
              stroke="#FDE047"
              strokeWidth="3"
            />
            <ellipse
              cx="32"
              cy="33"
              rx="25"
              ry="8.5"
              transform="rotate(-22 32 33)"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />
            <circle cx="32" cy="33" r="10" fill="#F59E0B" />
            {/* Slingshot trajectory */}
            <path
              d="M10 48 Q26 54 48 16"
              fill="none"
              stroke="#D2F366"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polygon points="48,13 52,19 45,18" fill="#D2F366" />
          </svg>
        );

      case 'badge-apollo-lm':
        // Tranquillity Architect: Golden Octagonal Descent Stage + Earthrise
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <polygon
              points="22,4 42,4 60,22 60,42 42,60 22,60 4,42 4,22"
              fill="#0B1320"
              stroke="#F59E0B"
              strokeWidth="2.5"
            />
            {/* Lunar horizon */}
            <path d="M8 46 Q32 40 56 46 L52 57 L12 57 Z" fill="#334155" />
            {/* Earthrise */}
            <circle cx="46" cy="18" r="6" fill="#38BDF8" />
            <path d="M43 16 Q46 14 49 18" stroke="#4ADE80" strokeWidth="2" fill="none" />
            {/* Golden LM Descent Stage */}
            <rect x="21" y="30" width="22" height="11" rx="2" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1.5" />
            <line x1="25" y1="30" x2="25" y2="41" stroke="#B45309" strokeWidth="1.5" />
            <line x1="39" y1="30" x2="39" y2="41" stroke="#B45309" strokeWidth="1.5" />
            {/* Landing legs & pads */}
            <line x1="21" y1="36" x2="14" y2="47" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="43" y1="36" x2="50" y2="47" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="14" cy="47" rx="3.5" ry="1.3" fill="#FACC15" />
            <ellipse cx="50" cy="47" rx="3.5" ry="1.3" fill="#FACC15" />
            <polygon points="29,41 35,41 37,46 27,46" fill="#475569" />
          </svg>
        );

      case 'badge-lunar-rovers':
        // Highlands Driver: Wire-Mesh Wheel + Umbrella High-Gain Antenna + Lunar Peaks
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <rect
              x="6"
              y="6"
              width="52"
              height="52"
              rx="14"
              fill="#0C1928"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            {/* Lunar mountains */}
            <polygon points="8,44 22,26 36,44" fill="#1E293B" />
            <polygon points="28,44 44,22 56,44" fill="#334155" />
            {/* Rover chassis & umbrella dish */}
            <line x1="18" y1="42" x2="46" y2="42" stroke="#E2E8F0" strokeWidth="3" />
            <line x1="26" y1="42" x2="26" y2="24" stroke="#94A3B8" strokeWidth="2" />
            <path d="M18 24 Q26 16 34 24" fill="none" stroke="#FACC15" strokeWidth="2.2" />
            {/* Wire-mesh wheels */}
            <circle cx="21" cy="45" r="6.5" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="21" cy="45" r="2.5" fill="#F59E0B" />
            <circle cx="43" cy="45" r="6.5" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="43" cy="45" r="2.5" fill="#F59E0B" />
          </svg>
        );

      case 'badge-alsep':
        // Lunar Seismologist: Green Laser Retroreflector Beam + Seismic Pulse Wave
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#09191F" stroke="#2DD4BF" strokeWidth="2.5" />
            {/* Laser beam bouncing off corner-cube array */}
            <line x1="14" y1="12" x2="30" y2="38" stroke="#4ADE80" strokeWidth="2.5" />
            <line x1="30" y1="38" x2="48" y2="12" stroke="#D2F366" strokeWidth="2" strokeDasharray="3 2" />
            {/* Retroreflector panel */}
            <polygon points="20,38 40,38 44,45 16,45" fill="#38BDF8" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Seismic wave pulse at bottom */}
            <path
              d="M10 51 L22 51 L25 46 L29 56 L33 44 L37 54 L40 51 L54 51"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'badge-surveyor':
        // Soft-Landing Pioneer: White Tripod Lander + Planar Mast + Crater Rim
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <polygon
              points="32,4 59,52 5,52"
              fill="#0A1E1C"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Surveyor tripod mast & planar panel */}
            <rect x="24" y="16" width="16" height="5" rx="1" fill="#38BDF8" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="32" y1="21" x2="32" y2="38" stroke="#E2E8F0" strokeWidth="2.5" />
            <polygon points="32,25 22,42 42,42" fill="none" stroke="#A7F3D0" strokeWidth="2" />
            {/* Three shock-absorber footpads */}
            <circle cx="19" cy="44" r="3" fill="#FACC15" />
            <circle cx="32" cy="45" r="3" fill="#FACC15" />
            <circle cx="45" cy="44" r="3" fill="#FACC15" />
          </svg>
        );

      case 'badge-sojourner':
        // Ares Vallis Scout: Airbag Tetrahedron + 6-Wheel Rocker-Bogie Rover
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#1F120B" stroke="#FB923C" strokeWidth="2.5" />
            {/* Bouncing airbag lobes background */}
            <circle cx="24" cy="24" r="8" fill="#7C2D12" opacity="0.55" />
            <circle cx="40" cy="24" r="8" fill="#7C2D12" opacity="0.55" />
            <circle cx="32" cy="17" r="8" fill="#9A3412" opacity="0.55" />
            {/* Flat solar deck */}
            <rect x="16" y="31" width="32" height="6" rx="1.5" fill="#1E3A8A" stroke="#FACC15" strokeWidth="1.5" />
            {/* APXS sensor arm */}
            <line x1="48" y1="34" x2="54" y2="41" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="54" cy="42" r="2.5" fill="#D2F366" />
            {/* 3 visible wheels of 6-wheel Rocker-Bogie */}
            <circle cx="20" cy="44" r="4.5" fill="#090D16" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="32" cy="44" r="4.5" fill="#090D16" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="44" cy="44" r="4.5" fill="#090D16" stroke="#E2E8F0" strokeWidth="2" />
            <path d="M20 44 L26 38 L32 44 M26 38 L44 44" stroke="#FB923C" strokeWidth="1.8" fill="none" />
          </svg>
        );

      case 'badge-opportunity':
        // Meridiani Marathoner: Pancam Masthead + 45.16 km Marathon Track + Hematite Blueberries
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <polygon
              points="32,3 58,15 58,45 32,61 6,45 6,15"
              fill="#230F17"
              stroke="#F43F5E"
              strokeWidth="2.5"
            />
            {/* Solar wings */}
            <polygon points="10,36 32,29 54,36 46,43 18,43" fill="#1D4ED8" stroke="#FACC15" strokeWidth="1.4" />
            {/* Pancam stereo mast */}
            <line x1="32" y1="34" x2="32" y2="17" stroke="#E2E8F0" strokeWidth="2.5" />
            <rect x="24" y="13" width="16" height="6" rx="2" fill="#F8FAFC" stroke="#F43F5E" strokeWidth="1.5" />
            <circle cx="28" cy="16" r="1.8" fill="#0EA5E9" />
            <circle cx="36" cy="16" r="1.8" fill="#0EA5E9" />
            {/* 45.16 km Marathon road */}
            <path d="M16 52 Q32 44 48 52" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4 2" />
            {/* Hematite blueberries */}
            <circle cx="20" cy="49" r="2.2" fill="#38BDF8" />
            <circle cx="44" cy="49" r="2.2" fill="#38BDF8" />
          </svg>
        );

      case 'badge-viking':
        // Chryse Biologist: Soil Sampler Scoop + Biology Chamber + CHONP Atoms
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#1E1607" stroke="#EAB308" strokeWidth="2.5" />
            {/* Mars red globe backdrop */}
            <circle cx="32" cy="34" r="16" fill="#9A3412" opacity="0.55" />
            {/* Viking Dish + RTG covers */}
            <path d="M22 20 Q32 28 42 20" fill="none" stroke="#FEF08A" strokeWidth="2.5" />
            <line x1="32" y1="24" x2="32" y2="35" stroke="#E2E8F0" strokeWidth="2.5" />
            <rect x="18" y="34" width="28" height="9" rx="2" fill="#E2E8F0" stroke="#CA8A04" strokeWidth="1.5" />
            {/* Extendable surface sampler arm & scoop */}
            <line x1="42" y1="39" x2="54" y2="49" stroke="#FACC15" strokeWidth="2.5" />
            <path d="M52 48 L57 47 L56 52 Z" fill="#D2F366" />
            {/* Biology atom rings */}
            <circle cx="20" cy="18" r="3" fill="none" stroke="#D2F366" strokeWidth="1.4" />
            <circle cx="20" cy="18" r="1" fill="#D2F366" />
          </svg>
        );

      case 'badge-phoenix-insight':
        // Subsurface Explorer: Twin Round UltraFlex Solar Fans + Arctic Ice & SEIS Dome
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <rect
              x="5"
              y="5"
              width="54"
              height="54"
              rx="16"
              fill="#0B1924"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            {/* Left & Right Circular Solar Fans */}
            <circle cx="15" cy="30" r="8" fill="#1E3A8A" stroke="#FACC15" strokeWidth="1.6" />
            <circle cx="49" cy="30" r="8" fill="#1E3A8A" stroke="#FACC15" strokeWidth="1.6" />
            {/* Central Lander Deck */}
            <rect x="24" y="26" width="16" height="8" rx="2" fill="#E2E8F0" />
            {/* SEIS Seismometer Dome & Ice Crystal */}
            <path d="M25 48 A7 7 0 0 1 39 48 Z" fill="#F8FAFC" stroke="#F97316" strokeWidth="1.6" />
            <path d="M12 49 L52 49" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
          </svg>
        );

      case 'badge-ingenuity':
        // Jezero Aviator: Coaxial Counter-Rotating Carbon Blades + Wright Flyer Swatch + 72
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#121D10" stroke="#D2F366" strokeWidth="2.5" />
            {/* Top solar array */}
            <rect x="24" y="13" width="16" height="4" rx="1" fill="#FACC15" />
            {/* Upper & Lower Counter-Rotating Blades */}
            <ellipse cx="32" cy="21" rx="22" ry="3.2" fill="#E2E8F0" />
            <ellipse cx="32" cy="26" rx="22" ry="3.2" fill="#94A3B8" />
            {/* Mast & Fuselage Tissue-Box */}
            <line x1="32" y1="15" x2="32" y2="33" stroke="#D2F366" strokeWidth="2.5" />
            <rect x="25" y="33" width="14" height="11" rx="2" fill="#F8FAFC" stroke="#D2F366" strokeWidth="1.5" />
            {/* 4 Carbon Landing Legs */}
            <line x1="26" y1="43" x2="16" y2="53" stroke="#94A3B8" strokeWidth="2" />
            <line x1="38" y1="43" x2="48" y2="53" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="32" cy="38.5" r="2.2" fill="#0EA5E9" />
          </svg>
        );

      case 'badge-dawn':
        // Ion Navigator: Wide Solar Wings + Glowing Blue Xenon Ion Plume + Vesta & Ceres
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <polygon
              points="32,3 59,18 59,46 32,61 5,46 5,18"
              fill="#081C29"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            {/* Vesta & Ceres orbs */}
            <circle cx="18" cy="18" r="4.5" fill="#94A3B8" />
            <circle cx="46" cy="18" r="6" fill="#475569" />
            <circle cx="45" cy="17" r="1.6" fill="#FFFFFF" />
            {/* Giant Solar Array Wings */}
            <rect x="7" y="28" width="18" height="7" rx="1" fill="#0284C7" stroke="#E0F2FE" strokeWidth="1.2" />
            <rect x="39" y="28" width="18" height="7" rx="1" fill="#0284C7" stroke="#E0F2FE" strokeWidth="1.2" />
            {/* Central Bus & Xenon Ion Beam */}
            <rect x="26" y="26" width="12" height="11" rx="2" fill="#FACC15" />
            <polygon points="28,37 36,37 41,56 23,56" fill="#38BDF8" opacity="0.75" />
            <polygon points="30,37 34,37 36,52 28,52" fill="#E0F2FE" />
          </svg>
        );

      case 'badge-near':
        // Eros Touchdown: Peanut Asteroid 433 Eros + 4 Cruciform Solar Petals
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#230E1E" stroke="#EC4899" strokeWidth="2.5" />
            {/* Peanut-shaped Asteroid 433 Eros */}
            <path
              d="M12 45 C12 37, 25 39, 32 42 C39 39, 52 37, 52 46 C52 54, 38 54, 32 50 C26 54, 12 53, 12 45 Z"
              fill="#78716C"
              stroke="#D6D3D1"
              strokeWidth="1.5"
            />
            {/* NEAR Shoemaker 4-petal spacecraft */}
            <g transform="translate(32, 23)">
              <rect x="-13" y="-3" width="8" height="6" fill="#38BDF8" />
              <rect x="5" y="-3" width="8" height="6" fill="#38BDF8" />
              <rect x="-3" y="-12" width="6" height="7" fill="#38BDF8" />
              <rect x="-3" y="5" width="6" height="7" fill="#38BDF8" />
              <circle cx="0" cy="0" r="4.5" fill="#FACC15" />
            </g>
          </svg>
        );

      case 'badge-kepler':
        // Exoplanet Hunter: Hexagonal Photometer Barrel + Star Transit Light-Curve Dip
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#180D29" stroke="#A855F7" strokeWidth="2.5" />
            {/* Host Star & Transiting Exoplanet */}
            <circle cx="32" cy="24" r="11" fill="#FDE047" />
            <circle cx="35" cy="25" r="3.8" fill="#090D16" stroke="#A855F7" strokeWidth="1.2" />
            {/* Transit Light Curve Dip Graph */}
            <path
              d="M10 43 L23 43 L27 52 L37 52 L41 43 L54 43"
              fill="none"
              stroke="#D2F366"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'badge-voyager-1':
        // Interstellar Voyager: 12-Inch Golden Record + 3.7m White Dish + Heliopause Arc
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <polygon
              points="32,3 58,18 58,46 32,61 6,46 6,18"
              fill="#071927"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            {/* Heliopause Bow Wave Arc */}
            <path
              d="M14 18 Q32 6 50 18"
              fill="none"
              stroke="#D2F366"
              strokeWidth="2.2"
              strokeDasharray="3 2"
            />
            {/* Voyager White High-Gain Dish */}
            <ellipse cx="26" cy="34" rx="12" ry="8" transform="rotate(-18 26 34)" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
            {/* 12-Inch Golden Record Emblem */}
            <circle cx="42" cy="39" r="9.5" fill="#FACC15" stroke="#FEF08A" strokeWidth="1.5" />
            <circle cx="42" cy="39" r="6" fill="none" stroke="#B45309" strokeWidth="1" />
            <circle cx="42" cy="39" r="2.2" fill="#78350F" />
          </svg>
        );

      case 'badge-golden-plaque':
      default:
        // Cosmic Postmaster: 14-Pulsar Sunburst + Hydrogen Spin-Flip Binary Ruler
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <rect
              x="5"
              y="9"
              width="54"
              height="46"
              rx="8"
              fill="#261E07"
              stroke="#D2F366"
              strokeWidth="2.5"
            />
            {/* Pulsar Sunburst */}
            <g stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round">
              <line x1="24" y1="33" x2="11" y2="20" />
              <line x1="24" y1="33" x2="10" y2="33" />
              <line x1="24" y1="33" x2="13" y2="46" />
              <line x1="24" y1="33" x2="24" y2="17" />
              <line x1="24" y1="33" x2="24" y2="48" />
              <line x1="24" y1="33" x2="36" y2="23" />
              <line x1="24" y1="33" x2="35" y2="44" />
            </g>
            <circle cx="24" cy="33" r="3" fill="#D2F366" />
            {/* Hydrogen hyperfine circles */}
            <circle cx="44" cy="24" r="4" fill="none" stroke="#D2F366" strokeWidth="1.6" />
            <circle cx="52" cy="24" r="4" fill="none" stroke="#D2F366" strokeWidth="1.6" />
            <line x1="44" y1="29" x2="52" y2="29" stroke="#D2F366" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${sizeClass} ${
        unlocked
          ? 'drop-shadow-[0_0_12px_rgba(210,243,102,0.32)]'
          : 'opacity-55 grayscale contrast-75'
      } ${className}`}
      title={unlocked ? 'Official NSSDCA Mission Badge Unlocked' : 'Complete Mission Quiz to Unlock Badge'}
    >
      {renderEmblemArtwork()}
      {!unlocked && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0B0F17] border border-[#2D3D50] flex items-center justify-center text-[#9BA8B8] shadow">
          <Lock className="w-2.5 h-2.5" />
        </div>
      )}
    </div>
  );
};
