import { writable } from "svelte/store";
import dotenv from "dotenv"


import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.DB);

export const currentUser = writable(pb.authStore.model); // = null if not logged in OR user object model if logged in

// La value va changer si l'utilisateur se connecte ou se déconnecte 
// alors on peut écouter les changements de la value de currentUser

pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});

// une fois la connexion établie on créer Login.svelte
    


