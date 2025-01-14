"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps, SpriteInfoList } from "./FlappyBird.mjs";

class THero extends libSprite.TSprite {
    constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.animateSpeed = 10; // Max 99
    }

    draw() {
        super.draw();
    }

    update() {
        const groundPosY = GameProps.ground.posY;
        const maxFall = groundPosY - SpriteInfoList.hero1.height;
        if(this.posY < maxFall) {
            this.translate(0, 1);
        } else {
            this.posY = maxFall;
        }
    }
}

export default THero;