"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";
import movieList from "./movieList.js";

export class TMovie {
    constructor() {
        this.title = "";
        this.director = "";
        this.year = "1900";
        this.genre = [];
        this.rating = 0; // 1-10
    }
}

let newMovie = null;
let editMovie = null;

export class TMyMovies extends TBootstrapComponent {
    #movies;
    #htmlTable;
    constructor() {
        super();
        // Hvis vi ikke har noen filmer så lager vi en tom liste.
        this.#movies = movieList || [];
        this.#htmlTable = null;
        this.attachShadow({mode: 'open'});
    }

    #editMovie = (aEvent) => {
        const row = aEvent.target.parentElement;
        const movie = this.#movies[row.rowIndex - 1];
        editMovie = movie;
        const bodyContent = document.getElementById("body-content");
        bodyContent.innerHTML = "<add-edit-movie-page></add-edit-movie-page>";
      };

    #addMovie(aMovie) {
        const row = document.createElement('tr');
        row.style.cursor = "pointer";
        row.addEventListener("click", this.#editMovie);

        // Legger til tittel
        let td = document.createElement('td');
        td.textContent = aMovie.title;
        row.appendChild(td);

        // Legger til regissør
        td = document.createElement('td');
        td.textContent = aMovie.director;
        row.appendChild(td);

        // Legger til år
        td = document.createElement('td');
        td.textContent = aMovie.year;
        row.appendChild(td);

        // Legger til sjanger
        td = document.createElement('td');
        td.textContent = aMovie.genre.join(', ');
        row.appendChild(td);

        // Legger til rating
        td = document.createElement('td');
        td.textContent = aMovie.rating;
        row.appendChild(td);

        // Legger til raden i tabellen
        this.#htmlTable.appendChild(row);
    }

    #loadMovies() {
        //Oppdater antall filmer i totalMovies
        const totalMovies = this.shadowRoot.getElementById('totalMovies');
        totalMovies.textContent = this.#movies.length.toString();
        // Vi må tømme tabellen før vi legger til nye rader
        const tableBody = this.shadowRoot.getElementById('movie-table-body');
        tableBody.innerHTML = '';

        for(let i = 0; i < this.#movies.length; i++) {
            const movie = this.#movies[i];
            this.#addMovie(movie);
        }
    }

    #onAddMovie = () => {
        const contentBody = document.getElementById('body-content');
        contentBody.innerHTML = '<add-edit-movie-page></add-edit-movie-page>';
    }

    render() {
        const template = document.getElementById('my-movies-page-template');
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
        this.#htmlTable = this.shadowRoot.getElementById('movie-table-body');
        
        // Sjekk om det finnes en ny film som skal legges til
        if(newMovie) {
            this.#movies.push(newMovie);
            newMovie = null;
        }

        this.#loadMovies();
        const addMovieButton = this.shadowRoot.getElementById('add-movie-button');
        addMovieButton.addEventListener('click', this.#onAddMovie);
    }
} // End of TMyMovies

class TMovieForm extends TBootstrapComponent {
    #titleElement;
    #directorElement;
    #yearElement;
    #genreElements;
    #ratingElement;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    #onSubmitForm = (aEvent) => {
        aEvent.preventDefault();
        const movie = new TMovie();
        movie.title = this.#titleElement.value;
        movie.director = this.#directorElement.value;
        movie.year = this.#yearElement.value;
        for(let i = 0; i < this.#genreElements.length; i++) {
            if(this.#genreElements[i].checked) {
                movie.genre.push(this.#genreElements[i].value);
            }
        }
        movie.rating = this.#ratingElement.value;
        console.log(movie);
        newMovie = movie;
        const bodyContent = document.getElementById('body-content');
        bodyContent.innerHTML = '<movies-page></movies-page>';
        //movieList.push(movie);
    }

    render() {
        const template = document.getElementById('add-edit-movie-template');
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);

        this.#titleElement = this.shadowRoot.getElementById('movie-title');
        this.#directorElement = this.shadowRoot.getElementById('movie-director');
        this.#yearElement = this.shadowRoot.getElementById('movie-year');
        this.#genreElements = this.shadowRoot.querySelectorAll("input[name='movie-genre']"); // Liste med sjekkbokser
        this.#ratingElement = this.shadowRoot.getElementById('movie-rating');
        const form = this.shadowRoot.getElementById('movie-form');
        form.addEventListener('submit', this.#onSubmitForm);

        if(editMovie){
            //Her må vi fylle ut feltene med informasjon fra editMovie
            this.#titleElement.value = editMovie.title;
            this.#directorElement.value = editMovie.director;
            this.#yearElement.value = editMovie.year;
            for(let i = 0; i < this.#genreElements.length; i++) {
                const genreElement = this.#genreElements[i];
                for(let j = 0; j < editMovie.genre.length; j++) {
                    if(genreElement.value === editMovie.genre[j]) {
                        genreElement.checked = true;
                    }
                }
            }
            this.#ratingElement.value = editMovie.rating;

            editMovie = null;
        }
    }
} // End of TMovieForm

customElements.define('movies-page', TMyMovies);
customElements.define('add-edit-movie-page', TMovieForm);