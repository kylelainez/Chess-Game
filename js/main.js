//* ------------------------------------- Constants -------------------------------------

const chessPieces = {
	white: {
		pawn: {
			pieces: 8,
			imgFile: 'img/whitePawn.svg',
			move: 'front, 1', //1 Step to front
			eat: 'diagonal,1'
		}
	},
	black: {
		pawn: {
			pieces: 8,
			imgFile: 'img/blackPawn.svg'
		}
	}
};

//* ------------------------------------- State Variables -------------------------------------
let isChecked;
let capturedPieces;
let history;
let currentLocation;
let chessBoard;
let chessPieces; // ! Chess Pieces should be duplicated according to the number of pieces required on the board

//* ------------------------------------- DOM Elements -------------------------------------
const chessBoardEl = document.querySelector('#chessBoard'); //Chess Board parent for multiple square containers

//* ------------------------------------- Functions -------------------------------------
const initializeChessBoard = () => {
	// TODO: Initialize an array of square containers to the dom and save it into the variable chessBoard and append it to the chessBoardEl
};

const initializeChessPieces = () => {
	// TODO: Initialize Chess Pieces and append it to the correct position on the board
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
