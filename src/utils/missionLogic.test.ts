import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterMissions,
  evaluateQuizSubmission,
  getExplorerRank,
  calculateOneWayLightMinutes,
  normalizeAngle360,
  clampZoom,
  projectHotspot360,
  getCameraOrientationLabel,
  INITIAL_PROGRESS
} from './missionLogic';
import { SENTINEL_MISSIONS, SENTINEL_FUN_FACTS } from '../data/sentinelsData';

test('filterMissions filters accurately by celestial region', () => {
  const moonMissions = filterMissions(SENTINEL_MISSIONS, 'moon', '');
  const marsMissions = filterMissions(SENTINEL_MISSIONS, 'mars', '');
  const deepSpaceMissions = filterMissions(SENTINEL_MISSIONS, 'deep-space', '');

  assert.equal(SENTINEL_MISSIONS.length, 15);
  assert.equal(moonMissions.length, 4); // Apollo LM, LRVs, ALSEP, Surveyor
  assert.equal(marsMissions.length, 5); // Sojourner, Spirit/Opportunity, Viking, Phoenix/InSight, Ingenuity
  assert.equal(deepSpaceMissions.length, 6); // Pioneer 10, Pioneer 11, Dawn, NEAR Shoemaker, Kepler, Voyager 1
});

test('filterMissions searches by NSSDCA ID and laboratory name including Voyager 1', () => {
  const jplMissions = filterMissions(SENTINEL_MISSIONS, 'all', 'Jet Propulsion Laboratory');
  assert.ok(jplMissions.length >= 5);

  const pioneer10 = filterMissions(SENTINEL_MISSIONS, 'all', '1972-012A');
  assert.equal(pioneer10.length, 1);
  assert.equal(pioneer10[0].id, 'pioneer-10');

  const voyager1 = filterMissions(SENTINEL_MISSIONS, 'all', '1977-084A');
  assert.equal(voyager1.length, 1);
  assert.equal(voyager1[0].id, 'voyager-1');
  assert.equal(voyager1[0].name, 'Voyager 1');
});

test('every space vehicle has unique floating hardware fun facts', () => {
  const seenTitles = new Set<string>();
  const seenSpeakers = new Set<string>();

  for (const mission of SENTINEL_MISSIONS) {
    const pack = SENTINEL_FUN_FACTS[mission.id];
    assert.ok(pack, `Missing fun fact pack for ${mission.id}`);
    assert.ok(pack.facts.length >= 3, `Expected at least 3 fun facts for ${mission.id}`);
    assert.equal(seenSpeakers.has(pack.hardwareSpeakerName), false, `Duplicate speaker for ${mission.id}`);
    seenSpeakers.add(pack.hardwareSpeakerName);

    for (const f of pack.facts) {
      assert.ok(f.title && f.title.length > 0);
      assert.equal(seenTitles.has(f.title), false, `Duplicate fun fact title: ${f.title}`);
      seenTitles.add(f.title);
    }
  }
});

test('evaluateQuizSubmission scores answers and unlocks mission badge when passed', () => {
  const pioneer10 = SENTINEL_MISSIONS.find((m) => m.id === 'pioneer-10')!;
  const allCorrect: Record<string, number> = {};
  for (const q of pioneer10.quiz) {
    allCorrect[q.id] = q.correctIndex;
  }

  const result = evaluateQuizSubmission(pioneer10, allCorrect);
  assert.equal(result.percentage, 100);
  assert.equal(result.passed, true);
  assert.equal(result.badgeUnlocked, 'badge-pioneer-10');

  const allWrong: Record<string, number> = {};
  for (const q of pioneer10.quiz) {
    allWrong[q.id] = (q.correctIndex + 1) % q.options.length;
  }
  const failResult = evaluateQuizSubmission(pioneer10, allWrong);
  assert.equal(failResult.percentage, 0);
  assert.equal(failResult.passed, false);
  assert.equal(failResult.badgeUnlocked, null);
});

test('getExplorerRank progresses rank titles and points accurately', () => {
  const initialRank = getExplorerRank(INITIAL_PROGRESS);
  assert.equal(initialRank.rankTitle, 'Cadet Space Observer');
  assert.equal(initialRank.totalPoints, 0);

  const midProgress = {
    ...INITIAL_PROGRESS,
    unlockedBadges: ['badge-pioneer-10', 'badge-pioneer-11', 'badge-apollo-lm', 'badge-ingenuity'],
    investigatedHotspots: ['p10-antenna', 'p10-rtg'],
    solvedMysteries: ['pioneer-10']
  };
  const specialistRank = getExplorerRank(midProgress);
  assert.equal(specialistRank.rankTitle, 'Planetary Hardware Specialist');
  assert.equal(specialistRank.totalPoints, 4 * 100 + 2 * 15 + 1 * 50);
});

test('calculateOneWayLightMinutes computes accurate radio signal travel time', () => {
  // At 1 AU (Sun to Earth), light takes ~8.3 minutes
  assert.equal(calculateOneWayLightMinutes(1), 8.3);
  // At 80 AU (Pioneer 10 final signal distance), light takes ~665.3 minutes (~11.1 hours)
  assert.equal(calculateOneWayLightMinutes(80), 665.3);
});

test('360-degree turntable angle, zoom clamping, and hotspot projection work accurately', () => {
  assert.equal(normalizeAngle360(370), 10);
  assert.equal(normalizeAngle360(-45), 315);
  assert.equal(clampZoom(4.5), 3.0);
  assert.equal(clampZoom(0.2), 0.75);
  assert.equal(clampZoom(1.5), 1.5);

  const frontProj = projectHotspot360(70, 50, 0);
  const rearProj = projectHotspot360(70, 50, 180);
  assert.equal(frontProj.x, 70);
  assert.equal(rearProj.x, 30); // Mirrored to opposite side at 180° rotation
  assert.equal(rearProj.isRearFacing, true);
  assert.equal(getCameraOrientationLabel(180), 'REAR / PROPULSION VIEW (180°)');
});

