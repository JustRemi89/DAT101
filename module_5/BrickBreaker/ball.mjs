"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList } from "./BrickBreaker.mjs";

export class TBall extends libSprite.TSprite {
    constructor(aSpriteCanvas){
        const pos = new lib2d.TPoint(300, 620);
        super(aSpriteCanvas, SpriteInfoList.Ball, pos, lib2d.TCircle);
    }
}