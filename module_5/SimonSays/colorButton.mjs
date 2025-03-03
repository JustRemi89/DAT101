"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { gameProps, EGameStatusType, spawnSequence } from "./SimonSays.mjs";

export class TColorButton extends libSprite.TSpriteButton {
    constructor(aSpriteCanvas, aSpriteInfo) {
        super(aSpriteCanvas, aSpriteInfo, aSpriteInfo.dst);
        this.sound = null;
    }

    // Vi har noe som heter A.P.I.E. (Abstraction, Polymorphism, Inheritance, Encapsulation)
    // Vi må løse dette med polymorphism når musa er over smultringen

    isMouseInside(aPoint) {
        // Førsst sjekk om musa er innenfor firkanten som omslutter smultringen
        let isInside = super.isMouseInside(aPoint);
        // Hvis musa er over, sjekk videre om den er utenfor radius 1 og innenfor radius 2
        if (isInside) {
            const dx = aPoint.x - gameProps.GameCenter.x;
            const dy = aPoint.y - gameProps.GameCenter.y;
            const dist = Math.hypot(dx, dy);
            isInside = (dist >= this.spi.dst.r1) && (dist <= this.spi.dst.r2);
        }
        return isInside;
    }

    // Vi må også løse dette med polymorphism når musa trykkes ned på smultringen
    onMouseDown() {
        this.index = 1;
        this.sound.play();
    }

    onLeave(aEvent) {
        if(aEvent.buttons !== 0) {
            this.index = 0;
            this.sound.stop();
        }
    }

    onMouseUp() {
        if(this.index !== 1) return; // Hvis knappen ikke er trykket ned, så gjør ingenting
        this.index = 0;
        this.sound.stop();
        if (gameProps.Status !== EGameStatusType.Player) {
            return;
        }
        if (gameProps.activeButton === this) {
            console.log("Riktig knapp");
            if(gameProps.seqIndex < gameProps.sequence.length - 1) {
                gameProps.seqIndex++;
                gameProps.activeButton = gameProps.sequence[gameProps.seqIndex];
            } else {
                gameProps.spnRound.value++;
                gameProps.spnGameOver.value = gameProps.spnRound.value;
                spawnSequence();
            }
        } else {
            console.log("Feil knapp");
            gameProps.Status = EGameStatusType.GameOver;
            gameProps.buttonStartEnd.index = 1;
            gameProps.buttonStartEnd.visible = true;
            gameProps.spnGameOver.draw();
        }
    }

} // class TColorButton