"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

// Funksjon for å lage radioknapper dynamisk
function createCarRadioButtons() {
  const container = document.getElementById("divTask4Cars");

  for (let i = 0; i < CarTypes.length; i++) {
    const car = CarTypes[i];

    // Lag radioknapp
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "carType";
    radio.value = car.caption;
    radio.id = "car-" + car.caption;

    // Lag label
    const label = document.createElement("label");
    label.htmlFor = radio.id;
    label.innerText = car.caption;

    // Legg til radioknapp og label i container
    container.appendChild(radio);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  }
}

// Funksjon for å hente valgt biltype
function getSelectedCarType() {
  const selectedCar = document.querySelector('input[name="carType"]:checked');
  const outputElement = document.getElementById("txtTask4Output");

  if (selectedCar) {
    outputElement.innerText = "Selected car: " + selectedCar.value;
  } else { // Blir mest sannsynlig aldri kjørt, men bare i tilfelle...
    outputElement.innerText = "Please select a car";
  }
}

// Legg til eventlistener for change-event på radioknappene
document.addEventListener("change", event => {
  if (event.target.name === "carType") {
    getSelectedCarType();
  }
});

// Funksjon for å finne og returnere endring av valg i animal-dropdown
function getAnimalSelection() {
  const dropdown = document.getElementById('selectTask5Animals');
  const selectedAnimal = dropdown.options[dropdown.selectedIndex].text;

  // Oppdater tekst i output-elementet
  document.getElementById('txtTask5Output').innerText = "Selected animal: " + selectedAnimal;
}

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

// Funksjon for å lage dropdown med jentenavn
function createGirlNameDropdown() {
  const dropdown = document.getElementById("selectTask6Girls");

  for (let i = 0; i < GirlsNames.length; i++) {
    const name = GirlsNames[i];

    // Lag option-element
    const option = document.createElement("option");
    option.value = i;
    option.innerText = name;

    // Legg til option i dropdown
    dropdown.appendChild(option);
  }
}

// Funksjon for å hente valgt jentenavn
function getSelectedGirlName() {
  const dropdown = document.getElementById("selectTask6Girls");
  const selectedName = dropdown.options[dropdown.selectedIndex].text;

  // Oppdater tekst i output-elementet
  document.getElementById("txtTask6Output").innerText = "Selected girl: " + selectedName;
}

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

// Funksjon for å lage dropdown med filmsjangre
function createMovieGenreDropdown() {
  const dropdown = document.getElementById("selectMovieGenre");

  for (let i = 0; i < MovieGenre.length; i++) {
    const genre = MovieGenre[i];

    // Lag option-element
    const option = document.createElement("option");
    option.value = i;
    option.innerText = genre;

    // Legg til option i dropdown
    dropdown.appendChild(option);
  }
}

// Funksjon for å legge til film i tabellen
function addMovie() {
  const txtMovieTitle = document.getElementById("txtMovieTitle").value;
  const selectMovieGenre = MovieGenre[document.getElementById("selectMovieGenre").value];
  const txtMovieDirector = document.getElementById("txtMovieDirector").value;
  const txtMovieRating = document.getElementById("txtMovieRate").value;

  // Valider at alle feltene er fylt ut
  if (!txtMovieTitle || !selectMovieGenre || !txtMovieDirector || isNaN(txtMovieRating) || txtMovieRating < 1 || txtMovieRating > 10) {
      alert("Please fill in all fields correctly. Rating must be between 1 and 10.");
      return;
  }

  // Hent tabellen
  const tblMovies = document.getElementById("tblMovies");

  // Finn antall rader i tabellen for nummerering av rad
  const rowNumber = tblMovies.rows.length;

  // Lag ny rad
  const row = tblMovies.insertRow();

  // Legg til celler i raden og sett inn verdier
  row.insertCell(0).innerText = rowNumber;
  row.insertCell(1).innerText = txtMovieTitle;
  row.insertCell(2).innerText = selectMovieGenre;
  row.insertCell(3).innerText = txtMovieDirector;
  row.insertCell(4).innerText = txtMovieRating;

  // Nullstill input-feltene
  document.getElementById("txtMovieTitle").value = "";
  document.getElementById("selectMovieGenre").value = 0;
  document.getElementById("txtMovieDirector").value = "";
  document.getElementById("txtMovieRating").value = "5";
}


//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here! */
const txtRectWidth = document.getElementById("txtRectWidth");
const txtRectHeight = document.getElementById("txtRectHeight");

// Funksjon som trigges ved knappeklikk
function calculateRectangle() {
  // Hent verdier fra input-feltene
  const width = parseFloat(document.getElementById("txtRectWidth").value);
  const height = parseFloat(document.getElementById("txtRectHeight").value);

  // Valider at begge verdiene er gyldige tall
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      alert("Please enter valid positive numbers for width and height.");
      return;
  }

  // Beregn omkrets og areal
  const circumference = 2 * (width + height);
  const area = width * height;

  // Oppdater <span>-elementene i HTML for å vise resultatene
  document.getElementById("task1Circumference").innerText = circumference;
  document.getElementById("task1Area").innerText = area;
}
// Gjør funksjonen global
window.calculateRectangle = calculateRectangle;

//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const txtTask2Word = document.getElementById('txtTask2Word');
let task2WordCounter = 0;
// keydown har bedre støtte enn keypress (deprecated), så vi bruker det
txtTask2Word.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === 'Return') && txtTask2Word.value !== '') {
    console.log('Enter/Return key pressed!');
    const word = txtTask2Word.value;
    const HTMLword = "<p>" + word + "</p>";
    document.getElementById('divTask2Words').innerHTML += HTMLword;
    task2WordCounter++;
    document.getElementById('task2WordCounter').innerText = task2WordCounter;
    document.getElementById('txtTask2Word').value = '';
  }
});

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function checkTask3Answers() {
  const checkboxes = document.querySelectorAll('input[name="chkTask3"]');
  const selectedValues = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });

  const outputElement = document.getElementById('txtTask3Output');

  if (selectedValues.length > 0) {
    outputElement.innerText = "Selected: " + selectedValues.join(', ');
  } else {
    outputElement.innerText = "Please select at least one";
  }
}
document.getElementById('cmbTask3CheckAnswer').addEventListener('click', checkTask3Answers);


//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
// Utfør funksjonen for å lage radioknapper ved innlasting av siden
createCarRadioButtons();

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
document.getElementById("selectTask5Animals").addEventListener("change", getAnimalSelection);

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
createGirlNameDropdown();
document.getElementById("selectTask6Girls").addEventListener("change", getSelectedGirlName);

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Use the data from filmtittel (movie title), filmsjanger (movie genre), filmregissør (movie
director), and filmrate (movie rating) and fill in the HTML table every time the user clicks the
"cmbAddMovie" button. Fill in the data from the MovieGenre array in selectMovieGenre. */

// Utfør funksjonen for å lage dropdown med filmsjangre ved innlasting av siden
createMovieGenreDropdown();
document.getElementById('cmbAddMovie').addEventListener('click', addMovie);