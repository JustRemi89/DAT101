"use strict";
//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";

export class TBrick extends libSprite.TSprite {
    #spcvs;
    #spi;
    #isCrushed;
    #isVisible;
    #isHit;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.#isCrushed = false;
        this.#isVisible = true;
        this.#isHit = false;
        this.#isCrushed = false;
    }
    draw() {
        if (this.#isCrushed) {
            return;
        }
        super.draw();
    }
    crush() {
        this.#isCrushed = true;
    }
    get isVisible() {
        return this.#isVisible;
    }
    
    get isCrushed() {
        return this.#isCrushed;
    }
}