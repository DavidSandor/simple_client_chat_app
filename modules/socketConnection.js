'use strict'

class SocketConnection {

    // Private fields
    // (Caution! Not compatible with Firefox, IE, Safari, etc...)
    #socket;

    constructor(socketAddress) {
        this.#socket = io(socketAddress);
    }

    // Subscribe a function to a socket event
    subscribeToEvent(eventName, callback) {
        this.#socket.on(eventName, (message) => {
            callback(message);
        });
    }

    // Emit a socket event with a paylod
    emitEvent(eventName, payload) {
        this.#socket.emit(eventName, payload);
    }
};