"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";
import TBallPhysics from "./ballPhysics.mjs";

export class TBall extends libSprite.TSprite {
    #physics;
    constructor(aSpriteCanvas){
        const pos = new lib2d.TPoint(370, 620);
        super(aSpriteCanvas, SpriteInfoList.Ball, pos, lib2d.TCircle);
        this.#physics = new TBallPhysics(this, new lib2d.TPoint(1, -1), 2.1);
    }

    update() {
        this.#physics.update(GameProps.bounds, GameProps.hero);
    }
}