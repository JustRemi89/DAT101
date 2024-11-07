"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Create a function that takes no parameters and returns no values. Have it print today's date in the
Norwegian standard. Example: "Friday, October 18, 2019" Use an example from this resource:
toLocaleString , Use "no-NB" as an alias for the Norwegian language in the function call to
"toLocaleDateString". */
function printTodayDate() {
    const today = new Date(); // Henter dagens dato
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const norwegianDate = today.toLocaleDateString('no-NB', options);
    printOut(norwegianDate); // Skriver ut datoen i norsk format
}

// Kaller funksjonen for å skrive ut datoen
printTodayDate();
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function getTodayDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const norwegianDate = today.toLocaleDateString('no-NB', options);
    printOut("🎮 Today's date: " + norwegianDate + " 🎮");
    return today;
}

function daysUntilLaunch() {
    const launchDate = new Date('2025-05-14');
    const now = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil((launchDate - now) / millisecondsPerDay);
    
    printOut("🚀🌌 Brace yourselves, gamers! Only " + daysLeft + " days left until the ultimate showdown! 🌌🚀");
    printOut("🌟 2XKO LAUNCHES SOON! Prepare for glory on May 14, 2025! 🌟");
}

// Kaller funksjonene for å vise dagens dato og oppbygge hype rundt nedtellingen
getTodayDate();
daysUntilLaunch();
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Create a function that receives the radius of a circle and prints the diameter, circumference, and area. */
function circleProperties(radius) {
    const diameter = 2 * radius; // Beregner diameter
    const circumference = (2 * Math.PI * radius).toFixed(2); // Beregner omkrets, avrundet til 2 desimaler
    const area = (Math.PI * radius * radius).toFixed(2); // Beregner areal, avrundet til 2 desimaler

    printOut("For a circle with radius: " + radius);
    printOut("Diameter: " + diameter);
    printOut("Circumference: " + circumference);
    printOut("Area: " + area);
}

// Kaller funksjonen med et eksempelradius, f.eks. radius = 5
circleProperties(5);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Create a function that receives the width and height of a rectangle in an object. Print the circumference
and area of the given rectangle. */

function squareProperties(box) {
    const width = box.width;
    const height = box.height;

    const circumference = 2 * (width + height);
    const area = width * height;

    printOut("For a square with " + width + " width and " + height + " height.");
    printOut("Circumference: " + circumference);
    printOut("Area: " + area);
}

// Kaller funksjonen med eksempelbredde 10 og eksempelhøyde 8
squareProperties({width: 10, height: 8});
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Create a function that handles the conversion between Celsius, Fahrenheit, and Kelvin. Use three different
numbers and print all three combinations as integers (no decimals). Design the function to take two
parameters: first the temperature, then the temperature type/id. Use these parameters to convert to the
other two temperature types and print them.
Formula:
Fahrenheit = (Kelvin - 273.15) * (9/5) + 32
Celsius = Kelvin - 273.15
Celsius = (Fahrenheit - 32) * (5/9)
 */

function tempConvert(temp, type) {
    let fahrenheit, celsius, kelvin;

    if(type.toLowerCase() === 'celsius') {
        celsius = temp;
        fahrenheit = Math.round((celsius * (9/5) + 32));
        kelvin = Math.round(celsius + 273.15);
    } else if(type.toLowerCase() === 'fahrenheit') {
        fahrenheit = temp;
        celsius = Math.round((fahrenheit - 32) * (5/9));
        kelvin = Math.round((fahrenheit - 32) * 5/9 + 273.15);
    } else if(type.toLowerCase() === 'kelvin') {
        kelvin = temp;
        celsius = Math.round(kelvin - 273.15);
        fahrenheit = Math.round((kelvin - 273.15) * (9/5) + 32);
    } else {
        return "Unknown temperature scale";
    }

    printOut("Original: " + temp + "° " + type);
    printOut("Celsius: " + celsius + "°C");
    printOut("Fahrenheit: " + fahrenheit + "°F");
    printOut("Kelvin: " + kelvin + "K");
    printOut(newLine);
}
tempConvert(25, "Celsius");
tempConvert(85, "Fahrenheit");
tempConvert(500, "Kelvin");
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Create a function that calculates the price without VAT (sales tax). The function needs two arguments, one
for the price including VAT (gross amount) and one for the tax group in text (normal = 25%, food = 15%,
hotel, transport, and cinema = 10%). The text argument should not be case-sensitive. If the VAT group is
not correct, the text "Unknown VAT group!" should be printed. The function must return the price without
tax, i.e., the net price. Call the function four times with different gross amounts. One for each of the VAT
groups (25, 15, and 10) and one with an unknown group for example “goblins”. Tip: Use "NaN" to identify
that an unknown VAT group is returned from the function. Formula: net = (100 * gross) / (vat + 100) */

