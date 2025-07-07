document.querySelector("button").addEventListener("click", gradeQuiz);

// Global variables
var score = 0;
var totalAttempts = localStorage.getItem("total_attempts") || 0;

// Display Q4 choices in random order
displayQ4Choices();
function displayQ4Choices() {
  let q4ChoicesArray = ["Delaware", "Maine", "Maryland", "Rhode Island"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);

  for (let i = 0; i < q4ChoicesArray.length; i++) {
    document.querySelector("#q4Choices").innerHTML += `
      <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
      <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]} </label>
    `;
  }
}

function isFormValid() {
  let q1 = document.querySelector("#q1").value.trim();
  if (!q1) {
    document.querySelector("#validationFdbk").innerHTML = "Please answer Question 1.";
    return false;
  }
  document.querySelector("#validationFdbk").innerHTML = "";
  return true;
}

function gradeQuiz() {
  if (!isFormValid()) return;

  score = 0;

  // Q1
  let q1 = document.querySelector("#q1").value.trim().toLowerCase();
  q1 === "sacramento" ? rightAnswer(1) : wrongAnswer(1);

  // Q2
  let q2 = document.querySelector("#q2").value;
  q2 === "Missouri" ? rightAnswer(2) : wrongAnswer(2);

  // Q3
  let jeff = document.querySelector("#Jefferson").checked;
  let rose = document.querySelector("#Roosevelt").checked;
  let jack = document.querySelector("#Jackson").checked;
  let frank = document.querySelector("#Franklin").checked;
  (jeff && rose && !jack && !frank) ? rightAnswer(3) : wrongAnswer(3);

  // Q4
  let q4 = document.querySelector("input[name=q4]:checked");
  (q4 && q4.value === "Rhode Island") ? rightAnswer(4) : wrongAnswer(4);

  // Q5
  let q5 = document.querySelector("#q5").value;
  (q5 === "1776-07-04") ? rightAnswer(5) : wrongAnswer(5);

  // Q6
  let q6 = document.querySelector("#q6").value;
  (q6 === "50") ? rightAnswer(6) : wrongAnswer(6);

  // Q7
  let q7 = document.querySelector("#q7").value.toLowerCase();
  (q7 === "#ff0000") ? rightAnswer(7) : wrongAnswer(7); // red top stripe

  // Q8
  let q8 = document.querySelector("#q8").value.trim().toLowerCase();
  const validTerritories = ["guam", "puerto rico", "american samoa", "us virgin islands", "northern mariana islands"];
  (validTerritories.includes(q8)) ? rightAnswer(8) : wrongAnswer(8);

  // Q9
  let q9 = document.querySelector("input[name=q9]:checked");
  (q9 && q9.value === "East") ? rightAnswer(9) : wrongAnswer(9);

  // Q10
  let q10 = document.querySelector("#q10").value;
  (q10 === "Florida") ? rightAnswer(10) : wrongAnswer(10);

  // Display score
  let scoreDiv = document.querySelector("#totalScore");
  scoreDiv.innerHTML = `Total Score: ${score}`;
  if (score >= 80) {
    scoreDiv.className = "score-pass";
    scoreDiv.innerHTML += "<br>🎉 Great job!";
  } else {
    scoreDiv.className = "score-fail";
  }

  // Store and show attempts
  totalAttempts++;
  document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${totalAttempts}`;
  localStorage.setItem("total_attempts", totalAttempts);
}

// Feedback display
function rightAnswer(index) {
  document.querySelector(`#markImg${index}`).innerHTML = "✅";
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.innerHTML = "Correct!";
  feedback.className = "feedback bg-pink";
  score += 10;
}

function wrongAnswer(index) {
  document.querySelector(`#markImg${index}`).innerHTML = "❌";
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.innerHTML = "Incorrect";
  feedback.className = "feedback bg-purple";
}
