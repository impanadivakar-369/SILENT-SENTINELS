import React, { useState, useEffect } from 'react';
import { AuthenticSpacecraftPhoto } from '../data/missionPhotographyData';
import { CameraOff } from 'lucide-react';

interface AuthenticSpacePhotoProps {
  photo: AuthenticSpacecraftPhoto;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Renders an authentic historical NASA spacecraft photograph inside a real <img> element.
 * - For local screenshot assets with `cropBounds`, loads the image via `new window.Image()`,
 *   crops to `cropBounds` and automatically trims any white screenshot border rows/columns,
 *   then outputs a crisp 16:10 JPEG data URL to the <img> element.
 * - Falls back to official NASA Image Library asset URL if primary source fails.
 * - Displays a clean "Photograph unavailable" placeholder if all sources fail.
 */
export const AuthenticSpacePhoto: React.FC<AuthenticSpacePhotoProps> = ({
  photo,
  className = '',
  imgClassName = '',
  priority = false
}) => {
  const [rawSrc, setRawSrc] = useState<string>(photo.imageUrl);
  const [displaySrc, setDisplaySrc] = useState<string | null>(
    photo.cropBounds && photo.imageUrl.startsWith('/') ? null : photo.imageUrl
  );
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  useEffect(() => {
    setRawSrc(photo.imageUrl);
    setUsingFallback(false);
    setHasFailed(false);
    if (photo.cropBounds && photo.imageUrl.startsWith('/')) {
      setDisplaySrc(null);
    } else {
      setDisplaySrc(photo.imageUrl);
    }
  }, [photo.id, photo.imageUrl]);

  const triggerFallbackOrFail = () => {
    if (!usingFallback && photo.fallbackUrl && photo.fallbackUrl !== rawSrc) {
      setUsingFallback(true);
      setRawSrc(photo.fallbackUrl);
      setDisplaySrc(photo.fallbackUrl);
    } else {
      setHasFailed(true);
    }
  };

  useEffect(() => {
    const shouldCropLocal = Boolean(photo.cropBounds && !usingFallback && rawSrc.startsWith('/'));
    if (!shouldCropLocal || !photo.cropBounds) {
      setDisplaySrc(rawSrc);
      return;
    }

    let cancelled = false;
    const loader = new window.Image();

    loader.onload = () => {
      if (cancelled) return;
      const nw = loader.naturalWidth;
      const nh = loader.naturalHeight;
      if (nw === 0 || nh === 0) {
        triggerFallbackOrFail();
        return;
      }

      const bounds = photo.cropBounds!;
      const leftPct = Math.min(45, Math.max(0, (bounds.leftPct ?? 0) + 1.5));
      const rightPct = Math.max(55, Math.min(100, (bounds.rightPct ?? 100) - 1.5));
      const topPct = Math.min(45, Math.max(0, bounds.topPct + 1.2));
      const bottomPct = Math.max(40, Math.min(100, bounds.bottomPct - 2.2));

      let sx = Math.round((leftPct / 100) * nw);
      let sy = Math.round((topPct / 100) * nh);
      let ex = Math.round((rightPct / 100) * nw);
      let ey = Math.round((bottomPct / 100) * nh);

      try {
        const probe = document.createElement('canvas');
        probe.width = nw;
        probe.height = nh;
        const pctx = probe.getContext('2d');
        if (pctx) {
          pctx.drawImage(loader, 0, 0);
          const imgData = pctx.getImageData(0, 0, nw, nh).data;

          const isRowMostlyWhite = (y: number, x0: number, x1: number) => {
            let whiteCount = 0;
            let total = 0;
            const step = Math.max(1, Math.floor((x1 - x0) / 50));
            for (let x = x0; x < x1; x += step) {
              const idx = (y * nw + x) * 4;
              if (imgData[idx] > 232 && imgData[idx + 1] > 232 && imgData[idx + 2] > 232) {
                whiteCount++;
              }
              total++;
            }
            return total > 0 && whiteCount / total > 0.55;
          };

          const isColMostlyWhite = (x: number, y0: number, y1: number) => {
            let whiteCount = 0;
            let total = 0;
            const step = Math.max(1, Math.floor((y1 - y0) / 50));
            for (let y = y0; y < y1; y += step) {
              const idx = (y * nw + x) * 4;
              if (imgData[idx] > 232 && imgData[idx + 1] > 232 && imgData[idx + 2] > 232) {
                whiteCount++;
              }
              total++;
            }
            return total > 0 && whiteCount / total > 0.55;
          };

          while (sy < ey - 40 && isRowMostlyWhite(sy, sx, ex)) sy += 2;
          while (ey > sy + 40 && isRowMostlyWhite(ey - 1, sx, ex)) ey -= 2;
          while (sx < ex - 40 && isColMostlyWhite(sx, sy, ey)) sx += 2;
          while (ex > sx + 40 && isColMostlyWhite(ex - 1, sy, ey)) ex -= 2;

          // Extra 4px safety trim inside any detected border
          sx = Math.min(ex - 20, sx + 4);
          sy = Math.min(ey - 20, sy + 4);
          ex = Math.max(sx + 20, ex - 4);
          ey = Math.max(sy + 20, ey - 4);
        }

        const sw = Math.max(16, ex - sx);
        const sh = Math.max(16, ey - sy);
        const outCanvas = document.createElement('canvas');
        const targetW = 960;
        const targetH = 600;
        outCanvas.width = targetW;
        outCanvas.height = targetH;

        const outCtx = outCanvas.getContext('2d');
        if (outCtx) {
          const scale = Math.max(targetW / sw, targetH / sh);
          const drawW = sw * scale;
          const drawH = sh * scale;
          const dx = (targetW - drawW) / 2;
          const dy = (targetH - drawH) / 2;
          outCtx.drawImage(loader, sx, sy, sw, sh, dx, dy, drawW, drawH);
          setDisplaySrc(outCanvas.toDataURL('image/jpeg', 0.92));
          return;
        }
      } catch {
        // Fallback to rawSrc if canvas operations fail
      }
      setDisplaySrc(rawSrc);
    };

    loader.onerror = () => {
      if (cancelled) return;
      triggerFallbackOrFail();
    };

    loader.src = rawSrc;

    return () => {
      cancelled = true;
    };
  }, [rawSrc, usingFallback, photo.id]);

  if (hasFailed) {
    return (
      <div
        className={`relative overflow-hidden bg-[#0A1018] border border-[#1E2A38] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        role="img"
        aria-label={`${photo.title} — Photograph unavailable`}
      >
        <div className="w-11 h-11 rounded-2xl bg-[#121B26] border border-[#243447] flex items-center justify-center mb-3 text-[#7C8D9E]">
          <CameraOff className="w-5 h-5" />
        </div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#9BA8B8]">
          Photograph unavailable
        </p>
        <p className="text-xs text-[#64748B] mt-1 max-w-xs line-clamp-2">
          {photo.title} (NASA ID: {photo.nasaArchiveId})
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#080C12] ${className}`}>
      {displaySrc && (
        <img
          src={displaySrc}
          alt={photo.title}
          loading={priority ? 'eager' : 'lazy'}
          onError={triggerFallbackOrFail}
          className={`block w-full h-full object-cover object-center select-none ${imgClassName}`}
        />
      )}
    </div>
  );
};
