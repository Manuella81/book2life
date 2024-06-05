//Configuration du serveur avec Socket.IO :

//Installer Socket.IO : Assurez-vous d'installer Socket.IO dans votre projet Node.js.
npm install socket.io

//Initialiser et configurer Socket.IO dans votre serveur Node.js : Dans votre fichier server.js, configurez Socket.IO pour écouter les connexions WebSocket.
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Nouvelle connexion WebSocket');

    // Gérer les événements WebSocket ici...
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

//Gestion des événements WebSocket :
io.on('connection', (socket) => {
    socket.on('nouveauMessage', (data) => {
        io.emit('nouveauMessage', data);
    });
});




//Configuration du client avec Socket.IO :

//Installer Socket.IO côté client : Assurez-vous d'installer Socket.IO côté client dans votre application React.
npm install socket.io-client

//Initialiser Socket.IO dans votre application React : Initialisez Socket.IO dans votre application React et connectez-vous au serveur WebSocket.
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000'); // Assurez-vous de remplacer 9000 par le port correct



//Utilisation dans l'application :

//Envoyer des notifications lors de la réception de nouveaux messages : Lorsque votre serveur reçoit un nouveau message, émettez un événement WebSocket pour informer tous les clients connectés de ce nouveau message.
// Dans votre route ou contrôleur qui gère les nouveaux messages
io.emit('nouveauMessage', messageData); // Envoyer les données du nouveau message

//Afficher les notifications côté client : Lorsque le client reçoit un événement WebSocket indiquant un nouveau message, affichez une notification à l'utilisateur pour l'informer de l'arrivée du nouveau message.
// Dans votre composant React
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000'); // Assurez-vous de remplacer 9000 par le port correct

useEffect(() => {
    // Écouter les nouveaux messages
    socket.on('nouveauMessage', (data) => {
        // Mettre à jour l'interface utilisateur pour informer l'utilisateur d'un nouveau message
        // par exemple, afficher une notification
    });

    // Nettoyage du listener lors du démontage du composant
    return () => {
        socket.off('nouveauMessage');
    };
}, []);

//Cela configure Socket.IO dans votre application serveur Node.js et côté client React, et vous permet d'envoyer et de recevoir des notifications en temps réel. Assurez-vous de remplacer les ports et les événements avec ceux spécifiques à votre application.


//Pour gérer les événements WebSocket dans votre serveur Node.js, vous pouvez utiliser Socket.IO pour écouter et émettre des événements. Voici comment vous pouvez gérer les événements WebSocket dans votre code existant :
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Nouvelle connexion WebSocket');

    // Gérer les événements WebSocket ici...
    
    // Exemple de gestion d'un événement de nouveau message
    socket.on('nouveauMessage', (data) => {
        console.log('Nouveau message reçu :', data);
        // Vous pouvez traiter les données reçues ici et effectuer des actions nécessaires
        // Par exemple, diffuser le message à tous les clients connectés
        io.emit('nouveauMessage', data);
    });
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

//Dans cet exemple, nous avons ajouté une gestion pour l'événement nouveauMessage. Lorsqu'un client envoie cet événement au serveur, le serveur reçoit les données associées à cet événement, les traite si nécessaire, puis diffuse ces données à tous les clients connectés en utilisant io.emit().

//Dans votre application réelle, vous remplacerez 'nouveauMessage' par le nom approprié de l'événement que vous souhaitez gérer, et vous ajouterez la logique spécifique nécessaire pour traiter ces événements. Vous pouvez également définir plusieurs gestionnaires d'événements à l'intérieur de la fonction de connexion, en fonction des différents types d'événements que vous souhaitez gérer.


//Pour afficher une notification dans votre composant React lorsque vous recevez un nouveau message via WebSocket, vous pouvez utiliser la bibliothèque de notification de votre choix. Voici un exemple en utilisant la bibliothèque react-toastify :

//Tout d'abord, installez react-toastify dans votre application React :
npm install react-toastify

//Ensuite, vous pouvez utiliser react-toastify pour afficher des notifications dans votre composant React :
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:9000'); // Assurez-vous de remplacer 9000 par le port correct

