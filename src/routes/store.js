import { writable } from 'svelte/store';

export const file = writable(null);
export const name = writable(null);
export const password = writable("");
export const url = writable("");