import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkGmurhbv0B9twyy-gMpc9BPWERGu_Tw0",
  authDomain: "full-stack-music-player.firebaseapp.com",
  projectId: "full-stack-music-player",
  storageBucket: "full-stack-music-player.appspot.com",
  messagingSenderId: "701196475914",
  appId: "1:701196475914:web:f083920b0dff647aa209f3",
  measurementId: "G-GZJJNPRNR7",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
