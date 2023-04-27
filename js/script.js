const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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
  message.innerText = "";
  const guess = inputLetter.value;
  const goodGuess = playersInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  // const guess = letterInput.value;
  // console.log(guess);
  inputLetter.value = "";
});

const playersInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
