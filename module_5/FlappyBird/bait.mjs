"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TBait extends libSprite.TSprite {
    #speed;
    #sinewave;
    constructor(aSpriteCanvas, aSpriteInfo, aPosition){
        super(aSpriteCanvas, aSpriteInfo, aPosition);
        this.animateSpeed = 35;
        this.#speed = Math.ceil(Math.random() * 10) / 10 + 0.5;
        this.#sinewave = new lib2d.TSineWave(100, 1);
        this.posY = this.#sinewave.value;
    }

    update(){
        if(GameProps.status === EGameStatus.playing){
            this.translate(-this.#speed, 0);
        } else {
            this.translate(this.#speed / 2, 0);
        }
    }
}