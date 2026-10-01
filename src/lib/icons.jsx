/* ==========================================================================
   IKON SVG — dipindah apa adanya dari index.html versi statis
   ========================================================================== */

export const ICO = {
  mail:      '<path d="M4 4h16v16H4z" fill="none"/><path d="M3 6l9 7 9-7M3 6v12h18V6"/>',
  chat:      '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.8 9.8 0 0 1-4-.9L3 21l1.9-4.7A8.3 8.3 0 0 1 3.7 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8.3 8.4z"/>',
  pin:       '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  link:      '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  github:    '<path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6-1.5 6-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.6-.5-5.1 1.9a12.6 12.6 0 0 0-6.6 0C4.4 1.5 2.8 2 2.8 2a4.9 4.9 0 0 0-.1 3.7A5.3 5.3 0 0 0 1.3 9.4c0 5.3 3 6.5 6 6.8a3.4 3.4 0 0 0-.9 2.6V21"/>',
  linkedin:  '<path d="M4 9h3v11H4zM5.5 4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h3v1.6a3.4 3.4 0 0 1 3-1.6c3 0 4 2 4 4.6V20h-3v-6c0-1.5-.6-2.6-2-2.6-1.1 0-1.8.8-2 1.5V20h-3z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  x:         '<path d="M4 4l16 16M20 4L4 20"/>',
  dribbble:  '<circle cx="12" cy="12" r="9"/><path d="M5 8c5 1.5 10 .5 13.5-2M3.5 14.5C8 12 15 12 19 16M9 3.5C13 8 15.5 14 15.5 20.5"/>',
  youtube:   '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M11 9.5l4 2.5-4 2.5z"/>',
  tiktok:    '<path d="M15 4v11a4 4 0 1 1-3-3.9M15 4c.5 2.5 2.2 4 4.5 4.3"/>',
  behance:   '<path d="M2 7h6a3 3 0 0 1 0 6H2zM2 13h7a3 3 0 0 1 0 6H2zM15 11h7a3.5 3.5 0 1 0-7 0v1.5a3.5 3.5 0 0 0 6.3 1.8"/>',
  facebook:  '<path d="M14 8h3V4.5h-3c-2.2 0-4 1.8-4 4V11H7.5v3.5H10V21h3.5v-6.5H16l.8-3.5H13.5V9c0-.6.4-1 1-1z"/>',
  threads:   '<path d="M12 21c-4.4 0-7.5-3.1-7.5-9S7.6 3 12 3c3.6 0 6.3 1.9 7.2 4.9M12 17.5c-2 0-3.2-1-3.2-2.4 0-1.6 1.6-2.6 3.9-2.6 2.6 0 4.3.9 4.3 2.6 0 1.5-1.4 2.4-3.2 2.4-1.7 0-2.7-.7-2.7-1.7 0-1.1 1.2-1.7 2.9-1.7"/>',
};

export function Icon({ name, size = 24, strokeWidth = 1.7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: ICO[name] || ICO.link }}
    />
  );
}

export const svgIco = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICO[name] || ICO.link}</svg>`;

export default Icon;
