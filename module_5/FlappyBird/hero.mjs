"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps, SpriteInfoList } from "./FlappyBird.mjs";

class THero extends libSprite.TSprite {
    #spi;
    #gravity = 9.81 / 100;
    #velocity = 0;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.#spi = aSpriteInfo;
        this.animateSpeed = 10; // Max 99
    }

    draw() {
        super.draw();
    }

    update() {
        const groundY = GameProps.ground.posY;
        const bottomY = this.posY + this.#spi.height;
        if(bottomY < groundY) {
            this.translate(0, 1);
            this.#velocity += this.#gravity;
        } else {
            this.posY = groundY - this.#spi.height;
        }
    }
}

export default THero;