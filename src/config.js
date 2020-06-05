import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyBiV2PEoqsxo3PHEUzcvEeF73uPnNKWtqs",
    authDomain: "exportdata-18c88.firebaseapp.com",
    databaseURL: "https://exportdata-18c88.firebaseio.com",
    projectId: "exportdata-18c88",
    storageBucket: "exportdata-18c88.appspot.com",
    messagingSenderId: "586900029924",
    appId: "1:586900029924:web:8672d1ad73673453b087f1",
    measurementId: "G-6RKDGBM0E7"
};

const fire = firebase.initializeApp(config);

export default fire;