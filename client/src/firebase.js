// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {browserSessionPersistence, getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgq_Rqn1XtMOFencRvPqStaVACazIpG6M",
  authDomain: "react-auth-5d448.firebaseapp.com",
  projectId: "react-auth-5d448",
  storageBucket: "react-auth-5d448.appspot.com",
  messagingSenderId: "419897056468",
  appId: "1:419897056468:web:bdf2e2f29a2ad38da22f41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence)
export const storage = getStorage(app)