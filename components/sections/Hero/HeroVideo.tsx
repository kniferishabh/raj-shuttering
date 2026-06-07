'use client';

import { useEffect, useRef, useState } from 'react';
import { HERO_CONSTRUCTION_VIDEO } from '@/lib/media';
import styles from './Hero.module.css';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePosterOnly, setUsePosterOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const update = () => {
      setUsePosterOnly(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    update();
    motionQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);

    return () => {
      motionQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
    };
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
  }, [usePosterOnly, isMobile]);

  if (usePosterOnly) {
    return (
      <div
        className={styles.videoPoster}
        style={{ backgroundImage: `url(${HERO_CONSTRUCTION_VIDEO.poster})` }}
        role="img"
        aria-label={HERO_CONSTRUCTION_VIDEO.alt}
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
      poster={HERO_CONSTRUCTION_VIDEO.poster}
      aria-hidden="true"
    >
      <source
        src={isMobile ? HERO_CONSTRUCTION_VIDEO.srcMobile : HERO_CONSTRUCTION_VIDEO.src}
        type="video/mp4"
      />
    </video>
  );
}
