//* ------------------------------------- Constants -------------------------------------

const chessPieces = {
	white: {
		pawn: {
			imgFile: 'img/whitePawn.svg'
		},
		rook: {
			imgFile: 'img/whiteRook.svg'
		},
		knight: {
			imgFile: 'img/whiteKnight.svg'
		},
		bishop: {
			imgFile: 'img/whiteBishop.svg'
		},
		queen: {
			imgFile: 'img/whiteQueen.svg'
		},
		king: {
			imgFile: 'img/whiteKing.svg'
		}
	},
	black: {
		pawn: {
			imgFile: 'img/blackPawn.svg'
		},
		rook: {
			imgFile: 'img/blackRook.svg'
		},
		knight: {
			imgFile: 'img/blackKnight.svg'
		},
		bishop: {
			imgFile: 'img/blackBishop.svg'
		},
		queen: {
			imgFile: 'img/blackQueen.svg'
		},
		king: {
			imgFile: 'img/blackKing.svg'
		}
	}
};

//* ------------------------------------- State Variables -------------------------------------
let isChecked;
let capturedPieces;
let history;
let currentLocation;
let boardPieces;
let chessBoard;
let chessPiecesEl;

//* ------------------------------------- DOM Elements -------------------------------------
const chessBoardEl = document.querySelector('.chessBoard'); //Chess Board parent for multiple square containers

//* ------------------------------------- Functions -------------------------------------
const initializeChessBoard = () => {
	chessBoard = [];
	boardPieces = [];
	for (let i = 0; i < 8; i++) {
		chessBoard.push([]);
		boardPieces.push([]);
		for (let j = 0; j < 8; j++) {
			const piecesContainer = document.createElement('div');
			piecesContainer.className = 'piecesContainer';
			piecesContainer.classList.add((i + j) % 2 === 0 ? 'dark' : 'light');
			chessBoard[i].push(piecesContainer);
			boardPieces[i].push({});
			chessBoardEl.appendChild(piecesContainer);
		}
	}
};

const initializeChessPieces = () => {
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
	for (let team in chessPieces) {
		const pawnIndex = team === 'white' ? 6 : 1;
		const backIndex = team === 'white' ? 7 : 0;
		for (let i = 0; i < 8; i++) {
			const piece = document.createElement('img');
			piece.src = chessPieces[team].pawn.imgFile;
			boardPieces[pawnIndex][i].type = 'pawn';
			boardPieces[pawnIndex][i].side = team;
			renderChessPieces(pawnIndex, i, piece);

			const backPiece = document.createElement('img');
			backPiece.src = chessPieces[team][backRow[i]].imgFile;
			boardPieces[backIndex][i].type = backRow[i];
			boardPieces[backIndex][i].side = team;
			renderChessPieces(backIndex, i, backPiece);
		}
	}
};

const renderChessPieces = (firstIndex, secondIndex, element) => {
	setTimeout(() => {
		chessBoard[firstIndex][secondIndex].appendChild(element);
	}, 50 * secondIndex);
};

const possibleMoves = (piece) => {
	// TODO: Create an algorithm to check the available moves of the chess piece based on type and current location
	// ? Maybe create a single function for checking moves or create multiple functions
};

const captureEnemyPiece = (allyPiece, enemyPiece) => {
	// TODO: Function for capturing enemy pieces
};

const renderDisplay = () => {
	// TODO: Function to display any changes from the model to the DOM
};

const winLoseChecker = () => {
	//TODO: Function to check for 'checked' state or 'check mate' state for both kings
};

const movesHistory = () => {
	//TODO: Updates moves history for every turn
};

//* ------------------------------------- Event Listeners  -------------------------------------

// TODO: 'click' Event Listner for every chess piece
// ? Maybe create a Drag and drop function for better user experience

// TODO: Event Listners for 'Play Again' button and/or 'Rotate Board' button
// ? Rotate Board button for rotating the board manually for turns, or create a function for automatic rotating
