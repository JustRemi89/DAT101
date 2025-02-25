"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import { SpriteInfoList, gameLevel } from "./Minesweeper.mjs";

// Lag en klasse med navn TScoreBoard
// Klassen har tre sprites:
// - Øvre venstre hjørne (antall miner). TSpriteNumber
// - Øvre høyre hjørne (tid). TSpriteNumber
// - Øvre midten (smiley). TSpriteButton
// Klassen trenger en draw metode som tegner alle sprites
// Konstruktørens parametre er: aSpriteCanvas

export class TScoreBoard {
    #cvs;
    #spMines; // Mines
    #spSmiley; // Smiley
    #spTime; // Time
    constructor(aSpriteCanvas) {
        this.#cvs = aSpriteCanvas.canvas;
        const spi = SpriteInfoList;
        const pos = new lib2d.TPoint(113, 22);
        this.#spMines = new libSprite.TSpriteNumber(aSpriteCanvas, spi.Numbers, pos);
        this.#spMines.justify = libSprite.ESpriteNumberJustifyType.Right;
        this.#spMines.digits = 3;
        this.#spMines.value = gameLevel.Mines;

        pos.x = this.#cvs.width / 2 - 41;
        this.#spSmiley = new libSprite.TSpriteButton(aSpriteCanvas, spi.ButtonSmiley, pos);

        pos.x = this.#cvs.width - 70;
        this.#spTime = new libSprite.TSpriteNumber(aSpriteCanvas, spi.Numbers, pos);
        this.#spTime.justify = libSprite.ESpriteNumberJustifyType.Right;
        this.#spTime.digits = 3;
        this.#spTime.value = 0;
    }

    draw() {
        this.#spMines.draw();
        this.#spSmiley.draw();
        this.#spTime.draw();
    }
}