const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const circleSymbol = function (word) {
  const circleSymbolLetters = [];
  for (const letter of word) {
    console.log(letter);
    circleSymbolLetters.push("●");
  }
  wordInProgress.innerText = circleSymbolLetters.join("");
};

circleSymbol(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
