"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";

export class THero {
    #sprites;
    #paddleIndex;
    #spcvs;
    constructor(aSpriteCanvas) {
        this.#paddleIndex = 0;
        this.#spcvs = aSpriteCanvas;
        const pos = new lib2d.TPoint(300, 650);
        this.#sprites = [
            new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.PaddleSmall, pos),
            new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.PaddleLarge, pos)
        ];
        this.#spcvs.onMouseMove = this.#onMouseMove;
    }

    #onMouseMove = (aEvent) => {
        const pos = this.#spcvs.mousePos;
        this.#sprites[this.#paddleIndex].x = pos.x;
        const bounds = GameProps.bounds;
        // Test om helten (paddle) er innenfor spillområdet
        const currentSprite = this.#sprites[this.#paddleIndex];
        if (currentSprite.x < bounds.left) {
            currentSprite.x = bounds.left;
        } else if (currentSprite.x + currentSprite.width > bounds.right) {
            currentSprite.x = bounds.right - currentSprite.width;
        }
    }

    draw() {
        this.#sprites[this.#paddleIndex].draw();
    }

    get shape() {
        return this.#sprites[this.#paddleIndex].shape;
    }
}