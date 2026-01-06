import { db } from "./firebase.js";
import { collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.addQuestion = async () => {
  await addDoc(collection(db, "questions"), {
    question: question.value,
    options: [opt1.value, opt2.value, opt3.value, opt4.value],
    correctIndex: Number(correctIndex.value)
  });

  alert("Question added");
};

async function loadResults() {
  const snap = await getDocs(collection(db, "results"));
  results.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();
    results.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.score}/${d.total}</td>
        <td>${d.cheatCount}</td>
        <td>${d.status}</td>
      </tr>
    `;
  });
}

loadResults();
