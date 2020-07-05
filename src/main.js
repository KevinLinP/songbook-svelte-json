import 'bootstrap/dist/css/bootstrap.min.css'
import { routes } from 'svelte-hash-router';
import App from './App.svelte';
import SongsPage from './SongsPage.svelte';

routes.set({
	'/': SongsPage,
	'/:slug': SongsPage,
})

const app = new App({
	target: document.body,
});

export default app;

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js').then(registration => {
			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
		});
	});
}