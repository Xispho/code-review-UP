
const emptyCase = ' ';
//const crossPlayer = 'X';
const circlePlayer = 'O';
const firstColumn = 0;
const firstRow = 0;
const secondColumn = 1;
const secondRow = 1;
const thirdColumn = 2;
const thirdRow = 2;

export class Game {
  private _lastSymbol = emptyCase;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyCase) {
      if (player == circlePlayer) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != emptyCase) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyCase;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(firstRow, firstColumn)!.Symbol != emptyCase &&
      this._board.TileAt(firstRow, secondColumn)!.Symbol != emptyCase &&
      this._board.TileAt(firstRow, thirdColumn)!.Symbol != emptyCase
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(firstRow, firstColumn)!.Symbol == this._board.TileAt(firstRow, secondColumn)!.Symbol &&
      this._board.TileAt(firstRow, thirdColumn)!.Symbol == this._board.TileAt(firstRow, secondColumn)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(secondRow, firstColumn)!.Symbol != emptyCase &&
      this._board.TileAt(secondRow, secondColumn)!.Symbol != emptyCase &&
      this._board.TileAt(secondRow, thirdColumn)!.Symbol != emptyCase
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(secondRow, firstColumn)!.Symbol == this._board.TileAt(secondRow, secondColumn)!.Symbol &&
      this._board.TileAt(secondRow, thirdColumn)!.Symbol == this._board.TileAt(secondRow, secondColumn)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(thirdRow, firstColumn)!.Symbol != emptyCase &&
      this._board.TileAt(thirdRow, secondColumn)!.Symbol != emptyCase &&
      this._board.TileAt(thirdRow, thirdColumn)!.Symbol != emptyCase
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(thirdRow, firstColumn)!.Symbol == this._board.TileAt(thirdRow, secondColumn)!.Symbol &&
      this._board.TileAt(thirdRow, thirdColumn)!.Symbol == this._board.TileAt(thirdRow, secondColumn)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
