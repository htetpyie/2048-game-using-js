document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");

  let squares = [];
  let gridSize = 4;
  let targetScore = 1024
  let squareSize = gridSize * gridSize;
  let score = 0;

  gridDisplay.style.width = `${gridSize * 100 + 20}px`
  gridDisplay.style.height = `${gridSize * 100 + 20}px`

  createBoard();

  checkWin();

  document.addEventListener("keyup", control);

  function createBoard() {
    for (let i = 0; i < squareSize; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      // if(i % gridSize == 0){
      //   newLine = document.createElement("br")
      //   gridDisplay.appendChild(newLine)
      // }
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateTwo();
    generateTwo();
    changeColor();
  }

  function generateTwo() {
    let random = Math.floor(Math.random() * squares.length);
    if (squares[random].innerHTML == 0) {
      squares[random].innerHTML = 2;
      checkLose();
    } else generateTwo();
  }

  function control(event) {
    if (event.keyCode === 39) {
      keyRight();
    } else if (event.keyCode === 37) {
      keyLeft();
    } else if (event.keyCode === 38) {
      keyUp();
    } else if (event.keyCode === 40) {
      keyDown();
    }
  }

  function keyRight() {
    moveRight();
    sumRow();
    generateTwo();
    moveRight();
    changeColor()
  }

  function moveRight() {
    for (let i = 0; i < squares.length; i++) {
      if (i % gridSize == 0) {
        moveAllToRight(i);
      }
    }
  }

  function moveAllToRight(gridIndex) {
    let row = [];
    for (let i = 0; i < gridSize; i++) {
      row.push(parseInt(squares[gridIndex + i].innerHTML));
    }

    let filteredRow = row.filter((x) => x != 0);
    let missing = gridSize - filteredRow.length;
    let zeros = Array(missing).fill(0);
    let newRow = zeros.concat(filteredRow);

    for (let i = 0; i < gridSize; i++) {
      squares[gridIndex + i].innerHTML = newRow[i];
    }
  }

  function keyLeft() {
    moveLeft();
    sumRow();
    generateTwo();
    moveLeft();
    changeColor()
  }

  function moveLeft() {
    for (let i = 0; i < squares.length; i++) {
      if (i % gridSize == 0) {
        moveAllToLeft(i);
      }
    }
  }

  function moveAllToLeft(gridIndex) {
    let row = [];
    for (let i = 0; i < gridSize; i++) {
      row.push(squares[gridIndex + i].innerHTML);
    }

    let filteredRow = row.filter((x) => x != 0);
    let missing = gridSize - filteredRow.length;
    let zeros = Array(missing).fill(0);
    let newRow = filteredRow.concat(zeros);

    for (let i = 0; i < gridSize; i++) {
      squares[gridIndex + i].innerHTML = newRow[i];
    }
  }

  function sumRow() {
    for (let i = 0; i < squareSize - 1; i++) {
      //end before index 15 because is has no "right neighbour"
      if (squares[i].innerHTML == squares[i + 1].innerHTML) {
        let combineNum =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combineNum;
        squares[i + 1].innerHTML = 0;
        score += combineNum;
        scoreDisplay.innerHTML = score;
      }
    }

    checkWin();
  }

  function keyUp() {
    moveUp();
    sumColumn();
    moveUp();
    generateTwo();
    changeColor()
  }

  function moveUp() {
    for (let i = 0; i < gridSize; i++) {
      moveAllToUp(i);
    }
  }

  function moveAllToUp(gridIndex) {
    let column = [];
    for (let i = 0; i < gridSize; i++) {
      column.push(squares[gridIndex + gridSize * i].innerHTML);
    }

    let filteredColumn = column.filter((x) => x != 0);
    let missing = gridSize - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = filteredColumn.concat(zeros);

    for (let i = 0; i < gridSize; i++) {
      squares[gridIndex + gridSize * i].innerHTML = newColumn[i];
    }
  }

  function keyDown() {
    moveDown();
    sumColumn();
    moveDown();
    generateTwo();
    changeColor()
  }

  function moveDown() {
    for (let i = 0; i < gridSize; i++) {
      moveAllToDown(i);
    }
  }

  function moveAllToDown(gridIndex) {
    let column = [];
    for (let i = 0; i < gridSize; i++) {
      column.push(squares[gridIndex + gridSize * i].innerHTML);
    }

    let filteredColumn = column.filter((x) => x != 0);
    let missing = gridSize - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = zeros.concat(filteredColumn);

    for (let i = 0; i < gridSize; i++) {
      squares[gridIndex + gridSize * i].innerHTML = newColumn[i];
    }
  }

  function sumColumn() {
    for (let i = 0; i < squareSize - gridSize; i++) {
      if (squares[i].innerHTML == squares[i + gridSize].innerHTML) {
        let combineNum =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + gridSize].innerHTML);
        squares[i].innerHTML = combineNum;
        squares[i + gridSize].innerHTML = 0;
        score += combineNum;
        scoreDisplay.innerHTML = score;
      }
    }

    checkWin();
  }

  function checkWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == targetScore) {
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

    if (numZeros === 0) {
      alert("Game over!! Rfresh the page to play again.");
      document.removeEventListener("keyup", control);
    }
  }

  function changeColor(){
    squares.forEach(element => {
      if(element.innerHTML == 2 ){
        element.style.background = '#DCD5D3'
        element.style.color = '#494846'
      }
      else if(element.innerHTML == 4 ){
        element.style.background = '#E3DD8A'
        element.style.color = '#5E4D3F'
      }
      else if(element.innerHTML == 8){
        element.style.background = '#F2AC34'
        element.style.color = '#D6D8D6'
      }
      else if(element.innerHTML == 16){
        element.style.background = '#F99B19'
        element.style.color = '#E7F8FF'
      }
      else if(element.innerHTML == 32){
        element.style.background = '#EE6915'
        element.style.color = '#DCEEFD'
      }
      else if(element.innerHTML == 64){
        element.style.background = '#FB4D19'
        element.style.color = '#F3E8D4'
      }
      else if(element.innerHTML == 128){
        element.style.background = '#F4D155'
        element.style.color = '#EBEAEA'
      }
      else if(element.innerHTML == 256){
        element.style.background = "#EBD045";
        element.style.color = "#EBEAEA";
      }
      else if(element.innerHTML == 512){
        element.style.background = '#E5C236'
        element.style.color = '#EBEAEA'

      }
      else if(element.innerHTML == 1024){
        element.style.color = '#EBEAEA'
        element.style.background = '#E3BC16'
      }
      else if(element.innerHTML >= 2048){
        element.style.color = '#EBEAEA'
        element.style.background = '#EFCB53'
      }
      else{
        element.style.color = '#695948'
        element.style.background = '#A5A5A5'
      }
    });
  }
});
