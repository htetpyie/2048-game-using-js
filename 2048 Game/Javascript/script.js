document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");

  let squares = [];
  let score = 0;

  createBoard();

  checkWin();

  document.addEventListener("keyup", control);

  function createBoard() {
    for (let i = 0; i < 16; i++) {
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
  }

  function moveRight(){
      console.log("Moved right")
    for(let i = 0; i< squares.length; i++){
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
