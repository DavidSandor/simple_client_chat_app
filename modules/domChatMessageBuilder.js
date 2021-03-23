'use strict'

// Fluent builder to build and append chat messages to DOM
class DomChatMessageBuilder {

    // Private fields
    // (Caution! Not compatible with Firefox, IE, Safari, etc...)
    #domParent;
    #user;
    #message;
    #isSent = false;

    constructor(domParent) {
        this.#domParent = domParent;
    }

    // Build functions

    message(message) {
        this.#message = message;
        return this;
    }

    user(user) {
        this.#user = user;
        return this;
    }

    isSent(isSent) {
        this.#isSent = isSent;
        return this;
    }

    // Append functions

    buildMessage() {
        const msgParagraph = document.createElement('P');
        msgParagraph.textContent = `${this.#user ? this.#user + ': ' : ''}${this.#message}`.trim();

        // Message is sent or not -> set DOM style
        if(this.#isSent) {
            msgParagraph.classList.add("msg-sent");
        } else {
            msgParagraph.classList.add("msg-received");
        }

        return msgParagraph;
    }

    appendMessage() {
        const msg = this.buildMessage();

        // Append message if it has any content
        if(msg.textContent) {
            this.#domParent.appendChild(msg);
        }
    }
}