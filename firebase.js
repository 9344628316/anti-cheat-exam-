import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQGbAxxbz0D1ij9z1uA9x1qxUw-3WhOWs",
  authDomain: "anticheatexam-fdb43.firebaseapp.com",
  projectId: "anticheatexam-fdb43",
  storageBucket: "anticheatexam-fdb43.appspot.com",
  messagingSenderId: "245496265806",
  appId: "1:245496265806:web:2b44f0bbc1ffd46663171f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
