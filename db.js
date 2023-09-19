// Import the functions you need from the SDKs you need
const firebase = require("firebase");
// const getAnalytics =  firebase.analytics();
const database = require( "firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBElnw-clXXwntk-8fzxVOSihF47zWZ-_s",
  authDomain: "movie-app-76a3d.firebaseapp.com",
  projectId: "movie-app-76a3d",
  storageBucket: "movie-app-76a3d.appspot.com",
  messagingSenderId: "1057187379114",
  appId: "1:1057187379114:web:a9976997db35858e8e1dd3",
  measurementId: "G-9LRVF42F3G",
  databaseURL: "https://movie-app-76a3d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



//   writeListData(1234, 1234, "favorites", 12345)

  module.exports = {
    database
  }
  