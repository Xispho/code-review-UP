/* eslint-disable */

const playerO = 'O';
const noPlayer = ' ';

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: string, x: Num, y: Num): void {
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(x, y, player));
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: Num, y: Num) {
    if (this._board.isTilePlayedAt(x, y)) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private player: string = noPlayer;

  constructor(x: number, y: number, player: string) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = Num.First; x <= Num.Third; x++) {
      for (let y = Num.First; y <= Num.Third; y++) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayedAt(x: number, y: number) {
    return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile)!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(Num.First) && this.isRowFullWithSamePlayer(Num.First)) {
      return this.playerAt(Num.First, Num.First);
    }

    if (this.isRowFull(Num.Second) && this.isRowFullWithSamePlayer(Num.Second)) {
      return this.playerAt(Num.Second, Num.First);
    }

    if (this.isRowFull(Num.Third) && this.isRowFullWithSamePlayer(Num.Third)) {
      return this.playerAt(Num.Third, Num.First);
    }

    return noPlayer;
  }

  private findTileAt(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
  }

  private hasSamePlayer(x: number, y: number, otherX: number, otherY: number) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: number, y: number) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayedAt(row, Num.First) &&
      this.isTilePlayedAt(row, Num.Second) &&
      this.isTilePlayedAt(row, Num.Third)
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    return (
      this.hasSamePlayer(row, Num.First, row, Num.Second) &&
      this.hasSamePlayer(row, Num.Second, row, Num.Third)
    );
  }
}

enum Num {
  First = 0,
  Second,
  Third,
}