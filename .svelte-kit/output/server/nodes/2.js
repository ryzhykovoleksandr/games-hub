import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.DPC4P_Rj.js","_app/immutable/chunks/bWuwYdVV.js","_app/immutable/chunks/BLqoP2bp.js","_app/immutable/chunks/2xdNPK8v.js","_app/immutable/chunks/DgkjZU38.js"];
export const stylesheets = ["_app/immutable/assets/launch-overlay.DfnP_JlM.css","_app/immutable/assets/2.m0hzDrqr.css"];
export const fonts = [];
