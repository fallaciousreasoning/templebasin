import { auth, initializeApp, apps } from 'firebase';

const config = require('../firebase.config.json');

if (apps.length === 0)
    initializeApp(config);

export const ensureLoggedIn = async () => {
    const a = auth();

    if (!a.currentUser)
        await a.signInAnonymously();
        
    return a.currentUser;
}