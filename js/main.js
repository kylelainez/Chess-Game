//* ------------------------------------- Constants -------------------------------------

const backRow = [
	'rook',
	'knight',
	'bishop',
	'queen',
	'king',
	'bishop',
	'knight',
	'rook'
];

//* ------------------------------------- State Variables -------------------------------------
let boardPieces;
let chessBoard;
let players;
let currentPawn;
let selectedPiece;
let kingPositions;
let isDraw;
//* ------------------------------------- DOM Elements -------------------------------------
const chessBoardEl = document.querySelector('.chessBoard'); //Chess Board parent for multiple square containers
const playAgainButton = document.querySelector('#play-again');
const rotateBoardButton = document.querySelector('#rotate');
const promotePawnEl = document.querySelector('#promotePawn');
const promotePawnSelectionEL = document.querySelector('.promote-content');
const playerTurn = document.querySelector('#turn');
const checkedEl = document.querySelector('#checked');
//* ------------------------------------- Functions -------------------------------------

// Function for initializing State Variables
const initializeVariables = () => {
	chessBoard = [];
	boardPieces = [];
	players = {
		white: new Player('white', true),
		black: new Player('black', false)
	};
	selectedPiece = null;
	currentPawn = null;
	kingPositions = {
		white: [7, 4],
		black: [0, 4]
	};
	isDraw = false;
};

// Initialize the Chess Board and Render it
const initializeChessBoard = () => {
	for (let i = 0; i < 8; i++) {
		chessBoard.push([]);
		boardPieces.push([]);
		for (let j = 0; j < 8; j++) {
			const piecesContainer = document.createElement('div');
			piecesContainer.className = 'piecesContainer';
			piecesContainer.classList.add((i + j) % 2 === 0 ? 'dark' : 'light');
			piecesContainer.id = i + '-' + j;
			chessBoard[i].push(piecesContainer);
			boardPieces[i].push(null);
			chessBoardEl.appendChild(piecesContainer);
		}
	}
};

// Initialize the Chess Pieces
const initializeChessPieces = () => {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			const element = document.createElement('img');
			if (i === 1) {
				boardPieces[i][j] = getClasses('pawn', 'black', `${i}-${j}`);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
				players.black.pieces.push([i, j]);
			}
			if (i === 6) {
				boardPieces[i][j] = getClasses('pawn', 'white', `${i}-${j}`);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
				players.white.pieces.push([i, j]);
			}
			if (i === 0) {
				boardPieces[i][j] = getClasses(
					backRow[j],
					'black',
					`${i}-${j}`
				);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
				players.black.pieces.push([i, j]);
			}
			if (i === 7) {
				boardPieces[i][j] = getClasses(
					backRow[j],
					'white',
					`${i}-${j}`
				);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
				players.white.pieces.push([i, j]);
			}
		}
	}
	renderChessPiece();
};

const getClasses = (piece, side, position) => {
	let icon = `img/${side}${piece[0].toUpperCase() + piece.slice(1)}.svg`;
	switch (piece) {
		case 'pawn':
			return new Pawn(side, position, icon);
		case 'rook':
			return new Rook(side, position, icon);
		case 'knight':
			return new Knight(side, position, icon);
		case 'bishop':
			return new Bishop(side, position, icon);
		case 'queen':
			return new Queen(side, position, icon);
		case 'king':
			return new King(side, position, icon);
	}
};

//Function to Render each Chess Pieces
const renderChessPiece = () => {
	boardPieces.forEach((elem, i) => {
		elem.forEach((el, j) => {
			if (el !== null) {
				chessBoard[i][j].appendChild(el.element);
			}
		});
	});
};

const possibleMoves = (i, j) => {
	// TODO: Create an algorithm to check the available moves of the chess piece based on type and current location
	// ? Maybe create a single function for checking moves or create multiple functions
	chessBoard.forEach((element) => {
		element.forEach((el) => {
			el.classList.remove('availableMove');
		});
	});
	if (selectedPiece !== null && selectedPiece === boardPieces[i][j]) {
		selectedPiece = null;
		return;
	}
	selectedPiece = boardPieces[i][j];
	selectedPiece.checkMoves(i, j);
	isAllyKingCheckedOnMove();
	chessBoard[i][j].classList.add('availableMove');
	selectedPiece.availableMoves.forEach((element) => {
		chessBoard[element[0]][element[1]].classList.add('availableMove');
	});
};

