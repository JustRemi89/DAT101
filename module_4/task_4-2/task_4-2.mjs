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
        this.#Title = aTitle;
        this.#Author = aAuthor;
        this.#ISBN = aISBN;
    }
    toString() {
        return this.#Title + " by " + this.#Author + " ISBN: " + this.#ISBN;
    }
}

// Array of 3 instances of TBook
const booksArray = [
    new TBook("The Hobbit", "J.R.R. Tolkien", "978-0-261-10221-4"),
    new TBook("The Lord of the Rings", "J.R.R. Tolkien", "978-0-261-10221-4"),
    new TBook("The Silmarillion", "J.R.R. Tolkien", "978-0-261-10221-4")
];

// Static object with weekdays
const EWeekDays = {
    WeekDay1: {value: 0x01, name: "Mandag"},
    WeekDay2: {value: 0x02, name: "Tirsdag"},
    WeekDay3: {value: 0x04, name: "Onsdag"},
    WeekDay4: {value: 0x08, name: "Torsdag"},
    WeekDay5: {value: 0x10, name: "Fredag"},
    WeekDay6: {value: 0x20, name: "Lørdag"},
    WeekDay7: {value: 0x40, name: "Søndag"},
    Workdays: {value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager"},
    Weekends: {value: 0x20 + 0x40, name: "Helg"}
}

// Function to print out the weekdays (misunderstood task)
/*function printEWeekDays() {
    Object.keys(EWeekDays).forEach(key => {
        printOut(EWeekDays[key].name + " has a value of " + EWeekDays[key].value + ".");
    });
}*/

// Function to print out the weekdays
function printEWeekDays() {
    const keys = Object.keys(EWeekDays); //Dette gir oss alle nøklene i objektet EWeekDays
    printOut("Keys: " + keys.join(", ")); // Her printer vi ut alle nøklene i objektet EWeekDays
}

// Function to generate an array with 35 random numbers between 1 and 20
function generateRandomNumbers(size, min, max) {
    let array = [];
    for(let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

// Generate random numbers
const randomNumbers = generateRandomNumbers(35, 1, 20);

// Sorter i stigende rekkefølge ved hjelp av callback-funksjon
// Callback-funksjonen sammenligner to verdier 'a' og 'b'.
// Hvis a - b < 0, plasseres 'a' før 'b'. Hvis a - b > 0, plasseres 'b' før 'a'.
const ascendingNumbers = randomNumbers.sort((a, b) => a - b);

// Sorter i synkende rekkefølge ved hjelp av callback-funksjon
const descendingNumbers = randomNumbers.sort((a, b) => b - a);

// Analyze frequency of numbers and sort by frequency
function calculateFrequencies(aArray) {
    const frequencyMap = {};
    for(let i = 0; i < aArray.length; i++) {
        if(frequencyMap[aArray[i]]) {
            frequencyMap[aArray[i]]++; // Increment frequency every time the number is found
        } else {
            frequencyMap[aArray[i]] = 1; // First time the number is found
        }
    }
    return frequencyMap;
}

const frequencies = calculateFrequencies(randomNumbers);

// Sort the frequencies by count (descending) and number (ascending for ties)
function sortFrequencies(frequencyMap) {
    const frequencyArray = []; // Array to hold [number, count] pairs
    for(const number in frequencyMap) {
        frequencyArray.push([number, frequencyMap[number]]);
    }

    // Sort the array by count (descending) and number (ascending for ties)
    for(let i = 0; i < frequencyArray.length - 1; i++) {
        for(let j = i + 1; j < frequencyArray.length; j++) {
            const [numA, countA] = frequencyArray[i];
            const [numB, countB] = frequencyArray[j];

            if (countB > countA || (countB === countA && numB < numA)) {
                // Swap elements if needed
                const temp = frequencyArray[i];
                frequencyArray[i] = frequencyArray[j];
                frequencyArray[j] = temp;
            }
        }
    }
    return frequencyArray;
}

// Print out each number and its frequency using a for loop
function printFrequencies(sortedFrequencies) {
    for(let i = 0; i < sortedFrequencies.length; i++) {
        const [number, count] = sortedFrequencies[i];
        printOut("Number " + number + " has a frequency of " + count + ".");
    }
}

const sortedFrequencies = sortFrequencies(frequencies);

// Create an empty multidimensional array
let multiDimArray = [];

// For-loop to create a 2D array with 5 rows and 9 columns
for (let i = 0; i < 5; i++) {
    multiDimArray[i] = []; // Initialize the row
    for (let j = 0; j < 9; j++) {
        // Fill the cell with a string containing the row and column index
        multiDimArray[i][j] = "Row " + i + " Column " + j;
    }
}

// Function to print the 2D array
function printMultiDimArray(aArray) {
    for (let i = 0; i < aArray.length; i++) {
        for (let j = 0; j < aArray[i].length; j++) {
            printOut(aArray[i][j]); // Print each cell value
        }
    }
}

// Call the function to print the array
printMultiDimArray(multiDimArray);


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

// Looping through array of books
for(let i = 0; i < booksArray.length; i++) {
    printOut("Book " + (i + 1) + ": " + booksArray[i]);
}

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printEWeekDays();
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Random numbers: " + randomNumbers.join(", "));
printOut("Ascending: " + ascendingNumbers.join(", "));
printOut("Descending: " + descendingNumbers.join(", "));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printFrequencies(sortedFrequencies);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printMultiDimArray(multiDimArray);
printOut(newLine);
