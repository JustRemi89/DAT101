"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps } from "./FlappyBird.mjs";

class TObstacle extends libSprite.TSprite {
    #spi;
    #speed = 1;
    #index = 2;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.#spi = aSpriteInfo;
        this.animateSpeed = 10; // Max 99
    }

    draw() {
        super.draw();
    }

    update() {
    }
}

export default TObstacle;