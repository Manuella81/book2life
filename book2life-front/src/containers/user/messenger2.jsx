import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams, useNavigate   } from "react-router-dom"; 
import { useSelector } from 'react-redux'; 
import { selectUser } from "../../slices/userSlice"; 
import { selectedBookId, selectBooks, selectedBookTitle  } from "../../slices/bookSlice"; 
import { loadUserConversations, loadOneConversation , updateFirstMessage, updateFalse , deleteOneConversation} from '../../api/conversation'; 
import { loadConversationMessages, sendMessage } from '../../api/messages'; 
import { loadBook } from '../../api/book';
import io from 'socket.io-client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash } from "@fortawesome/free-solid-svg-icons";





const Messenger = () => {
    const { conversationId} = useParams();
    const navigate = useNavigate();
    const user = useSelector(selectUser); // Sélectionner l'utilisateur connecté depuis le store Redux
    const [socket, setSocket] = useState(null);
    const [redirect, setRedirect] = useState(false); // État pour gérer la redirection
    const [conversations, setConversations] = useState([]); // État pour stocker les conversations de l'utilisateur
    const [selectedConversation, setSelectedConversation] = useState(null); // État pour stocker la conversation sélectionnée
    const [messages, setMessages] = useState(null); // État pour stocker les messages de la conversation sélectionnée
    const [newMessageContent, setNewMessageContent] = useState(''); // État pour stocker le contenu du nouveau message
    const [isTyping, setIsTyping] = useState(false); // État pour indiquer si l'utilisateur est en train de taper
    const messagesEndRef = useRef(null);
    const [bookId, setBookId] = useState(null);
    const [bookTitle, setBookTitle] = useState(null);

    
    


    useEffect(() => {
        const newSocket = io('http://localhost:4000'); // Remplacez l'URL par l'URL de votre serveur socket.io
        console.log('Connexion au serveur Socket.IO établie avec succès.');
        setSocket(newSocket);
    
        return () => {
            newSocket.disconnect(); // Déconnexion du socket lorsque le composant est démonté
        };
    }, []);

   // Effet pour gérer la réception des messages
    useEffect(() => {
        if (socket) {
            socket.on('messageResponse', (datas) => {
                // Mettez à jour les messages uniquement si la conversation correspondante est ouverte
                if (datas.conversation_id === conversationId) {
                    setMessages((prevMessages) => [...prevMessages, datas]);
                    
                    // Faites défiler automatiquement la vue vers le bas pour afficher le nouveau message
                    if (messagesEndRef.current) {
                        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
                    }
                }

                // Vérifier si l'utilisateur actuel est différent de l'expéditeur du message
                if (user.infos.id_user !== datas.sender_id) {
                    // Afficher le toast uniquement pour le destinataire
                    toast.info('Nouveau message reçu !');
                    // Gérer la réception des nouvelles conversations
                    socket.on('newConversation', (conversationData) => {           
                        // Mettre à jour la liste des conversations avec la nouvelle conversation
                        console.log('Nouvelle conversation socket:', conversationData);
                        setConversations(prevConversations => [...prevConversations, conversationData]);            
                    });
                }

                // Mettez à jour l'état isTyping après la réception du message
                setIsTyping(false);
            });

            
        }

        return () => {
            // Supprimez l'écouteur d'événements lors du démontage du composant
            if (socket) {
                socket.off('messageResponse');
                socket.off('newConversation');
            }
        };
    }, [socket, conversationId, user.infos.id_user]);


    
    

    useEffect(() => {
        if (socket) {
            socket.on('typing', () => {
                setIsTyping(true); // L'utilisateur est en train de taper
            });
            
            socket.on('stopTyping', () => {
                setIsTyping(false); // L'utilisateur a arrêté de taper
            });
        }

    
        return () => {
            if (socket) {
                socket.off('messageResponse');
                socket.off('newConversation');
                socket.off('typing');
                socket.off('stopTyping');
            }
        };
    }, [socket]);

    // Charger les détails de la conversation sélectionnée
    useEffect(() => {
        if (conversationId) {
            loadOneConversation(conversationId)
                .then((res) => {
                    const conversation = res.conversation[0];
                    setBookId(conversation.id_book);
                    setBookTitle(conversation.bookTitle);
                })
                .catch((error) => {
                    console.error('Erreur lors du chargement des détails de la conversation :', error);
                });
        }
    }, [conversationId, socket]);
    

    useEffect(() => {
        // Faire défiler automatiquement vers le bas lorsqu'il y a de nouveaux messages
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "instant" });
        }
      }, [messages]);


    // Effet pour charger les conversations de l'utilisateur lorsqu'il se connecte ou que son ID utilisateur change
    useEffect(() => {              
        loadUserConversations(user.infos.id_user, bookId, bookTitle)
        .then((res)=>{
            console.log(res)
            setConversations(res.conversations); // Mettre à jour les conversations dans l'état
        })
        .catch(err=>console.log(err));         
          
    }, [user.infos.id_user, bookId, bookTitle]);


    // Effet pour charger les messages de la conversation sélectionnée lorsque son ID change
    useEffect(() => {
        if (conversationId && socket) {
            displayConversationMessage(conversationId);
        }
    }, [conversationId, socket]);


    useEffect(() => {
        if (conversationId) {
            setSelectedConversation(conversationId);
        }
    }, [conversationId]);
    

    // Fonction pour charger les messages d'une conversation spécifiée
    const displayConversationMessage = (conversationId) => {
        loadConversationMessages(conversationId)
        .then((res)=>{
            setMessages(res.messages); // Mettre à jour les messages dans l'état
        }) 
        .catch(err=>console.log(err));  

    };
    

    // Fonction pour gérer le clic sur une conversation et mettre à jour la conversation sélectionnée
    const handleConversationClick = (conversationId)  => {
        // Mettre à jour l'URL de la conversation sélectionnée
        navigate(`/messenger/${conversationId}`);

        // Mettre à jour la conversation sélectionnée
        setSelectedConversation(conversationId);
    };

    const handleInputChange = (event) => {
        const message = event.target.value;
        setNewMessageContent(message);
    
        // Émettre un événement 'typing' lorsque l'utilisateur commence à taper
        if (message && message.trim().length > 0) {
            socket.emit('typing'); // Envoyer l'événement 'typing' au serveur
        } else {
            socket.emit('stopTyping'); // Envoyer l'événement 'stopTyping' au serveur
        }
    };

    // Fonction pour envoyer un nouveau message

    const onSubmitForm = async () => {
        if (!selectedConversation) {
            console.log("Veuillez sélectionner une conversation avant d'envoyer un message.");
            return;
        }

        const datas = {
            conversation_id: selectedConversation, // ID de la conversation
            sender_id: user.infos.id_user, // ID de l'utilisateur envoyant le message
            content: newMessageContent, // Contenu du message
            id_book: bookId,
            bookTitle: bookTitle
        };


        // Émettre un événement 'message' avec les données du message vers le serveur via Socket.IO
        socket.emit('message', datas);
        console.log('datas',datas)

        

        // Mettre à jour l'état isTyping après l'envoi du message
        setIsTyping(false);

       sendMessage(datas)
        .then((res)=>{
            displayConversationMessage(selectedConversation); 
            setNewMessageContent(''); // Réinitialiser le contenu du nouveau message
            
            loadConversationMessages(conversationId)
            .then((res)=>{
                console.log(res.messages.length); // Mettre à jour les messages dans l'état
                if (res.messages.length === 1){
                    loadOneConversation(conversationId)
                    .then((res) => {
                        const conversation = res.conversation[0];
                        const conversationData = {
                            id : conversation.id,
                            user1_id : conversation.user1_id,
                            user2_id : conversation.user2_id,
                            user1_nickname: conversation.user1_nickname,
                            user2_nickname: conversation.user2_nickname, 
                            id_book: conversation.id_book,
                            bookTitle: conversation.bookTitle
                        };
                        
                        socket.emit('conversation', conversationData);
                    })
                    .catch((error) => {
                        console.error('Erreur lors du chargement des détails de la conversation :', error);
                    });
                    
                }
            }) 
            .catch(err=>console.log(err));  

                })
        .catch(err=>console.log(err)); 
        



        // Récupérer les détails de la conversation
        /*loadOneConversation(selectedConversation)
        .then((res) => {
            // Vérifier si le champ newChat de la conversation est égal à "firstMessage"
            const conversation = res.conversation[0];
            sendMessage(datas)
                .then((res) => {
                    displayConversationMessage(selectedConversation); 
                    setNewMessageContent(''); // Réinitialiser le contenu du nouveau message  
                    console.log("statut de la conversation avant mise à jour", conversation.newChat);
                    if (conversation.newChat === "true") {
                        updateFirstMessage(selectedConversation)
                            .then((updateRes) => {
                                console.log("Statut de la conversation mis à jour avec succès :", updateRes);
                                // Recharger les détails de la conversation mise à jour
                                loadOneConversation(selectedConversation)
                                    .then((res) => {
                                        const conversation = res.conversation[0];
                                        console.log("Statut de la conversation après mise à jour :", conversation.newChat);
                                        const conversationData = {
                                            id : conversation.id,
                                            user1_id : conversation.user1_id,
                                            user2_id : conversation.user2_id,
                                            user1_nickname: conversation.user1_nickname,
                                            user2_nickname: conversation.user2_nickname, 
                                            id_book: conversation.id_book,
                                            bookTitle: conversation.bookTitle
                                        };

                                        // Afficher les informations de la conversationData dans la console
                                        console.log("ConversationData:", conversationData);
                                        
                                        // Émettre un événement 'conversation' avec les données de la conversaion vers le serveur via Socket.IO
                                                                                
                                        socket.emit('conversation', conversationData);
                                        
                                        
                                        // Passer le statut à "false" après 2 secondes
                                        setTimeout(() => {
                                            updateFalse(selectedConversation)
                                                .then((updateRes) => {
                                                    console.log("Statut de la conversation passé à 'false' avec succès :", updateRes);
                                                })
                                                .catch((updateErr) => {
                                                    console.error("Erreur lors du passage du statut de la conversation à 'false' :", updateErr);
                                                });
                                        }, 5000);
                                    })
                                    .catch((err) => {
                                        console.error("Erreur lors du rechargement des détails de la conversation :", err);
                                    });
                            })
                            .catch((updateErr) => {
                                console.error("Erreur lors de la mise à jour du statut de la conversation :", updateErr);
                            });
                    }
                })
                .catch((sendMessageErr) => {
                    console.error("Erreur lors de l'envoi du message :", sendMessageErr);
                });
        })
        .catch((loadErr) => {
            console.error("Erreur lors du chargement des détails de la conversation :", loadErr);
        });*/

    };

    
    
    
    // Redirection vers la page d'accueil si la variable redirect est vraie
    if(redirect){
        return <Navigate to="/" />;
    }

    return (
        <section id="chat">
            
            <div className="chat_left">
                <h1 className="title_fixed">Conversations</h1>
                <h2 className="title_fixed">Bienvenue {user.infos.nickName}</h2>
                <ul>
                    {conversations && conversations.length > 0 ? (
                        conversations.map(conversation => (
                            <li key={`${conversation.id}_${conversation.user1_id}_${conversation.user2_id}`} onClick={() => {
                                console.log("Conversation cliquée :", conversation);
                                handleConversationClick(conversation.id);
                            }}>
                                <p>
                                    Conversation avec: {user.infos.id_user === conversation.user1_id ? conversation.user2_nickname : conversation.user1_nickname} concernant le livre: {conversation.id_book}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p>Aucune conversation à afficher.</p>
                    )}
                </ul>
            </div>

            <div className="chat_right">  
                {selectedConversation && (
                    <div>              
                    <h2>Messages</h2>
                        <div className="messages-wrapper">
                            <div className="scroller2"> 
                                {messages && Array.isArray(messages) && (
                                    <ul>
                                        {messages.map(message => (
                                            <li key={message.id}>
                                                <p>{message.content}</p>
                                            </li>
                                        ))}                            
                                    </ul>                               
                                )}
                            </div>

                            
                    
                            <form
                                className='sendMsg'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onSubmitForm(e);
                                }}
                            >
                                <textarea 
                                    value={newMessageContent} 
                                    onChange={handleInputChange} 
                                    placeholder={isTyping ? "En train de taper..." : "Écrivez votre message ici..."}
                                />
                                <button>Envoyer</button>
                            </form>
                        </div>                    
                    </div>
                )}
            </div>
            <ToastContainer />
        </section>
    );
};

export default Messenger;