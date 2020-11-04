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
//* ------------------------------------- DOM Elements -------------------------------------
const chessBoardEl = document.querySelector('.chessBoard'); //Chess Board parent for multiple square containers
const playAgainButton = document.querySelector('#play-again');
const rotateBoardButton = document.querySelector('#rotate');
const promotePawnEl = document.querySelector('#promotePawn');
const promotePawnSelectionEL = document.querySelector('.promote-content');
const playerTurn = document.querySelector('#turn');
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
	selectedPiece = boardPieces[i][j];
	selectedPiece.checkMoves(i, j);
	chessBoard.forEach((element) => {
		element.forEach((el) => {
			el.classList.remove('availableMove');
		});
	});
	let tempBoard = [];
	boardPieces.forEach((elem) => {
		tempBoard.push([...elem]);
	});
	for (let idx = 0; idx < selectedPiece.availableMoves.length; idx++) {
		let el = selectedPiece.availableMoves[idx];
		let enemySide = selectedPiece.side === 'white' ? 'black' : 'white';

		boardPieces[el[0]][el[1]] = selectedPiece;
		boardPieces[i][j] = null;
		// players[selectedPiece.side].pieces.forEach((elem, index) => {
		// 	if (elem[0] === i && elem[1] === j)
		// 		players[selectedPiece.side].pieces[index] = [el[0], el[1]];
		// });

		const checkEnemy = isKingChecked(enemySide);

		// console.log(checkEnemy);
		checkEnemy.forEach((elem) => {
			if (selectedPiece.constructor.name === 'King') {
				if (el[0] === elem[0] && el[1] === elem[1]) {
					selectedPiece.availableMoves.splice(idx, 1);
					--idx;
				}
			} else {
				if (
					elem[0] === kingPositions[selectedPiece.side][0] &&
					elem[1] === kingPositions[selectedPiece.side][1]
				) {
					// console.log(elem, kingPositions[selectedPiece.side]);
					// console.log('here');
					selectedPiece.availableMoves.splice(idx, 1);
					--idx;
				}
			}
		});
		// boardPieces[i][j] = selectedPiece;
		// boardPieces[el[0]][el[1]] = null;
	}
	boardPieces = [];
	tempBoard.forEach((elem) => {
		boardPieces.push([...elem]);
	});
	kingPositions[selectedPiece.side] = [i, j];
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

const winLoseChecker = () => {
	//TODO: Function to check for 'checked' state or 'check mate' state for both kings
};

const movesHistory = () => {
	//TODO: Updates moves history for every turn
};

const isKingChecked = (side) => {
	// TODO: Check if ally king is checked
	// ? Maybe Call checkMove of every enemy piece and compare results to current ally king position
	const checkPieces = players[side].pieces;
	const enemyAttackCoordinates = [];
	checkPieces.forEach((el) => {
		boardPieces[el[0]][el[1]].kingCheck();
		boardPieces[el[0]][el[1]].availableMoves.forEach((e) => {
			enemyAttackCoordinates.push([e[0], e[1]]);
		});
	});

	return enemyAttackCoordinates;
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
	const check = movePieces(i, j);
	if (check) return;
	if (selectedPiece === boardPieces[i][j]) {
		chessBoard.forEach((element) => {
			element.forEach((el) => {
				el.classList.remove('availableMove');
			});
		});
		selectedPiece = null;
		return;
	}
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
