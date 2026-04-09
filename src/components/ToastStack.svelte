<script lang="ts">
  import { toasts } from '../stores';
</script>

<div class="toast-stack" aria-live="polite">
  {#each $toasts as toast (toast.id)}
    <div class="toast">
      <span class="toast-icon">{toast.icon}</span>
      <div class="toast-body">
        <div class="toast-title">{toast.title}</div>
        <div class="toast-msg">{toast.msg}</div>
      </div>
    </div>
  {/each}
</div>

<style>
  .toast-stack {
    position: fixed;
    bottom: 56px;
    right: 24px;
    z-index: 500;
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    pointer-events: none;
  }
  .toast {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-card);
    border-radius: 10px;
    backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    max-width: 280px;
    pointer-events: all;
    animation: toast-in var(--dur-slow) var(--ease-spring) forwards;
  }
  @keyframes toast-in {
    from { transform: translateX(110%); opacity: 0; }
    to   { transform: none; opacity: 1; }
  }
  .toast-icon { font-size: 14px; flex-shrink: 0; }
  .toast-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1px;
  }
  .toast-msg {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-secondary);
  }
</style>
