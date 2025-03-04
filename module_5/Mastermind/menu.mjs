"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList } from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

export class TMenu {
    #newGame;
    #checkAnswer;
    #buttonCheat;
    #panelHint;
    constructor(spcvs) {
        this.#newGame = new libSprite.TSpriteButton(spcvs, SpriteInfoList.ButtonNewGame, MastermindBoard.ButtonNewGame);
        this.#checkAnswer = new libSprite.TSpriteButton(spcvs, SpriteInfoList.ButtonCheckAnswer, MastermindBoard.ButtonCheckAnswer);
        this.#buttonCheat = new libSprite.TSpriteButton(spcvs, SpriteInfoList.ButtonCheat, MastermindBoard.ButtonCheat);
        this.#panelHint = new libSprite.TSprite(spcvs, SpriteInfoList.PanelHideAnswer, MastermindBoard.PanelHideAnswer);

        this.#buttonCheat.onClick = this.onHintClick;
    }

    draw() {
        this.#newGame.draw();
        this.#checkAnswer.draw();
        this.#buttonCheat.draw();
        this.#panelHint.draw();
    }

    onHintClick = () => {
        this.#panelHint.visible = !this.#panelHint.visible;
    }

    onCheckAnswerClick = () => {
        // Denne sjekker om vi har valgt rett farge
        
    }

    /*buttonMouseDown = (aEvent) => {
        this.#newGame.onMouseDown(aEvent);
        this.#checkAnswer.onMouseDown(aEvent);
        this.#buttonCheat.onMouseDown(aEvent);
    }*/
}