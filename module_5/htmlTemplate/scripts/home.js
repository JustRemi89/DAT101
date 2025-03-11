"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";

class THome extends TBootstrapComponent {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    render() {
        this.shadowDom.innerHTML = `
            <div class="container">
                <h1 class="text-center">Home</h1>
                <p class="text-center">Welcome to the home page!</p>
            </div>
        `;
    }
}