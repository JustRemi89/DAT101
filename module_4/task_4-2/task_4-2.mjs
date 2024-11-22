"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

let numberString = "";
for(let i = 0; i < numbers.length; i++) {
    numberString += numbers[i];
}

const textPart3 = "Hei på deg, hvordan har du det?";
const textArray = textPart3.split(" ");

let textString = "";
let textCount = 0;
for(let i = 0; i < textArray.length; i++) {
    textCount++;
    textString += textCount + ": " + textArray[i] + "[" + i + "] - ";
}

let arrayOfGirls = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];
let arrayOfBoys = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];
let arrayOfBoysAndGirls = arrayOfBoys.concat(arrayOfGirls);

function cutElement(aArray, aElement) {
    if(aArray.includes(aElement)) {
        aArray.splice(aArray.indexOf(aElement),1);
        printOut(aElement + " has been spliced. The new array is now: " + aArray.join(", ") + ".");
    } else {
        printOut("Element not found. Array is still: " + aArray.join(", ") + ".");
    }
}

class TBook {
    #Title;
    #Author;
    #ISBN;
    constructor(aTitle, aAuthor, aISBN){
    }
}

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("For loop: " + numberString);

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Join: " + numbers.join(", "));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Original text: " + textPart3);
printOut("Index 2: " + textArray[2]);
printOut("Index 4: " + textArray[4]);
printOut(textString);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Original array: " + arrayOfGirls.join(", "));
printOut("");
cutElement(arrayOfGirls, "Kari");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Array of girls: " + arrayOfGirls.join(", "));
printOut("Array of boys: " + arrayOfBoys.join(", "));
printOut("Combined: " + arrayOfBoysAndGirls.join(", "));
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
