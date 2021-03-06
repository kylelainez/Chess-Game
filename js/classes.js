class Piece {
	constructor(side, position, icon) {
		this.side = side;
		this.position = position;
		this.icon = icon;
	}
}

class Player {
	constructor(side, turn) {
		this.side = side;
		this.checked = false;
		this.turn = turn;
		this.pieces = [];
		this.checkedMate = false;
	}
}

class Pawn extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves() {
		this.availableMoves = [];
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		//Check Pawn moves for white
		if (this.side === 'white') {
			if (i - 1 >= 0 && boardPieces[i - 1][j] === null) {
				this.availableMoves.push([i - 1, j]);
				if (i === 6 && boardPieces[i - 2][j] === null) {
					this.availableMoves.push([i - 2, j]);
				}
			}
			// Left Enemy
			if (
				i - 1 >= 0 &&
				j - 1 >= 0 &&
				boardPieces[i - 1][j - 1] !== null &&
				boardPieces[i - 1][j - 1].side !== this.side
			) {
				this.availableMoves.push([i - 1, j - 1]);
			}
			//Right Enemy
			if (
				i - 1 >= 0 &&
				j + 1 < 8 &&
				boardPieces[i - 1][j + 1] !== null &&
				boardPieces[i - 1][j + 1].side !== this.side
			) {
				this.availableMoves.push([i - 1, j + 1]);
			}
		} else {
			// Black Side
			if (i + 1 < 8 && boardPieces[i + 1][j] === null) {
				this.availableMoves.push([i + 1, j]);
				if (i === 1 && boardPieces[i + 2][j] === null) {
					this.availableMoves.push([i + 2, j]);
				}
			}
			// Left Enemy
			if (
				i + 1 < 8 &&
				j - 1 >= 0 &&
				boardPieces[i + 1][j - 1] !== null &&
				boardPieces[i + 1][j - 1].side !== this.side
			) {
				this.availableMoves.push([i + 1, j - 1]);
			}
			//Right Enemy
			if (
				i + 1 < 8 &&
				j + 1 < 8 &&
				boardPieces[i + 1][j + 1] !== null &&
				boardPieces[i + 1][j + 1].side !== this.side
			) {
				this.availableMoves.push([i + 1, j + 1]);
			}
		}
	}
	kingCheck() {
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		let side = this.side;
		this.availableMoves = [];
		if (side === 'white') {
			if (i - 1 >= 0 && j - 1 >= 0)
				this.availableMoves.push([i - 1, j - 1]); //Left Attack
			if (i - 1 >= 0 && j + 1 < 8)
				this.availableMoves.push([i - 1, j + 1]); //Right Attack
		} else {
			if (i + 1 < 8 && j - 1 >= 0)
				this.availableMoves.push([i + 1, j - 1]); //Left
			if (i + 1 < 8 && j + 1 < 8)
				this.availableMoves.push([i + 1, j + 1]); //Right
		}
	}
}

class Rook extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
		this.hasMoved = false;
	}
	checkMoves() {
		this.availableMoves = [];
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		let index = i + 1;
		//Check Up Moves
		while (index < 8) {
			if (boardPieces[index][j] === null) {
				this.availableMoves.push([index, j]);
			} else {
				if (boardPieces[index][j].side !== this.side) {
					this.availableMoves.push([index, j]);
					break;
				} else {
					break;
				}
			}
			index++;
		}
		index = i - 1;
		//Check Down Moves
		while (index >= 0) {
			if (boardPieces[index][j] === null) {
				this.availableMoves.push([index, j]);
			} else {
				if (boardPieces[index][j].side !== this.side) {
					this.availableMoves.push([index, j]);
					break;
				} else {
					break;
				}
			}
			index--;
		}
		index = j + 1;
		//Check Right Moves
		while (index < 8) {
			if (boardPieces[i][index] === null) {
				this.availableMoves.push([i, index]);
			} else {
				if (boardPieces[i][index].side !== this.side) {
					this.availableMoves.push([i, index]);
					break;
				} else {
					break;
				}
			}
			index++;
		}
		index = j - 1;
		//Check Left Moves
		while (index >= 0) {
			if (boardPieces[i][index] === null) {
				this.availableMoves.push([i, index]);
			} else {
				if (boardPieces[i][index].side !== this.side) {
					this.availableMoves.push([i, index]);
					break;
				} else {
					break;
				}
			}
			index--;
		}
	}
	kingCheck() {
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		this.availableMoves = [];

		//Up Moves
		let index = i - 1;
		while (index >= 0) {
			this.availableMoves.push([index, j]);
			if (boardPieces[index][j] !== null) break;
			index--;
		}
		//Down Moves
		index = i + 1;
		while (index < 8) {
			this.availableMoves.push([index, j]);
			if (boardPieces[index][j] !== null) break;
			index++;
		}
		//Left Moves
		index = j - 1;
		while (index >= 0) {
			this.availableMoves.push([i, index]);
			if (boardPieces[i][index] !== null) break;
			index--;
		}
		//Right Moves
		index = j + 1;
		while (index < 8) {
			this.availableMoves.push([i, index]);
			if (boardPieces[i][index] !== null) break;
			index++;
		}
	}
}

