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
        const answerObject = { color: 0, pos: -1 };
        const computerAnswerList = [];
        for (let i = 1; i <= 4; i++) {
            const obj = Object.create(answerObject);
            const computerAnswer = GameProps.computerAnswer;
            obj.color = computerAnswer.index;
            obj.pos = i;
            computerAnswerList.push(obj);
        }
        // Lage liste over spillerens svar
        const playerAnswerList = [];
        /*for (let i = 1; i <= 4; i++) {
            const obj = Object.create(answerObject);
            const playerAnswer = GameProps.ColorPickers[i];
            obj.color = playerAnswer.index;
            obj.pos = i;
            playerAnswerList.push(obj);
        }*/
    }

    /*buttonMouseDown = (aEvent) => {
        this.#newGame.onMouseDown(aEvent);
        this.#checkAnswer.onMouseDown(aEvent);
        this.#buttonCheat.onMouseDown(aEvent);
    }*/
}