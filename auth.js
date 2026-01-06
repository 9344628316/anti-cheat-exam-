import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  error.innerText = "";

  if (!email.value || !password.value) {
    error.innerText = "Please enter email and password";
    return;
  }

  try {
    // ✅ FORCE AUTH TO WORK ON ALL DEVICES
    await setPersistence(auth, browserLocalPersistence);

    const userCred = await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    );

    const uid = userCred.user.uid;

    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) {
      error.innerText = "Role not assigned. Contact admin.";
      return;
    }

    const role = snap.data().role;

    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "exam.html";
    }

  } catch (err) {
    console.error(err);
    error.innerText = err.message;
  }
});
