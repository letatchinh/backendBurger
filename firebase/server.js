import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpeMnM_qFVVFGaChI2qi17CRfn04koWUI",
  authDomain: "burger-demo-44d52.firebaseapp.com",
  projectId: "burger-demo-44d52",
  storageBucket: "burger-demo-44d52.appspot.com",
  messagingSenderId: "986029817603",
  appId: "1:986029817603:web:487dbb5329d65a2f693336",
  measurementId: "G-XH1SQHZLQV"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

