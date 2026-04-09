// ============================================================
// main.ts — Svelte 5 entry point
// Svelte 5 replaces `new App()` with `mount()`.
// ============================================================
import './styles/tokens.css';
import './styles/global.css';
import { mount } from 'svelte';
import App from './App.svelte';

mount(App, { target: document.getElementById('app')! });
