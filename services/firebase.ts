import * as admin from 'firebase';

const config = require('../firebase.config.json');

if (!admin.apps.length)
    admin.initializeApp(config);

export const database = admin.database();