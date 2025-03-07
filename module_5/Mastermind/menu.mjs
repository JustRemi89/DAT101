"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import{ GameProps, SpriteInfoList, moveRoundIndicator } from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

//Lag en meny klasse "TMenu", ingen arv, skal ha tre knapper og en sprite
export class TMenu {
  #buttonNewGame;
  #buttonCheckAnswer;
  #buttonHint;
  #panelHint;
  #colorHints;
  #spcvs;
  #currentRound;
  constructor(aSpriteCanvas){
    this.#currentRound = 1;
    this.#spcvs = aSpriteCanvas;
    this.#buttonNewGame = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonNewGame,
      MastermindBoard.ButtonNewGame);

    this.#buttonCheckAnswer = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheckAnswer,
      MastermindBoard.ButtonCheckAnswer);
      
    this.#buttonHint = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheat,
      MastermindBoard.ButtonCheat);

    this.#panelHint = 
      new libSprite.TSprite(
        aSpriteCanvas,
        SpriteInfoList.PanelHideAnswer,
        MastermindBoard.PanelHideAnswer);   
        
    this.#buttonHint.onClick = this.onHintClick;
    this.#buttonCheckAnswer.onClick = this.onCheckAnswerClick;
    this.#colorHints = [];
  } // End of constructor

  draw(){
    this.#buttonNewGame.draw();
    this.#buttonCheckAnswer.draw();
    this.#buttonHint.draw();
    this.#panelHint.draw();
    for(let i = 0; i < this.#colorHints.length; i++){
      const colorHint = this.#colorHints[i];
      colorHint.draw();
    }
  }

  onHintClick = () =>{
    this.#panelHint.visible = !this.#panelHint.visible;
  }

  onCheckAnswerClick = () =>{
    //Denne sjekker om vi har valgt rett farge
    const answerObject = { color : 0, pos: -1, checkThis: true };
    //Lage liste over computerens svar
    const computerAnswerList = [];
    for(let i = 0 ; i < 4; i++){
      const obj = Object.create(answerObject);
      const computerAnswer = GameProps.computerAnswers[i];
      obj.color = computerAnswer.index;
      obj.pos = i;
      computerAnswerList.push(obj);
    }
    //Lage liste over spillerens svar
    const playerAnswerList = [];
    for(let i = 0 ; i < 4; i++){
        // Kontrollere at spilleren har valgt 4 farger
        if(GameProps.playerAnswers[i] === null){
          console.log("Du må velge 4 farger");
          return; // Avslutt funksjonen, spilleren mangler farger
        }
        const obj = Object.create(answerObject);
        const playerAnswer = GameProps.playerAnswers[i];
        obj.color = playerAnswer.index;
        obj.pos = i;
        playerAnswerList.push(obj);
    }
    // Sjekke om vi har valgt riktig farge på riktig plass
    let answerColorHintIndex = 0;
    for(let i = 0; i < 4; i++){
      const computerAnswer = computerAnswerList[i];
      const playerAnswer = playerAnswerList[i];
      if(computerAnswer.color === playerAnswer.color){
        console.log(`Riktig farge på riktig plass - ${i + 1}`);
        answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 1);
        // Vi må ikke sjekke disse to fargene igjen
        computerAnswer.checkThis = playerAnswer.checkThis = false;
      }
    }
    // Sjekke om vi har valgt riktig farge på feil plass
    for(let i = 0; i < 4; i++){
      const playerAnswer = playerAnswerList[i];
      // Hvis denne fargen skal sjekkes, sjekk mot alle computerens svar
      if(playerAnswer.checkThis) {
        for(let j = 0; j < 4; j++) {
          const computerAnswer = computerAnswerList[j];
          // Test om denne fargen skal sjekkes og at den ikke er på samme plass
          if(computerAnswer.checkThis && (playerAnswer.pos !== computerAnswer.pos)) {
            if(playerAnswer.color === computerAnswer.color){
              console.log(`Riktig farge på feil plass - ${playerAnswer.pos + 1} , ${computerAnswer.pos + 1}`);
              answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 0);
              // Vi må ikke sjekke disse to fargene igjen
              computerAnswer.checkThis = playerAnswer.checkThis = false;
            }
          }
        }
      }
      
    }
    // Gå videre til neste runde
    this.#setNextRound();
  } // End of onCheckAnswerClick

  // Privat metode, den bruker interne variabler og kan ikke påberopes utenfra
  #createColorHint(posIndex, colorIndex){
    const pos = GameProps.answerHintRow[posIndex++];
    const colorHintSPI = SpriteInfoList.ColorHint;
    const colorHint = new libSprite.TSprite(this.#spcvs, colorHintSPI, pos);
    colorHint.index = colorIndex;
    this.#colorHints.push(colorHint);
    return posIndex; // Vi må returnere den nye indeksen til posisjonen
  } // End of #createColorHint

  // Privat metode, den bruker interne variabler og kan ikke påberopes utenfra
  #setNextRound() {
    this.#currentRound++;
    GameProps.snapTo.positions = MastermindBoard.ColorAnswer[`Row${this.#currentRound}`];
    GameProps.answerHintRow = MastermindBoard.AnswerHint[`Row${this.#currentRound}`];
    moveRoundIndicator();
    for(let i = 0; i < 4; i++) {
      GameProps.playerAnswers[i].disable = true;
      GameProps.playerAnswers[i] = null;
    }
  } // End of #setNextRound

} // End of TMenu