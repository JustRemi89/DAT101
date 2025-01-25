"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import lib2d from "../../common/libs/lib2d.mjs";
import { SpriteInfoList, GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TMenu {
    #spFlappyBird;
    #spButtonPlay;
    #spInfoText;
    #spNumberBig;
    #spcvs;
    #activeSprite;
    constructor(aSpriteCanvas) {
        this.#spcvs = aSpriteCanvas;
        
        const pos = new lib2d.TPosition(199, 140);
        this.#spFlappyBird = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);
        
        pos.x = 236;
        pos.y = 250;
        this.#spButtonPlay = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);
        
        pos.x = 199;
        pos.y = 140;
        this.#spInfoText = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.infoText, pos);

        pos.x = 280;
        pos.y = 250;
        this.#spNumberBig = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.numberBig, pos);
        this.#spNumberBig.index = 3;
        
        this.#spcvs.addEventListener("mousemove", this.#onMouseMove);
        this.#spcvs.addEventListener("click", this.#onClick);
        this.#activeSprite = null; // Vi har ingen aktive sprites som standard
    }

    draw() {
        switch(GameProps.status) {
            case EGameStatus.idle:
                this.#spFlappyBird.draw();
                this.#spButtonPlay.draw();
                break;
            case EGameStatus.getReady:
                this.#spInfoText.draw();
                this.#spNumberBig.draw();
                break;
            case EGameStatus.playing:
                break;
            case EGameStatus.gameOver:
                break;
        }
    } // End of draw

    #onMouseMove = (aEvent) => {
        const pos = this.#spcvs.getMousePos(aEvent);
        const boundRect = this.#spButtonPlay.boundingBox;
        switch(GameProps.status) {
            case EGameStatus.idle:
                if(boundRect.isPositionInside(pos)) {
                    this.#spcvs.style.cursor = "pointer";
                    this.#activeSprite = this.#spButtonPlay;
                } else {
                    this.#spcvs.style.cursor = "default";
                    this.#activeSprite = null; // Resett aktiv sprite
                }
                break;
            case EGameStatus.getReady:
                break;
            case EGameStatus.playing:
                break;
            case EGameStatus.gameOver:
                break;
        }
        
    }

    #onClick = () => {
        if(this.#activeSprite === this.#spButtonPlay) {
            GameProps.status = EGameStatus.getReady;
            this.#spcvs.style.cursor = "default";
            setTimeout(this.#onCountDown, 1000);
        }
    }

    #onCountDown = () => {
        if(this.#spNumberBig.index > 0) {
            setTimeout(this.#onCountDown, 1000);
            this.#spNumberBig.index--;
        } else {
            GameProps.status = EGameStatus.playing;
        }
    }
} // End of TMenu class