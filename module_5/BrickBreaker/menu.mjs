"use strict";
//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps, EGameStatus } from "./BrickBreaker.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------
// prettier-ignore
export class TMenu {
    #spcvs;
    #spButtonPlay;
    #spMenuBG;
    #activeSprite;
    constructor(aSpriteCanvas) {
        this.#spcvs = aSpriteCanvas;
        GameProps.status = EGameStatus.Idle;
        const pos = new lib2D.TPosition(190, 5);
        this.#spMenuBG = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.Menu, pos);
        pos.x = 500;
        pos.y = 450;
        this.#spButtonPlay = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.StartBtn, pos);
        this.#activeSprite = null; // Vi har ingen aktive sprites som standard

        // EventListeners
        this.#spcvs.canvas.addEventListener("mousemove", this.#onMouseMove);
        this.#spcvs.canvas.addEventListener("click", this.#onClick);
    }

    draw() {
        switch(GameProps.status) {
            case EGameStatus.NewGame:
                this.#spMenuBG.draw();
                this.#spButtonPlay.draw();
                break;
            case EGameStatus.Idle:
                this.#spMenuBG.draw();
                this.#spButtonPlay.draw();
                break;
            case EGameStatus.GameOver:
                this.#spMenuBG.draw();
                this.#spButtonPlay.draw();
                break;
            case EGameStatus.Running:
                break;
        }
    }

    #onMouseMove = (aEvent) => {
        const pos = this.#spcvs.getMousePos(aEvent);

        if (this.#spButtonPlay.isMouseInside(pos)) {
            this.#spcvs.style.cursor = "pointer";
            this.#activeSprite = this.#spButtonPlay;
        } else {
            this.#spcvs.style.cursor = "default";
            this.#activeSprite = null; // Resett aktiv sprite
        }
    }

    #onClick = () => {
        if(this.#activeSprite === this.#spButtonPlay) {
            GameProps.status = EGameStatus.Running;
            this.#spcvs.style.cursor = "default";
        }
    }
}