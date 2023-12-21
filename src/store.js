import { writable } from "svelte/store";
export const authedWritable = writable({
    authed: false,
    token: "",
    user: "",
});