const promotePawn = (i, j, side) => {
	const choices = ['Rook', 'Knight', 'Bishop', 'Queen'];
	currentPawn = [i, j, side];
	for (let x = 0; x < choices.length; x++) {
		const element = document.createElement('img');
		element.src = `img/${side}${choices[x]}.svg`;
		element.id = choices[x];
		element.className = 'selection';
		element.addEventListener('click', changePawn);
		promotePawnSelectionEL.appendChild(element);
	}
	promotePawnEl.style.display = 'block';
};

const changePawn = (e) => {
	const el = e.target;
	let i = currentPawn[0];
	let j = currentPawn[1];
	let side = currentPawn[2];
	chessBoard[i][j].removeChild(boardPieces[i][j].element);
	boardPieces[i][j] = getClasses(
		el.id[0].toLowerCase() + el.id.slice(1),
		side,
		`${i}-${j}`
	);
	const element = document.createElement('img');
	element.src = el.src;
	boardPieces[i][j].element = element;

	renderChessPiece();

	promotePawnSelectionEL.innerHTML = '';
	currentPawn = null;
	promotePawnEl.style.display = 'none';
};

const isCastlingAllowed = () => {};

const movesHistory = () => {
	//TODO: Updates moves history for every turn
};

const isAllyKingCheckedOnMove = () => {
	// TODO: Check if ally king is checked
	// ? Maybe Call checkMove of every enemy piece and compare results to current ally king position
	const enemySide = selectedPiece.side === 'white' ? 'black' : 'white';
	const enemyPieces = players[enemySide].pieces;

	for (let idx = 0; idx < selectedPiece.availableMoves.length; idx++) {
		const enemyMoves = [];
		let i = selectedPiece.availableMoves[idx][0];
		let j = selectedPiece.availableMoves[idx][1];
		let id = selectedPiece.position.split('-');
		let oldI = parseInt(id[0]);
		let oldJ = parseInt(id[1]);
		let allySide = selectedPiece.side;
		let tempPiece;
		if (boardPieces[i][j] !== null) {
			tempPiece = boardPieces[i][j];
		}
		boardPieces[i][j] = selectedPiece;
		boardPieces[oldI][oldJ] = null;
		enemyPieces.forEach((enemyPos) => {
			if (boardPieces[enemyPos[0]][enemyPos[1]].side === enemySide) {
				boardPieces[enemyPos[0]][enemyPos[1]].kingCheck();
				enemyMoves.push(
					...boardPieces[enemyPos[0]][enemyPos[1]].availableMoves
				);
			}
		});
		enemyMoves.some((enemyMove) => {
			let x = enemyMove[0];
			let y = enemyMove[1];
			if (selectedPiece.constructor.name === 'King') {
				if (x === i && y === j) {
					selectedPiece.availableMoves.splice(idx, 1);
					--idx;
					return true;
				}
			} else {
				if (
					x === kingPositions[allySide][0] &&
					y === kingPositions[allySide][1]
				) {
					selectedPiece.availableMoves.splice(idx, 1);
					--idx;
					return true;
				}
			}
		});
		boardPieces[oldI][oldJ] = selectedPiece;
		if (tempPiece) {
			boardPieces[i][j] = tempPiece;
		} else {
			boardPieces[i][j] = null;
		}
	}
};

const checkEnemyKing = (side) => {
	const allyMoves = [];
	const enemySide = side === 'white' ? 'black' : 'white';
	players[side].pieces.forEach((piece) => {
		boardPieces[piece[0]][piece[1]].checkMoves();
		allyMoves.push(...boardPieces[piece[0]][piece[1]].availableMoves);
	});
	players[enemySide].checked = false;
	allyMoves.forEach((move) => {
		if (
			move[0] === kingPositions[enemySide][0] &&
			move[1] === kingPositions[enemySide][1]
		) {
			players[enemySide].checked = true;
		}
	});
	const availMoves = [];
	players[enemySide].pieces.forEach((piece) => {
		possibleMoves(piece[0], piece[1]);
		availMoves.push(...boardPieces[piece[0]][piece[1]].availableMoves);
	});

	if (availMoves.length === 0) {
		if (players[enemySide].checked) players[enemySide].isCheckedMate = true;
		else isDraw = true;
	}
};

