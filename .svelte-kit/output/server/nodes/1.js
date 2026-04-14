

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BmAuLx9p.js","_app/immutable/chunks/CYbpDBwo.js","_app/immutable/chunks/BLqoP2bp.js","_app/immutable/chunks/2xdNPK8v.js"];
export const stylesheets = [];
export const fonts = [];
