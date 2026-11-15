import React from 'react';
import {
  AuthenticSpacecraftPhoto,
  MISSION_PHOTOGRAPHY_ARCHIVE
} from '../data/missionPhotographyData';
import { AuthenticSpacePhoto } from './AuthenticSpacePhoto';
import { Camera, ExternalLink } from 'lucide-react';

interface MissionPhotographyGalleryProps {
  missionId: string;
  missionName: string;
}

export const MissionPhotographyGallery: React.FC<MissionPhotographyGalleryProps> = ({
  missionId,
  missionName
}) => {
  const record = MISSION_PHOTOGRAPHY_ARCHIVE[missionId];
  const photos: AuthenticSpacecraftPhoto[] = record ? record.galleryPhotos : [];

  if (!record || photos.length === 0) {
    return null;
  }

  const getCaptureBadgeStyle = (
    captureType: AuthenticSpacecraftPhoto['captureType']
  ): string => {
    switch (captureType) {
      case 'Onboard Camera':
        return 'bg-[#0E2417]/90 border-[#D2F366]/60 text-[#D2F366]';
      case 'Astronaut EVA Photo':
        return 'bg-[#0C1E30]/90 border-[#38BDF8]/60 text-[#38BDF8]';
      case 'Companion Spacecraft':
        return 'bg-[#1E142B]/90 border-[#C084FC]/60 text-[#C084FC]';
      case 'Pre-Launch / Cleanroom':
        return 'bg-[#261E0E]/90 border-[#F5D061]/60 text-[#F5D061]';
      case 'Launch & Mission Ops':
      default:
        return 'bg-[#141C28]/90 border-white/20 text-slate-200';
    }
  };

  return (
    <section
      id="mission-photography-section"
      aria-labelledby="mission-photography-heading"
      className="mb-16 cosmic-card p-7 sm:p-10 text-white"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 mb-8 border-b border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
            <Camera className="w-4 h-4 text-purple-400" />
            <span>OFFICIAL NASA &amp; NSSDCA PHOTOGRAPHIC ARCHIVE · VERIFIED MISSION IMAGERY</span>
          </div>
          <h2
            id="mission-photography-heading"
            className="cosmic-headline text-2xl sm:text-4xl font-extrabold tracking-tight"
          >
            Mission Photography
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-3xl font-sans font-medium">
            Authentic historical photographs captured by {missionName}’s onboard cameras, companion spacecraft, astronaut EVA cameras, and NASA pre-launch cleanrooms.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E0A24] border border-purple-500/30 font-mono text-xs font-bold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] shrink-0 self-start lg:self-end">
          <span>{photos.length} AUTHENTIC PHOTOGRAPHS</span>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            className="group rounded-2xl bg-[#070514]/90 border border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between transition-all hover:border-purple-400/60"
          >
            <div>
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#030508] border-b border-purple-500/20">
                <AuthenticSpacePhoto
                  photo={photo}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                  <span
                    className={`px-3 py-1 rounded-full border border-purple-500/30 font-mono text-[11px] font-bold tracking-wide uppercase shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-md ${getCaptureBadgeStyle(
                      photo.captureType
                    )}`}
                  >
                    {photo.captureType}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-[#070514]/90 border border-purple-500/30 font-mono text-[11px] text-slate-200 font-bold backdrop-blur-md">
                    {photo.dateTaken}
                  </span>
                </div>
              </div>

              {/* Caption & Context Body */}
              <div className="p-5 sm:p-6 text-white">
                <div className="font-mono text-[11px] text-purple-400 uppercase tracking-wider mb-1 font-bold">
                  PHOTO 0{index + 1} · NASA ID: {photo.nasaArchiveId}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {photo.caption}
                </p>
              </div>
            </div>

            {/* Footer Credit & Source Link */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#0A071E]/80 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-mono text-[11px] text-slate-400 font-semibold truncate max-w-[65%]">
                Credit: {photo.credit}
              </span>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={photo.sourceArchiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-purple-300 underline hover:text-white transition-colors"
                >
                  <span>NASA Source Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
