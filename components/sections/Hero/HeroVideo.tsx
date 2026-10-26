'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { HeroVideoConfig } from '@/lib/media';
import styles from './Hero.module.css';

interface HeroVideoProps {
  video: HeroVideoConfig;
}

function pickVideoSrc(config: HeroVideoConfig): string {
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  return narrow || (touch && window.innerWidth < 1024) ? config.srcMobile : config.src;
}

export function HeroVideo({ video }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePosterOnly, setUsePosterOnly] = useState(true);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrainedConnection = Boolean(
      connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g',
    );
    const updatePreference = () => setUsePosterOnly(motionQuery.matches || constrainedConnection);

    updatePreference();
    motionQuery.addEventListener('change', updatePreference);
    return () => motionQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (usePosterOnly) return;

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    let timer: ReturnType<typeof setTimeout> | undefined;

    const scheduleVideo = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setActiveSrc(pickVideoSrc(video)), 900);
    };

    if (document.readyState === 'complete') scheduleVideo();
    else window.addEventListener('load', scheduleVideo, { once: true });
    mobileQuery.addEventListener('change', scheduleVideo);
    touchQuery.addEventListener('change', scheduleVideo);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('load', scheduleVideo);
      mobileQuery.removeEventListener('change', scheduleVideo);
      touchQuery.removeEventListener('change', scheduleVideo);
    };
  }, [video, usePosterOnly]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !activeSrc) return;
    element.play().catch(() => {
      // The optimized poster remains visible when autoplay is unavailable.
    });
  }, [activeSrc]);

  return (
    <>
      <Image
        src={video.poster}
        alt={video.alt}
        fill
        priority
        fetchPriority="high"
        quality={76}
        sizes="100vw"
        className={styles.videoPosterImage}
      />
      {!usePosterOnly && activeSrc && (
        <video
          key={activeSrc}
          ref={videoRef}
          className={`${styles.video} ${videoReady ? styles.videoReady : ''}`}
          src={activeSrc}
          autoPlay
          loop
          muted
          playsInline
          poster={video.poster}
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
