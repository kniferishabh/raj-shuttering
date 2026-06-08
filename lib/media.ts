import type { BusinessSettings } from './types';

/** Fallback stock video when no custom URL is configured in admin */
export const HERO_CONSTRUCTION_VIDEO = {
  src: 'https://videos.pexels.com/video-files/4434242/4434242-hd_1920_1080_25fps.mp4',
  srcMobile: 'https://videos.pexels.com/video-files/4434242/4434242-sd_640_360_25fps.mp4',
  poster: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1920',
  alt: 'Construction site with scaffolding and shuttering in use',
} as const;

/** Where to place your own banner video in the project */
export const HERO_VIDEO_UPLOAD_PATH = 'public/videos/hero.mp4';
export const HERO_VIDEO_PUBLIC_URL = '/videos/hero.mp4';
export const HERO_VIDEO_MOBILE_PUBLIC_URL = '/videos/hero-mobile.mp4';

export interface HeroVideoConfig {
  src: string;
  srcMobile: string;
  poster: string;
  alt: string;
}

export function getHeroVideoConfig(
  settings: Pick<BusinessSettings, 'heroVideoUrl' | 'heroVideoUrlMobile' | 'heroVideoPoster'>,
): HeroVideoConfig {
  const customSrc = settings.heroVideoUrl?.trim();
  const customMobile = settings.heroVideoUrlMobile?.trim();
  const customPoster = settings.heroVideoPoster?.trim();

  return {
    src: customSrc || HERO_CONSTRUCTION_VIDEO.src,
    srcMobile: customMobile || customSrc || HERO_CONSTRUCTION_VIDEO.srcMobile,
    poster: customPoster || HERO_CONSTRUCTION_VIDEO.poster,
    alt: HERO_CONSTRUCTION_VIDEO.alt,
  };
}
