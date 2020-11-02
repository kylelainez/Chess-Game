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
let iconsList;
let selectedPiece;
//* ------------------------------------- DOM Elements -------------------------------------
const chessBoardEl = document.querySelector('.chessBoard'); //Chess Board parent for multiple square containers
const playAgainButton = document.querySelector('#play-again');
const rotateBoardButton = document.querySelector('#rotate');

//* ------------------------------------- Functions -------------------------------------

// Function for initializing State Variables
const initializeVariables = () => {
	chessBoard = [];
	boardPieces = [];
	players = {
		white: new Player('white'),
		black: new Player('black')
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
			if (i === 1) {
				boardPieces[i][j] = getClasses('pawn', 'black', `${i}-${j}`);
			}
			if (i === 6) {
				boardPieces[i][j] = getClasses('pawn', 'white', `${i}-${j}`);
			}
			if (i === 0) {
				boardPieces[i][j] = getClasses(
					backRow[j],
					'black',
					`${i}-${j}`
				);
			}
			if (i === 7) {
				boardPieces[i][j] = getClasses(
					backRow[j],
					'white',
					`${i}-${j}`
				);
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
			if (boardPieces[i][j] !== null) {
				const element = document.createElement('img');
				element.src = boardPieces[i][j].icon;
				chessBoard[i][j].appendChild(element);
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

const captureEnemyPiece = (allyPiece, enemyPiece) => {
	// TODO: Function for capturing enemy pieces
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
	const el = e.target;
	let id;
	if (el.localName === 'img') {
		id = el.parentElement.id.split('-');
	} else {
		id = el.id.split('-');
	}

	let i = parseInt(id[0]);
	let j = parseInt(id[1]);
	if (selectedPiece !== null) {
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
