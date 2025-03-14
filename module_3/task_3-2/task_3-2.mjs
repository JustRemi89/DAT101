"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Use "for" loops to generate two lines on the HTML page. One should count from 1 to 10, and the other
should count from 10 to 1. Use only two lines to print the rows. */
for(let i = 1; i <= 10; i++) { printOut(i.toString()); }
for(let i = 10; i >= 1; i--) { printOut(i.toString()); }
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Create a program that can guess a number between 1 and 60. Declare a variable and assign it a value, for
example, 45. Let the computer "guess" by generating a random number. Use a "while" loop and the
"random" function. Keep the "while" loop running as long as the "guessed number" is incorrect. Print the
number once the "while" loop has completed. You do not need to print anything while the "while" loop is in
progress */

const answerNumber = 42;
let guessNumber = 0;
while(answerNumber !== guessNumber){
  guessNumber = Math.ceil(Math.random() * 60);
}
printOut("Guess Number = " + guessNumber.toString());

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Take the program from part 2 and expand it to guess a number between 1 and one million. Print the
number of guesses as well as the number of milliseconds it took to guess the number. HINT: Use the
Date.now() function to measure time. */

guessNumber = 0;
let guessCount = 0;
const startTime = Date.now();
while(answerNumber !== guessNumber){
  guessCount++;
  guessNumber = Math.ceil(Math.random() * 1000000);
}
const endTime = Date.now();
const timeUsed = endTime - startTime;
printOut("Antall gjetninger " + guessCount.toString() + " tok " + timeUsed.toString() + " ms");

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Use a "for" loop and a "while" loop to find all prime numbers greater than 1 and less than 200.
○ HINT: A prime number is any natural number greater than 1 that is only divisible by itself and
1. The number 1 is not a prime. (See Wikipedia on primes or ask your AI). */

let primes = [];

for (let num = 2; num < 200; num++) {
    let isPrime = true;
    let i = 2;

    // Using a while loop to check if the number is divisible by any number other than 1 and itself
    while (i <= Math.sqrt(num)) {
        if (num % i === 0) {
            isPrime = false;
            break; // Exit the loop if a divisor is found
        }
        i++;
    }

    // If no divisors were found, it's a prime number
    if (isPrime) {
        primes.push(num);
    }
}
printOut(primes.toString());

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Create two loops that print 9 columns and 7 rows with the text "K1, R1" for the first cell, "K2, R1" for the
second cell, and so on.
○ Hint: Use what we call nested loops. This is a "for" loop within another "for" loop.
Use the provided printOut function to print each row with its sets of columns; remember to place this in
the right level of the nested for loops. The output should look like this:
K1R1 K2R1 K3R1 K4R1 K5R1 K6R1 K7R1 K8R1 K9R1
K1R2 K2R2 K3R2 K4R2 K5R2 K6R2 K7R2 K8R2 K9R2
K1R3 K2R3 K3R3 K4R3 K5R3 K6R3 K7R3 K8R3 K9R3
K1R4 K2R4 K3R4 K4R4 K5R4 K6R4 K7R4 K8R4 K9R4
K1R5 K2R5 K3R5 K4R5 K5R5 K6R5 K7R5 K8R5 K9R5
K1R6 K2R6 K3R6 K4R6 K5R6 K6R6 K7R6 K8R6 K9R6
K1R7 K2R7 K3R7 K4R7 K5R7 K6R7 K7R7 K8R7 K9R7 */

for(let row = 1; row <= 7; row++) {
    let rowText = "";
    for(let column = 1; column <= 9; column++) {
        rowText += "K" + column + "R" + row + " ";
    }
    printOut(rowText);
}

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Simulate 5 student grades using the Math.random() function, from 1 to 236 (inclusive).
For each grade, print the student's grade (A to F) based on the point distribution provided:
○ A: 89% – 100%
○ B: 77% – 88%
○ C: 65% – 76%
○ D: 53% – 64%
○ E: 41% – 52%
○ F: 0% – 40%
Sorting Challenge (Bonus): Sort and print the 5 grades in descending order (from A to F) without using
an array. You can use a for loop and a do/while loop to achieve this.
Hint for Success: If you successfully complete the sorting challenge, you'll unlock a valuable hint for Part
9 of "DAT101: Mandatory assignment 4.1" that will make it easier to solve. The learning outcomes remain
the same, but this hint will give you a head start! */

const maxScore = 236;

// Preparing "boxes" to put results in so we can sort them by grades A-F
let varA = "", varB = "", varC = "", varD = "", varE = "", varF = "";

