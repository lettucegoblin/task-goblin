// store.js
import { writable } from 'svelte/store';

export const theme = writable('dark');  // default theme

export const todos = writable([]);  // default todos

export const roomCode = writable('defaultRoom');  // default roomCode
