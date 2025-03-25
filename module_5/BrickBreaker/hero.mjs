"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList } from "./BrickBreaker.mjs";

export class THero {
    #sprites;
    #paddleIndex;
    constructor(aSpriteCanvas) {
        this.#paddleIndex = 0;
        const pos = new lib2d.TPoint(300, 650);
        this.#sprites = [
            new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.PaddleSmall, pos),
            new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.PaddleLarge, pos)
        ];
    }

    draw() {
        this.#sprites[this.#paddleIndex].draw();
    }
}