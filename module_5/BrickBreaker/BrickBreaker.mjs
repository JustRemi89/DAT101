"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { THero } from "./hero.mjs";
import { TBall } from "./ball.mjs";
import { TBrick } from "./bricks.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  Background:         { x: 1392, y:    0, width: 1187, height: 771, count:  1 },
  BrickPurple:        { x:    0, y:  717, width:  140, height:  41, count:  3 },
  BrickRed:           { x:    0, y:  778, width:  140, height:  41, count:  3 },
  BrickYellow:        { x:    0, y:  843, width:  140, height:  41, count:  3 },
  BrickBlue:          { x:    0, y:  906, width:  140, height:  41, count:  3 },
  Buttons:            { x:    0, y:  146, width:   55, height:  55, count:  4 },
  StartBtn:           { x:    0, y:   76, width:  186, height:  56, count:  5 },
  PaddleSmall:        { x:    0, y:  285, width:  158, height:  17, count:  1 },
  PaddleLarge:        { x:  159, y:  285, width:  226, height:  17, count:  1 },
  Ball:               { x:   79, y:  220, width:   30, height:  30, count:  1 },
  NumberSmall:        { x:    0, y: 1329, width:   23, height:  29, count: 10 },
  NumberLarge:        { x:    0, y: 1373, width:   50, height:  60, count: 10 },
  Menu:               { x: 1572, y:  780, width:  830, height: 671, count:  1 },
  NoOfCrushedBricks:  { x:    0, y:  217, width:   35, height:  34, count:  1 },
  
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let hndUpdateGame = null;

export const EGameStatus = {
  Running: 0,
  Idle: 1,
  GameOver: 2,
}

export const GameProps = {
  status: EGameStatus.Idle,
  bounds : new lib2D.TRectangle({x: 26, y: 110}, SpriteInfoList.Background.width - 52, SpriteInfoList.Background.height - 195),
  background: new libSprite.TSprite(spcvs, SpriteInfoList.Background),
  hero: null,
  ball: null,
  bricks: [],
}
  

//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

function newGame() {
  // Create dynamic game properties here:
  GameProps.hero = new THero(spcvs);
  generateBricks();
  GameProps.ball = new TBall(spcvs);
  
  if(hndUpdateGame !== null) {
    clearInterval(hndUpdateGame);
  }
  hndUpdateGame = setInterval(updateGame, 1);
}

function drawBounds() {
  const ctx = spcvs.context; 
  const oldStrokeStyle = ctx.strokeStyle;
  const oldLineWidth = ctx.lineWidth;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.strokeRect(GameProps.bounds.x, GameProps.bounds.y, GameProps.bounds.width, GameProps.bounds.height);
  ctx.strokeStyle = oldStrokeStyle;
  ctx.lineWidth = oldLineWidth;
}

function drawGame() {
  spcvs.clearCanvas();
  GameProps.background.draw(0, 0);
  GameProps.hero.draw();
  for(let i = 0; i < GameProps.bricks.length; i++) {
    GameProps.bricks[i].draw();
  }
  GameProps.ball.draw();
  drawBounds();
  requestAnimationFrame(drawGame);
}

function updateGame() {
  // Update game properties here:
  switch (GameProps.status) {
    case EGameStatus.Running:
      GameProps.hero.update();
      GameProps.ball.update();
      // Check for collisions
      checkBallBrickCollision();
      break;
    case EGameStatus.GameOver:
      break;
    case EGameStatus.Idle:
      break;
  }
}

function generateBricks() {
  const startX = 150; // Starting x position for the first brick
  const startY = 150; // Starting y position for the first brick
  const brickSpacing = 5; // Spacing between bricks

  const rows = 4; // Number of rows of bricks
  const cols = 6; // Number of columns of bricks

  const colors = [
    SpriteInfoList.BrickYellow,
    SpriteInfoList.BrickRed,
    SpriteInfoList.BrickPurple,
    SpriteInfoList.BrickBlue,
  ];

  const pos = new lib2D.TPoint(startX, startY);

  for(let row = 0; row < rows; row++) {
    const color = colors[row % colors.length]; // Cycle through colors based on row
    for(let col = 0; col < cols; col++) {
      const brick = new TBrick(spcvs, color, pos);
      GameProps.bricks.push(brick);
      pos.x += brick.width + brickSpacing; // Move to the right for the next brick
    }
    pos.x = startX; // Reset x position for the next row
    pos.y += GameProps.bricks[0].height + brickSpacing; // Move down for the next row
  }
}

function checkBallBrickCollision() {
  for (let i = 0; i < GameProps.bricks.length; i++) {
    const brick = GameProps.bricks[i];

    // Sjekk om mursteinen er synlig og ikke knust
    if (!brick.isVisible || brick.isCrushed) {
      continue;
    }

    // Sjekk kollisjon
    if (
      GameProps.ball.x < brick.x + brick.width &&
      GameProps.ball.x + GameProps.ball.width > brick.x &&
      GameProps.ball.y < brick.y + brick.height &&
      GameProps.ball.y + GameProps.ball.height > brick.y
    ) {
      // Kollisjon oppdaget
      brick.crush(); // Knus mursteinen
      GameProps.ball.reverseY(); // Endre ballens retning (vertikalt)
      break; // Avslutt løkken etter første treff
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.Background.width;
  cvs.height = SpriteInfoList.Background.height;
  spcvs.updateBoundsRect(); // The size of the canvas has changed, update the bounds rect.

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}

function windowResize() {
  spcvs.updateBoundsRect();
}

//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------

window.addEventListener("resize", windowResize);
spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
