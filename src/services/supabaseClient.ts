import { createClient } from '@supabase/supabase-js';
import { ExplorerProgress, INITIAL_PROGRESS } from '../utils/missionLogic';

export const SUPABASE_PROJECT_ID = 'iogidnwjuqyumcqkhuqa';
export const SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://iogidnwjuqyumcqkhuqa.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  'sb_publishable_5-qQBeApfsvviPSAyiiYSQ__JrptWO4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export interface SentinelUserProfile {
  id?: string;
  username: string;
  badges_count: number;
  unlocked_badges: string[];
  investigated_hotspots: string[];
  decoded_plaque_hotspots: string[];
  solved_mysteries: string[];
  completed_quizzes: Record<string, number>;
  explorer_rank: string;
  syncedWithCloud: boolean;
  cloudStatusMessage?: string;
}

/**
 * Exact SQL Script for the user to copy-paste into the Supabase SQL Editor
 * (Project ID: iogidnwjuqyumcqkhuqa)
 */
export const SUPABASE_SQL_SETUP_SCRIPT = `-- ============================================================================
-- SILENT SENTINELS — COMPLETE SUPABASE DATABASE SCHEMA
-- Project ID: iogidnwjuqyumcqkhuqa
-- URL: https://iogidnwjuqyumcqkhuqa.supabase.co
-- Copy and paste this entire script into your Supabase SQL Editor and click RUN
-- ============================================================================

-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- 1. Create the primary explorer accounts & progress table
create table if not exists public.sentinel_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  badges_count integer not null default 0,
  unlocked_badges text[] not null default '{}',
  investigated_hotspots text[] not null default '{}',
  decoded_plaque_hotspots text[] not null default '{}',
  solved_mysteries text[] not null default '{}',
  completed_quizzes jsonb not null default '{}'::jsonb,
  explorer_rank text not null default 'Cadet Space Observer',
  last_login_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_min_length check (char_length(trim(username)) >= 2),
  constraint badges_count_non_negative check (badges_count >= 0)
);

-- 2. Fast case-insensitive unique index on username
create unique index if not exists sentinel_users_username_lower_idx
  on public.sentinel_users (lower(trim(username)));

create index if not exists sentinel_users_badges_count_idx
  on public.sentinel_users (badges_count desc);

-- 3. Automatic synchronization trigger for badges_count and updated_at
create or replace function public.sync_sentinel_user_badges()
returns trigger
language plpgsql
security definer
as $$
begin
  new.username := lower(trim(new.username));
  new.badges_count := coalesce(cardinality(new.unlocked_badges), 0);
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_sync_sentinel_user_badges on public.sentinel_users;
create trigger trg_sync_sentinel_user_badges
before insert or update on public.sentinel_users
for each row
execute function public.sync_sentinel_user_badges();

-- 4. Enable Row Level Security (RLS) & Policies for Publishable Key Access
alter table public.sentinel_users enable row level security;

drop policy if exists "Allow public read of sentinel_users" on public.sentinel_users;
create policy "Allow public read of sentinel_users"
  on public.sentinel_users
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow public registration into sentinel_users" on public.sentinel_users;
create policy "Allow public registration into sentinel_users"
  on public.sentinel_users
  for insert
  to anon, authenticated
  with check (char_length(trim(username)) >= 2 and char_length(password_hash) > 0);

drop policy if exists "Allow user badge and progress updates on sentinel_users" on public.sentinel_users;
create policy "Allow user badge and progress updates on sentinel_users"
  on public.sentinel_users
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- 5. Grant permissions to anon and authenticated roles
grant select, insert, update on table public.sentinel_users to anon, authenticated;

-- 6. Reference catalog table for all 15 authentic NSSDCA Sentinels
create table if not exists public.sentinel_missions_reference (
  id text primary key,
  nssdca_id text not null,
  name text not null,
  target_region text not null,
  launch_date date not null,
  last_contact_date date,
  status_badge text not null,
  built_by text not null,
  resting_site text not null,
  created_at timestamptz not null default now()
);

alter table public.sentinel_missions_reference enable row level security;

drop policy if exists "Allow public read of sentinel missions reference" on public.sentinel_missions_reference;
create policy "Allow public read of sentinel missions reference"
  on public.sentinel_missions_reference
  for select
  to anon, authenticated
  using (true);

grant select on table public.sentinel_missions_reference to anon, authenticated;

-- Seed the 15 historic NSSDCA missions
insert into public.sentinel_missions_reference
  (id, nssdca_id, name, target_region, launch_date, last_contact_date, status_badge, built_by, resting_site)
values
  ('pioneer-10', '1972-012A', 'Pioneer 10', 'deep-space', '1972-03-03', '2003-01-23', 'Interstellar Drift', 'NASA Ames / TRW Systems', 'Taurus Constellation'),
  ('pioneer-11', '1973-019A', 'Pioneer 11', 'deep-space', '1973-04-06', '1995-11-24', 'Interstellar Drift', 'NASA Ames / TRW Systems', 'Scutum Constellation'),
  ('voyager-1', '1977-084A', 'Voyager 1', 'deep-space', '1977-09-05', null, 'Active Interstellar Spacecraft', 'NASA JPL', 'Ophiuchus Constellation'),
  ('voyager-2', '1977-076A', 'Voyager 2', 'deep-space', '1977-08-20', null, 'Active Interstellar Spacecraft', 'NASA JPL', 'Pavo Constellation'),
  ('surveyor-1', '1966-045A', 'Surveyor 1', 'moon', '1966-05-30', '1967-01-07', 'Lunar Monument', 'Hughes Aircraft / NASA JPL', 'Oceanus Procellarum, Moon'),
  ('surveyor-3', '1967-035A', 'Surveyor 3', 'moon', '1967-04-17', '1967-05-04', 'Visited by Apollo 12', 'Hughes Aircraft / NASA JPL', 'Oceanus Procellarum, Moon'),
  ('apollo-11-lm', '1969-059C', 'Apollo 11 Lunar Module (Eagle)', 'moon', '1969-07-16', '1969-07-24', 'Historic Landing Site', 'Grumman Aerospace / NASA', 'Mare Tranquillitatis, Moon'),
  ('apollo-12-lm', '1969-099C', 'Apollo 12 Lunar Module (Intrepid)', 'moon', '1969-11-14', '1969-11-20', 'Historic Landing Site', 'Grumman Aerospace / NASA', 'Oceanus Procellarum, Moon'),
  ('apollo-14-lm', '1971-008C', 'Apollo 14 Lunar Module (Antares)', 'moon', '1971-01-31', '1971-02-09', 'Historic Landing Site', 'Grumman Aerospace / NASA', 'Fra Mauro, Moon'),
  ('apollo-15-lm', '1971-063C', 'Apollo 15 Lunar Module (Falcon)', 'moon', '1971-07-26', '1971-08-07', 'Historic Landing Site', 'Grumman Aerospace / NASA', 'Hadley Rille, Moon'),
  ('apollo-16-lm', '1972-031C', 'Apollo 16 Lunar Module (Orion)', 'moon', '1972-04-16', '1972-04-27', 'Historic Landing Site', 'Grumman Aerospace / NASA', 'Descartes Highlands, Moon'),
  ('apollo-17-lm', '1972-096C', 'Apollo 17 Lunar Module (Challenger)', 'moon', '1972-12-07', '1972-12-19', 'Historic Landing Site', 'Grumman Aerospace / NASA', 'Taurus-Littrow, Moon'),
  ('opportunity', '2003-032A', 'Opportunity Rover (MER-B)', 'mars', '2003-07-07', '2018-06-10', 'Silent Pioneer', 'NASA JPL', 'Perseverance Valley, Mars'),
  ('spirit', '2003-027A', 'Spirit Rover (MER-A)', 'mars', '2003-06-10', '2010-03-22', 'Martian Monument', 'NASA JPL', 'Gusev Crater, Mars'),
  ('ingenuity', '2020-061C', 'Ingenuity Mars Helicopter', 'mars', '2020-07-30', '2024-01-18', '72 Flights Monument', 'NASA JPL / AeroVironment', 'Neretva Vallis, Mars')
on conflict (id) do update set
  status_badge = excluded.status_badge,
  last_contact_date = excluded.last_contact_date;

-- 7. Secure Leaderboard View (Omits password hashes)
create or replace view public.sentinel_leaderboard as
select
  id,
  username,
  badges_count,
  explorer_rank,
  coalesce(cardinality(investigated_hotspots), 0) as hotspots_inspected,
  coalesce(cardinality(solved_mysteries), 0) as mysteries_solved,
  last_login_at,
  created_at
from public.sentinel_users
order by badges_count desc, mysteries_solved desc, last_login_at desc;

grant select on public.sentinel_leaderboard to anon, authenticated;
`;

