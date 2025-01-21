"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import lib2d from "../../common/libs/lib2d.mjs";
import { GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TBait extends libSprite.TSprite {
    #speed;
    #sinewave;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition){
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.animateSpeed = 35;
        this.#speed = Math.ceil(Math.random() * 10) / 10 + 0.5;
        const amplitude = Math.ceil(Math.random() * 3);
        this.#sinewave = new lib2d.TSineWave(amplitude, 1);
        this.posY = this.#sinewave.value;
    }

    update(){
        if(GameProps.status === EGameStatus.playing){
            this.translate(-this.#speed, this.#sinewave.value);
        } else {
            this.translate(this.#speed / 2, this.#sinewave.value);
        }
    }

    getCenter(){
        return this.boundingBox.center;
    }
}