import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:3000'); 

//ce composant utilise react-toastify pour afficher des notifications. Dans la fonction useEffect, nous écoutons l'événement nouveauMessage du socket, et lorsque ce message est reçu, nous affichons une notification à l'utilisateur en utilisant toast.success(). 

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