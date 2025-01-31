"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";

export class TColorButton extends libSprite.TSpriteButton {
    constructor(aSpriteCanvas, aSpriteInfo) {
        super(aSpriteCanvas, aSpriteInfo, aSpriteInfo.dst);
    }
} // class TColorButton