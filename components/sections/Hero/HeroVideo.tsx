'use client';

import { useEffect, useRef, useState } from 'react';
import type { HeroVideoConfig } from '@/lib/media';
import styles from './Hero.module.css';

interface HeroVideoProps {
  video: HeroVideoConfig;
}

export function HeroVideo({ video }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePosterOnly, setUsePosterOnly] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setUsePosterOnly(motionQuery.matches);

    update();
    motionQuery.addEventListener('change', update);

    return () => motionQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || usePosterOnly) return;

    const play = () => {
      video.play().catch(() => {
        /* Autoplay blocked — poster remains visible */
      });
    };

    play();
    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, [usePosterOnly]);

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

  return (
    <video
      ref={videoRef}
      className={styles.video}
      autoPlay
      loop
      muted
      playsInline
      poster={video.poster}
      aria-hidden="true"
    >
      <source src={video.srcMobile} type="video/mp4" media="(max-width: 768px)" />
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
