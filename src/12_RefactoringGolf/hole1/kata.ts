/* eslint-disable */

// améliore ce code
export class Game {
  private _lastSymbol = ' ';
  private _toto: Board = new Board();

  private checkForFirtsMove(symbol: string){
    if (this._lastSymbol == ' ') {
      if (symbol == 'O') {
        throw new Error('Invalid first player');
      }
    }
  }

  private checkPlayer(symbol: string) {
    if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private checkTile(x: number, y: number){
    if (this._toto.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }
  }

  private updateGameState(symbol: string, x: number, y: number){
    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  public Play(symbol: string, x: number, y: number): void {
    this.checkForFirtsMove(symbol);
    this.checkPlayer(symbol);
    this.checkTile(x, y);
    this.updateGameState(symbol, x, y);
  }

  private verifyRowIsFull(r: number): boolean {
    return (this._toto.TileAt(r, 0)!.Symbol != ' ' &&
    this._toto.TileAt(r, 1)!.Symbol != ' ' &&
    this._toto.TileAt(r, 2)!.Symbol != ' ')
  }

  private verifyFullRow(r: number): boolean {
    return (this._toto.TileAt(r, 0)!.Symbol == this._toto.TileAt(r, 1)!.Symbol &&
    this._toto.TileAt(r, 2)!.Symbol == this._toto.TileAt(r, 1)!.Symbol)
  }

  private verifyRow(r: number): string {
    if (this.verifyRowIsFull(r) && this.verifyFullRow(r)){
      return this._toto.TileAt(r, 0)!.Symbol;
    }
    return ' ';
  }

  public Winner(): string {
    if (this.verifyRow(0) != ' '){
      return this.verifyRow(0);
    } else if (this.verifyRow(1) != ' '){
      return this.verifyRow(1);
    } else {
      return this.verifyRow(2);
    }
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
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
