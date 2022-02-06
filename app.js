//////////////////////////////////////////////////////////////
///////////////////// DOM Manipulation ///////////////////////
///////////////////////////////////////////////////////////////
const domBody = document.body;
// score display Element Create
const score = document.createElement("h3");
score.innerText = "Score: ";
domBody.appendChild(score);
const scoreDisplay = document.createElement("span");
scoreDisplay.id = "score";
scoreDisplay.innerText = "0";
score.appendChild(scoreDisplay);

//start/pause button Element Create
const startBTTN = document.createElement("button");
startBTTN.id = "start-button";
startBTTN.innerText = "Start/Pause";
domBody.appendChild(startBTTN);

//game container Element Create
const grid = document.createElement("div");
grid.classList = "grid";
domBody.appendChild(grid);
//grid container
let squares = [];
for (let i = 0; i < 200; i++) {
  let girdDiv = document.createElement("div");
  grid.appendChild(girdDiv);
  squares.push(girdDiv);
}
for (let i = 0; i < 10; i++) {
  let girdDiv = document.createElement("div");
  girdDiv.classList = "taken";
  grid.appendChild(girdDiv);
  squares.push(girdDiv);
}

////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////////////////////////////
const width = 10; //# of square to next row
// The Tetrominos
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [(width, width + 1, width + 2, width * 2 + 2)],
  [(width * 2, width * 2 + 1, width + 1, 1)],
  [(width, width * 2, width * 2 + 1, width * 2 + 2)],
];
const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//draw tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

// undraw
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

timerID = setInterval(moveDown, 1000);

//move
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

//hit
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    //start new tetromino
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
  }
}

//only move functions
function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge) currentPosition -=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }
  draw()
}

function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

//keyup()
function control(e) {
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowUp") {
    // rotate()
    console.log("rotate");
  } else if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowDown") {
    moveDown();
  }
}
document.addEventListener("keyup", control);