/**
 * Deterministic SHA-256 password hash salted with normalized username
 */
export async function hashUserPassword(username: string, password: string): Promise<string> {
  const normalizedUser = username.trim().toLowerCase();
  const payload = `silent-sentinels::${normalizedUser}::${password}`;
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoded = new TextEncoder().encode(payload);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Fallback deterministic hash if SubtleCrypto is unavailable
  let h1 = 0xdeadbeef ^ payload.length;
  let h2 = 0x41c6ce57 ^ payload.length;
  for (let i = 0; i < payload.length; i++) {
    const ch = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

/**
 * Merges two ExplorerProgress objects without losing any unlocked badges or discoveries
 */
export function mergeExplorerProgress(
  local: ExplorerProgress,
  remote?: Partial<{
    unlocked_badges: string[];
    investigated_hotspots: string[];
    decoded_plaque_hotspots: string[];
    solved_mysteries: string[];
    completed_quizzes: Record<string, number>;
  }> | null
): ExplorerProgress {
  if (!remote) return local;
  const unique = (arr1: string[], arr2?: string[]) =>
    Array.from(new Set([...(arr1 || []), ...(arr2 || [])]));

  const mergedQuizzes: Record<string, number> = { ...(local.completedQuizzes || {}) };
  if (remote.completed_quizzes && typeof remote.completed_quizzes === 'object') {
    for (const [k, v] of Object.entries(remote.completed_quizzes)) {
      mergedQuizzes[k] = Math.max(mergedQuizzes[k] || 0, Number(v) || 0);
    }
  }

  return {
    unlockedBadges: unique(local.unlockedBadges, remote.unlocked_badges),
    investigatedHotspots: unique(local.investigatedHotspots, remote.investigated_hotspots),
    decodedPlaqueHotspots: unique(local.decodedPlaqueHotspots, remote.decoded_plaque_hotspots),
    solvedMysteries: unique(local.solvedMysteries, remote.solved_mysteries),
    completedQuizzes: mergedQuizzes
  };
}

const LOCAL_USERS_KEY = 'silent_sentinels_local_users_backup_v1';

interface LocalBackupUserRecord {
  username: string;
  password_hash: string;
  progress: ExplorerProgress;
  explorer_rank: string;
}

function getLocalUsersBackup(): Record<string, LocalBackupUserRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalUserBackup(record: LocalBackupUserRecord): void {
  try {
    const all = getLocalUsersBackup();
    all[record.username.toLowerCase()] = record;
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(all));
  } catch {
    // ignore storage errors
  }
}

/**
 * Authenticates an existing user or registers a new user in Supabase `sentinel_users`.
 * Gracefully falls back if the user hasn't executed the SQL script yet in Supabase,
 * while surfacing clear status feedback.
 */
export async function authenticateWithSupabase(params: {
  mode: 'login' | 'signup';
  username: string;
  password: string;
  currentProgress?: ExplorerProgress;
  rankTitle?: string;
}): Promise<{
  ok: boolean;
  error?: string;
  needsSqlSetup?: boolean;
  profile?: SentinelUserProfile;
  mergedProgress?: ExplorerProgress;
}> {
  const cleanUsername = params.username.trim().toLowerCase();
  if (cleanUsername.length < 2) {
    return { ok: false, error: 'Username must be at least 2 characters long.' };
  }
  if (params.password.length < 4) {
    return { ok: false, error: 'Password must be at least 4 characters long.' };
  }

  const passwordHash = await hashUserPassword(cleanUsername, params.password);
  const initialProgress = params.currentProgress || INITIAL_PROGRESS;
  const initialRank = params.rankTitle || 'Cadet Telemetry Spotter';

  try {
    // 1. Check if username exists in Supabase `public.sentinel_users`
    const { data: existingRow, error: selectError } = await supabase
      .from('sentinel_users')
      .select('*')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (selectError) {
      // Check if table hasn't been created yet (SQL script not run yet)
      const msg = (selectError.message || '').toLowerCase();
      const code = selectError.code || '';
      const isTableMissing =
        code === '42P01' ||
        code === 'PGRST205' ||
        msg.includes('sentinel_users') ||
        msg.includes('schema cache') ||
        msg.includes('does not exist');

      if (isTableMissing) {
        return handleOfflineOrPendingTableAuth({
          mode: params.mode,
          username: cleanUsername,
          passwordHash,
          initialProgress,
          initialRank,
          needsSqlSetup: true,
          cloudMessage: 'Explorer profile active.'
        });
      }

      return handleOfflineOrPendingTableAuth({
        mode: params.mode,
        username: cleanUsername,
        passwordHash,
        initialProgress,
        initialRank,
        needsSqlSetup: false,
        cloudMessage: 'Explorer profile active.'
      });
    }

    if (params.mode === 'signup') {
      if (existingRow) {
        return {
          ok: false,
          error: `Username "${cleanUsername}" is already registered. Switch to Sign In to access your badges.`
        };
      }

      const payload = {
        username: cleanUsername,
        password_hash: passwordHash,
        badges_count: initialProgress.unlockedBadges.length,
        unlocked_badges: initialProgress.unlockedBadges,
        investigated_hotspots: initialProgress.investigatedHotspots,
        decoded_plaque_hotspots: initialProgress.decodedPlaqueHotspots,
        solved_mysteries: initialProgress.solvedMysteries,
        completed_quizzes: initialProgress.completedQuizzes,
        explorer_rank: initialRank,
        last_login_at: new Date().toISOString()
      };

      const { data: inserted, error: insertError } = await supabase
        .from('sentinel_users')
        .insert(payload)
        .select('*')
        .single();

      if (insertError) {
        return {
          ok: false,
          error: 'Could not create Explorer account. Please try another username.'
        };
      }

      saveLocalUserBackup({
        username: cleanUsername,
        password_hash: passwordHash,
        progress: initialProgress,
        explorer_rank: initialRank
      });

      return {
        ok: true,
        mergedProgress: initialProgress,
        profile: {
          id: inserted.id,
          username: inserted.username,
          badges_count: inserted.badges_count ?? initialProgress.unlockedBadges.length,
          unlocked_badges: inserted.unlocked_badges ?? initialProgress.unlockedBadges,
          investigated_hotspots:
            inserted.investigated_hotspots ?? initialProgress.investigatedHotspots,
          decoded_plaque_hotspots:
            inserted.decoded_plaque_hotspots ?? initialProgress.decodedPlaqueHotspots,
          solved_mysteries: inserted.solved_mysteries ?? initialProgress.solvedMysteries,
          completed_quizzes: inserted.completed_quizzes ?? initialProgress.completedQuizzes,
          explorer_rank: inserted.explorer_rank ?? initialRank,
          syncedWithCloud: true,
          cloudStatusMessage: 'Explorer profile synced'
        }
      };
    } else {
      // mode === 'login'
      if (!existingRow) {
        return {
          ok: false,
          error: `No explorer found with username "${cleanUsername}". Switch to "Create Explorer Account" to register.`
        };
      }

      if (existingRow.password_hash !== passwordHash) {
        return {
          ok: false,
          error: 'Incorrect password for this Explorer username. Please try again.'
        };
      }

      const merged = mergeExplorerProgress(initialProgress, existingRow);

      // Update last_login_at and merged badges
      const { data: updatedRow } = await supabase
        .from('sentinel_users')
        .update({
          badges_count: merged.unlockedBadges.length,
          unlocked_badges: merged.unlockedBadges,
          investigated_hotspots: merged.investigatedHotspots,
          decoded_plaque_hotspots: merged.decodedPlaqueHotspots,
          solved_mysteries: merged.solvedMysteries,
          completed_quizzes: merged.completedQuizzes,
          last_login_at: new Date().toISOString()
        })
        .eq('username', cleanUsername)
        .select('*')
        .single();

      const activeRow = updatedRow || existingRow;

      saveLocalUserBackup({
        username: cleanUsername,
        password_hash: passwordHash,
        progress: merged,
        explorer_rank: activeRow.explorer_rank || initialRank
      });

      return {
        ok: true,
        mergedProgress: merged,
        profile: {
          id: activeRow.id,
          username: activeRow.username,
          badges_count: merged.unlockedBadges.length,
          unlocked_badges: merged.unlockedBadges,
          investigated_hotspots: merged.investigatedHotspots,
          decoded_plaque_hotspots: merged.decodedPlaqueHotspots,
          solved_mysteries: merged.solvedMysteries,
          completed_quizzes: merged.completedQuizzes,
          explorer_rank: activeRow.explorer_rank || initialRank,
          syncedWithCloud: true,
          cloudStatusMessage: 'Explorer profile synced'
        }
      };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return handleOfflineOrPendingTableAuth({
      mode: params.mode,
      username: cleanUsername,
      passwordHash,
      initialProgress,
      initialRank,
      needsSqlSetup: false,
      cloudMessage: message
    });
  }
}

function handleOfflineOrPendingTableAuth(params: {
  mode: 'login' | 'signup';
  username: string;
  passwordHash: string;
  initialProgress: ExplorerProgress;
  initialRank: string;
  needsSqlSetup: boolean;
  cloudMessage: string;
}): {
  ok: boolean;
  error?: string;
  needsSqlSetup?: boolean;
  profile?: SentinelUserProfile;
  mergedProgress?: ExplorerProgress;
} {
  const backups = getLocalUsersBackup();
  const existing = backups[params.username];

  if (params.mode === 'login' && existing && existing.password_hash !== params.passwordHash) {
    return {
      ok: false,
      error: 'Incorrect password for this Explorer username.'
    };
  }

  const merged = existing
    ? mergeExplorerProgress(params.initialProgress, {
        unlocked_badges: existing.progress.unlockedBadges,
        investigated_hotspots: existing.progress.investigatedHotspots,
        decoded_plaque_hotspots: existing.progress.decodedPlaqueHotspots,
        solved_mysteries: existing.progress.solvedMysteries,
        completed_quizzes: existing.progress.completedQuizzes
      })
    : params.initialProgress;

  saveLocalUserBackup({
    username: params.username,
    password_hash: params.passwordHash,
    progress: merged,
    explorer_rank: params.initialRank
  });

  return {
    ok: true,
    needsSqlSetup: params.needsSqlSetup,
    mergedProgress: merged,
    profile: {
      username: params.username,
      badges_count: merged.unlockedBadges.length,
      unlocked_badges: merged.unlockedBadges,
      investigated_hotspots: merged.investigatedHotspots,
      decoded_plaque_hotspots: merged.decodedPlaqueHotspots,
      solved_mysteries: merged.solvedMysteries,
      completed_quizzes: merged.completedQuizzes,
      explorer_rank: params.initialRank,
      syncedWithCloud: false,
      cloudStatusMessage: params.cloudMessage
    }
  };
}

/**
 * Syncs badge count & mission progress to Supabase `public.sentinel_users`
 * whenever the logged-in user earns a badge or investigates a sentinel.
 */
export async function syncUserBadgesToSupabase(
  username: string,
  progress: ExplorerProgress,
  rankTitle: string
): Promise<{ synced: boolean; error?: string }> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername || cleanUsername === 'guest') {
    return { synced: false };
  }

  // Always update local backup too
  const backups = getLocalUsersBackup();
  if (backups[cleanUsername]) {
    saveLocalUserBackup({
      ...backups[cleanUsername],
      progress,
      explorer_rank: rankTitle
    });
  }

  try {
    const { error } = await supabase
      .from('sentinel_users')
      .update({
        badges_count: progress.unlockedBadges.length,
        unlocked_badges: progress.unlockedBadges,
        investigated_hotspots: progress.investigatedHotspots,
        decoded_plaque_hotspots: progress.decodedPlaqueHotspots,
        solved_mysteries: progress.solvedMysteries,
        completed_quizzes: progress.completedQuizzes,
        explorer_rank: rankTitle,
        updated_at: new Date().toISOString()
      })
      .eq('username', cleanUsername);

    if (error) {
      return { synced: false, error: error.message };
    }
    return { synced: true };
  } catch (err) {
    return {
      synced: false,
      error: err instanceof Error ? err.message : 'Failed to sync with Supabase'
    };
  }
}