class Knight extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves() {
		this.availableMoves = [];
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		// Lower Right
		if (i + 2 < 8 && j + 1 < 8) {
			if (boardPieces[i + 2][j + 1] === null) {
				this.availableMoves.push([i + 2, j + 1]);
			} else {
				if (boardPieces[i + 2][j + 1].side !== this.side) {
					this.availableMoves.push([i + 2, j + 1]);
				}
			}
		}
		// Lower Right-Most
		if (i + 1 < 8 && j + 2 < 8) {
			if (boardPieces[i + 1][j + 2] === null) {
				this.availableMoves.push([i + 1, j + 2]);
			} else {
				if (boardPieces[i + 1][j + 2].side !== this.side) {
					this.availableMoves.push([i + 1, j + 2]);
				}
			}
		}
		// Lower Left
		if (i + 2 < 8 && j - 1 >= 0) {
			if (boardPieces[i + 2][j - 1] === null) {
				this.availableMoves.push([i + 2, j - 1]);
			} else {
				if (boardPieces[i + 2][j - 1].side !== this.side) {
					this.availableMoves.push([i + 2, j - 1]);
				}
			}
		}
		// Lower Left-Most
		if (i + 1 < 8 && j - 2 >= 0) {
			if (boardPieces[i + 1][j - 2] === null) {
				this.availableMoves.push([i + 1, j - 2]);
			} else {
				if (boardPieces[i + 1][j - 2].side !== this.side) {
					this.availableMoves.push([i + 1, j - 2]);
				}
			}
		}

		// Upper Right
		if (i - 2 >= 0 && j + 1 < 8) {
			if (boardPieces[i - 2][j + 1] === null) {
				this.availableMoves.push([i - 2, j + 1]);
			} else {
				if (boardPieces[i - 2][j + 1].side !== this.side) {
					this.availableMoves.push([i - 2, j + 1]);
				}
			}
		}
		// Upper Right-Most
		if (i - 1 >= 0 && j + 2 < 8) {
			if (boardPieces[i - 1][j + 2] === null) {
				this.availableMoves.push([i - 1, j + 2]);
			} else {
				if (boardPieces[i - 1][j + 2].side !== this.side) {
					this.availableMoves.push([i - 1, j + 2]);
				}
			}
		}
		// Upper Left
		if (i - 2 >= 0 && j - 1 >= 0) {
			if (boardPieces[i - 2][j - 1] === null) {
				this.availableMoves.push([i - 2, j - 1]);
			} else {
				if (boardPieces[i - 2][j - 1].side !== this.side) {
					this.availableMoves.push([i - 2, j - 1]);
				}
			}
		}
		// Upper Left-Most
		if (i - 1 >= 0 && j - 2 >= 0) {
			if (boardPieces[i - 1][j - 2] === null) {
				this.availableMoves.push([i - 1, j - 2]);
			} else {
				if (boardPieces[i - 1][j - 2].side !== this.side) {
					this.availableMoves.push([i - 1, j - 2]);
				}
			}
		}
	}
	kingCheck() {
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		this.availableMoves = [];
		if (i - 2 >= 0 && j - 1 >= 0) this.availableMoves.push([i - 2, j - 1]);
		if (i - 1 >= 0 && j - 2 >= 0) this.availableMoves.push([i - 1, j - 2]);
		if (i + 1 < 8 && j - 2 >= 0) this.availableMoves.push([i + 1, j - 2]);
		if (i + 2 < 8 && j - 1 >= 0) this.availableMoves.push([i + 2, j - 1]);
		if (i + 2 < 8 && j + 1 < 8) this.availableMoves.push([i + 2, j + 1]);
		if (i + 1 < 8 && j + 2 < 8) this.availableMoves.push([i + 1, j + 2]);
		if (i - 1 >= 0 && j + 2 < 8) this.availableMoves.push([i - 1, j + 2]);
		if (i - 2 >= 0 && j + 1 < 8) this.availableMoves.push([i - 2, j + 1]);
	}
}

