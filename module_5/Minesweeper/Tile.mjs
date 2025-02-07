"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import { gameProps } from "./Minesweeper.mjs";

export class TTile extends libSprite.TSpriteButton {
    constructor(aSpriteCanvas, aSpriteInfo, aPos) {
        super(aSpriteCanvas, aSpriteInfo, aPos);
    }
}

export default TTile;