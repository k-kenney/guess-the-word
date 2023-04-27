const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const request = await fetch (
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
  const words = await request.text()
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  circleSymbol(word);
};

getWord();

const circleSymbol = function (word) {
  const circleSymbolLetters = [];
  for (const letter of word) {
    console.log(letter);
    circleSymbolLetters.push("●");
  }
  wordInProgress.innerText = circleSymbolLetters.join("");
};


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
    updateRemainingGuesses(guess);
    showGuessedLetters();
    updateProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // clear list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // console.log(wordArray);
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateRemainingGuesses = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";

  getWord();

  guessButton.classList.remove("hide");
  playAgain.classList.add("hide");
  remaining.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
