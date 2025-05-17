import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const username = writable('AmpElectrecuted');