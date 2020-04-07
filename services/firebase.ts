import * as firebase from 'firebase';

const config = require('../firebase.config.json');

if (!firebase.apps.length)
    firebase.initializeApp(config);

export const database = firebase.database();

export const ensureLoggedIn = async () => {
    const auth = firebase.auth();

    if (!auth.currentUser)
        await auth.signInAnonymously();
        
    return auth.currentUser;
}