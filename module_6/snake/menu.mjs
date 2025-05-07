"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------

import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

export class TMenu {
    #spcvs; // SpriteCanvas
    #spStartBtn; // Start-knappen som brukes i start-meny
    #spContinueBtn; // Fortsett-knappen i pause-meny
    #spRestartBtn; // Restart-knappen i Game Over-meny
    #spHomeBtn; // Home-knappen i Game Over-meny
    constructor(aSpriteCanvas) {
        this.#spcvs = aSpriteCanvas;

        const pos = new lib2D.TPosition(190, 5);
        this.#spStartBtn = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Play, pos);
    }

    draw() {
        switch(GameProps.gameStatus) {
            case EGameStatus.Idle:
                this.#spStartBtn.draw();
                break;
            case EGameStatus.GameOver:
                this.#spRestartBtn.draw();
                this.#spHomeBtn.draw();
                break;
            case EGameStatus.Pause:
                this.#spContinueBtn.draw();
                break;
        }
    }
}