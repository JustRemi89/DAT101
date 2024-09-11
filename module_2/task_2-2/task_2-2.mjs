"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const orgCalcNum = 2 + 3 * 2 - 4 * 6;
printOut("Original: 2 + 3 * 2 - 4 * 6 = " + orgCalcNum);
const newCalcNum = 2 + 3 * (2 - 4) * 6;
printOut("Modified: 2 + 3 * (2 - 4) * 6 = " + newCalcNum);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const meters = 25;
const cm = 34;
let distance = ((meters * 100) * 10);
distance = distance + (cm * 10);
const inchConv = 25.4;
let imperial1 = distance / inchConv;
imperial1 = Math.round(imperial1 * 100) / 100;
printOut(meters + "m and " + cm + "cm is " + imperial1 + " inches");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let days = 3;
let hours = 12;
let mins = 14;
let sec = 45;

days = days * 24 * 60;
hours = hours * 60;
sec = sec / 60;
mins = mins + days + hours + sec;

printOut("There is " + mins + " minutes in 3 days, 12 hours, 14 minutes, and 45 seconds");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const totalMins = 6322.52;
let leftoverMins = totalMins;

days = Math.floor(leftoverMins / 60 / 24);
leftoverMins -= days * 60 * 24;

hours = Math.floor(leftoverMins / 60);
leftoverMins -= hours * 60;

mins = Math.floor(leftoverMins);

sec = Math.round((leftoverMins - mins) * 60);

leftoverMins -= mins;

printOut("There is " + days + " days " + hours + " hours " + mins + " mins and " + sec + " seconds.");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const dollar = 54;
const tempNOK = 76;
const tempUSD = 8.6;
const USDtoNOK = tempNOK / tempUSD;
const NOKtoUSD = tempUSD / tempNOK;
const NOK = dollar * USDtoNOK;

printOut(dollar + " dollar is " + Math.round(NOK) + " kroner.");
printOut(Math.round(NOK) + " kroner is " + dollar + " dollars.");
printOut("USD to NOK: " + USDtoNOK);
printOut("NOK to USD: " + NOKtoUSD);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const phrase = "There is much between heaven and earth that we do not understand.";
const chars = phrase.length;
const char = phrase[18];
const partText = phrase.substring(34, 34 + 8);
const indexFinder = phrase.indexOf("earth");

printOut("There are " + chars + " characters in the text and the character at position 19 is: " + char + ".");
printOut("The text from character number 35 and 8 characters forward is '" + partText + "'.");
printOut("The index where 'earth' starts is " + indexFinder + ".");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const aa = 5 > 3;
printOut("5 > 3: " + aa);
const bb = 7 >= 7;
printOut("7 >= 7: " + bb);
const cc = "a" > "b";
printOut("a > b: " + cc);
const dd = "1" < "a";
printOut("1 < a: " + dd);
const ee = "2500" < "abcd";
printOut("2500 < abcd: " + ee);
const ff = "arne" !== "thomas";
printOut("arne != thomas: " + ff);
const gg = 2 === 5;
printOut("2 = 5: " + gg);
const hh = "abcd" > "bcd";
printOut("abcd > bcd: " + hh);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const number1 = parseInt("254", 10);
const number2 = parseFloat("57.23");
const number3 = parseInt("25 kroner", 10);
printOut("number1 = " + number1);
printOut("number2 = " + number2);
printOut("number3 = " + number3);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const r = Math.floor(Math.random() * 360) + 1;
printOut("This is a random number: " + r);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!
Use modulus (%) to calculate how many weeks and days are in 131 days. */
const totalDays_part10 = 131;
const daysInWeek = 7;
const weeks_part10 = Math.floor(totalDays_part10 / daysInWeek);
const days_part10 = Math.floor(weeks_part10 % daysInWeek);
printOut("Weeks = " + weeks_part10);
printOut("Days = " + days_part10);
printOut(newLine);