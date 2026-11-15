import React, { useState, useEffect, useRef } from 'react';
import { HardwareHotspot, SentinelMission } from '../data/sentinelsData';
import {
  clampZoom,
  getCameraOrientationLabel,
  normalizeAngle360,
  projectHotspot360
} from '../utils/missionLogic';
import { Spacecraft3DStage } from './Spacecraft3DStage';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Play,
  Pause,
  Compass,
  Box
} from 'lucide-react';

interface SpacecraftVisualProps {
  mission: SentinelMission;
  activeHotspotId?: string | null;
  onSelectHotspot?: (hotspot: HardwareHotspot) => void;
  interactive?: boolean;
  enable3D?: boolean;
  className?: string;
  investigatedIds?: string[];
}

export const SpacecraftVisual: React.FC<SpacecraftVisualProps> = ({
  mission,
  activeHotspotId,
  onSelectHotspot,
  interactive = false,
  enable3D = false,
  className = '',
  investigatedIds = []
}) => {
  const [yawDeg, setYawDeg] = useState<number>(18);
  const [pitchDeg, setPitchDeg] = useState<number>(8);
  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isAutoOrbiting, setIsAutoOrbiting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [projected3DCoords, setProjected3DCoords] = useState<Record<string, { x: number; y: number }>>({});
  const dragStartRef = useRef<{ x: number; y: number; startYaw: number; startPitch: number } | null>(null);

  const useWebGL3D = interactive || enable3D;

  // Reset 360° view and zoom when switching missions
  useEffect(() => {
    setYawDeg(18);
    setPitchDeg(8);
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setIsAutoOrbiting(false);
  }, [mission.id]);

  // Smooth auto-orbit loop when enabled
  useEffect(() => {
    if (!isAutoOrbiting || !interactive) return;
    const interval = window.setInterval(() => {
      setYawDeg((prev) => normalizeAngle360(prev + 2));
    }, 45);
    return () => window.clearInterval(interval);
  }, [isAutoOrbiting, interactive]);

  const handleZoomIn = () => {
    setZoom((prev) => clampZoom(prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = clampZoom(prev - 0.25);
      if (next <= 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    setYawDeg(0);
    setPitchDeg(6);
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setIsAutoOrbiting(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if ((e.target as HTMLElement).closest('button, input')) return;
    setIsAutoOrbiting(false);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startYaw: yawDeg,
      startPitch: pitchDeg
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || !interactive) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    const nextYaw = normalizeAngle360(dragStartRef.current.startYaw + Math.round(deltaX * 0.65));
    const nextPitch = Math.max(-28, Math.min(38, Math.round(dragStartRef.current.startPitch + deltaY * 0.28)));
    setYawDeg(nextYaw);
    setPitchDeg(nextPitch);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Compute 3D turntable transform factors from yawDeg (0° to 360°)
  const rad = (yawDeg * Math.PI) / 180;
  const cosYaw = Math.cos(rad);
  const sinYaw = Math.sin(rad);
  // Horizontal foreshortening that never collapses to 0 so structure stays visible at 90°/270°
  const scaleX3D = (cosYaw >= 0 ? 1 : -1) * Math.max(0.42, Math.abs(cosYaw));
  const skewY3D = Number((sinYaw * 4.5).toFixed(2));
  const parallaxBgX = Number((-sinYaw * 24).toFixed(1));
  const isRearView = cosYaw < -0.15;

  const spacecraftTransform = interactive
    ? `translate(${Number((sinYaw * 14).toFixed(1))}, 0) scale(${scaleX3D.toFixed(3)}, 1) skewY(${skewY3D})`
    : undefined;

  const renderTurntableRing = (cy = 395) => {
    if (!interactive) return null;
    return (
      <g transform={`translate(400, ${cy})`} className="pointer-events-none">
        <ellipse
          cx="0"
          cy="0"
          rx="235"
          ry="44"
          fill="none"
          stroke="#D2F366"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          opacity="0.45"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="185"
          ry="32"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1"
          opacity="0.28"
        />
        {/* Orbiting degree marker on the 360° ring */}
        <circle
          cx={Number((sinYaw * 235).toFixed(1))}
          cy={Number((cosYaw * 44).toFixed(1))}
          r="5"
          fill="#D2F366"
        />
        <text
          x={Number((sinYaw * 235).toFixed(1))}
          y={Number((cosYaw * 44 + 16).toFixed(1))}
          fill="#D2F366"
          fontSize="10"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {yawDeg}°
        </text>
      </g>
    );
  };

  const renderArtwork = () => {
    switch (mission.illustrationType) {
      case 'pioneer-10':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Pioneer 10 flying past Jupiter">
            <defs>
              <radialGradient id="p10-space" cx="25%" cy="55%" r="85%">
                <stop offset="0%" stopColor="#0D1322" />
                <stop offset="55%" stopColor="#080B12" />
                <stop offset="100%" stopColor="#05070B" />
              </radialGradient>
              <radialGradient id="jupiter-glow" cx="78%" cy="22%" r="52%">
                <stop offset="0%" stopColor="#F6D592" />
                <stop offset="35%" stopColor="#E08E45" />
                <stop offset="68%" stopColor="#9E4725" />
                <stop offset="92%" stopColor="#3B1B16" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#080B12" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="dish-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DCE6F2" />
                <stop offset="45%" stopColor="#7A8FA6" />
                <stop offset="100%" stopColor="#263547" />
              </linearGradient>
              <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            {/* Deep space backdrop */}
            <rect width="800" height="500" fill="url(#p10-space)" />
            {/* Parallax Background Layer */}
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <g fill="#E2E8F0" opacity="0.65">
                <circle cx="90" cy="80" r="1.2" />
                <circle cx="150" cy="180" r="1.6" />
                <circle cx="65" cy="290" r="1" />
                <circle cx="230" cy="95" r="1.4" />
                <circle cx="310" cy="240" r="1.1" />
                <circle cx="180" cy="410" r="1.5" />
                <circle cx="350" cy="390" r="1.2" />
                <circle cx="420" cy="110" r="1.8" />
                <circle cx="120" cy="350" r="1" />
                <circle cx="290" cy="320" r="1.3" />
              </g>
              <circle cx="660" cy="105" r="320" fill="url(#jupiter-glow)" />
              <path d="M365,150 Q520,230 790,220" fill="none" stroke="#C26433" strokeWidth="18" opacity="0.45" />
              <path d="M395,215 Q540,285 795,275" fill="none" stroke="#F3B878" strokeWidth="12" opacity="0.4" />
              <ellipse cx="640" cy="225" rx="46" ry="24" transform="rotate(-12 640 225)" fill="#B93822" opacity="0.65" />
            </g>

            {renderTurntableRing(390)}

            {/* 360° Rotating Spacecraft Assembly centered at x=400 */}
            <g transform="translate(400, 250)">
              <g transform={spacecraftTransform}>
                <g transform="translate(-450, -250)">
                  {/* Magnetometer long boom extending upper-left */}
                  <line x1="425" y1="225" x2="145" y2="115" stroke="#D9A34A" strokeWidth="3.5" />
                  <line x1="425" y1="232" x2="145" y2="115" stroke="#8C6223" strokeWidth="1.5" />
                  <rect x="132" y="106" width="18" height="12" rx="2" transform="rotate(21 140 112)" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Lower-right RTG truss boom */}
                  <line x1="485" y1="275" x2="575" y2="395" stroke="#D97706" strokeWidth="5" />
                  <line x1="498" y1="268" x2="585" y2="388" stroke="#F59E0B" strokeWidth="3" />
                  <g transform="translate(565, 375) rotate(-35)">
                    <rect x="0" y="0" width="26" height="44" rx="3" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
                    <line x1="-5" y1="8" x2="31" y2="8" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="-5" y1="18" x2="31" y2="18" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="-5" y1="28" x2="31" y2="28" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="-5" y1="38" x2="31" y2="38" stroke="#94A3B8" strokeWidth="2.5" />
                  </g>

                  {/* Upper-right RTG boom */}
                  <line x1="490" y1="215" x2="515" y2="115" stroke="#D97706" strokeWidth="4.5" />
                  <g transform="translate(502, 88) rotate(12)">
                    <rect x="0" y="0" width="24" height="36" rx="3" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
                    <line x1="-4" y1="8" x2="28" y2="8" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="-4" y1="18" x2="28" y2="18" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="-4" y1="28" x2="28" y2="28" stroke="#94A3B8" strokeWidth="2" />
                  </g>

                  {/* Parabolic High-Gain Dish Antenna */}
                  <ellipse
                    cx="450"
                    cy="255"
                    rx="52"
                    ry="112"
                    transform="rotate(-28 450 255)"
                    fill="url(#dish-metal)"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="446"
                    cy="257"
                    rx="36"
                    ry="82"
                    transform="rotate(-28 446 257)"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1"
                    opacity="0.65"
                  />
                  <ellipse
                    cx="442"
                    cy="259"
                    rx="20"
                    ry="48"
                    transform="rotate(-28 442 259)"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  {/* Dish feed struts & Horn */}
                  <line x1="406" y1="180" x2="358" y2="285" stroke="#E2E8F0" strokeWidth="2" />
                  <line x1="488" y1="320" x2="358" y2="285" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="448" y1="255" x2="358" y2="285" stroke="#94A3B8" strokeWidth="1.5" />
                  <polygon points="348,280 370,270 366,296" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />

                  {/* Golden Hexagonal Equipment Compartment & Plaque location */}
                  <polygon
                    points="455,202 518,210 532,264 482,298 435,268"
                    fill="url(#gold-foil)"
                    stroke="#FDE68A"
                    strokeWidth="1.8"
                  />
                  <line x1="455" y1="202" x2="482" y2="248" stroke="#FEF08A" strokeWidth="1" opacity="0.6" />
                  <line x1="518" y1="210" x2="482" y2="248" stroke="#78350F" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="496" cy="248" r="18" fill="#451A03" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="496" cy="248" r="9" fill="#78350F" stroke="#FDE047" strokeWidth="1" />
                  {/* Golden Plaque gleam */}
                  <rect x="464" y="255" width="15" height="11" rx="1.5" fill="#FACC15" stroke="#FEF08A" strokeWidth="1.2" />
                  {isRearView && (
                    <g>
                      <circle cx="482" cy="245" r="24" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
                    </g>
                  )}
                </g>
              </g>
            </g>
          </svg>
        );

      case 'pioneer-11':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Pioneer 11 flying past Saturn's rings">
            <defs>
              <radialGradient id="p11-space" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#0E1525" />
                <stop offset="100%" stopColor="#06080E" />
              </radialGradient>
              <linearGradient id="saturn-rings" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#FCD34D" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#080B12" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#p11-space)" />
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <path d="M0,380 Q260,260 800,120" stroke="url(#saturn-rings)" strokeWidth="140" fill="none" />
              <g transform="translate(220, 155) rotate(-22)">
                <ellipse cx="0" cy="0" rx="135" ry="32" fill="none" stroke="#FCD34D" strokeWidth="10" opacity="0.55" />
                <ellipse cx="0" cy="0" rx="165" ry="40" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.45" />
                <ellipse cx="0" cy="0" rx="182" ry="45" fill="none" stroke="#D2F366" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8" />
                <circle cx="0" cy="0" r="52" fill="#EAB308" opacity="0.85" />
              </g>
            </g>
            {renderTurntableRing(395)}
            <g transform="translate(535, 290)">
              <g transform={spacecraftTransform}>
                <g transform="translate(-535, -290)">
                  <line x1="540" y1="275" x2="390" y2="80" stroke="#94A3B8" strokeWidth="2.5" />
                  <line x1="590" y1="285" x2="690" y2="250" stroke="#F59E0B" strokeWidth="4" />
                  <rect x="682" y="236" width="26" height="22" rx="3" fill="#CBD5E1" stroke="#475569" />
                  <ellipse
                    cx="535"
                    cy="290"
                    rx="68"
                    ry="58"
                    transform="rotate(20 535 290)"
                    fill="#475569"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />
                  <polygon points="545,265 595,275 585,320 535,315" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
                  <polygon points="565,320 582,348 552,345" fill="#DC2626" />
                </g>
              </g>
            </g>
          </svg>
        );

      case 'apollo-lm':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Apollo Lunar Module Descent Stage on the Moon">
            <rect width="800" height="500" fill="#06080D" />
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <circle cx="660" cy="110" r="32" fill="#2563EB" />
              <path d="M645,95 Q665,105 655,125 M670,98 Q680,112 672,122" stroke="#F8FAFC" strokeWidth="4" fill="none" opacity="0.8" />
            </g>
            <path d="M0,340 Q250,315 520,335 T800,330 L800,500 L0,500 Z" fill="#1E242B" />
            <ellipse cx="180" cy="410" rx="75" ry="16" fill="#14181D" stroke="#2E3743" strokeWidth="2" />
            <ellipse cx="640" cy="430" rx="95" ry="20" fill="#14181D" stroke="#2E3743" strokeWidth="2" />
            {renderTurntableRing(395)}
            <g transform="translate(400, 285)">
              <g transform={spacecraftTransform}>
                <polygon points="-28,45 28,45 44,92 -44,92" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
                <rect x="-110" y="-45" width="220" height="90" rx="6" fill="#D97706" stroke="#FDE047" strokeWidth="2.5" />
                <rect x="-70" y="-45" width="140" height="90" fill="#B45309" stroke="#FBBF24" strokeWidth="1.5" />
                <line x1="-110" y1="0" x2="110" y2="0" stroke="#FDE68A" strokeWidth="1" opacity="0.6" />
                <line x1="-110" y1="-15" x2="-195" y2="105" stroke="#CBD5E1" strokeWidth="5" />
                <line x1="-110" y1="25" x2="-195" y2="105" stroke="#94A3B8" strokeWidth="3" />
                <ellipse cx="-198" cy="108" rx="28" ry="8" fill="#D97706" stroke="#FDE047" strokeWidth="2" />

                <line x1="110" y1="-15" x2="195" y2="105" stroke="#CBD5E1" strokeWidth="5" />
                <line x1="110" y1="25" x2="195" y2="105" stroke="#94A3B8" strokeWidth="3" />
                <ellipse cx="198" cy="108" rx="28" ry="8" fill="#D97706" stroke="#FDE047" strokeWidth="2" />

                <line x1="0" y1="-45" x2="0" y2="122" stroke="#E2E8F0" strokeWidth="8" />
                <rect x="-6" y="-20" width="12" height="32" fill="#F8FAFC" stroke="#475569" strokeWidth="1" />
                <line x1="-12" y1="-10" x2="12" y2="-10" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="-12" y1="8" x2="12" y2="8" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="-12" y1="26" x2="12" y2="26" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="-12" y1="44" x2="12" y2="44" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="-12" y1="62" x2="12" y2="62" stroke="#CBD5E1" strokeWidth="2" />
                <ellipse cx="0" cy="124" rx="32" ry="9" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
              </g>
            </g>
          </svg>
        );

      case 'lunar-rover':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Apollo Lunar Roving Vehicle parked on the Moon">
            <rect width="800" height="500" fill="#07090F" />
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <path d="M0,320 L180,210 L360,310 L580,190 L800,310 L800,500 L0,500 Z" fill="#161B22" />
            </g>
            <path d="M0,350 Q400,325 800,355 L800,500 L0,500 Z" fill="#212832" />
            {renderTurntableRing(385)}
            <g transform="translate(400, 310)">
              <g transform={spacecraftTransform}>
                <rect x="-135" y="10" width="270" height="14" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                <path d="M-35,10 L-35,-45 L-5,-45 M25,10 L25,-45 L55,-45" stroke="#CBD5E1" strokeWidth="5" fill="none" />
                <line x1="-5" y1="10" x2="-5" y2="-28" stroke="#D2F366" strokeWidth="3.5" />
                <line x1="-16" y1="-28" x2="6" y2="-28" stroke="#D2F366" strokeWidth="4" />
                <line x1="-90" y1="10" x2="-90" y2="-95" stroke="#CBD5E1" strokeWidth="3" />
                <path d="M-135,-95 Q-90,-60 -45,-95" fill="none" stroke="#D2F366" strokeWidth="2.5" strokeDasharray="4 2" />
                <rect x="-125" y="-32" width="28" height="18" rx="2" fill="#F59E0B" stroke="#FDE047" strokeWidth="1.5" />
                <path d="M-165,30 Q-120,-15 -75,30" fill="none" stroke="#D97706" strokeWidth="6" />
                <path d="M75,30 Q120,-15 165,30" fill="none" stroke="#D97706" strokeWidth="6" />
                <g transform="translate(-120, 48)">
                  <circle cx="0" cy="0" r="46" fill="#0F172A" stroke="#94A3B8" strokeWidth="6" strokeDasharray="8 4" />
                  <circle cx="0" cy="0" r="36" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="14" fill="#E2E8F0" />
                </g>
                <g transform="translate(120, 48)">
                  <circle cx="0" cy="0" r="46" fill="#0F172A" stroke="#94A3B8" strokeWidth="6" strokeDasharray="8 4" />
                  <circle cx="0" cy="0" r="36" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="14" fill="#E2E8F0" />
                </g>
              </g>
            </g>
          </svg>
        );

      case 'alsep':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="ALSEP Scientific Package and Laser Retroreflector on the Moon">
            <rect width="800" height="500" fill="#060911" />
            <line x1="110" y1="0" x2="272" y2="275" stroke="#D2F366" strokeWidth="3" strokeDasharray="8 4" opacity="0.85" />
            <line x1="272" y1="275" x2="135" y2="0" stroke="#38BDF8" strokeWidth="2" opacity="0.7" />
            <path d="M0,330 Q400,310 800,340 L800,500 L0,500 Z" fill="#1C222B" />
            {renderTurntableRing(385)}
            <g transform="translate(400, 300)">
              <g transform={spacecraftTransform}>
                <g transform="translate(-400, -300)">
                  <g transform="translate(270, 285)">
                    <polygon points="-55,40 55,40 40,65 -40,65" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
                    <polygon points="-50,35 35,-15 65,15 -20,55" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
                    <circle cx="-10" cy="22" r="5" fill="#D2F366" />
                    <circle cx="8" cy="12" r="5" fill="#38BDF8" />
                    <circle cx="25" cy="2" r="5" fill="#D2F366" />
                    <circle cx="2" cy="32" r="5" fill="#38BDF8" />
                    <circle cx="20" cy="22" r="5" fill="#D2F366" />
                  </g>
                  <g transform="translate(430, 290)">
                    <rect x="-35" y="-15" width="70" height="55" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="0" y1="-15" x2="0" y2="-95" stroke="#CBD5E1" strokeWidth="3" />
                    <path d="M35,35 Q80,48 115,30" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  </g>
                  <g transform="translate(555, 310)">
                    <ellipse cx="0" cy="22" rx="68" ry="22" fill="#D97706" opacity="0.85" stroke="#FDE047" strokeWidth="1.5" />
                    <rect x="-24" y="-22" width="48" height="42" rx="6" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        );

      case 'surveyor':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Surveyor Robotic Lunar Lander">
            <rect width="800" height="500" fill="#070A10" />
            <path d="M0,335 Q380,310 800,345 L800,500 L0,500 Z" fill="#1F2630" />
            {renderTurntableRing(385)}
            <g transform="translate(390, 250)">
              <g transform={spacecraftTransform}>
                <line x1="0" y1="-120" x2="0" y2="55" stroke="#E2E8F0" strokeWidth="6" />
                <rect x="-75" y="-135" width="150" height="24" transform="rotate(-12)" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="2" />
                <rect x="-22" y="-65" width="24" height="48" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
                <rect x="-65" y="-10" width="55" height="48" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                <rect x="12" y="-10" width="55" height="48" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                <line x1="-55" y1="30" x2="-155" y2="115" stroke="#CBD5E1" strokeWidth="5" />
                <ellipse cx="-160" cy="118" rx="26" ry="9" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <line x1="55" y1="30" x2="155" y2="115" stroke="#CBD5E1" strokeWidth="5" />
                <ellipse cx="160" cy="118" rx="26" ry="9" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <path d="M45,25 L75,45 L95,30 L125,58 L145,78" fill="none" stroke="#F59E0B" strokeWidth="4" />
                <polygon points="140,72 162,76 150,92" fill="#D2F366" />
                <ellipse cx="155" cy="98" rx="35" ry="7" fill="#0F1318" stroke="#475569" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        );

      case 'sojourner':
      case 'opportunity':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Mars Rover on the rusty Martian plains">
            <defs>
              <linearGradient id="mars-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1318" />
                <stop offset="65%" stopColor="#45211E" />
                <stop offset="100%" stopColor="#7C3425" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#mars-sky)" />
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <path d="M0,295 L220,245 L460,285 L680,235 L800,275 L800,500 L0,500 Z" fill="#5B261B" />
            </g>
            <path d="M0,335 Q420,315 800,340 L800,500 L0,500 Z" fill="#3E1912" />
            <polygon points="560,335 615,295 660,342 645,365 555,365" fill="#27120E" stroke="#7C3425" strokeWidth="2" />
            {renderTurntableRing(385)}
            <g transform="translate(380, 290)">
              <g transform={spacecraftTransform}>
                {mission.illustrationType === 'opportunity' && (
                  <>
                    <line x1="15" y1="-25" x2="15" y2="-155" stroke="#E2E8F0" strokeWidth="6" />
                    <rect x="-12" y="-172" width="54" height="22" rx="4" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
                    <circle cx="0" cy="-161" r="5" fill="#0EA5E9" />
                    <circle cx="30" cy="-161" r="5" fill="#0EA5E9" />
                    <path d="M-85,10 L-145,25 L-135,62" fill="none" stroke="#CBD5E1" strokeWidth="5" />
                    <circle cx="-135" cy="65" r="12" fill="#D2F366" stroke="#1E293B" strokeWidth="2" />
                  </>
                )}
                <polygon points="-115,-28 115,-28 135,-10 -95,-10" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
                <rect x="-85" y="-10" width="170" height="44" rx="4" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
                {mission.illustrationType === 'sojourner' && (
                  <g>
                    <line x1="85" y1="15" x2="155" y2="35" stroke="#CBD5E1" strokeWidth="4" />
                    <rect x="150" y="24" width="24" height="24" rx="4" fill="#D2F366" stroke="#1E293B" strokeWidth="2" />
                  </g>
                )}
                <path d="M-90,55 L-45,20 L0,55 M0,55 L45,25 L95,55" fill="none" stroke="#E2E8F0" strokeWidth="5" />
                {[-90, 0, 95].map((wx, idx) => (
                  <g key={idx} transform={`translate(${wx}, 58)`}>
                    <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#CBD5E1" strokeWidth="5" strokeDasharray="6 3" />
                    <circle cx="0" cy="0" r="10" fill="#94A3B8" />
                  </g>
                ))}
              </g>
            </g>
          </svg>
        );

      case 'viking':
      case 'insight-phoenix':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Mars Stationary Lander">
            <rect width="800" height="500" fill="#1A1014" />
            <path d="M0,330 Q400,305 800,335 L800,500 L0,500 Z" fill="#4A2018" />
            {renderTurntableRing(385)}
            <g transform="translate(400, 265)">
              <g transform={spacecraftTransform}>
                {mission.illustrationType === 'insight-phoenix' && (
                  <>
                    <path d="M-175,115 Q-130,55 -85,115 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
                    <rect x="-138" y="63" width="16" height="10" fill="#D97706" />
                    <ellipse cx="165" cy="110" rx="48" ry="14" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
                  </>
                )}
                {mission.illustrationType === 'insight-phoenix' ? (
                  <>
                    <ellipse cx="-155" cy="0" rx="62" ry="24" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
                    <ellipse cx="155" cy="0" rx="62" ry="24" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
                  </>
                ) : (
                  <>
                    <ellipse cx="35" cy="-75" rx="45" ry="22" transform="rotate(-20 35 -75)" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="-85" y1="0" x2="-175" y2="-45" stroke="#CBD5E1" strokeWidth="4" />
                    <circle cx="-178" cy="-48" r="10" fill="#D2F366" />
                  </>
                )}
                <rect x="-90" y="-25" width="180" height="52" rx="6" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <path d="M60,0 L125,-35 L155,65" fill="none" stroke="#F59E0B" strokeWidth="5" />
                <line x1="-75" y1="27" x2="-130" y2="105" stroke="#CBD5E1" strokeWidth="6" />
                <line x1="75" y1="27" x2="130" y2="105" stroke="#CBD5E1" strokeWidth="6" />
              </g>
            </g>
          </svg>
        );

      case 'ingenuity':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Ingenuity Mars Helicopter in Jezero Crater">
            <rect width="800" height="500" fill="#181218" />
            <path d="M0,340 Q220,305 450,345 T800,320 L800,500 L0,500 Z" fill="#52281D" />
            {renderTurntableRing(390)}
            <g transform="translate(400, 240)">
              <g transform={spacecraftTransform}>
                <rect x="-58" y="-118" width="116" height="14" rx="2" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
                <line x1="0" y1="-104" x2="0" y2="-15" stroke="#CBD5E1" strokeWidth="8" />
                <ellipse cx="0" cy="-82" rx="165" ry="10" fill="#334155" stroke="#D2F366" strokeWidth="2" />
                <ellipse cx="0" cy="-58" rx="165" ry="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
                <rect x="-42" y="-15" width="84" height="76" rx="6" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
                <circle cx="0" cy="62" r="10" fill="#0EA5E9" stroke="#F8FAFC" strokeWidth="2" />
                <line x1="-35" y1="45" x2="-115" y2="135" stroke="#E2E8F0" strokeWidth="3.5" />
                <line x1="35" y1="45" x2="115" y2="135" stroke="#E2E8F0" strokeWidth="3.5" />
                <line x1="-20" y1="55" x2="-75" y2="145" stroke="#94A3B8" strokeWidth="3" />
                <line x1="20" y1="55" x2="75" y2="145" stroke="#94A3B8" strokeWidth="3" />
              </g>
            </g>
          </svg>
        );

      case 'dawn':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Dawn Spacecraft orbiting Ceres">
            <rect width="800" height="500" fill="#060911" />
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <circle cx="620" cy="360" r="190" fill="#27303F" stroke="#475569" strokeWidth="2" />
              <ellipse cx="560" cy="290" rx="28" ry="16" fill="#1E2530" stroke="#64748B" strokeWidth="1.5" />
              <circle cx="558" cy="290" r="5" fill="#F8FAFC" />
              <circle cx="568" cy="288" r="3" fill="#38BDF8" />
            </g>
            {renderTurntableRing(395)}
            <g transform="translate(380, 215)">
              <g transform={spacecraftTransform}>
                <g transform="rotate(-14)">
                  <rect x="-280" y="-28" width="215" height="56" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="2" />
                  <rect x="65" y="-28" width="215" height="56" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="2" />
                  <rect x="-45" y="-42" width="90" height="84" rx="4" fill="#334155" stroke="#CBD5E1" strokeWidth="2" />
                  <ellipse cx="0" cy="-12" rx="48" ry="26" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                  <polygon points="-18,42 18,42 48,165 -48,165" fill="#38BDF8" opacity="0.45" />
                  <circle cx="0" cy="46" r="12" fill="#D2F366" />
                </g>
              </g>
            </g>
          </svg>
        );

      case 'near-shoemaker':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="NEAR Shoemaker resting on Asteroid 433 Eros">
            <rect width="800" height="500" fill="#07090F" />
            <path d="M40,360 Q220,270 410,335 Q590,390 760,295 L800,500 L0,500 Z" fill="#2A2826" stroke="#57534E" strokeWidth="2" />
            {renderTurntableRing(385)}
            <g transform="translate(390, 255)">
              <g transform={spacecraftTransform}>
                <g transform="rotate(12)">
                  <rect x="-155" y="-25" width="95" height="50" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
                  <rect x="60" y="-25" width="95" height="50" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
                  <rect x="-25" y="-125" width="50" height="75" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
                  <rect x="-50" y="-45" width="100" height="90" rx="8" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
                  <ellipse cx="0" cy="-50" rx="46" ry="18" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                </g>
              </g>
            </g>
          </svg>
        );

      case 'kepler':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Kepler Space Telescope in heliocentric orbit">
            <rect width="800" height="500" fill="#060810" />
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <circle cx="210" cy="145" r="48" fill="#FDE047" opacity="0.85" />
              <circle cx="198" cy="148" r="11" fill="#060810" stroke="#F59E0B" strokeWidth="1.5" />
            </g>
            {renderTurntableRing(395)}
            <g transform="translate(430, 250)">
              <g transform={spacecraftTransform}>
                <g transform="rotate(-25)">
                  <polygon points="-55,-125 55,-125 65,45 -65,45" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
                  <ellipse cx="0" cy="-125" rx="55" ry="18" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
                  <rect x="-72" y="45" width="144" height="55" rx="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
                </g>
              </g>
            </g>
          </svg>
        );

      case 'voyager-1':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" aria-label="Voyager 1 Interstellar Probe crossing the Heliopause with the Golden Record">
            <defs>
              <radialGradient id="v1-interstellar" cx="75%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#090D16" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#05070B" />
              </radialGradient>
            </defs>
            <rect width="800" height="500" fill="url(#v1-interstellar)" />
            {/* Pale Blue Dot sunbeam */}
            <g transform={`translate(${parallaxBgX}, 0)`}>
              <polygon points="580,0 640,0 740,500 490,500" fill="#38BDF8" opacity="0.08" />
              <circle cx="615" cy="185" r="4.5" fill="#60A5FA" />
              <circle cx="615" cy="185" r="11" fill="none" stroke="#93C5FD" strokeWidth="1" opacity="0.6" />
              <path d="M 140,420 Q 410,120 760,90" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
            </g>
            {renderTurntableRing(395)}
            <g transform="translate(390, 245)">
              <g transform={spacecraftTransform}>
                <g transform="rotate(-18)">
                  {/* 13m Magnetometer Boom */}
                  <line x1="-45" y1="-20" x2="-240" y2="-135" stroke="#F59E0B" strokeWidth="4" />
                  {/* Lower 3 MHW-RTG Nuclear Boom */}
                  <line x1="-30" y1="30" x2="-155" y2="135" stroke="#94A3B8" strokeWidth="5" />
                  <rect x="-165" y="110" width="52" height="22" rx="4" transform="rotate(-38 -140 120)" fill="#1E293B" stroke="#F97316" strokeWidth="2" />
                  {/* Right Science Scan Platform Boom */}
                  <line x1="55" y1="-15" x2="195" y2="-65" stroke="#CBD5E1" strokeWidth="5" />
                  <rect x="185" y="-85" width="38" height="28" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                  {/* Decagonal Bus + 12-inch Gold Record */}
                  <rect x="-58" y="-22" width="116" height="58" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="-38" cy="8" r="18" fill="#FACC15" stroke="#FEF08A" strokeWidth="2.5" />
                  <circle cx="-38" cy="8" r="5" fill="#A16207" />
                  {/* Giant 3.7m White High-Gain Parabolic Dish */}
                  <ellipse cx="18" cy="-38" rx="115" ry="44" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
                  <ellipse cx="18" cy="-38" rx="82" ry="28" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 4" />
                  <line x1="-25" y1="-38" x2="18" y2="-88" stroke="#64748B" strokeWidth="3" />
                  <line x1="62" y1="-38" x2="18" y2="-88" stroke="#64748B" strokeWidth="3" />
                  <circle cx="18" cy="-90" r="8" fill="#D2F366" />
                </g>
              </g>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex flex-col overflow-hidden bg-[#060911] select-none ${className}`}>
      {/* Zoomable & 360°-Draggable 3D WebGL or High-Detail Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`relative flex-1 w-full h-full overflow-hidden ${
          interactive ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
        }`}
      >
        {useWebGL3D ? (
          <div className="relative w-full h-full">
            <Spacecraft3DStage
              mission={mission}
              yawDeg={yawDeg}
              pitchDeg={pitchDeg}
              zoom={zoom}
              onProjectedHotspotsChange={setProjected3DCoords}
            />

            {/* Interactive Numbered Hotspots Projected in True 3D Space */}
            {interactive &&
              mission.hotspots.map((hotspot) => {
                const isSelected = activeHotspotId === hotspot.id;
                const isVisited = investigatedIds.includes(hotspot.id);
                const projected =
                  projected3DCoords[hotspot.id] || projectHotspot360(hotspot.x, hotspot.y, yawDeg);

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => onSelectHotspot?.(hotspot)}
                    style={{
                      left: `${projected.x}%`,
                      top: `${projected.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    aria-label={`Investigate ${hotspot.number}: ${hotspot.label}`}
                    className={`group absolute z-20 flex items-center justify-center w-11 h-11 rounded-full font-mono text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2F366] cursor-pointer ${
                      isSelected
                        ? 'bg-[#F4F7FA] text-[#090C10] ring-4 ring-[#D2F366]/70 shadow-lg'
                        : isVisited
                          ? 'bg-[#D2F366] text-[#090C10] ring-2 ring-[#090C10]'
                          : 'bg-[#D2F366] text-[#090C10] shadow-[0_0_24px_rgba(210,243,102,0.6)]'
                    }`}
                  >
                    <span>{hotspot.number}</span>
                    <span className="pointer-events-none absolute left-1/2 -top-9 -translate-x-1/2 whitespace-nowrap rounded bg-[#090C10] border border-[#222D3A] px-2.5 py-1 text-[11px] font-sans font-medium text-[#F4F7FA] opacity-0 group-hover:opacity-100 transition-opacity">
                      {hotspot.label}
                    </span>
                  </button>
                );
              })}
          </div>
        ) : (
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              transformOrigin: 'center center'
            }}
            className="relative w-full h-full transition-transform duration-100 ease-out"
          >
            {renderArtwork()}
          </div>
        )}

        {/* Subtle atmospheric vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090C10]/70 via-transparent to-[#090C10]/25" />

        {/* Top-left & Top-right HUD Telemetry Badges when interactive (No backdrop-blur over WebGL) */}
        {interactive && (
          <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="rounded-md bg-[#090C10]/90 border border-[#222D3A] px-3 py-1.5 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-[#D2F366]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#D2F366]">
                3D INTERACTIVE MODEL · DRAG 360° OR CLICK A NUMBER
              </span>
            </div>

            <div className="rounded-md bg-[#090C10]/90 border border-[#222D3A] px-3 py-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#9BA8B8] tabular-nums">
              <Compass className="w-3.5 h-3.5 text-[#D2F366]" />
              <span>{getCameraOrientationLabel(yawDeg)}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#D2F366]">{Math.round(zoom * 100)}% ZOOM</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive 360° Turntable & Zoom Control Deck (when interactive) */}
      {interactive && (
        <div className="bg-[#0D131B] border-t border-[#1E2936] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 z-20">
          {/* Left: 360° Rotation Slider & Preset Angles */}
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <button
              type="button"
              onClick={() => setIsAutoOrbiting((prev) => !prev)}
              aria-label={isAutoOrbiting ? 'Pause 360 rotation' : 'Auto-rotate 360 view'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                isAutoOrbiting
                  ? 'bg-[#D2F366] text-[#090C10] border-[#D2F366]'
                  : 'bg-[#151F2B] text-[#F4F7FA] border-[#263547] hover:border-[#D2F366]'
              }`}
            >
              {isAutoOrbiting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>360° Orbit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAutoOrbiting(false);
                setYawDeg((prev) => normalizeAngle360(prev - 45));
              }}
              aria-label="Rotate left 45 degrees"
              className="p-1.5 rounded-lg bg-[#151F2B] border border-[#263547] text-[#9BA8B8] hover:text-[#F4F7FA] hover:border-[#D2F366] cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-[90px]">
              <input
                type="range"
                aria-label="360 degree spacecraft rotation angle"
                min={0}
                max={359}
                step={1}
                value={yawDeg}
                onChange={(e) => {
                  setIsAutoOrbiting(false);
                  setYawDeg(Number(e.target.value));
                }}
                className="w-full accent-[#D2F366] cursor-pointer"
              />
              <span className="font-mono text-xs text-[#D2F366] w-9 text-right tabular-nums shrink-0">
                {yawDeg}°
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAutoOrbiting(false);
                setYawDeg((prev) => normalizeAngle360(prev + 45));
              }}
              aria-label="Rotate right 45 degrees"
              className="p-1.5 rounded-lg bg-[#151F2B] border border-[#263547] text-[#9BA8B8] hover:text-[#F4F7FA] hover:border-[#D2F366] cursor-pointer shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Zoom In / Zoom Out / Reset View Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.75}
              aria-label="Zoom out spacecraft view"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#151F2B] border border-[#263547] text-xs font-mono text-[#F4F7FA] hover:border-[#D2F366] disabled:opacity-40 cursor-pointer whitespace-nowrap"
            >
              <ZoomOut className="w-3.5 h-3.5 text-[#D2F366]" />
              <span>Zoom -</span>
            </button>

            <span className="font-mono text-xs text-[#9BA8B8] px-1 tabular-nums">
              {Math.round(zoom * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3.0}
              aria-label="Zoom in spacecraft view"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#151F2B] border border-[#263547] text-xs font-mono text-[#F4F7FA] hover:border-[#D2F366] disabled:opacity-40 cursor-pointer whitespace-nowrap"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#D2F366]" />
              <span>Zoom +</span>
            </button>

            {(yawDeg !== 0 || zoom !== 1) && (
              <button
                type="button"
                onClick={handleResetView}
                aria-label="Reset 360 angle and zoom"
                className="px-2.5 py-1.5 rounded-lg bg-[#1C2836] text-xs font-mono text-[#D2F366] hover:bg-[#253547] cursor-pointer whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
