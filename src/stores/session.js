import { writable } from 'svelte/store';

export const isLoggedIn = writable(true);
export const isBanned = writable(false);
export const username = writable('AmpElectrecuted');