const waitingText = document.getElementById("waiting-text");
const resultsPage = document.getElementById("results-page");

const pRockButton = document.getElementById("pRock");
const pPaperButton = document.getElementById("pPaper");
const pScissorsButton = document.getElementById("pScissors");

const cRockButton = document.getElementById("cRock");
const cPaperButton = document.getElementById("cPaper");
const cScissorsButton = document.getElementById("cScissors");

const pSubtitle = document.getElementById("player-subtitle");
const cSubtitle = document.getElementById("computer-subtitle");

const choices = ["Rock", "Paper", "Scissors"];

let currentPlayerChoice, currentComputerChoice;

pRockButton.onclick = function () {
  playerChose("Rock");
};
pPaperButton.onclick = function () {
  playerChose("Paper");
};
pScissorsButton.onclick = function () {
  playerChose("Scissors");
};

const playerChose = (choice) => {
  if (currentComputerChoice != undefined) {
    changeClass(currentComputerChoice);
  }
  //   console.log(currentComputerChoice);
  pSubtitle.innerHTML = `You chose ${choice}`;
  setTimeout(() => computerChose(), 400);
  currentPlayerChoice = choice;
};

const computerChose = () => {
  cSubtitle.innerHTML = `Making a selection...`;
  let computerChoice = `c${
    choices[Math.round(Math.random() * (choices.length - 1))]
  }`;
  currentComputerChoice = computerChoice;
  setTimeout(() => (cSubtitle.innerHTML = `Computer has chosen`), 700);
  setTimeout(() => changeClass(computerChoice), 700);

  setTimeout(
    () => pushResults(currentPlayerChoice, currentComputerChoice),
    700
  );
};

const changeClass = (btn) => {
  if (document.getElementById(btn).classList.contains("btn-disabled")) {
    document.getElementById(btn).classList.remove("btn-disabled");
    document.getElementById(btn).classList.add("btn-secondary");
  } else {
    document.getElementById(btn).classList.add("btn-disabled");
    document.getElementById(btn).classList.remove("btn-secondary");
  }
};

const pushResults = (playersChoice, computersChoice) => {
  let result;

  if (playersChoice == currentComputerChoice.slice(1)) {
    result = 0;
  } else if (
    (playersChoice === "Rock" && currentComputerChoice === "cPaper") ||
    (playersChoice === "Paper" && currentComputerChoice === "cScissors") ||
    (playersChoice === "Scissors" && currentComputerChoice == "cRock")
  ) {
    result = -1;
  } else {
    result = 1;
  }

  createResult(playersChoice, computersChoice, result);
};

const createResult = (playersChoice, computersChoice, result) => {
  let tag = document.createElement("p");
  let text = document.createTextNode(
    ` You chose ${playersChoice} vs ${computersChoice.slice(1)}`
  );
  tag.appendChild(text);
  switch (result) {
    case 1:
      tag.className += "win";
      break;
    case 0:
      tag.className += "draw";
      break;
    case -1:
      tag.className += "lose";
      break;
  }
  waitingText.innerHTML = "";
  resultsPage.appendChild(tag);
};
