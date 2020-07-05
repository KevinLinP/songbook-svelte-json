import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from 'svelte-hash-router'
import App from './App.svelte';
import SongsPage from './SongsPage.svelte'

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

routes.set({
	'/': SongsPage,
	'/:slug': SongsPage,
})

const app = new App({
	target: document.body,
});

export default app;