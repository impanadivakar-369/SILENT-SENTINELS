import { CelestialRegion, SentinelMission, SENTINEL_MISSIONS } from '../data/sentinelsData';

export type RegionFilter = 'all' | CelestialRegion;

export interface ExplorerProgress {
  unlockedBadges: string[]; // badge IDs
  solvedMysteries: string[]; // mission IDs
  investigatedHotspots: string[]; // hotspot IDs
  decodedPlaqueHotspots: string[]; // plaque hotspot IDs
  completedQuizzes: Record<string, number>; // missionId -> score percentage
}

export const INITIAL_PROGRESS: ExplorerProgress = {
  unlockedBadges: [],
  solvedMysteries: [],
  investigatedHotspots: [],
  decodedPlaqueHotspots: [],
  completedQuizzes: {}
};

export function filterMissions(
  missions: SentinelMission[],
  region: RegionFilter,
  searchQuery: string
): SentinelMission[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return missions.filter((mission) => {
    const matchesRegion = region === 'all' || mission.region === region;
    if (!matchesRegion) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      mission.name,
      mission.nssdcaId,
      mission.builtBy,
      mission.builtLocation,
      mission.restingPlace,
      mission.tagline,
      mission.cardSummary,
      mission.regionLabel
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function evaluateQuizSubmission(
  mission: SentinelMission,
  selectedAnswers: Record<string, number>
): {
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  badgeUnlocked: string | null;
} {
  const totalQuestions = mission.quiz.length;
  if (totalQuestions === 0) {
    return {
      correctCount: 0,
      totalQuestions: 0,
      percentage: 100,
      passed: true,
      badgeUnlocked: mission.badge.id
    };
  }

  let correctCount = 0;
  for (const q of mission.quiz) {
    if (selectedAnswers[q.id] === q.correctIndex) {
      correctCount += 1;
    }
  }

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  // Students pass and earn the badge if they get at least 50% or all questions right
  const passed = percentage >= 50;

  return {
    correctCount,
    totalQuestions,
    percentage,
    passed,
    badgeUnlocked: passed ? mission.badge.id : null
  };
}

export function getExplorerRank(progress: ExplorerProgress): {
  rankTitle: string;
  nextRankTitle: string | null;
  totalPoints: number;
  badgesCount: number;
  totalAvailableBadges: number;
} {
  const badgesCount = progress.unlockedBadges.length;
  const totalAvailableBadges = SENTINEL_MISSIONS.length; // 15 official mission badges
  const totalPoints =
    badgesCount * 100 +
    progress.investigatedHotspots.length * 15 +
    progress.solvedMysteries.length * 50;

  if (badgesCount >= 12) {
    return {
      rankTitle: 'Chief NSSDCA Archivist',
      nextRankTitle: null,
      totalPoints,
      badgesCount,
      totalAvailableBadges
    };
  }
  if (badgesCount >= 8) {
    return {
      rankTitle: 'Deep-Space Mission Director',
      nextRankTitle: 'Chief NSSDCA Archivist (12+ badges)',
      totalPoints,
      badgesCount,
      totalAvailableBadges
    };
  }
  if (badgesCount >= 4) {
    return {
      rankTitle: 'Planetary Hardware Specialist',
      nextRankTitle: 'Deep-Space Mission Director (8+ badges)',
      totalPoints,
      badgesCount,
      totalAvailableBadges
    };
  }
  if (badgesCount >= 1) {
    return {
      rankTitle: 'Junior Telemetry Engineer',
      nextRankTitle: 'Planetary Hardware Specialist (4+ badges)',
      totalPoints,
      badgesCount,
      totalAvailableBadges
    };
  }
  return {
    rankTitle: 'Cadet Space Observer',
    nextRankTitle: 'Junior Telemetry Engineer (1+ badge)',
    totalPoints,
    badgesCount,
    totalAvailableBadges
  };
}

/**
 * Calculates one-way radio light-time delay in minutes given distance in Astronomical Units (AU).
 * 1 AU = 149,597,870.7 km, speed of light c = 299,792.458 km/s (~8.3167 minutes per AU).
 */
export function calculateOneWayLightMinutes(distanceAu: number): number {
  if (distanceAu <= 0) return 0;
  const minutesPerAu = 149597870.7 / (299792.458 * 60);
  return Number((distanceAu * minutesPerAu).toFixed(1));
}

/**
 * Normalizes any degree angle into the [0, 360) range for the 360° spacecraft inspector.
 */
export function normalizeAngle360(angleDeg: number): number {
  const mod = angleDeg % 360;
  return mod < 0 ? Math.round(mod + 360) : Math.round(mod === 0 ? 0 : mod);
}

/**
 * Clamps zoom level between minZoom (0.75x) and maxZoom (3.0x).
 */
export function clampZoom(zoom: number, minZoom = 0.75, maxZoom = 3.0): number {
  const clamped = Math.min(maxZoom, Math.max(minZoom, zoom));
  return Number(clamped.toFixed(2));
}

/**
 * Projects a 2D hotspot percentage coordinate (x, y) around the vertical central axis (x=50%)
 * as the spacecraft rotates by yawDeg (0° to 360°), returning projected x, y, and depth scale.
 */
export function projectHotspot360(
  xPercent: number,
  yPercent: number,
  yawDeg: number
): { x: number; y: number; depth: number; isRearFacing: boolean } {
  const rad = (yawDeg * Math.PI) / 180;
  const dx = xPercent - 50;
  // Assume a subtle z-offset based on vertical position so center hotspots also orbit slightly
  const dz = (yPercent - 50) * 0.35;

  const rotatedX = dx * Math.cos(rad) + dz * Math.sin(rad);
  const rotatedZ = -dx * Math.sin(rad) + dz * Math.cos(rad);

  const projectedX = Math.min(92, Math.max(8, Number((50 + rotatedX).toFixed(1))));
  const projectedY = Math.min(90, Math.max(12, Number((yPercent + rotatedZ * 0.12).toFixed(1))));
  const depth = Number((1 + rotatedZ / 150).toFixed(2));

  return {
    x: projectedX,
    y: projectedY,
    depth,
    isRearFacing: Math.cos(rad) < -0.2
  };
}

/**
 * Returns a descriptive engineering camera view label for a given 360° azimuth angle.
 */
export function getCameraOrientationLabel(yawDeg: number): string {
  const norm = normalizeAngle360(yawDeg);
  if (norm >= 315 || norm < 45) return 'FRONT / PRIMARY DECK (0°)';
  if (norm >= 45 && norm < 135) return 'STARBOARD PROFILE (90°)';
  if (norm >= 135 && norm < 225) return 'REAR / PROPULSION VIEW (180°)';
  return 'PORT PROFILE (270°)';
}