function netPrice(gross, group) {

    let vat;

    if(group.toLowerCase() === "normal") {
        vat = 25;
    } else if(group.toLowerCase() === "medium") {
        vat = 15;
    } else if(group.toLowerCase() === "low") {
        vat = 10;
    } else {
        vat = NaN;
    }

    const net = Math.round((100 * gross) / (vat + 100));
    if(!isNaN(vat)) {
        printOut("Net Price is " + net + " kr when Gross Price is " + gross + " kr (" + vat + "% VAT).");
    } else {
        printOut("Unknown VAT group! (" + vat + " VAT)");
    }
}

netPrice(1000, "Normal");
netPrice(1000, "medium");
netPrice(1000, "low");
netPrice(1000, "goblins");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Create a function that takes 3 arguments and returns the following calculation:
● Speed = Distance / Time
If speed is missing, calculate speed. If time is missing, calculate time. If distance is missing, calculate the
distance. If more than one parameter is missing, return NaN. */

function speedCalc(speed, dist, time) {
    // Tell hvor mange verdier som er undefined
    let missingCount = 0;
    if (typeof speed === "undefined") missingCount++;
    if (typeof dist === "undefined") missingCount++;
    if (typeof time === "undefined") missingCount++;

    // Hvis mer enn én parameter mangler, returner NaN
    if (missingCount > 1) {
        return NaN;
    }

    // Beregn den manglende verdien
    if (typeof speed === "undefined") {
        speed = dist / time;
    } else if (typeof dist === "undefined") {
        dist = speed * time;
    } else if (typeof time === "undefined") {
        time = dist / speed;
    }

    // Skriv ut resultatet for den manglende verdien
    printOut("Result: Speed = " + speed + ", Distance = " + dist + ", Time = " + time);
}

// Eksempler på bruk av funksjonen
speedCalc(undefined, 6000, 60); // Skal beregne fart
speedCalc(60, undefined, 20);   // Skal beregne distanse
speedCalc(100, 2000, undefined);  // Skal beregne tid
speedCalc(undefined, undefined, 2); // Skal returnere NaN

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Create a function that takes four parameters and returns a result. Parameter one: A text string. Parameter
two: Value for the maximum size of the text string. Parameter three: Text character. Parameter four:
Consecutive insertion of characters (boolean value). Take the text parameter; if it's smaller than the
maximum, make it larger with the specified character, either before or after, using the given boolean value.
Have the function return the new string and print it out. */

function textFunc(text, maxChars, txtChar, addBefore) {
    if(text.length > maxChars) {
        text = "Fatal Error: Text string breached maximum allowed characters.";
    } else if(text.length == maxChars) {
        text = text;
    } else {
        const charsToAdd = maxChars - text.length;
        let padding = txtChar.repeat(charsToAdd);

        if(addBefore) {
            text = padding + text;
        } else {
            text = text + padding;
        }
    }
    printOut(text);
}

textFunc("Gamer", 10, "*", true);
textFunc("Gamer", 10, "*", false);
textFunc("Gamer", 5, "*", true);
textFunc("Gamer", 2, "*", true);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* From mathematics, we have the following expression:
1 + 2 = 3
4 + 5 + 6 = 7 + 8
9 + 10 + 11 + 12 = 13 + 14 + 15
16 + 17 + 18 + 19 + 20 = 21 + 22 + 23 + 24
25 + 26 + 27 + 28 + 29 + 30 = 31 + 32 + 33 + 34 + 35
Create a function or functions that can test this expression for 200 lines. If the test fails, print out where the
two sides are not equal and stop the loop. If all 200 lines are OK, print "Maths fun!". */
function testMathExpression(lines) {
    let currentNumber = 1; // Startnummer for sekvensen

    for (let i = 1; i <= lines; i++) {
        let leftSum = 0;
        let rightSum = 0;

        // Beregn venstre side (i + 1 elementer)
        for (let j = 0; j < i + 1; j++) {
            leftSum += currentNumber;
            currentNumber++;
        }

        // Beregn høyre side (i elementer)
        for (let k = 0; k < i; k++) {
            rightSum += currentNumber;
            currentNumber++;
        }

        // Sjekk om venstre og høyre side er like
        if (leftSum !== rightSum) {
            printOut("Mismatch on line " + i + ": " + leftSum + " != " + rightSum);
            return; // Stopper funksjonen hvis det er en feil
        }
    }

    printOut("Maths fun!"); // Skrives ut hvis alle linjer er riktige
}

// Kaller funksjonen med 200 linjer
testMathExpression(200);
printOut(newLine);

printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Recursive function. Create a function that calculates the factorial of a given number. Factorial of 5 = 5 * 4 *
3 * 2 * 1. Factorial of 6 = 6 * 5 * 4 * 3 * 2 * 1. Etc.
Have the function call itself to calculate the result and print the final answer. */

function calcFactorial(num) {
    if(num === 1) {
        return 1;
    }
    return num * calcFactorial(num - 1);    
}

const number = 5;
const factResult = calcFactorial(number);
printOut("The factorial of " + number + " is: " + factResult);

printOut(newLine);
