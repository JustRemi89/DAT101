"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

const Positions = MastermindBoard.ColorPicker;

export class TColorPicker extends libSprite.TSpriteDraggable {
    #spcvs;
    #spi;
    #color;
    #snapPos;
    #snapIndex;
    #hasMoved;
    constructor(spcvs, spriteInfo, color, index) {
        super(spcvs, spriteInfo, Positions[color]);
        this.index = index;
        this.snapTo = GameProps.SnapTo;
        this.#spcvs = spcvs;
        this.#spi = spriteInfo;
        this.#color = color;
        this.#snapPos = null;
        this.#snapIndex = -1;
        this.#hasMoved = false;
    }

    onCanDrop() {
        return false;
    }

    clone() {
        return new TColorPicker(
            this.#spcvs,
            this.#spi,
            this.#color,
            this.index
        );
    }

    onDrop(aDropPosition) {
        GameProps.ColorPickers.push(this.clone());
        this.#snapIndex = GameProps.SnapTo.positions.indexOf(aDropPosition);
        this.#snapPos = new lib2D.TPoint();
        this.#snapPos.x = GameProps.SnapTo.positions[this.#snapIndex].x;
        this.#snapPos.y = GameProps.SnapTo.positions[this.#snapIndex].y;
        GameProps.SnapTo.positions[this.#snapIndex] = null;
        this.#hasMoved = true;
    }

    onMouseDown() {
        super.onMouseDown();
        const index = GameProps.ColorPickers.indexOf(this);
        GameProps.ColorPickers.splice(index, 1);
        GameProps.ColorPickers.push(this);
        if(this.#snapPos !== null) {
            GameProps.SnapTo.positions.push(this.#snapPos);
            //this.#snapPos = null;
        }
    }

    onCancelDrop() {
        if(this.#hasMoved) {
            const index = GameProps.ColorPickers.indexOf(this);
            GameProps.ColorPickers.splice(index, 1);
            this.spcvs.removeSpriteButton(this);
        }
    }
}