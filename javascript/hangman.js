let finished = false;

class Hangman {
  constructor(words) {
    this.words = words;
    //this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    const resp = this.words[Math.floor(Math.random() * this.words.length)];
    console.log(resp);
    return resp;
  }

  checkIfLetter(keyCode) {
    // 65..90 = a..z (A..Z)
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    // Be aware that the guessedLetters is not in the same order
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft -= 1;
    if (!this.letters.includes(letter)) this.letters.push(letter);
    this.checkGameOver();
  }

  checkGameOver() {
    return !(this.errorsLeft > 0);
  }

  checkWinner() {
    // Expands and orders guessedLetters alphabetically and compares with this.secretWord ordered the same way
    let gl = [...this.guessedLetters].sort((a, b) => a.localeCompare(b));
    let sw = [...this.secretWord].sort((a, b) => a.localeCompare(b));
    if (gl.length != sw.length) return false;
    // Compares each one of the letters, if any is different, returns false
    for (var i = 0; i < gl.length; ++i) {
      if (gl[i] !== sw[i]) return false;
    }
    // All are equal, returns true
    return true;
  }

  chekIfNewFits(letter) {
    // Returns the index of the new letter, if doesn't fit, returns -1
    let resp = -1;
    // Checks the number of times the letters appears on the secretWord
    const times_in_sw = [...this.secretWord.toUpperCase()].filter(
      l => l === letter
    ).length;
    // Checks the number of times the letter has appeared in guessedLetters
    const times_in_gl = [...this.guessedLetters.toUpperCase()].filter(
      l => l === letter
    ).length;
    // Returns the new index, if the new letter can fit
    if (times_in_gl < times_in_sw) {
      // Determines the start index
      for (let i = 0; i <= times_in_gl; i++) {
        resp = this.secretWord.toUpperCase().indexOf(letter, resp + 1);
      }
    }
    return resp;
  }
}

let hangman;

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", event => {
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa"
    ]);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
    hangmanCanvas.createBoard();
    finished = false;
  });
}

document.addEventListener("keydown", event => {
  // console.log(event.code);
  if (!finished && hangman.checkIfLetter(event.keyCode)) {
    // console.log(String.fromCharCode(event.code));
    // React to user pressing a key
    let letter = event.code[event.code.length - 1];
    // Sí incluye la letra:
    if (hangman.secretWord.toUpperCase().includes(letter)) {
        // An index and a letter must be generated if the new letter fits:
        const idx = hangman.chekIfNewFits(letter);
        if (idx >= 0) {
          // Receives a letter:
          hangman.addCorrectLetter(hangman.secretWord[idx]);
          // Receives an index
          hangmanCanvas.writeCorrectLetter(idx);
          if (hangman.checkWinner()) {
            hangmanCanvas.winner();
            finished = true;
          }
      }
    } else {
      // No incluye la letra
      // Revisa si ya se había previamente fallado con esta letra
      if (hangman.checkClickedLetters(letter)) {
        hangmanCanvas.drawHangman(hangman.errorsLeft);
        hangman.addWrongLetter(letter);
        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
          finished = true;
        }
      }
    }
  }
});
