"use strict";
let guess = Math.trunc(Math.random() * 20) + 1;
let gameScore = 0;
let gameHighScore = 0;
let gameTries = 30;
let highScoreBoxValue;
let checkInputValue = 0;
const checkBtn = document.querySelector(".checkBtn");
let agianBtn = document.querySelector(".restart");
let checkMessage = ``;
console.log(guess);

function wrongIcon() {
  return document.querySelector(".item-messagebox .fa-solid");
}
function messageBoxBtn1() {
  return document.querySelector(".item-messagebox-btns .btn-1");
}
function messageBoxBtn2() {
  return document.querySelector(".item-messagebox-btns .btn-2");
}
function messageBox() {
  return document.querySelector(".messagebox");
}
function messageBoxAddDisplay() {
  return messageBox().classList.add("d-none");
}
function messageBoxRemoveDisplay() {
  return messageBox().classList.remove("d-none");
}

function messageBoxContent(message) {
  return (document.querySelector(".item-messagebox-message h5").innerHTML =
    message);
}

function highScoreSaveBox(message) {
  document.querySelector(".highScoreValue").innerHTML = message;
}

function localStorageData() {
  if (localStorage.getItem("currentHighScore") != null) {
    highScoreBoxValue = localStorage.getItem("currentHighScore");
    highScoreSaveBox(highScoreBoxValue);
  } else {
    highScoreBoxValue = 0;
    highScoreSaveBox(highScoreBoxValue);
  }
}

// document.querySelector('.reset').addEventListener('click',()=>clearLocalStorage())
function clearLocalStorage() {
  localStorageData(localStorage.clear());
}

function gameMessage(message) {
  document.querySelector(".resultChecked").innerHTML = message;
  return message;
}

function countGameTries(message) {
  document.querySelector(".tries").innerHTML = message;
}

function countGameScore(message) {
  document.querySelector(".score").innerHTML = message;
}

function changebackGroundColor(message) {
  document.querySelector("body").style.cssText = message;
}

function checkBtnDisable() {
  checkBtn.classList.add("disabled");
}

function checkBtnEnable() {
  checkBtn.classList.remove("disabled");
}

function countHighScore(message) {
  document.querySelector(".high_score").innerHTML = message;
}

function showSecretNumber(message) {
  document.querySelector(".secretNumber h1").innerHTML = message;
}
function secretNumberStyle(message) {
  document.querySelector(".secretNumber h1").style.cssText = message;
}

function emptyInput() {
  document.querySelector(".checkInput").value = ``;
}
function checkInput() {
  return document.querySelector(".checkInput");
}

function inputDisable(checkInput) {
  checkInput.classList.add("disabled");
}
function inputEnable(checkInput) {
  checkInput.classList.remove("disabled");
}