const movePieces = (i, j) => {
	// Move Pieces
	if (selectedPiece !== null) {
		if (
			boardPieces[i][j] === null ||
			boardPieces[i][j].side !== selectedPiece.side
		) {
			selectedPiece.availableMoves.forEach((el) => {
				if (i === el[0] && j === el[1]) {
					let oldPos = selectedPiece.position.split('-');
					oldPos[0] = parseInt(oldPos[0]);
					oldPos[1] = parseInt(oldPos[1]);
					if (
						selectedPiece.constructor.name === 'King' ||
						selectedPiece.constructor.name === 'Rook'
					) {
						if (selectedPiece.hasMoved === false) {
							selectedPiece.hasMoved = true;
						}
					}
					if (selectedPiece.constructor.name === 'King') {
						if (selectedPiece.side === 'white') {
							kingPositions.white = [i, j];
						} else {
							kingPositions.black = [i, j];
						}
					}
					// Capture Enemy Piece
					if (boardPieces[i][j] !== null) {
						chessBoard[i][j].removeChild(boardPieces[i][j].element);
						//Remove Piece from player object
						players[boardPieces[i][j].side].pieces.forEach(
							(el, idx) => {
								if (el[0] === i && el[1] === j) {
									players[
										boardPieces[i][j].side
									].pieces.splice(idx, 1);
								}
							}
						);
					}

					boardPieces[i][j] = selectedPiece;
					boardPieces[oldPos[0]][oldPos[1]] = null;
					selectedPiece.position = `${i}-${j}`;
					//Update Pieces When Moved
					players[selectedPiece.side].pieces.forEach((el, idx) => {
						if (el[0] === oldPos[0] && el[1] === oldPos[1]) {
							players[selectedPiece.side].pieces[idx] = [i, j];
						}
					});
					// Pawn Promotion
					if (selectedPiece.constructor.name === 'Pawn') {
						if (selectedPiece.side === 'white' && i === 0) {
							// Call Promotion Function'
							promotePawn(i, j, selectedPiece.side);
						} else if (selectedPiece.side === 'black' && i === 7) {
							//Call Promotion Function
							promotePawn(i, j, selectedPiece.side);
						}
					}
					checkEnemyKing('white');
					checkEnemyKing('black');
					selectedPiece = null;
					chessBoard.forEach((element) => {
						element.forEach((el) => {
							el.classList.remove('availableMove');
						});
					});
					if (boardPieces[i][j].side === 'white') {
						players.white.turn = false;
						players.black.turn = true;
						turn.innerText = "Black's Turn";
					} else {
						players.white.turn = true;
						players.black.turn = false;
						turn.innerText = "White's Turn";
					}
					chessBoard.forEach((el, idx1) => {
						el.forEach((e, idx2) => {
							chessBoard[idx1][idx2].classList.remove('checked');
						});
					});
					if (players.black.checked) {
						chessBoard[kingPositions.black[0]][
							kingPositions.black[1]
						].classList.add('checked');
						checkedEl.innerText = 'Black Checked!';
					}
					if (players.white.checked) {
						chessBoard[kingPositions.white[0]][
							kingPositions.white[1]
						].classList.add('checked');
						checkedEl.innerText = 'White Checked!';
					}
					if (!players.black.checked && !players.white.checked) {
						checkedEl.innerText = '';
					}
					if (players.white.isCheckedMate) {
						checkedEl.innerText = 'White loses';
						playerTurn.innerText = 'Black Wins!';
					}
					if (players.black.isCheckedMate) {
						checkedEl.innerText = 'Black Loses';
						playerTurn.innerText = 'White Wins!';
					}
					if (isDraw) {
						playerTurn.innerHTML = 'Game Draw';
						checkedEl.innerText = '';
					}
				}
			});

			renderChessPiece();
			return true;
		}
	} else {
		return false;
	}
};

const clickedContainer = (e) => {
	e.preventDefault();
	if (e.target.className.includes('chessBoard')) return;
	const el = e.target;
	let id;
	if (el.localName === 'img') {
		id = el.parentElement.id.split('-');
	} else {
		id = el.id.split('-');
	}
	let i = parseInt(id[0]);
	let j = parseInt(id[1]);
	if (
		boardPieces[i][j] !== null &&
		selectedPiece === null &&
		players[boardPieces[i][j].side].turn === false
	) {
		return;
	}
	if (movePieces(i, j)) return;
	if (boardPieces[i][j] !== null) {
		possibleMoves(i, j);
	}
};

initializeVariables();
initializeChessBoard();
initializeChessPieces();
//* ------------------------------------- Event Listeners  -------------------------------------

// TODO: 'click' Event Listner for every chess piece
// ? Maybe create a Drag and drop function for better user experience
chessBoardEl.addEventListener('click', clickedContainer);

// TODO: Event Listners for 'Play Again' button and/or 'Rotate Board' button
// ? Rotate Board button for rotating the board manually for turns, or create a function for automatic rotating
