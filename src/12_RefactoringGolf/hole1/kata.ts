/* eslint-disable */

let playerO = 'O';
let emptyPlay = ' ';

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
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
    if (this._board.TileAt(x, y).Symbol != emptyPlay) {
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
    let firstRow = 0;
    let firstColumn = 0;
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(firstRow, firstColumn)!.Symbol;
    }

    let secondRow = 1;
    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(secondRow, firstColumn)!.Symbol;
    }

    let thirdRow = 2;
    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  private isFirstRowFull() {
    let firstRow = 0;
    let firstColumn = 0;
    let secondColumn = 1;
    let thirdColumn = 2;
    return (
      this._board.TileAt(firstRow, firstColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(firstRow, secondColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(firstRow, thirdColumn)!.Symbol != emptyPlay
    );
  }

  private isFirstRowFullWithSameSymbol() {
    let firstRow = 0;
    let firstColumn = 0;
    let secondColumn = 1;
    let thirdColumn = 2;
    return (
      this._board.TileAt(firstRow, firstColumn)!.Symbol ==
        this._board.TileAt(firstRow, secondColumn)!.Symbol &&
      this._board.TileAt(firstRow, thirdColumn)!.Symbol ==
        this._board.TileAt(firstRow, secondColumn)!.Symbol
    );
  }

  private isSecondRowFull() {
    let secondRow = 1;
    let firstColumn = 0;
    let secondColumn = 1;
    let thirdColumn = 2;
    return (
      this._board.TileAt(secondRow, firstColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(secondRow, secondColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(secondRow, thirdColumn)!.Symbol != emptyPlay
    );
  }

  private isSecondRowFullWithSameSymbol() {
    let secondRow = 1;
    let firstColumn = 0;
    let secondColumn = 1;
    let thirdColumn = 2;
    return (
      this._board.TileAt(secondRow, firstColumn)!.Symbol ==
        this._board.TileAt(secondRow, secondColumn)!.Symbol &&
      this._board.TileAt(secondRow, thirdColumn)!.Symbol ==
        this._board.TileAt(secondRow, secondColumn)!.Symbol
    );
  }

  private isThirdRowFull() {
    let thirdRow = 2;
    let firstColumn = 0;
    let secondColumn = 1;
    let thirdColumn = 2;
    return (
      this._board.TileAt(thirdRow, firstColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(thirdRow, secondColumn)!.Symbol != emptyPlay &&
      this._board.TileAt(thirdRow, thirdColumn)!.Symbol != emptyPlay
    );
  }

  private isThirdRowFullWithSameSymbol() {
    let thirdRow = 2;
    let firstColumn = 0;
    let secondColumn = 1;
    let thirdColumn = 2;
    return (
      this._board.TileAt(thirdRow, firstColumn)!.Symbol ==
        this._board.TileAt(thirdRow, secondColumn)!.Symbol &&
      this._board.TileAt(thirdRow, thirdColumn)!.Symbol ==
        this._board.TileAt(thirdRow, secondColumn)!.Symbol
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