test('Supabase password hashing and unique badge merging work deterministically', async () => {
  const { hashUserPassword, mergeExplorerProgress } = await import('../services/supabaseClient');

  const h1 = await hashUserPassword('Apollo_Explorer', 'moon1969');
  const h2 = await hashUserPassword('  apollo_explorer ', 'moon1969');
  const hDifferent = await hashUserPassword('Apollo_Explorer', 'mars1997');

  assert.equal(h1, h2);
  assert.notEqual(h1, hDifferent);

  const merged = mergeExplorerProgress(
    {
      ...INITIAL_PROGRESS,
      unlockedBadges: ['badge-pioneer-10', 'badge-apollo-lm']
    },
    {
      unlocked_badges: ['badge-apollo-lm', 'badge-ingenuity'],
      completed_quizzes: { 'pioneer-10': 100 }
    }
  );

  assert.deepEqual(merged.unlockedBadges, [
    'badge-pioneer-10',
    'badge-apollo-lm',
    'badge-ingenuity'
  ]);
  assert.equal(merged.completedQuizzes['pioneer-10'], 100);
});

test('every space vehicle has an Official NASA Dossier and expanded unique quiz questions', async () => {
  const { NASA_OFFICIAL_DOSSIERS } = await import('../data/nasaOfficialContent');
  const seenQuizIds = new Set<string>();
  const seenBadgeIds = new Set<string>();

  for (const mission of SENTINEL_MISSIONS) {
    const dossier = NASA_OFFICIAL_DOSSIERS[mission.id];
    assert.ok(dossier, `Missing NASA_OFFICIAL_DOSSIERS entry for ${mission.id}`);
    assert.ok(dossier.quickFacts.length >= 4, `Expected at least 4 quickFacts for ${mission.id}`);
    assert.ok(dossier.inDepthSections.length >= 2, `Expected at least 2 inDepthSections for ${mission.id}`);
    assert.ok(dossier.keyDates.length >= 3, `Expected at least 3 keyDates for ${mission.id}`);
    assert.ok(mission.quiz.length >= 4, `Expected at least 4 quiz questions for ${mission.id}`);

    assert.equal(seenBadgeIds.has(mission.badge.id), false, `Duplicate badge ID: ${mission.badge.id}`);
    seenBadgeIds.add(mission.badge.id);

    for (const q of mission.quiz) {
      assert.equal(seenQuizIds.has(q.id), false, `Duplicate quiz question ID: ${q.id}`);
      seenQuizIds.add(q.id);
    }
  }
});

test('every space vehicle has an authentic card photograph and 4–5 gallery photographs in MISSION_PHOTOGRAPHY_ARCHIVE', async () => {
  const { MISSION_PHOTOGRAPHY_ARCHIVE } = await import('../data/missionPhotographyData');
  const seenPhotoIds = new Set<string>();

  for (const mission of SENTINEL_MISSIONS) {
    const record = MISSION_PHOTOGRAPHY_ARCHIVE[mission.id];
    assert.ok(record, `Missing MISSION_PHOTOGRAPHY_ARCHIVE entry for ${mission.id}`);
    assert.ok(record.cardPhoto, `Missing cardPhoto for ${mission.id}`);
    assert.ok(record.cardPhoto.imageUrl.length > 0, `Empty cardPhoto imageUrl for ${mission.id}`);
    assert.ok(record.cardPhoto.caption.length > 20, `Short cardPhoto caption for ${mission.id}`);
    assert.ok(record.cardPhoto.nasaArchiveId.length > 0, `Missing nasaArchiveId on cardPhoto for ${mission.id}`);

    assert.ok(
      record.galleryPhotos.length >= 4 && record.galleryPhotos.length <= 5,
      `Expected 4-5 galleryPhotos for ${mission.id}, got ${record.galleryPhotos.length}`
    );

    for (const photo of record.galleryPhotos) {
      assert.equal(seenPhotoIds.has(photo.id), false, `Duplicate gallery photo ID: ${photo.id}`);
      seenPhotoIds.add(photo.id);
      assert.equal(photo.missionId, mission.id);
      assert.ok(photo.imageUrl.length > 0);
      assert.ok(photo.caption.length > 20);
      assert.ok(photo.credit.length > 0);
      assert.ok(photo.sourceArchiveUrl.startsWith('https://'));
    }
  }
});

test('every space vehicle has hardware component cards and website tech cards in howItsBuiltData', async () => {
  const { SPACECRAFT_HARDWARE_COMPONENTS, WEBSITE_TECH_STACK_COMPONENTS } = await import(
    '../data/howItsBuiltData'
  );

  assert.ok(WEBSITE_TECH_STACK_COMPONENTS.length >= 6);
  for (const tech of WEBSITE_TECH_STACK_COMPONENTS) {
    assert.ok(tech.name.length > 0);
    assert.ok(tech.oneLineExplanation.length > 15);
  }

  for (const mission of SENTINEL_MISSIONS) {
    const blueprint = SPACECRAFT_HARDWARE_COMPONENTS[mission.id];
    assert.ok(blueprint, `Missing SPACECRAFT_HARDWARE_COMPONENTS entry for ${mission.id}`);
    assert.ok(
      blueprint.components.length >= 6,
      `Expected at least 6 hardware components for ${mission.id}`
    );
    for (const comp of blueprint.components) {
      assert.ok(comp.name.length > 0);
      assert.ok(comp.oneLineExplanation.length > 15);
    }
  }
});

