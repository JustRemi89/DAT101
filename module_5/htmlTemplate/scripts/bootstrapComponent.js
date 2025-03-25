"use strict";

export default class TBootstrapComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.injectBootstrap();
        this.injectFontAwesome();
        this.render();
    }

    injectBootstrap() {
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        linkElement.setAttribute('integrity', 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH');
        linkElement.setAttribute('crossorigin', 'anonymous');
        this.shadowRoot.appendChild(linkElement);
    }

    injectFontAwesome() {
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'http://127.0.0.1:5500/module_5/htmlTemplate/fa/css/fontawesome.min.css');
        //linkElement.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
        this.shadowRoot.appendChild(linkElement);

        //<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"></link>
    }

    render() {
        // Ready if needed
    }
}