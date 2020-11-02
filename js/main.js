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
//* ------------------------------------- DOM Elements -------------------------------------
const chessBoardEl = document.querySelector('.chessBoard'); //Chess Board parent for multiple square containers
const playAgainButton = document.querySelector('#play-again');
const rotateBoardButton = document.querySelector('#rotate');
const promotePawnEl = document.querySelector('#promotePawn');
const promotePawnSelectionEL = document.querySelector('.promote-content');
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
			}
			if (i === 6) {
				boardPieces[i][j] = getClasses('pawn', 'white', `${i}-${j}`);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
			}
			if (i === 0) {
				boardPieces[i][j] = getClasses(
					backRow[j],
					'black',
					`${i}-${j}`
				);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
			}
			if (i === 7) {
				boardPieces[i][j] = getClasses(
					backRow[j],
					'white',
					`${i}-${j}`
				);
				element.src = boardPieces[i][j].icon;
				boardPieces[i][j].element = element;
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
	boardPieces[i][j].checkMoves(i, j);
	chessBoard.forEach((element) => {
		element.forEach((el) => {
			el.classList.remove('availableMove');
		});
	});
	boardPieces[i][j].availableMoves.forEach((element) => {
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
	console.log(el);
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

const isKingChecked = () => {
	// TODO: Check if ally king is checked
	// ? Maybe Call checkMove of every enemy piece and compare results to current ally king position
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
	// Move Pieces
	if (selectedPiece !== null) {
		if (
			boardPieces[i][j] === null ||
			boardPieces[i][j].side !== selectedPiece.side
		) {
			selectedPiece.availableMoves.forEach((el) => {
				if (i === el[0] && j === el[1]) {
					let oldPos = selectedPiece.position.split('-');
					if (
						selectedPiece.constructor.name === 'King' ||
						selectedPiece.constructor.name === 'Rook'
					) {
						if (selectedPiece.hasMoved === false) {
							selectedPiece.hasMoved = true;
						}
					}
					// Capture Enemy Piece
					if (boardPieces[i][j] !== null)
						chessBoard[i][j].removeChild(boardPieces[i][j].element);
					boardPieces[i][j] = selectedPiece;
					boardPieces[oldPos[0]][oldPos[1]] = null;
					selectedPiece.position = `${i}-${j}`;
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
					} else {
						players.white.turn = true;
						players.black.turn = false;
					}
				}
			});

			renderChessPiece();
			return;
		}
	}
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
