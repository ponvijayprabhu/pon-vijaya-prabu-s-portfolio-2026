import defaultHeroPortrait from '../assets/Image-hero.png';
import defaultAvatar from '../assets/avatar.png';

export { defaultHeroPortrait, defaultAvatar };

/**
 * Resolves static image URLs to ensure they work reliably in all environments
 * (local dev, production preview, and GitHub Pages subpaths).
 */
export function getAssetUrl(url?: string | null): string {
  if (!url) return defaultHeroPortrait;

  // Data URLs, blobs, or external absolute URLs are untouched
  if (
    url.startsWith('data:') ||
    url.startsWith('blob:') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url;
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

  // Handle avatar icon references
  if (
    url === '/avatar.png' ||
    url === 'avatar.png' ||
    url === './avatar.png'
  ) {
    return defaultAvatar;
  }

  // Relative path fallback using Vite's BASE_URL
  const cleanPath = url.replace(/^\/+/, '');
  const baseUrl = import.meta.env.BASE_URL || './';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${prefix}${cleanPath}`;
}
