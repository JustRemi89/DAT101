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

    #loadMovies() {
        //Oppdater antall filmer i totalMovies
        const totalMovies = this.shadowRoot.getElementById('totalMovies');
        totalMovies.textContent = this.#movies.length.toString();
        console.log(this.#movies);
    }

    render() {
        const template = document.getElementById('my-movies-page-template');
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
        this.#htmlTable = this.shadowRoot.getElementById('movie-table');
        this.#loadMovies();
    }
}

customElements.define('movies-page', TMyMovies);