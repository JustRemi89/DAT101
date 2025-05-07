"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------

import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SheetData, GameProps, EGameStatus, newGame } from "./game.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

export class TMenu {
    #spcvs; // SpriteCanvas
    #spStartBtn; // Start-knappen som brukes i start-meny
    #spContinueBtn; // Fortsett-knappen i pause-meny
    #spRestartBtn; // Restart-knappen i Game Over-meny
    #spHomeBtn; // Home-knappen i Game Over-meny
    #activeSprite; // Den aktive sprite-knappen som musen er over
    constructor(aSpriteCanvas) {
        this.#spcvs = aSpriteCanvas;

        const centerCvsX = this.#spcvs.canvas.width / 2;
        const centerCvsY = this.#spcvs.canvas.height / 2;

        const centerBtnX = centerCvsX - SheetData.Play.width / 2;
        const centerBtnY = centerCvsY - SheetData.Play.height / 2;

        const pos = new lib2D.TPosition(centerBtnX, centerBtnY);
        this.#spStartBtn = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Play, pos);
        this.#spContinueBtn = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Resume, pos);

        this.#activeSprite = null; // Vi har ingen aktive sprites som standard
        // EventListeners
        this.#spcvs.canvas.addEventListener("mousemove", this.#onMouseMove);
        this.#spcvs.canvas.addEventListener("click", this.#onClick);
        window.addEventListener("keydown", this.#onKeyDown);
    }

    draw() {
        switch(GameProps.gameStatus) {
            case EGameStatus.Idle:
                this.#spStartBtn.draw();
                break;
            case EGameStatus.GameOver:
                //this.#spRestartBtn.draw();
                //this.#spHomeBtn.draw();
                break;
            case EGameStatus.Pause:
                this.#spContinueBtn.draw();
                break;
        }
    } // End draw()

    #onMouseMove = (aEvent) => {
        const pos = this.#spcvs.getMousePos(aEvent);

        // Sjekk om musen er over en av knappene
        // Sjekk Start knapp
        if (this.#spStartBtn.isMouseInside(pos)) {
            this.#spcvs.style.cursor = "pointer";
            this.#activeSprite = this.#spStartBtn;
        // Sjekk Restart knapp
        //} else if (this.#spRestartBtn.isMouseInside(pos)) {
       //     this.#spcvs.style.cursor = "pointer";
        //    this.#activeSprite = this.#spRestartBtn;
        // Sjekk Hjem knapp
       // } else if (this.#spHomeBtn.isMouseInside(pos)) {
       //     this.#spcvs.style.cursor = "pointer";
      //      this.#activeSprite = this.#spHomeBtn;
        // Hvis ikke så ...
        } else {
            this.#spcvs.style.cursor = "default";
            this.#activeSprite = null; // Resett aktiv sprite
        }
    } // End #onMouseMove

    #onClick = () => {
        if(this.#activeSprite === this.#spStartBtn) {
            newGame();
            GameProps.gameStatus = EGameStatus.Playing;
            this.#spcvs.style.cursor = "default";
        }
        if(this.#activeSprite === this.#spRestartBtn) {
            newGame();
            GameProps.gameStatus = EGameStatus.Playing;
            this.#spcvs.style.cursor = "default";
        }
        if(this.#activeSprite === this.#spHomeBtn) {
            GameProps.gameStatus = EGameStatus.NewGame;
            this.#spcvs.style.cursor = "default";
        }
    } // End #onClick

    #onKeyDown = (aEvent) => {
        if (aEvent.key === "Escape") { // Sjekk om ESC er trykket
            GameProps.gameStatus = EGameStatus.Pause;
        }
    }; // End #onKeyDown

}