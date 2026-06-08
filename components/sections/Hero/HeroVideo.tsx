'use client';

import { useEffect, useRef, useState } from 'react';
import type { HeroVideoConfig } from '@/lib/media';
import styles from './Hero.module.css';

interface HeroVideoProps {
  video: HeroVideoConfig;
}

/** Reliable mobile check — <source media> is ignored by iOS Safari and many Android browsers */
function pickVideoSrc(config: HeroVideoConfig): string {
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const useMobile = narrow || (touch && window.innerWidth < 1024);
  return useMobile ? config.srcMobile : config.src;
}

export function HeroVideo({ video }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePosterOnly, setUsePosterOnly] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotion = () => setUsePosterOnly(motionQuery.matches);

    updateMotion();
    motionQuery.addEventListener('change', updateMotion);

    return () => motionQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');

    const updateSrc = () => setActiveSrc(pickVideoSrc(video));

    updateSrc();
    mobileQuery.addEventListener('change', updateSrc);
    touchQuery.addEventListener('change', updateSrc);
    window.addEventListener('resize', updateSrc);

    return () => {
      mobileQuery.removeEventListener('change', updateSrc);
      touchQuery.removeEventListener('change', updateSrc);
      window.removeEventListener('resize', updateSrc);
    };
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || usePosterOnly || !activeSrc) return;

    const play = () => {
      el.play().catch(() => {
        /* Autoplay blocked — poster remains visible */
      });
    };

    play();
    el.addEventListener('loadeddata', play);
    return () => el.removeEventListener('loadeddata', play);
  }, [usePosterOnly, activeSrc]);

  if (usePosterOnly) {
    return (
      <div
        className={styles.videoPoster}
        style={{ backgroundImage: `url(${video.poster})` }}
        role="img"
        aria-label={video.alt}
      />
    );
  }

  /* Poster until client picks the correct src — avoids loading desktop video on phones */
  if (!activeSrc) {
    return (
      <div
        className={styles.videoPoster}
        style={{ backgroundImage: `url(${video.poster})` }}
        role="img"
        aria-label={video.alt}
      />
    );
  }

  return (
    <video
      key={activeSrc}
      ref={videoRef}
      className={styles.video}
      src={activeSrc}
      autoPlay
      loop
      muted
      playsInline
      poster={video.poster}
      preload="auto"
      aria-hidden="true"
    />
  );
}
