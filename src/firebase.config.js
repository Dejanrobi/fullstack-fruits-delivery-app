//initialize firebase
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD8Z5g6-dpU3IDi8EC8kdgw_rtVLeiiR8",
  authDomain: "cloud-storage-1eb88.firebaseapp.com",
  databaseURL: "https://cloud-storage-1eb88-default-rtdb.firebaseio.com",
  projectId: "cloud-storage-1eb88",
  storageBucket: "cloud-storage-1eb88.appspot.com",
  messagingSenderId: "428945643052",
  appId: "1:428945643052:web:98d356948f8708b6096389",
  measurementId: "G-HCTKCLLQPS",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

//export all these information
export { app, firestore, storage };
