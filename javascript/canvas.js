class HangmanCanvas {
  constructor(secretWord) {
    this.canvas = document.getElementById("hangman");
    this.context = this.canvas.getContext("2d");
    this.secretWord = secretWord;
    // Sets the drawing
    this.context.lineWidth = 3;
    this.context.font = "30px Arial";
  }

  createBoard() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draws the initial lines
    this.drawLines();
  }

  auxSetLines1() {
    // Sets the array to draw initial layout
    const resp = [];
    // Triangle
    resp.push([205, 620]); // Origin
    resp.push([245, 660]);
    resp.push([165, 660]);
    resp.push([205, 620]);
    // Structure
    resp.push([205, 70]);
    resp.push([500, 70]);
    resp.push([500, 145]);
    return resp;
  }

  auxSetLines2(numLetters) {
    // Set lines for letters
    const resp = [];
    const y = 650;
    let x = 280;
    for (let i = 1; i <= numLetters; i++) {
      resp.push([
        [x, y],
        [x + 50, y]
      ]);
      x += 80;
    }
    return resp;
  }

  auxDraw(context, arr) {
    // Receives an array of pairs [x,y], the first is the start position and the next ones are the consecutive points
    let origin = arr.shift();
    let end = arr.shift();
    // Starts drawing
    context.beginPath();
    while (end) {
      context.moveTo(origin[0], origin[1]);
      context.lineTo(end[0], end[1]);
      origin = end;
      end = arr.shift();
    }
    context.stroke();
    context.closePath();
  }

  drawLines() {
    // Retrieves lines for the initial structure, then draws them
    this.auxDraw(this.context, this.auxSetLines1());
    // Retrieves lines for the underlines of each letter, then draws them
    this.auxSetLines2(this.secretWord.length).forEach(array => {
      this.auxDraw(this.context, array);
    });
    // Tests:
    // for (let i = 0; i < this.secretWord.length; i++) {
    //   this.writeCorrectLetter(i);
    // }
    // for (let j = 9; j >= 0; j--) {
    //   setTimeout(() => {
    //     this.writeWrongLetter("ABCDEFGHIJ"[j], j);
    //     this.drawHangman(j+1);
    //   }, 1000 * (10 - j))
    // }
    // this.gameOver();
    // this.winner();
  }

  writeCorrectLetter(index) {
    let xStart = 290;
    let y = 635;
    this.context.fillText(this.secretWord[index], xStart + 80 * index, y);
  }

  writeWrongLetter(letter, errorsLeft) {
    let xStart = 550;
    let y = 200;
    this.context.fillText(letter, xStart + 50 * (10 - errorsLeft), y);
  }

  drawHangman(errorsLeft) {
    switch ((11 - errorsLeft)) {
      case 4: // Nose
        this.auxDraw(this.context, [
          [490, 190],
          [500, 180],
          [510, 190]
        ]);
        break;
      case 5: // Mouth
        this.auxDraw(this.context, [
          [480, 200],
          [520, 200]
        ]);
        break;
      case 6: // Trunk
        this.auxDraw(this.context, [
          [500, 235],
          [500, 460]
        ]);
        break;
      case 7: // Right leg
        this.auxDraw(this.context, [
          [500, 460],
          [450, 550]
        ]);
        break;
      case 8: // Left leg
        this.auxDraw(this.context, [
          [500, 460],
          [550, 550]
        ]);
        break;
      case 9: // Right arm
        this.auxDraw(this.context, [
          [410, 240],
          [500, 290]
        ]);
        break;
      case 10: // Left arm
        this.auxDraw(this.context, [
          [500, 290],
          [590, 240]
        ]);
        break;
      // Circles / Arcs
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      // arcTo(x1, y1, x2, y2, radius)
      case 1: // Head
        this.context.beginPath();
        this.context.arc(500, 190, 45, 0, 360);
        this.context.stroke();
        this.context.closePath();
        break;
      case 2: // Right eye
        this.context.beginPath();
        this.context.moveTo(470,170);
        this.context.arcTo(480, 160, 490, 170, 20);
        this.context.arcTo(480, 180, 470, 170, 20);
        this.context.stroke();
        this.context.closePath();
        break;
      case 3: // Left eye
        this.context.beginPath();
        this.context.moveTo(510,170)
        this.context.arcTo(520, 160, 530, 170, 20);
        this.context.arcTo(520, 180, 510, 170, 20);
        this.context.stroke();
        this.context.closePath();
        break;
      default:
        console.log("Revisar canvas..");
        break;
    }
  }

  gameOver() {
    let img = new Image();
    img.src = "images/gameover.png";
    img.addEventListener('load', () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }, false)
  }

  winner() {
    let img = new Image();
    img.src = "images/awesome.png";
    img.addEventListener('load', () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }, false)
  }
}
