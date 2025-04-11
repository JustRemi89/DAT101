"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";

export class TBrick extends libSprite.TSprite {
    #isCrushed;
    #isVisible;
    #life;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition, life) {
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.#isCrushed = false;
        this.#isVisible = true;
        this.#isCrushed = false;
        this.#life = life;
    }
    draw() {
        if (this.#isCrushed) {
            return;
        }
        super.draw();
    }

    crush() {
        this.#life--; // Reduser liv
        if (this.#life <= 0) {
            this.#isCrushed = true; // Marker som knust
        } else if (this.#life === 1) {
            this.index = 2; // Sett index til 2 hvis det kun er ett liv igjen
        } else {
            this.index++; // Øk index for å vise skade
        }
    }
    get isVisible() {
        return this.#isVisible;
    }
    
    get isCrushed() {
        return this.#isCrushed;
    }

    get life() {
        return this.#life;
    }
}