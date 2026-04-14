import{B as U,C as q,D as A,E as I,F as V,G as k,I as v,K as F,L as S,N as W,O as G,P as J,R as O,S as K,T,U as X,W as Z,X as N,Y as Q,Z as $,_ as P,b as ee,et as te,g as ne,h as C,k as se,l as ae,m as re,n as ie,o as oe,q as le,v as R,w as ce,x as fe,y as z,z as _}from"./index-server.js";import"./environment.js";var de=null,he=null;function Ce(e){de=e}function Ee(e){he=e}var b=Symbol("events"),ue=new Set,L=new Set,D=null;function Y(e){var s=this,n=s.ownerDocument,i=e.type,a=e.composedPath?.()||[],t=a[0]||e.target;D=e;var r=0,d=D===e&&e[b];if(d){var c=a.indexOf(d);if(c!==-1&&(s===document||s===window)){e[b]=s;return}var g=a.indexOf(s);if(g===-1)return;c<=g&&(r=c)}if(t=a[r]||e.target,t!==s){N(e,"currentTarget",{configurable:!0,get(){return t||n}});var u=ne,h=C;z(null),R(null);try{for(var p,f=[];t!==null;){var o=t.assignedSlot||t.parentNode||t.host||null;try{var l=t[b]?.[i];l!=null&&(!t.disabled||e.target===t)&&l.call(t,e)}catch(m){p?f.push(m):p=m}if(e.cancelBubble||o===s||o===null)break;t=o}if(p){for(let m of f)queueMicrotask(()=>{throw m});throw p}}finally{e[b]=s,delete e.currentTarget,z(u),R(h)}}}var Oe=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function pe(e,s){var n=C;n.nodes===null&&(n.nodes={start:e,end:s,a:null,t:null})}var B=!0;function j(e,s){return H(e,s)}function me(e,s){T(),s.intro=s.intro??!1;const n=s.target,i=S,a=v;try{for(var t=q(n);t&&(t.nodeType!==8||t.data!=="[");)t=ce(t);if(!t)throw k;_(!0),O(t);const r=H(e,{...s,anchor:t});return _(!1),r}catch(r){if(r instanceof Error&&r.message.split(`
`).some(d=>d.startsWith("https://svelte.dev/e/")))throw r;return r!==k&&console.warn("Failed to hydrate: ",r),s.recover===!1&&X(),T(),fe(n),_(!1),j(e,s)}finally{_(i),O(a)}}var w=new Map;function H(e,{target:s,anchor:n,props:i={},events:a,context:t,intro:r=!0,transformError:d}){T();var c=void 0,g=ee(()=>{var u=n??s.appendChild(K());G(u,{pending:()=>{}},f=>{V({});var o=W;if(t&&(o.c=t),a&&(i.$$events=a),S&&pe(f,null),B=r,c=e(f,i)||{},B=!0,S&&(C.nodes.end=v,v===null||v.nodeType!==8||v.data!=="]"))throw U(),k;J()},d);var h=new Set,p=f=>{for(var o=0;o<f.length;o++){var l=f[o];if(!h.has(l)){h.add(l);var m=re(l);for(const x of[s,document]){var y=w.get(x);y===void 0&&(y=new Map,w.set(x,y));var E=y.get(l);E===void 0?(x.addEventListener(l,Y,{passive:m}),y.set(l,1)):y.set(l,E+1)}}}};return p(Q(ue)),L.add(p),()=>{for(var f of h)for(const m of[s,document]){var o=w.get(m),l=o.get(f);--l==0?(m.removeEventListener(f,Y),o.delete(f),o.size===0&&w.delete(m)):o.set(f,l)}L.delete(p),u!==n&&u.parentNode?.removeChild(u)}});return M.set(c,g),c}var M=new WeakMap;function ge(e,s){const n=M.get(e);return n?(M.delete(e),n(s)):Promise.resolve()}function ye(e){return class extends ve{constructor(s){super({component:e,...s})}}}var ve=class{#t;#e;constructor(e){var s=new Map,n=(a,t)=>{var r=I(t,!1,!1);return s.set(a,r),r};const i=new Proxy({...e.props||{},$$events:{}},{get(a,t){return P(s.get(t)??n(t,Reflect.get(a,t)))},has(a,t){return t===le?!0:(P(s.get(t)??n(t,Reflect.get(a,t))),Reflect.has(a,t))},set(a,t,r){return A(s.get(t)??n(t,r),r),Reflect.set(a,t,r)}});this.#e=(e.hydrate?me:j)(e.component,{target:e.target,anchor:e.anchor,props:i,context:e.context,intro:e.intro??!1,recover:e.recover,transformError:e.transformError}),!F&&(!e?.props?.$$host||e.sync===!1)&&se(),this.#t=i.$$events;for(const a of Object.keys(this.#e))a==="$set"||a==="$destroy"||a==="$on"||N(this,a,{get(){return this.#e[a]},set(t){this.#e[a]=t},enumerable:!0});this.#e.$set=a=>{Object.assign(i,a)},this.#e.$destroy=()=>{ge(this.#e)}}$set(e){this.#e.$set(e)}$on(e,s){this.#t[e]=this.#t[e]||[];const n=(...i)=>s.call(this,...i);return this.#t[e].push(n),()=>{this.#t[e]=this.#t[e].filter(i=>i!==n)}}$destroy(){this.#e.$destroy()}};function _e(e){const s=ye(e),n=(i,{context:a,csp:t,transformError:r}={})=>{const d=ae(e,{props:i,context:a,csp:t,transformError:r}),c=Object.defineProperties({},{css:{value:{code:"",map:null}},head:{get:()=>d.head},html:{get:()=>d.body},then:{value:(g,u)=>{if(!F){const h=g({css:c.css,head:c.head,html:c.html});return Promise.resolve(h)}return d.then(h=>g({css:c.css,head:h.head,html:h.body,hashes:h.hashes}),u)}}});return c};return s.render=n,s}function be(e,s){e.component(n=>{let{stores:i,page:a,constructors:t,components:r=[],form:d,data_0:c=null,data_1:g=null}=s;te("__svelte__",i),i.page.set(a);let u=!1,h=!1,p=null;const f=oe(()=>t[1]);if(t[1]){n.push("<!--[0-->");const o=t[0];o?(n.push("<!--[-->"),o(n,{data:c,form:d,params:a.params,children:l=>{f()?(l.push("<!--[-->"),f()(l,{data:g,form:d,params:a.params}),l.push("<!--]-->")):(l.push("<!--[!-->"),l.push("<!--]-->"))},$$slots:{default:!0}}),n.push("<!--]-->")):(n.push("<!--[!-->"),n.push("<!--]-->"))}else{n.push("<!--[-1-->");const o=t[0];o?(n.push("<!--[-->"),o(n,{data:c,form:d,params:a.params}),n.push("<!--]-->")):(n.push("<!--[!-->"),n.push("<!--]-->"))}n.push("<!--]--> "),u?(n.push("<!--[0-->"),n.push('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px">'),h?(n.push("<!--[0-->"),n.push(`${Z(p)}`)):n.push("<!--[-1-->"),n.push("<!--]--></div>")):n.push("<!--[-1-->"),n.push("<!--]-->")})}var we=_e(be),Pe={app_template_contains_nonce:!1,async:!1,csp:{mode:"auto",directives:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1},reportOnly:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1}},csrf_check_origin:!0,csrf_trusted_origins:[],embedded:!1,env_public_prefix:"PUBLIC_",env_private_prefix:"",hash_routing:!1,hooks:null,preload_strategy:"modulepreload",root:we,service_worker:!1,service_worker_options:void 0,server_error_boundaries:!1,templates:{app:({head:e,body:s,assets:n,nonce:i,env:a})=>`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Resource Hints - DNS prefetch + preconnect for critical origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    
    <!-- Load fonts async for non-blocking render -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" as="style" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" media="print" onload="this.media='all'" />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" />
    </noscript>
    
    <!-- Critical CSS inline for instant first paint -->
    <style>
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      body{font-family:system-ui,sans-serif;background:#080810;color:#f0f0ff;min-height:100vh;-webkit-font-smoothing:antialiased}
      .nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:60px;background:rgba(14,14,26,.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06)}
      .logo{font-size:18px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#f0f0ff}
      .logo span{color:#00f5a0}
      .hero{padding:56px 32px 40px;position:relative;z-index:1}
      .hero-label{font-family:monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#00f5a0;margin-bottom:12px;opacity:0;animation:fade-up .42s .1s forwards}
      .hero-title{font-size:clamp(32px,5vw,56px);font-weight:800;line-height:1.05;letter-spacing:-.02em;margin-bottom:16px;opacity:0;animation:fade-up .42s .18s forwards}
      .hero-title em{font-style:normal;background:linear-gradient(135deg,#00f5a0,#7b61ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .hero-sub{font-size:15px;color:#8888aa;font-weight:400;max-width:480px;line-height:1.6;opacity:0;animation:fade-up .42s .26s forwards}
      @keyframes fade-up{to{opacity:1;transform:translateY(0)}from{opacity:0;transform:translateY(10px)}}
    </style>
    
    `+e+`
  </head>
  <body>
    <div id="app">`+s+`</div>
  </body>
</html>
`,error:({status:e,message:s})=>`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>`+s+`</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">`+e+`</span>
			<div class="message">
				<h1>`+s+`</h1>
			</div>
		</div>
	</body>
</html>
`},version_hash:"ww6f2y"};async function Re(){return{handle:void 0,handleFetch:void 0,handleError:void 0,handleValidationError:void 0,init:void 0,reroute:void 0,transport:void 0}}export{Ce as a,Ee as i,Pe as n,de as r,Re as t};
