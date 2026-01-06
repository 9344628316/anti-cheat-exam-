import { auth, db } from "./firebase.js";
import { collection, getDocs, addDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let questions = [];
let cheatCount = 0;
let time = 1800;
let submitted = false;

// Anti-cheat
document.body.oncopy =
document.body.onpaste =
document.body.oncut =
document.body.oncontextmenu = e => e.preventDefault();

window.onblur = triggerCheat;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) triggerCheat();
});

function triggerCheat() {
  if (submitted) return;
  cheatCount++;
  submitExam();
}

async function loadQuestions() {
  const snap = await getDocs(collection(db, "questions"));
  let qNo = 1;

  snap.forEach(doc => {
    const q = doc.data();
    q.selected = null; // ⭐ IMPORTANT
    questions.push(q);

    const qDiv = document.createElement("div");
    qDiv.className = "question-block";

    const qTitle = document.createElement("p");
    qTitle.innerText = `${qNo}. ${q.question}`;
    qDiv.appendChild(qTitle);

    q.options.forEach((opt, index) => {
      const label = document.createElement("label");
      label.className = "option-label";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "q" + qNo;

      radio.addEventListener("change", () => {
        q.selected = index; // ⭐ DIRECT STORE
      });

     const span = document.createElement("span");
span.innerText = opt;

label.appendChild(radio);
label.appendChild(span);

      qDiv.appendChild(label);
    });

    exam.appendChild(qDiv);
    qNo++;
  });
}

["copy", "cut", "paste", "contextmenu", "selectstart"].forEach(evt => {
  document.addEventListener(evt, e => e.preventDefault());
});

document.addEventListener("keydown", e => {
  if (
    (e.ctrlKey && ["c", "x", "v", "a"].includes(e.key.toLowerCase())) ||
    e.key === "PrintScreen"
  ) {
    e.preventDefault();
  }
});


async function submitExam() {
  if (submitted) return;
  submitted = true;

  let score = 0;
  questions.forEach(q => {
    if (q.selected === q.correctIndex) score++;
  });

  await addDoc(collection(db, "results"), {
    uid: auth.currentUser.uid,
    name: studentName.value,
    score: score,
    total: questions.length,
    cheatCount: cheatCount,
    status: cheatCount > 0 ? "Cheated" : "Clean",
    timestamp: Date.now()
  });

  alert("Exam submitted successfully");
  location.href = "results.html";
}

submitBtn.addEventListener("click", submitExam);

setInterval(() => {
  if (submitted) return;
  time--;
  timer.innerText = time;
  if (time <= 0) submitExam();
}, 1000);

loadQuestions();
