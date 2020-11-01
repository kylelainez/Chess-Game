class Piece {
	constructor(side, position, icon) {
		this.side = side;
		this.position = position;
		this.icon = icon;
	}
}

class Player {
	constructor(side) {
		this.side = side;
		this.eatenPieces = [];
		this.moves = [];
		this.checked = false;
	}
}

class Pawn extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves(i, j) {
		console.log(i, j);
	}
}

class Rook extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves(i, j) {
		console.log(i, j);
	}
}

class Knight extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves(i, j) {
		console.log(i, j);
	}
}

class Bishop extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves(i, j) {
		console.log(i, j);
	}
}

class Queen extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves(i, j) {
		console.log(i, j);
	}
}

class King extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves(i, j) {
		console.log(i, j);
	}
}
