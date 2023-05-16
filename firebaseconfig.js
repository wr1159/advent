// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getAnalytics, isSupported } = require('firebase/analytics');

// import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBJpSk-KbfXP8R-JDWIXz-GRvDyvbbqLAk',
  authDomain: 'advent-5877.firebaseapp.com',
  projectId: 'advent-5877',
  storageBucket: 'advent-5877.appspot.com',
  messagingSenderId: '879795196468',
  appId: '1:879795196468:web:7d41486708d86ebc36f061',
  measurementId: 'G-ZRQQ4B7XV6'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app;

const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
