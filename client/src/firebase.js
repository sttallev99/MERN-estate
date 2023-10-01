// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBrdd1U2L2zzLfMn2-vPOtDDqEZ7odnI_I',
  authDomain: "mern-estate-e727c.firebaseapp.com",
  projectId: "mern-estate-e727c",
  storageBucket: "mern-estate-e727c.appspot.com",
  messagingSenderId: "218130433031",
  appId: "1:218130433031:web:88d4577dd7a4c7fbe116a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);