import Tile from "./tile";

export default class TileGroup {
    title: string;
    tiles: Tile[];

    constructor(title: string, tiles: Tile[]) {
        this.title = title;
        this.tiles = tiles;
    }
}