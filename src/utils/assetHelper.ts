import defaultHeroPortrait from '../assets/Image-hero.webp';
import defaultHeroPortraitPng from '../assets/Image-hero.png';
import defaultAvatar from '../assets/avatar.png';
import healthcareCover from '../assets/Healthcare.jpg';
import hrmsCover from '../assets/HRMS-Banner.jpg';
import aiStudioCover from '../assets/AI-Smart-Studio.jpg';
import logisticsCover from '../assets/Logistics.jpg';

export {
  defaultHeroPortrait,
  defaultHeroPortraitPng,
  defaultAvatar,
  healthcareCover,
  hrmsCover,
  aiStudioCover,
  logisticsCover,
};

/**
 * Resolves static image URLs to ensure they work reliably in all environments
 * (local dev, production preview, and GitHub Pages subpaths).
 */
export function getAssetUrl(url?: string | null): string {
  if (!url) return defaultAvatar;

  // Data URLs, blobs, or external absolute URLs are untouched
  if (
    url.startsWith('data:') ||
    url.startsWith('blob:') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url;
  }

  // Handle Healthcare project cover image
  if (
    url === '/Healthcare.jpg' ||
    url === 'Healthcare.jpg' ||
    url === './Healthcare.jpg' ||
    url?.includes('Healthcare')
  ) {
    return healthcareCover;
  }

  // Handle HRMS project cover image
  if (
    url === '/HRMS-Banner.jpg' ||
    url === 'HRMS-Banner.jpg' ||
    url === './HRMS-Banner.jpg' ||
    url === '/HRMS Banner.jpg' ||
    url === 'HRMS Banner.jpg' ||
    url === './HRMS Banner.jpg' ||
    url?.includes('HRMS')
  ) {
    return hrmsCover;
  }

  // Handle AI Smart Studio project cover image
  if (
    url === '/AI-Smart-Studio.jpg' ||
    url === 'AI-Smart-Studio.jpg' ||
    url === './AI-Smart-Studio.jpg' ||
    url === '/AI Smart Studio.jpg' ||
    url === 'AI Smart Studio.jpg' ||
    url === './AI Smart Studio.jpg' ||
    url?.includes('AI-Smart-Studio') ||
    url?.includes('AI Smart Studio')
  ) {
    return aiStudioCover;
  }

  // Handle Logistics project cover image
  if (
    url === '/Logistics.jpg' ||
    url === 'Logistics.jpg' ||
    url === './Logistics.jpg' ||
    url?.toLowerCase().includes('logistics')
  ) {
    return logisticsCover;
  }

  // Handle avatar icon references and My pic.jpg
  if (
    url === '/avatar.png' ||
    url === 'avatar.png' ||
    url === './avatar.png' ||
    url === '/My_pic.jpg' ||
    url === 'My_pic.jpg' ||
    url === './My_pic.jpg' ||
    url === '/My pic.jpg' ||
    url === 'My pic.jpg' ||
    url === './My pic.jpg' ||
    url === '/my-pic.jpg' ||
    url === 'my-pic.jpg' ||
    url.toLowerCase().includes('my pic') ||
    url.toLowerCase().includes('my_pic') ||
    url.toLowerCase().includes('avatar')
  ) {
    return defaultAvatar;
  }

  // Handle portrait hero image references
  if (
    url === '/Image.png' ||
    url === 'Image.png' ||
    url === './Image.png' ||
    url.includes('Image-hero') ||
    url.includes('Image-opt') ||
    url === '/account_avatar.jpg' ||
    url === '/profile.jpg' ||
    url === '/my.jpg'
  ) {
    return defaultHeroPortrait;
  }

  // Relative path fallback using Vite's BASE_URL
  const cleanPath = url.replace(/^\/+/, '');
  const baseUrl = import.meta.env.BASE_URL || './';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${prefix}${cleanPath}`;
}
