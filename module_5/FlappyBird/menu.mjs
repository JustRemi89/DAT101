"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import lib2d from "../../common/libs/lib2d.mjs";
import { SpriteInfoList, GameProps, EGameStatus, startGame } from "./FlappyBird.mjs";

export class TMenu {
    #spFlappyBird;
    #spButtonPlay;
    #spInfoText;
    #spNumberBig;
    #spGameOver;
    #spMedal;
    #spcvs;
    #activeSprite;
    #posPlayScore;
    #posScore;
    #posBestScore;
    #ranking = {first: 0, second: 0, third: 0};
    constructor(aSpriteCanvas) {
        this.#spcvs = aSpriteCanvas;

        //GameProps.status = EGameStatus.gameOver;
        
        const pos = new lib2d.TPosition(199, 140);
        this.#spFlappyBird = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);
        
        pos.x = 240;
        pos.y = 250;
        this.#spButtonPlay = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);
        
        pos.x = 199;
        pos.y = 50;
        this.#spInfoText = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.infoText, pos);

        pos.x = 280;
        pos.y = 150;
        this.#spNumberBig = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.numberBig, pos);
        this.#spNumberBig.index = 3;

        pos.x = 184;
        pos.y = 110;
        this.#spGameOver = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.gameOver, pos);

        pos.x = 210;
        pos.y = 153;
        this.#spMedal = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.medal, pos);
        this.#spMedal.index = 0;
        
        this.#spcvs.addEventListener("mousemove", this.#onMouseMove);
        this.#spcvs.addEventListener("click", this.#onClick);
        this.#activeSprite = null; // Vi har ingen aktive sprites som standard

        this.#posPlayScore = new lib2d.TPosition(50, 30);
        this.#posScore = new lib2d.TPosition(388, 158);
        this.#posBestScore = new lib2d.TPosition(388, 200);
    }

    draw() {
        switch(GameProps.status) {
            case EGameStatus.idle:
                this.#spFlappyBird.draw();
                this.#spButtonPlay.draw();
                break;
            case EGameStatus.getReady:
                this.#spInfoText.index = 0;
                this.#spInfoText.draw();
                this.#spNumberBig.draw();
                break;
            case EGameStatus.playing:
                this.#spcvs.drawText(GameProps.score.toString(), this.#posPlayScore);
                break;
            case EGameStatus.gameOver:
                this.#spInfoText.index = 1;
                this.#spInfoText.draw();
                this.#spGameOver.draw();
                this.#spMedal.draw();
                this.#spcvs.drawText(GameProps.score.toString(), this.#posScore);
                this.#spcvs.drawText(GameProps.bestScore.toString(), this.#posBestScore);
                this.#spButtonPlay.draw();
                break;
        }
    } // End of draw

    incScore(aScore) {
        GameProps.score += aScore;
        if(GameProps.score > this.#ranking.first) {
            this.#ranking.third = this.#ranking.second;
            this.#ranking.second = this.#ranking.first;
            this.#ranking.first = GameProps.score;
            GameProps.bestScore = this.#ranking.first;
            this.#spMedal.index = 2;
        } else if(GameProps.score > this.#ranking.second) {
            this.#ranking.third = this.#ranking.second;
            this.#ranking.second = GameProps.score;
            this.#spMedal.index = 1;
        } else if(GameProps.score > this.#ranking.third) { 
            this.#ranking.third = GameProps.score;
            this.#spMedal.index = 3;
        } else {
            this.#spMedal.index = 0;
            if(GameProps.score > GameProps.bestScore) {
                GameProps.bestScore = GameProps.score;
            }
        }
    } // End of incScore

    reset() {
        GameProps.score = 0;
        this.#spNumberBig.index = 3;
        this.#spInfoText.index = 0;
    }

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
            GameProps.sounds.countDown.play();
            this.#spcvs.style.cursor = "default";
            setTimeout(this.#onCountDown, 1000);
        }
    }

    #onCountDown = () => {
        if(this.#spNumberBig.index > 0) {
            setTimeout(this.#onCountDown, 1000);
            this.#spNumberBig.index--;
        } else {
            startGame();
        }
    }
} // End of TMenu class