class Bishop extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves() {
		this.availableMoves = [];
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		let index1 = i - 1;
		let index2 = j - 1;
		// Upper Left
		while (index1 >= 0 && index2 >= 0) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1--;
			index2--;
		}
		index1 = i - 1;
		index2 = j + 1;
		// Upper Right
		while (index1 >= 0 && index2 < 8) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1--;
			index2++;
		}
		index1 = i + 1;
		index2 = j - 1;
		// Lower Left
		while (index1 < 8 && index2 >= 0) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1++;
			index2--;
		}
		index1 = i + 1;
		index2 = j + 1;
		// Lower Right
		while (index1 < 8 && index2 < 8) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1++;
			index2++;
		}
	}
	kingCheck() {
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		this.availableMoves = [];
		let index1 = i - 1;
		let index2 = j - 1;
		while (index1 >= 0 && index2 >= 0) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1--;
			index2--;
		}
		index1 = i - 1;
		index2 = j + 1;
		while (index1 >= 0 && index2 < 8) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1--;
			index2++;
		}
		index1 = i + 1;
		index2 = j - 1;
		while (index1 < 8 && index2 >= 0) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1++;
			index2--;
		}
		index1 = i + 1;
		index2 = j + 1;
		while (index1 < 8 && index2 < 8) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1++;
			index2++;
		}
	}
}

class Queen extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
	}
	checkMoves() {
		this.availableMoves = [];
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		// Bishop Logic
		let index1 = i - 1;
		let index2 = j - 1;
		// Upper Left
		while (index1 >= 0 && index2 >= 0) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1--;
			index2--;
		}
		index1 = i - 1;
		index2 = j + 1;
		// Upper Right
		while (index1 >= 0 && index2 < 8) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1--;
			index2++;
		}
		index1 = i + 1;
		index2 = j - 1;
		// Lower Left
		while (index1 < 8 && index2 >= 0) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1++;
			index2--;
		}
		index1 = i + 1;
		index2 = j + 1;
		// Lower Right
		while (index1 < 8 && index2 < 8) {
			if (boardPieces[index1][index2] === null) {
				this.availableMoves.push([index1, index2]);
			} else {
				if (boardPieces[index1][index2].side !== this.side) {
					this.availableMoves.push([index1, index2]);
					break;
				} else {
					break;
				}
			}
			index1++;
			index2++;
		}

		// Rook Logic
		let index = i + 1;
		// Check Up Moves
		while (index < 8) {
			if (boardPieces[index][j] === null) {
				this.availableMoves.push([index, j]);
			} else {
				if (boardPieces[index][j].side !== this.side) {
					this.availableMoves.push([index, j]);
					break;
				} else {
					break;
				}
			}
			index++;
		}
		index = i - 1;
		// Check Down Moves
		while (index >= 0) {
			if (boardPieces[index][j] === null) {
				this.availableMoves.push([index, j]);
			} else {
				if (boardPieces[index][j].side !== this.side) {
					this.availableMoves.push([index, j]);
					break;
				} else {
					break;
				}
			}
			index--;
		}
		index = j + 1;
		// Check Right Moves
		while (index < 8) {
			if (boardPieces[i][index] === null) {
				this.availableMoves.push([i, index]);
			} else {
				if (boardPieces[i][index].side !== this.side) {
					this.availableMoves.push([i, index]);
					break;
				} else {
					break;
				}
			}
			index++;
		}
		index = j - 1;
		// Check Left Moves
		while (index >= 0) {
			if (boardPieces[i][index] === null) {
				this.availableMoves.push([i, index]);
			} else {
				if (boardPieces[i][index].side !== this.side) {
					this.availableMoves.push([i, index]);
					break;
				} else {
					break;
				}
			}
			index--;
		}
	}
	kingCheck() {
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		this.availableMoves = [];
		let index1 = i - 1;
		let index2 = j - 1;
		while (index1 >= 0 && index2 >= 0) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1--;
			index2--;
		}
		index1 = i - 1;
		index2 = j + 1;
		while (index1 >= 0 && index2 < 8) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1--;
			index2++;
		}
		index1 = i + 1;
		index2 = j - 1;
		while (index1 < 8 && index2 >= 0) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1++;
			index2--;
		}
		index1 = i + 1;
		index2 = j + 1;
		while (index1 < 8 && index2 < 8) {
			this.availableMoves.push([index1, index2]);
			if (boardPieces[index1][index2] !== null) break;
			index1++;
			index2++;
		}
		let index = i - 1;
		while (index >= 0) {
			this.availableMoves.push([index, j]);
			if (boardPieces[index][j] !== null) break;
			index--;
		}
		//Down Moves
		index = i + 1;
		while (index < 8) {
			this.availableMoves.push([index, j]);
			if (boardPieces[index][j] !== null) break;
			index++;
		}
		//Left Moves
		index = j - 1;
		while (index >= 0) {
			this.availableMoves.push([i, index]);
			if (boardPieces[i][index] !== null) break;
			index--;
		}
		//Right Moves
		index = j + 1;
		while (index < 8) {
			this.availableMoves.push([i, index]);
			if (boardPieces[i][index] !== null) break;
			index++;
		}
	}
}

