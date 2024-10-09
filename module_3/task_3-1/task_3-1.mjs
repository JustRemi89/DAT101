"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/*
Complete the given "if" in the task_3-3.mjs file at part 1, statement so that it matches this: If I wake up at
exactly 7 o'clock then I can catch the bus to school. Run the program with different values of wake-up time
(6, 7, 8).
Print out to the HTML page the expression statement you made.
*/
printOut("Task 1, 2 and 3");
let wakeUpTime = 7;
/*wakeUpTime = 7;
wakeUpTime = 8;*/
printOut("wakeUpTime = " + wakeUpTime);
if (wakeUpTime == 7) {
  printOut("I can take the bus to school.");
} else if(wakeUpTime == 8) {
  printOut("I can take the train to school.");
} else {
  printOut("I have to take the car to school.");
}
printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/*
Write an if statement that checks whether an integer variable is negative or positive, print the text
"Positive" or "Negative" accordingly. Run the program with different types of values for the variable to
check the if statement.
*/
const intVar = -10;
if(intVar > 0) {
  printOut("Positive");
} else if(intVar < 0) {
  printOut("Negative");
} else {
  printOut("Zero");
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/*
Imagine you have a photo editing profession. And you have a website where people can upload pictures
for you to work on. However, the images must be 4MP or larger, if they are smaller, you cannot use them.
Create a variable that holds a generated random integer between 1 and 8 (inclusive). Use this variable to
simulate the uploaded image size and print it. Then create an if statement that prints out “Thank you” if the
size is equal to or greater than the limit. Otherwise, print out "The image is too small".
*/
let imgMP = Math.floor(Math.random() * 8) + 1;
printOut("imgMP = " + imgMP);
if(imgMP >= 4) {
  printOut("Thank you!");
} else {
  printOut("The image is too small.");
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/*
Expand part 6 to exclude if the image size is larger or equal to 6MP, then print out “Image is too large”.
*/

printOut("imgMP = " + imgMP);
if(imgMP >= 4 && imgMP < 6) {
  printOut("Thank you!");
} else if(imgMP >= 6) {
  printOut("The image is too large.");
} else {
  printOut("The image is too small.");
}
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Print if monthName contains “r”: “You must take vitamin D” else “You do not need to take vitamin D” */
const monthList =["January", "February", "Mars", "April", "Mai", "Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const randomMonth = Math.floor(Math.random() * noOfMonth);
const monthName = monthList[randomMonth];

printOut("Do I have to take Vitamin D?");
printOut("Check month: " + monthName);

if(monthName.search("r") >= 0) {
  printOut("You must take vitamin D.");
} else {
  printOut("You do not need to take vitamin D.");
}

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Expand exercise 8 to print how many days there are in the current month. And do not use date object */
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
printOut("There are " + daysInMonth[randomMonth] + " days in " + monthList[randomMonth]);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Imagine you have an art gallery, but you need to refurbish the premises, so you close the gallery from
March through May, but in April you have temporary premises in the building next door. Use the month
constant in exercise 8 to inform the status of your gallery in that month. */
printOut("Gallery status in " + monthName);
if(monthName == "Mars" || monthName == "Mai") {
  printOut("The art gallery is closed.");
} else if(monthName == "April") {
  printOut("The art gallery is closed, but there is a temporary location in the building next door.");
} else {
  printOut("The art gallery is open");
}
printOut(newLine);