function check(checkInput) {
  checkInputValue = Number(checkInput.value);
  if (checkMessage === `&#127881; correct number!`) {
    messageBoxRemoveDisplay();
    messageBoxContent(
      `&#10060; you have to press Agian button at the top of the screen or Esc button on your keyBoard or ok button`
    );
  } else {
    const ResCheckInput = Number(checkInput.value);
    checkBtnEnable();
    if (!ResCheckInput && gameTries > 1 && checkInput.value === ``) {
      gameTries--;
      console.log(gameTries);
      countGameTries(gameTries);
      gameMessage(`&#9940; no guessing number!`);
    } else if (ResCheckInput === guess) {
      changebackGroundColor(`background-color:#60b347`);
      checkMessage = gameMessage(`&#127881; correct number!`);
      showSecretNumber(guess);
      secretNumberStyle(`width:12.5rem`);
      checkBtnDisable();
      inputDisable(checkInput);
      if (gameTries <= 30 && gameTries >= 20) {
        gameScore += 10;
        gameHighScore += gameScore;
        countGameScore(gameScore);
        countHighScore(gameHighScore);
      } else if (gameTries < 20 && gameTries >= 10) {
        gameScore += 8;
        gameHighScore += gameScore;
        countGameScore(gameScore);
        countHighScore(gameHighScore);
      } else if (gameTries < 10 && gameTries >= 1) {
        gameScore += 6;
        gameHighScore += gameScore;
        countGameScore(gameScore);
        countHighScore(gameHighScore);
      }
    } else if (ResCheckInput !== guess) {
      if (gameTries <= 1) {
        if (gameTries > 0) {
          gameTries--;
          countGameTries(gameTries);
        } else {
          messageBoxRemoveDisplay();
          messageBoxContent(
            `&#10060; you have to press Agian button at the top of the screen or Esc button on your keyBoard or ok button to restart game`
          );
        }
        checkMessage = gameMessage(`&#128532; game over`);
        if (gameHighScore > highScoreBoxValue) {
          highScoreBoxValue = gameHighScore;
          messageBoxContent(
            `&#127882; congratulations, You have set a new record!`
          );
          document.removeEventListener("keydown", function () {
            return true;
          });
          messageBoxRemoveDisplay();
        } else {
          highScoreBoxValue = highScoreBoxValue;
        }
        localStorage.setItem("currentHighScore", Number(highScoreBoxValue));
        highScoreSaveBox(localStorage.getItem("currentHighScore"));
        checkBtnDisable();
        inputDisable(checkInput);
        checkInput.value = "";
      } else {
        ResCheckInput > 20 || ResCheckInput < 1
          ? (checkMessage = gameMessage(
              `&#10060; the guessing number <br/> should be between (1 & 20)`
            ))
          : ResCheckInput > guess
          ? (checkMessage = gameMessage(`&#128200; too high`))
          : (checkMessage = gameMessage(`&#128201; too low`));
        gameTries--;
        countGameTries(gameTries);
      }
    }
  }
}

function agian(checkInput) {
  if (gameTries === 30 && checkMessage !== `&#127881; correct number!`) {
    return true;
  } else {
    messageBoxAddDisplay();
    guess = Math.trunc(Math.random() * 20) + 1;
    if (gameTries == 0) {
      gameTries = 30;
      gameScore = 0;
      gameHighScore = 0;
      checkMessage = gameMessage(`&#128512; start guessing ... `);
    } else {
      gameTries = gameTries;
      checkMessage = gameMessage(`&#129303; guess agian ... `);
    }
    countGameTries(gameTries);
    countGameScore(gameScore);
    countHighScore(gameHighScore);
    changebackGroundColor(`background-color:#222`);
    showSecretNumber("?");
    secretNumberStyle(`width:11rem`);
    checkInput.value = "";
    checkBtnEnable();
    inputEnable(checkInput);
  }
}

agianBtn.addEventListener("click", () => {
  console.log("yes1");
  agian(checkInput());
});

checkBtn.addEventListener("click", () => {
  check(checkInput());
  emptyInput();
});

wrongIcon().addEventListener("click", messageBoxAddDisplay);

messageBoxBtn1().addEventListener("click", () => {
  messageBoxAddDisplay();
  agian(checkInput());
});

messageBoxBtn2().addEventListener("click", messageBoxAddDisplay);

document.addEventListener("keydown", (e) => {
  if (messageBox().classList.contains("d-none") === false) {
    if (e.key === "Enter") {
      $(messageBoxBtn1()).click();
    }
  } else {
    for (let i = 0; i < 10; i++) {
      if (Number(e.key) === i) {
        document.querySelector(".checkInput").focus();
      }
    }
    if (e.key === "Enter") {
      document.querySelector(".checkInput").blur();
      check(checkInput());
      emptyInput();
    } else if (e.key === "Escape") {
      agian(checkInput());
    } else if (e.key === "Delete") {
      if (gameTries < 30 || checkInputValue === guess) {
        messageBoxRemoveDisplay();
        messageBoxContent(
          `&#10060; you can't reset the high score while playing`
        );
      } else {
        clearLocalStorage();
        localStorageData();
      }
    }
  }
});

window.addEventListener("load", () => {
  localStorageData();
  countGameTries(gameTries);
  countGameScore(gameScore);
  countHighScore(gameHighScore);
});
