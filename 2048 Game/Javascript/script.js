document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");

  let squares = [];
  let gridSize = 4;
  let squareSize = gridSize * gridSize;
  let score = 0;

  createBoard();

  checkWin();

  document.addEventListener("keyup", control);

  function createBoard() {
    for (let i = 0; i < squareSize; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateTwo();
    generateTwo();
  }

  function generateTwo() {
    let random = Math.floor(Math.random() * squares.length)
    if (squares[random].innerHTML == 0) {
      squares[random].innerHTML = 2;
      checkLose();
    } else generateTwo();
  }

  function control(event) {
    if (event.keyCode === 39) {
      keyRight();
    } else if (event.keyCode === 37) {
      //keyLeft();
    } else if (event.keyCode === 38) {
      //keyUp();
    } else if (event.keyCode === 40) {
      //keyDown();
    }
  }

  function keyRight(){
    moveRight()
    sumRow()
    //generateTwo()
  }

  function moveRight(){
    for(let i = 0; i< squares.length; i++){
        if(i %  gridSize == 0){
          moveAllToRight(i)
        }
    }
  }

  function moveAllToRight(gridIndex){
    let row = []
    for(let i = 0; i < gridSize; i++){
      row.push(parseInt(squares[gridIndex + i].innerHTML))
    }

    let filteredRow = row.filter(x=> x!= 0)
    let missing = gridSize - filteredRow.length
    let zeros = Array(missing).fill(0)
    let newRow = zeros.concat(filteredRow)

    for(let i = 0; i < gridSize; i++){
      squares[gridIndex +i].innerHTML = newRow[i]
    }
  }

  function sumRow(){
    for(let i = 0; i< squareSize - 1; i++){//end before index 15 because is has no "right neighbour"
       if(squares[i].innerHTML == squares[i+1].innerHTML){
        let combineNum = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combineNum
        squares[i+1].innerHTML = 0
        score += combineNum
        scoreDisplay.innerHTML = score
      }
    }
  }

  function checkWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        alert("Congratulation!! Refresh the page to play again.");
        document.removeEventListener("keyup", control);
      }
    }
  }

  function checkLose() {
    let numZeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) numZeros++;
    }

    // if (numZeros === 0) {
    //   alert("Game over!! Rfresh the page to play again.");
    //   document.removeEventListener("keyup", control);
    // }
  }
});
