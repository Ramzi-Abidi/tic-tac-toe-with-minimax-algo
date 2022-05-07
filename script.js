const cells = document.querySelectorAll("td");
const endGame = document.querySelector(".end-game");
const firstPlayer = "O";
const secondPlayer = "X";
var arr;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

function blockStartBtn() {
    endGame.classList.toggle("hide");

    cells.forEach((cell) => {
        cell.style.removeProperty("background-color");
    })
}

start();

function start() {
    blockStartBtn();

    arr = Array.from(Array(9).keys());

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].addEventListener("click", handleCellClick, false);
    }
}

function handleCellClick(e) {
    if (e.target.innerHTML == "") {
        fct(firstPlayer, e.target.id);
        if (!tie())
            fct(secondPlayer, bestCellId());
    }
}

//returns the best cell id (ely bch yal3bha el AI) : 
function bestCellId() {
    /*     for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == "")
                return i;
        } */
    return minimax(arr, secondPlayer).index;
}

function declareWinner(ch) {
    document.querySelector(".end-game").classList.remove("hide");
    document.querySelector(".end-game .text").innerHTML = ch;
}


//tie() returns true if all elements are not empty .
function tie() {
    console.log(typeof cells);

    let ok = true;
    cells.forEach((cell) => {
        if (cell.innerHTML == "")
            ok = false;
    })

    console.log(ok);

    if (ok) {        //means it's tie 

        for (let i = 0; i < cells.length; i++) {
            cells[i].style.background = "green";
            cells[i].removeEventListener("click", handleCellClick, false);
        }
        declareWinner("tie !");
        return true;
    }
    return false;
}

function fct(firstPlayer, id) {
    arr[id] = firstPlayer;
    document.getElementById(id).innerHTML = firstPlayer;
    let = gameWon = checkWin(arr, firstPlayer);
    if (gameWon)
        gameOver(gameWon);
}

function checkWin(arr, firstPlayer) {
    let newArr = [];
    let gameWon;
    //console.log(arr);

    arr.forEach((el, i) => {
        if (el === firstPlayer)
            newArr.push(i);
    });

    for (let i = 0; i < winCombos.length; i++) {
        var ok = winCombos[i].every((el) => {
            return newArr.indexOf(el) != -1;        //Array.indexOf(i) => returns the position of i in the array Array, otherwise it returns -1 .
        })
        if (ok) {
            gameWon = {
                newArr: i, //winCombos[i],
                player: firstPlayer
            };
            //console.log(gameWon);
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    lawwen(gameWon.newArr);     //gameWon.newArr : fehe index of the array that matches user cells

    declareWinner(gameWon.player == firstPlayer ? "You win !" : "You lose!");
}

function lawwen(newArr) {
    console.log(newArr);

    winCombos[newArr].forEach((el, i) => {
        document.getElementById(el).style.background = "red";
    });

    //removing the eventListener :
    cells.forEach((cell) => {
        cell.removeEventListener("click", handleCellClick, false);
    })
}

/*
    A Minimax algorithm can be best defined as a recursive function that does the following things:

    return a value if a terminal state is found (+10, 0, -10)
    go through available spots on the board
    call the minimax function on each available spot (recursion)
    evaluate returning values from function calls
    and return the best value
*/

function emptySquares() {
    return arr.filter((el) => {
        return el != "O" && el != "X";
    });
}

/* function minimax(arr, player) {     //aadinelha el secondPlayer
    //checking for available spots :
    let availSpots = emptySquares(arr);

    //checking for terminals :
    if(checkWin(arr,firstPlayer)) 
        return {score:-10} ;
        else
            if(checkWin(arr,secondPlayer))
                return {score:10} ;
        else
            if(availSpots.length==0)
                return {score:0} ;

    

} */

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, firstPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, secondPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == secondPlayer) {
			var result = minimax(newBoard, firstPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, secondPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === secondPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
