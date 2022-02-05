const domBody = document.body;

// score display Element Create
const score = document.createElement("h3");
score.innerText = "Score: ";
domBody.appendChild(score);
const scoreDisplay = document.createElement("span");
scoreDisplay.id = "score";
scoreDisplay.innerText = "0";
score.appendChild(scoreDisplay)

//start/pause button Element Create
const startBTTN = document.createElement("button")
startBTTN.id = "start-button"
startBTTN.innerText = "Start/Pause"
domBody.appendChild(startBTTN)

//game container Element Create
const grid = document.createElement("div")
grid.classList = "grid"
domBody.appendChild(grid)
//grid container
for (let i = 0; i < 200; i++){
    let girdDiv = document.createElement('div')
    grid.appendChild(girdDiv)
} 




