"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { THero } from "./hero.mjs";
import { TBall } from "./ball.mjs";
import { TBrick } from "./bricks.mjs";
import { TMenu } from "./menu.mjs";

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

let crushedBricks = 0;

export const EGameStatus = {
  NewGame: 0,
  Running: 1,
  Idle: 2,
  GameOver: 3,
}

export const GameProps = {
  status: EGameStatus.NewGame,
  bounds: new lib2D.TRectangle({x: 26, y: 110}, SpriteInfoList.Background.width - 52, SpriteInfoList.Background.height - 195),
  background: new libSprite.TSprite(spcvs, SpriteInfoList.Background),
  menu: null,
  hero: null,
  ball: null,
  bricks: [],
}
  

//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

export function newGame() {
  // Create dynamic game properties here:
  GameProps.bricks = [];
  GameProps.menu = new TMenu(spcvs);
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
  switch(GameProps.status) {
    case EGameStatus.NewGame:
      GameProps.menu.draw(); // Draw menu
      break;
    case EGameStatus.Idle:
      GameProps.menu.draw(); // Draw menu
      break;
    case EGameStatus.Running:
      GameProps.menu.draw();
      GameProps.hero.draw(); // Draw hero
      drawBricks(); // Draw bricks
      GameProps.ball.draw(); // Draw ball
      drawBounds(); // Draw bounds
      break;
    case EGameStatus.GameOver:
      break;
  }
  requestAnimationFrame(drawGame);
}

function updateGame() {
  console.log(GameProps.status);
  // Update game properties here:
  switch (GameProps.status) {
    case EGameStatus.NewGame:
      break;
    case EGameStatus.Idle:
      break;
    case EGameStatus.Running:
      GameProps.ball.update(); // Update ball position
      checkBallBrickCollision(); // Check for collisions
      break;
    case EGameStatus.GameOver:
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

    let life;
    if (row === 0) {
      life = 1; // Første rad har 1 liv
    } else if (row === 1 || row === 2) {
      life = 2; // Rad 2 og 3 har 2 liv
    } else {
      life = 3; // Siste rad har 3 liv
    }

    for(let col = 0; col < cols; col++) {
      const brick = new TBrick(spcvs, color, pos, life);
      GameProps.bricks.push(brick);
      pos.x += brick.width + brickSpacing; // Move to the right for the next brick
    }
    pos.x = startX; // Reset x position for the next row
    pos.y += GameProps.bricks[0].height + brickSpacing; // Move down for the next row
  }
}

function drawBricks() {
  for(let i = 0; i < GameProps.bricks.length; i++) {
    GameProps.bricks[i].draw();
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
      // Sjekk om brick har ett liv igjen
      if (brick.life === 1) {
        brick.crush(); // Knus mursteinen
        crushedBricks++; // Øk antall knuste mursteiner
        console.log("Crushed bricks: " + crushedBricks);
        GameProps.ball.reverseY(); // Endre ballens retning (vertikalt)
        break; // Avslutt løkken etter første treff
      } else {
        brick.crush(); // Knus mursteinen
        GameProps.ball.reverseY(); // Endre ballens retning (vertikalt)
        break; // Avslutt løkken etter første treff
      }
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
