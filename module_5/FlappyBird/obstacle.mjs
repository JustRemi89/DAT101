"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps } from "./FlappyBird.mjs";

class TObstacle extends libSprite.TSprite {
    #spi;
    #speed = 1;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.#spi = aSpriteInfo;
    }

    draw() {
        super.draw();
    }

    update() {
    }
}

export default TObstacle;