class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  checkIfLetter(keyCode) {
    // 65..90 = a..z (A..Z)
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    this.checkWinner();
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
    for (var i = 0; i < gl.length; ++i) {
      if (gl[i] !== sw[i]) return false;
    }
    return true;
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
  });
}

document.addEventListener("keydown", event => {
  // console.log(event.code);
  if (hangman.checkIfLetter(event.keyCode)) {
    // console.log(String.fromCharCode(event.code));
    // React to user pressing a key
    let letter = event.code[event.code.length - 1];
    console.log(letter);
    if (hangman.secretWord.toUpperCase().includes(letter)) {
      // ++ PENDIENTE TERMINAR ESTA LÓGICA +++
      hangman.addCorrectLetter(letter);
      hangmanCanvas.writeCorrectLetter(letter);
    } else {
      // ++ PENDIENTE TERMINAR ESTA LÓGICA +++
      hangman.addWrongLetter(letter);
      hangmanCanvas.writeWrongLetter(letter);
    }
  }
});