for (let i = 1; i <= 5; i++) {
    let score = Math.ceil(Math.random() * maxScore);
    let percentage = (score / maxScore) * 100;
    let studentEntry = "Student " + i + ": " + score.toString() + " ("+ Math.ceil(percentage.toString()) +"%) of " + maxScore.toString() + " ";
    if (percentage >= 89) {
        varA += studentEntry + "Grade: A<br/>";
    } else if (percentage >= 77) {
        varB += studentEntry + "Grade: B<br/>";
    } else if (percentage >= 65) {
        varC += studentEntry + "Grade: C<br/>";
    } else if (percentage >= 53) {
        varD += studentEntry + "Grade: D<br/>";
    } else if (percentage >= 41) {
        varE += studentEntry + "Grade: E<br/>";
    } else {
        varF += studentEntry + "Grade: F<br/>";
    }
}
if(varA){printOut(varA);}
if(varB){printOut(varB);}
if(varC){printOut(varC);}
if(varD){printOut(varD);}
if(varE){printOut(varE);}
if(varF){printOut(varF);}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Simulate 6 dice and print how many "throws" it takes to get:
● 1 2 3 4 5 6 (full straight)
● 3 pairs
● 2 of a kind and 4 of a kind (tower)
● All the same (Yahtzee) */
printOut("Dice Rolling Extravaganza");
// Variabler for å telle antall kast for hver mål-kombinasjon
let throwCountFullStraight = 0;
let throwCountYahtzee = 0;
let throwCountTower = 0;
let throwCountThreePairs = 0;

// Variabler for å sjekke om vi har funnet hver kombinasjon
let fullStraightFound = false;
let yahtzeeFound = false;
let towerFound = false;
let threePairsFound = false;

// Løkke for å kaste terninger til vi finner alle kombinasjonene
while (!fullStraightFound || !yahtzeeFound || !towerFound || !threePairsFound) {
    // Genererer seks terningkast
    const d1 = Math.ceil(Math.random() * 6);
    const d2 = Math.ceil(Math.random() * 6);
    const d3 = Math.ceil(Math.random() * 6);
    const d4 = Math.ceil(Math.random() * 6);
    const d5 = Math.ceil(Math.random() * 6);
    const d6 = Math.ceil(Math.random() * 6);

    // Kombinerer terningkastene i en streng for enkelhets skyld
    let diceThrow = "";
    diceThrow += d1.toString() + ",";
    diceThrow += d2.toString() + ",";
    diceThrow += d3.toString() + ",";
    diceThrow += d4.toString() + ",";
    diceThrow += d5.toString() + ",";
    diceThrow += d6.toString();

    // Teller antall forekomster av hvert tall (1 til 6)
    const count1 = (diceThrow.match(/1/g) || "").length;
    const count2 = (diceThrow.match(/2/g) || "").length;
    const count3 = (diceThrow.match(/3/g) || "").length;
    const count4 = (diceThrow.match(/4/g) || "").length;
    const count5 = (diceThrow.match(/5/g) || "").length;
    const count6 = (diceThrow.match(/6/g) || "").length;

    // Beregner hvor mange ganger hver telling (1, 2, 4, 6) dukker opp
    const equals1 = (count1 === 1) + (count2 === 1) + (count3 === 1) + (count4 === 1) + (count5 === 1) + (count6 === 1);
    const equals2 = (count1 === 2) + (count2 === 2) + (count3 === 2) + (count4 === 2) + (count5 === 2) + (count6 === 2);
    const equals4 = (count1 === 4) + (count2 === 4) + (count3 === 4) + (count4 === 4) + (count5 === 4) + (count6 === 4);
    const equals6 = (count1 === 6) + (count2 === 6) + (count3 === 6) + (count4 === 6) + (count5 === 6) + (count6 === 6);

    // Sjekker etter Full Straight (1-2-3-4-5-6 én gang hver)
    if (!fullStraightFound) {
        if (equals1 === 6) {
            fullStraightFound = true;
            printOut("Full Straight found after " + throwCountFullStraight + " throws.");
        } else {
            throwCountFullStraight++;
        }
    }

    // Sjekker etter Yahtzee (alle like)
    if (!yahtzeeFound) {
        if (equals6 === 1) {
            yahtzeeFound = true;
            printOut("Yahtzee found after " + throwCountYahtzee + " throws.");
        } else {
            throwCountYahtzee++;
        }
    }

    // Sjekker etter Tower (2 like og 4 like)
    if (!towerFound) {
        if (equals2 === 1 && equals4 === 1) {
            towerFound = true;
            printOut("Tower found after " + throwCountTower + " throws.");
        } else {
            throwCountTower++;
        }
    }

    // Sjekker etter 3 Pairs (tre par)
    if (!threePairsFound) {
        if (equals2 === 3) {
            threePairsFound = true;
            printOut("3 Pairs found after " + throwCountThreePairs + " throws.");
        } else {
            throwCountThreePairs++;
        }
    }
}

printOut(newLine);