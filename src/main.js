import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
  hydratable: true
});

export default app;
