'use strict'

// DOM elements in chat application
const chatElements = {
    chatWrapper: document.getElementById('chat-wrapper'),
    userInput: document.getElementById('inp-user'),
    chatInput: document.getElementById('inp-chat'),
    sendButton: document.getElementById('btn-send'),
    chatArea: document.getElementById('chat-area'),
    connFailed: document.getElementById('conn-failed')
}

// Application logic
class App {

    // Private fields
    // (Caution! Not compatible with Firefox, IE, Safari, etc...)
    #defaultSocketAddress = 'use_your_own_socket_server_address';

    constructor(chatElements) {

        // Init general
        this.chatElements = chatElements;
        this.user = this.chatElements.userInput.value;
        this.chatElements.chatInput.focus();

        // Subscribe to DOM events
        this.chatElements.userInput.addEventListener('input', this.changeUserHandler.bind(this));
        this.chatElements.sendButton.addEventListener('click', this.sendMessageHandler.bind(this));
        this.chatElements.chatInput.addEventListener('keyup', this.enterKeyHandler.bind(this));

        // Init and subscribe to socket connection/error
        this.clientSocket = new SocketConnection(this.#defaultSocketAddress);
        this.clientSocket.subscribeToEvent('connect', this.socketConnectedHandler.bind(this));
        this.clientSocket.subscribeToEvent('connect_error', this.socketConnectionFailedHandler.bind(this));
        this.clientSocket.subscribeToEvent('message', this.receiveMessageHandler.bind(this));
    }

    // Event handlers

    enterKeyHandler(event) {
        if(event.keyCode === 13) { // Enter key
            this.sendMessageHandler();
        }
    }

    changeUserHandler() {
        this.user =  this.chatElements.userInput.value.trim();
    }
    
    sendMessageHandler() {
        if(this.chatElements.chatInput.value.trim() && this.user) {
            this.clientSocket.emitEvent('message', {
                message: this.chatElements.chatInput.value.trim(), 
                user: this.user   
            });

        }

        // Clear and focus chat input after message was sent
        this.chatElements.chatInput.value = '';
        this.chatElements.chatInput.focus();
    }

    receiveMessageHandler(message) {
        const msg = new DomChatMessageBuilder(this.chatElements.chatArea).message(message.message);      

        // Decide message was sent by current user or not
        if(this.user === message.user) {
            msg.isSent(true);
        } else {
            msg.user(message.user);
        }

        msg.appendMessage();

        // Scroll always to latest received message
        this.chatElements.chatWrapper.scrollTop = this.chatElements.chatWrapper.scrollHeight;

        // Leave only for debug received messages
        console.log(message);
    }

    // Show/hide error message depending on socket connection status
    
    socketConnectedHandler() {
        this.chatElements.connFailed.style.display = 'none';
    }

    socketConnectionFailedHandler() {
        this.chatElements.connFailed.style.display = 'block';
    }  
};

// Start application
new App(chatElements);