const NotificationComponent = () => {
    useEffect(() => {
        // Écouter les nouveaux messages
        socket.on('nouveauMessage', (data) => {
            // Afficher une notification pour informer l'utilisateur d'un nouveau message
            toast.success(`Nouveau message reçu : ${data}`);
        });

        // Nettoyage du listener lors du démontage du composant
        return () => {
            socket.off('nouveauMessage');
        };
    }, []);

    return (
        <ToastContainer />
    );
};

export default NotificationComponent;

//Dans cet exemple, nous avons créé un composant NotificationComponent qui utilise react-toastify pour afficher des notifications. Dans la fonction useEffect, nous écoutons l'événement nouveauMessage du socket, et lorsque ce message est reçu, nous affichons une notification à l'utilisateur en utilisant toast.success(). Assurez-vous d'importer ToastContainer et toast depuis react-toastify, et de les utiliser dans votre composant.

//N'oubliez pas d'utiliser NotificationComponent dans votre arborescence de composants où vous souhaitez afficher les notifications de nouveaux messages.

//Vous pouvez utiliser le composant NotificationComponent là où vous souhaitez afficher les notifications de nouveaux messages. En général, vous l'utiliserez dans un composant parent qui englobe toute votre application ou dans des composants spécifiques où vous gérez les conversations et les messages. Voici comment vous pouvez l'utiliser :

//Dans un composant parent global : Si vous souhaitez afficher les notifications de nouveaux messages partout dans votre application, vous pouvez placer NotificationComponent dans votre composant parent le plus haut, comme App.js. Ainsi, les notifications seront visibles sur toutes les pages de votre application.
import React from 'react';
import NotificationComponent from './NotificationComponent';

const App = () => {
    return (
        <div>
            <h1>Mon application</h1>
            <NotificationComponent />
            {/* Autres composants et routes */}
        </div>
    );
};

export default App;

//Dans des composants spécifiques : Si vous souhaitez limiter l'affichage des notifications de nouveaux messages à certains composants ou pages, vous pouvez placer NotificationComponent dans ces composants spécifiques.
import React from 'react';
import NotificationComponent from './NotificationComponent';

const ChatPage = () => {
    return (
        <div>
            <h1>Page de chat</h1>
            <NotificationComponent />
            {/* Reste de la logique de la page de chat */}
        </div>
    );
};

export default ChatPage;

//Lorsque vous utilisez React Router : Si vous utilisez React Router pour la navigation dans votre application, vous pouvez également placer NotificationComponent dans un composant parent qui est rendu sur toutes les routes.
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotificationComponent from './NotificationComponent';
import ChatPage from './ChatPage';
import HomePage from './HomePage';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Mon application</h1>
                <NotificationComponent />
                <Switch>
                    <Route path="/chat">
                        <ChatPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;

//Assurez-vous d'importer et d'utiliser NotificationComponent où vous voulez afficher les notifications de nouveaux messages.

//Dans votre exemple, lorsque vous recevez un événement de type 'nouveauMessage' sur votre serveur WebSocket, vous diffusez ce message à tous les clients connectés en utilisant io.emit('nouveauMessage', data);. Cela envoie le message à tous les clients connectés, y compris l'émetteur original.

//Si vous souhaitez exclure l'émetteur original et diffuser le message à tous les autres clients connectés, vous pouvez utiliser socket.broadcast.emit() au lieu de io.emit(). Voici comment vous pouvez le faire :
io.on('connection', (socket) => {
    console.log('Nouvelle connexion WebSocket');

    // Gérer les événements WebSocket ici...
    
    // Exemple de gestion d'un événement de nouveau message
    socket.on('nouveauMessage', (data) => {
        console.log('Nouveau message reçu :', data);
        // Vous pouvez traiter les données reçues ici et effectuer des actions nécessaires
        // Par exemple, diffuser le message à tous les clients connectés, à l'exception de l'émetteur original
        socket.broadcast.emit('nouveauMessage', data);
    });
});

//Avec socket.broadcast.emit(), le message sera envoyé à tous les clients connectés, à l'exception de l'émetteur original. Cela vous permet d'exclure l'émetteur original du message diffusé.
