/// <reference types="vite/client" />

// The "figma:asset/..." import scheme is resolved at build time by a custom
// Vite plugin (see figmaAssetResolver in vite.config.ts), which maps these
// virtual imports to real files under src/assets. TypeScript has no way to
// know about this custom resolver, so we declare the module shape here:
// each import resolves to a string URL, exactly like a normal Vite image
// import (e.g. `import x from './image.png'`).
declare module 'figma:asset/*' {
  const src: string;
  export default src;
}
