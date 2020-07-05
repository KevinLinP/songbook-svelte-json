import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from 'svelte-hash-router'
import App from './App.svelte';
import SongsPage from './SongsPage.svelte'

routes.set({
	'/': SongsPage,
	'/:slug': SongsPage,
})

const app = new App({
	target: document.body,
});

export default app;

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}