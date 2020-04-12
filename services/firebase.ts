import * as admin from 'firebase-admin';

const config = require('../firebase.config.json');

if (!admin.apps.length) {
    admin.initializeApp({
        ...config,
        credential: admin.credential.applicationDefault(),
    });
}

export const database = admin.database();