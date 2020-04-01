import * as firebase from 'firebase';

const config = require('../firebase.config.json');

if (!firebase.apps.length)
    firebase.initializeApp(config);

export const database = firebase.database();