import * as admin from 'firebase-admin';

if (!process.env.FIREBASE_CONFIG) {
    throw new Error("Please add the firebase admin config to a FIREBASE_CONFIG environment variable");
}

const config = require('../firebase.config.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

if (!admin.apps.length) {
    admin.initializeApp({
        ...config,
        credential: admin.credential.cert(adminConfig)
    });
}

export const database = admin.database();