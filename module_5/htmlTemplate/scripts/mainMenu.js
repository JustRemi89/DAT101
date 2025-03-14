"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";

class TMainMenu extends TBootstrapComponent {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    render(){
        const template = document.getElementById("main-menu-template");
        const content = template.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
        this.#createMenuManager();
    }

    #createMenuManager(){
        const menuItems = this.shadowRoot.querySelectorAll("a[page-data]");
        for(let i = 0; i < menuItems.length; i++){
        const menuItem = menuItems[i];
            //Vi må lage en ikke navngitt pilfunksjon pga. eventlytteren
            menuItem.addEventListener("click",() => this.#navigateToPage(menuItem));
        }
    } // End of #createMenuManager

    #navigateToPage(aMenuItem){
        console.log("Navigating to " + aMenuItem.getAttribute("page-data"));
    }
}
customElements.define("main-menu", TMainMenu);