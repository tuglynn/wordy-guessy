//declare constants
const secretWord = document.getElementById('secret-word');
const wordsGuessed = document.getElementById('words-guessed');
const userInput = document.getElementById('user-input');
const confirmBtn = document.getElementById('confirm-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const inputDisplay = document.getElementById('input-display');
const rules = document.getElementById('rules');
const instructions = document.getElementById('instructions');
//create array of words to guess
const arrOfWords = ['night', 'chaos', 'linux', 'chomp', 'shell', 'quick', 'helix', 'knoll', 'smite', 'tacit','atoll', 'piney', 'trope', 'flout', 'swill', 'inter', 'droll', 'pinto', 'epoxy', 'natal', 'coyly', 'spiel', 'homer', 'gawky', 'primo', 'trove', 'cacao', 'chart', 'swell'];
let currentWord = '';
let correctLetters = [];
//create function to pick a word
const pickRandomWord = () => {
  //generate random index number from array of words
  const wordIndex = Math.floor(Math.random() * arrOfWords.length);
  currentWord = {
   word: arrOfWords[wordIndex],
   i: wordIndex
  };
  return currentWord;
}
//hide or display rules
const displayRules = () => {
  instructions.classList.toggle("hidden");
}
//create function to display word spaces on page
const displayHiddenWord = () => {
  //get current word length
  const lettersOfWord = currentWord.word.split('');
  //generate letter spaces on play board
  lettersOfWord.forEach((letter) => {
    secretWord.innerHTML += `<span class="empty-space"> _ </span>`;
  });
}
//initialize game
const startGame = () => {
  //reset game
  reset();
  //enable input box
  userInput.style.display = 'inline';
  //enable confirm button
  confirmBtn.style.display = 'inline';
  resetBtn.style.display = 'inline';
  startBtn.style.display = 'none';
  //pick a random word
  pickRandomWord();
  console.log(currentWord.word);
  //get length of word
  displayHiddenWord();
}
//reset game
const reset = () => {
  //clear all values
  currentWord = '';
  secretWord.innerHTML = ``;
  userInput.value = '';
  wordsGuessed.innerHTML = ``;
  inputDisplay.innerHTML = ``;
  //hide game play items
  userInput.style.display = 'none';
  confirmBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  //set start button text
  startBtn.innerText = 'Start';
  //display start button
  startBtn.style.display = 'inline';
  //remove correctly guessed letters
  correctLetters = [];
}
//create function to put user words on screen
const displayUserInput = e => {
  //take user input and add to HTML
  inputDisplay.innerHTML = e.target.value
};
//win game function
const winGame = () => {
  //hide inputs
  userInput.style.display = 'none';
  confirmBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  //clear user input
  inputDisplay.innerHTML = ``;
  //change the start button text
  startBtn.textContent = 'Play again?';
  //show start button
  startBtn.style.display = 'inline';
  //get the hidden word as an array
  const splitCurrentWord = currentWord.word.toUpperCase().split('');
  //clear empty spaces
  secretWord.innerHTML = ``;
  //display hidden word
  splitCurrentWord.forEach((letter) => {
    secretWord.innerHTML += `<span class="empty-space"> ${letter} </span>`;
  });
  //tell the user they won
  secretWord.innerHTML += `<h2 class="winning">YOU WON!!!</h2>`;
  //add css animation
  //remove word from secret word array so play doesn't get the same word on continuing to play
  arrOfWords.splice(currentWord.i, 1);
};

//lose game function
const loseGame = () => {

}
//create function to test user input word against secret word
const compareWords = () => {
  if (userInput.value.length != currentWord.word.length) {
    alert(`Your guess must be ${currentWord.word.length} characters long! your guess was ${userInput.value.length} characters long`);
    return;
  };
//check how many guesses there have been
 if (wordsGuessed.children.length > 4) {
   alert('you lost already. game over');
   return;
 }
  //get user input
  const userLetters = userInput.value;
  //if the user guesses the current secret word
  if (userLetters === currentWord.word) {
    //they win!
    winGame();
  } else {
    const splitCurrentWord = currentWord.word.split('');
  //loop through both words
  for (let i = 0; i <= userLetters.length; i++) {
    //compare letters against each other
    for (let j =0; j <= 4; j++) {
      //if letters match, push them into array
      if (userLetters[i] === splitCurrentWord[j]) {
        //add correct letter to array
        correctLetters.push({
          letter: userLetters[i],
          //record where in the original word the correct letter is
          indexOfOriginalWord: i,
          //record where in the secret word the guessed letter is
          indexOfSecretWord: j
        });
        //change the letter in the split array to blank so it can check for doubles
        splitCurrentWord[j] = '_';
        console.log(splitCurrentWord);
      }
    }
  }
    //loop through correctly guessed letter and determine if they are in the right place in the word or if they are just in the word.
  //initialze guess HTML template
  let guessedWordHTMLTemp = ``;
  //break apart user guessed word and compare letters to secret word
    const userLettersArr = userLetters.split('');
  for (const letter of userLettersArr) {
  const matchedLetter = correctLetters.find((char) => char.letter === letter);

  if (matchedLetter) {
    if (matchedLetter.indexOfOriginalWord === matchedLetter.indexOfSecretWord) {
      guessedWordHTMLTemp += `<span class="guessed-letter correct-placement">${letter.toUpperCase()}</span>`;
      const emptySpaces = document.querySelectorAll('.empty-space');
      console.log(matchedLetter.letter);
      emptySpaces[matchedLetter.indexOfSecretWord].innerHTML = matchedLetter.letter.toUpperCase();
    } else {
      guessedWordHTMLTemp += `<span class="guessed-letter in-word-wrong-place">${letter.toUpperCase()}</span>`;
    }
  } else {
    guessedWordHTMLTemp += `<span class="guessed-letter not-in-word">${letter.toUpperCase()}</span>`;
  }
}
    //display user guessed word
    wordsGuessed.innerHTML += `<li>${guessedWordHTMLTemp}</li>`
    //remove all objects form correct letters array
    correctLetters = [];
    //clear user input
  userInput.value = '';
  inputDisplay.innerHTML = ``;
  }
}
//display guessed word
//let user know if letter is in the word
//let user know if the letter is in the correct position
//display guessed words
//event listener for submit button
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('input', displayUserInput);
confirmBtn.addEventListener('click', compareWords);
rules.addEventListener('click', displayRules);
userInput.addEventListener('keydown', e => {
  if (e.key === "Enter") compareWords();
});
