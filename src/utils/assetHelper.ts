import defaultHeroPortrait from '../assets/Image-hero.webp';
import defaultHeroPortraitPng from '../assets/Image-hero.png';
import defaultAvatar from '../assets/avatar.png';

export { defaultHeroPortrait, defaultHeroPortraitPng, defaultAvatar };

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
