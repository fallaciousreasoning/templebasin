import * as admin from 'firebase-admin';

const config = require('../firebase.config.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

if (!admin.apps.length) {
    admin.initializeApp({
        ...config,
        credential: admin.credential.cert(adminConfig)
    });
}

export const database = admin.database();