class King extends Piece {
	constructor(side, position, icon) {
		super(side, position, icon);
		this.hasMoved = false;
	}
	checkMoves() {
		this.availableMoves = [];
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		// Move Up
		if (i - 1 >= 0) {
			if (boardPieces[i - 1][j] === null) {
				this.availableMoves.push([i - 1, j]);
			} else {
				if (boardPieces[i - 1][j].side !== this.side) {
					this.availableMoves.push([i - 1, j]);
				}
			}
		}
		// Move Down
		if (i + 1 < 8) {
			if (boardPieces[i + 1][j] === null) {
				this.availableMoves.push([i + 1, j]);
			} else {
				if (boardPieces[i + 1][j].side !== this.side) {
					this.availableMoves.push([i + 1, j]);
				}
			}
		}
		// Move Left
		if (j - 1 >= 0) {
			if (boardPieces[i][j - 1] === null) {
				this.availableMoves.push([i, j - 1]);
			} else {
				if (boardPieces[i][j - 1].side !== this.side) {
					this.availableMoves.push([i, j - 1]);
				}
			}
		}
		// Move Right
		if (j + 1 < 8) {
			if (boardPieces[i][j + 1] === null) {
				this.availableMoves.push([i, j + 1]);
			} else {
				if (boardPieces[i][j + 1].side !== this.side) {
					this.availableMoves.push([i, j + 1]);
				}
			}
		}
		// Move Upper Left
		if (i - 1 >= 0 && j - 1 >= 0) {
			if (boardPieces[i - 1][j - 1] === null) {
				this.availableMoves.push([i - 1, j - 1]);
			} else {
				if (boardPieces[i - 1][j - 1].side !== this.side) {
					this.availableMoves.push([i - 1, j - 1]);
				}
			}
		}
		// Move Upper Right
		if (i - 1 >= 0 && j + 1 < 8) {
			if (boardPieces[i - 1][j + 1] === null) {
				this.availableMoves.push([i - 1, j + 1]);
			} else {
				if (boardPieces[i - 1][j + 1].side !== this.side) {
					this.availableMoves.push([i - 1, j + 1]);
				}
			}
		}
		// Move Lower Left
		if (i + 1 < 8 && j - 1 >= 0) {
			if (boardPieces[i + 1][j - 1] === null) {
				this.availableMoves.push([i + 1, j - 1]);
			} else {
				if (boardPieces[i + 1][j - 1].side !== this.side) {
					this.availableMoves.push([i + 1, j - 1]);
				}
			}
		}
		// Move Lower Left
		if (i + 1 < 8 && j + 1 < 8) {
			if (boardPieces[i + 1][j + 1] === null) {
				this.availableMoves.push([i + 1, j + 1]);
			} else {
				if (boardPieces[i + 1][j + 1].side !== this.side) {
					this.availableMoves.push([i + 1, j + 1]);
				}
			}
		}
	}
	kingCheck() {
		let id = this.position.split('-');
		let i = parseInt(id[0]);
		let j = parseInt(id[1]);
		this.availableMoves = [];

		if (i - 1 >= 0) this.availableMoves.push([i - 1, j]);
		if (i + 1 < 8) this.availableMoves.push([i + 1, j]);
		if (j - 1 >= 0) this.availableMoves.push([i, j - 1]);
		if (j + 1 < 8) this.availableMoves.push([i, j + 1]);
		if (i - 1 >= 0 && j - 1 >= 0) this.availableMoves.push([i - 1, j - 1]);
		if (i + 1 < 8 && j + 1 < 8) this.availableMoves.push([i + 1, j + 1]);
		if (i + 1 < 8 && j - 1 >= 0) this.availableMoves.push([i + 1, j - 1]);
		if (i - 1 >= 0 && j + 1 < 8) this.availableMoves.push([i - 1, j + 1]);
	}
}
