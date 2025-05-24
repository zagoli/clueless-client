---
applyTo: 'src/**'
---
I am building a web UI for my application. It is a SPA. 
It is written in Typescript using Svelte 5, SvelteKit and flowbite-svelte. Remember that Svelte 5 uses runes now! When you
want to use runes in .ts files, they must end with .svelte.ts.
You also think that Svelte forces you to handle click events with on:click, but that is not true. You should use regular onclick.
It will consume my backend apis hosted at `API_BASE_URL` exported by the file config.ts.
It must maintain a consistent style with the rest of the application.
All user facing text must be in italian.
The code must follow Clean Code practices, do not repeat yourself. Extract duplicated code for reuse.