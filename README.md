# Simple client chat application

Very simple client side chat application developed in JS/CSS/HTML and with websocket socket.io-client.

## Prerequisites

- Use your own websocket server address in main.js in order to get the chat working:
```
#defaultSocketAddress = 'use_your_own_socket_server_address';
```

- The app uses socket.io-client v2.3.0. Check if it is your preferred version.

- **Caution!** This application is only compatible with specific browsers since it uses private class fields. Further info here: [javascript private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

## Description

For the sake of simplicity after you have downloaded the repo, you only have to execute the index.html file and you will have a fully working client side application. It could be improved by using real modules (with import/export) instead of linking the .js files in index.html, however in this case you have to host your application (at least with live server in VS code) to get it work.

## Features

- You can send/receive chat messages to/from any websocket server.

- Chat messages can be sent by typing anything into the chat text field and hitting the Enter key or clicking the Send button.

- Empty messages will not be sent/received.

- You can change your nickname anytime in the username text field left to the chat text field -> your next message will include your new nickname.

- Only the received messages (with not your nickname) will show sender nicknames in the chat area.

- If you have an empty nickname your message will not be sent.

- If something goes wrong during websocket server connection an error message will indicate that on the top left corner of the chat area, and messages will not be sent/received.

- Design: "brutalist" design but fully responsive throughout screens and devices.