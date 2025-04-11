"use strict";
//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps, EGameStatus, newGame } from "./BrickBreaker.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

export class TMenu {
    #spcvs;
    #spStartBtn; // Start-knappen fra Home
    #spPauseBtn; // Pause-knappen, ikke egentlig en knapp
    #spRestartBtn; // Restart-knappen i Idle
    #spHomeBtn; // Home-knappen i Idle
    #spPlayBtn; // Play-knappen i Idle
    #spMenuBG;
    #spCrushedNumber;
    #spCrushedIcon;
    #activeSprite;
    constructor(aSpriteCanvas) {
        //GameProps.status = EGameStatus.Idle;
        this.#spcvs = aSpriteCanvas;

        const pos = new lib2D.TPosition(190, 5);
        this.#spMenuBG = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.Menu, pos);

        pos.x = 560;
        pos.y = 400;
        this.#spPauseBtn = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, pos);
        this.#spPauseBtn.index = 2; // Setter til "Pause" knappen
        this.#spPauseBtn.scale = 1.5;
        
        pos.x = 500;
        pos.y = 450;
        this.#spStartBtn = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.StartBtn, pos);

        pos.x = 450;
        pos.y = 550;
        this.#spPlayBtn = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, pos);
        this.#spPlayBtn.index = 3; // Setter til "Play" knappen

        pos.x = 570;
        this.#spRestartBtn = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, pos);
        this.#spRestartBtn.index = 0; // Setter til "Restart" knappen

        pos.x = 690;
        this.#spHomeBtn = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, pos);
        this.#spHomeBtn.index = 1; // Setter til "Home" knappen

        pos.x = 250;
        pos.y = 30;
        this.#spCrushedIcon = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.NoOfCrushedBricks, pos);
        pos.x = 300;
        this.#spCrushedNumber = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.NumberSmall, pos);

        this.#activeSprite = null; // Vi har ingen aktive sprites som standard

        // EventListeners
        this.#spcvs.canvas.addEventListener("mousemove", this.#onMouseMove);
        this.#spcvs.canvas.addEventListener("click", this.#onClick);
        window.addEventListener("keydown", this.#onKeyDown);
    }

    draw() {
        switch(GameProps.status) {
            case EGameStatus.NewGame:
                this.#spMenuBG.draw();
                this.#spStartBtn.draw();
                break;
            case EGameStatus.Idle:
                this.#spMenuBG.draw();
                this.#spPauseBtn.draw();
                this.#spPlayBtn.draw();
                this.#spRestartBtn.draw();
                this.#spHomeBtn.draw();
                break;
            case EGameStatus.GameOver:
                this.#spMenuBG.draw();
                this.#spStartBtn.draw();
                break;
            case EGameStatus.Running:
                this.#spCrushedIcon.draw();
                this.#spCrushedNumber.draw();
                break;
        }
    }

    #onMouseMove = (aEvent) => {
        const pos = this.#spcvs.getMousePos(aEvent);

        // Sjekk om musen er over en av knappene
        // Sjekk Start knapp
        if (this.#spStartBtn.isMouseInside(pos)) {
            this.#spcvs.style.cursor = "pointer";
            this.#activeSprite = this.#spStartBtn;
        // Sjekk Play knapp
        } else if (this.#spPlayBtn.isMouseInside(pos)) {
            this.#spcvs.style.cursor = "pointer";
            this.#activeSprite = this.#spPlayBtn;
        // Sjekk Restart knapp
        } else if (this.#spRestartBtn.isMouseInside(pos)) {
            this.#spcvs.style.cursor = "pointer";
            this.#activeSprite = this.#spRestartBtn;
        // Sjekk Hjem knapp
        } else if (this.#spHomeBtn.isMouseInside(pos)) {
            this.#spcvs.style.cursor = "pointer";
            this.#activeSprite = this.#spHomeBtn;
        // Hvis ikke så ...
        } else {
            this.#spcvs.style.cursor = "default";
            this.#activeSprite = null; // Resett aktiv sprite
        }
    }

    #onClick = () => {
        if(this.#activeSprite === this.#spStartBtn) {
            newGame();
            GameProps.status = EGameStatus.Running;
            this.#spcvs.style.cursor = "default";
        }
        if(this.#activeSprite === this.#spPlayBtn) {
            GameProps.status = EGameStatus.Running;
            this.#spcvs.style.cursor = "default";
        }
        if(this.#activeSprite === this.#spRestartBtn) {
            newGame();
            GameProps.status = EGameStatus.Running;
            this.#spcvs.style.cursor = "default";
        }
        if(this.#activeSprite === this.#spHomeBtn) {
            GameProps.status = EGameStatus.NewGame;
            this.#spcvs.style.cursor = "default";
        }
    }

    #onKeyDown = (aEvent) => {
        if (aEvent.key === "Escape") { // Sjekk om ESC er trykket
            GameProps.status = EGameStatus.Idle;
        }
    };
}