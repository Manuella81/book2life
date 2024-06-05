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
    const [newMessageReceived, setNewMessageReceived] = useState({});
    const [oneConversation, setOneConversation] = useState(null);


    
    


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

                //on vérifie di l'Id de l'utilisateur actuel est différent de l'id de l'expéditeur du message. Cela signifie que cette partie du code s'exécutera uniquement si l'utilisateur actuel n'est pas celui qui a envoyé le message.
                if (user.infos.id_user !== datas.sender_id) {
                    setNewMessageReceived((prevNewMessageReceived) => ({
                        //la syntaxe de décomposition de l'objet (...) permet de copier toutes les paires clé-valeur de l'ancien état prevNewMessageReceived dans le nouvel objet d'état.
                        ...prevNewMessageReceived,
                        [datas.conversation_id]: (prevNewMessageReceived[datas.conversation_id] || 0) + 1
                    }));
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
                    setOneConversation(conversation);
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
    const handleConversationClick = (conversationId) => {
        if (conversationId === null) {
            // Mise à jour immédiate de l'état pour revenir à la liste des conversations
            setSelectedConversation(null);
            setOneConversation(null);
            navigate(`/messenger`);
        } else {
            // Mettre à jour l'URL de la conversation sélectionnée
            navigate(`/messenger/${conversationId}`);
            // Mettre à jour la conversation sélectionnée
            setSelectedConversation(conversationId);
        }
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
            
            loadConversationMessages(selectedConversation)
            .then((res)=>{
                console.log(res.messages.length); // Mettre à jour les messages dans l'état
                if (res.messages.length === 1){
                    loadOneConversation(selectedConversation)
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
        

    };
    
    const onClickDeleteConversation = (conversationId) => {
        loadOneConversation(conversationId)
            .then((res) => {
                console.log('res.conversation.newchat',res.conversation[0].newChat);
                const conversation = res.conversation[0];
                // Récupérer la valeur de newChat
                if (conversation.newChat === "true") {
                    loadUserConversations(user.infos.id_user, bookId, bookTitle)
                    .then((response)=>{
                        console.log(response)
                        // Supprimer la conversation de la liste locale
                        const updatedConversations = response.conversations.filter(conv => conv.id !== conversation.id);
                        setConversations(updatedConversations);
                        })
                    .catch(err=>console.log(err));  

                    
                    loadConversationMessages(conversationId)
                    .then((resMsg)=>{
                        // Supprimer les messsages de la conversation de la liste locale
                        const updatedMessages = resMsg.messages.filter(msg => msg.conversation_id !== conversation.id);
                        setMessages(updatedMessages);
                    }) 
                    .catch(err=>console.log(err));  


                    // Mettre à jour deleteByUser à false dans la base de données
                    updateFalse(conversationId)
                    .then((updateRes) => {
                        console.log("Statut de la conversation passé à 'false' avec succès :", updateRes);
                    })
                    .catch((updateErr) => {
                        console.error("Erreur lors du passage du statut de la conversation à 'false' :", updateErr);
                    });
                    
                } else if (conversation.newChat === "false"){
                    // Appeler la fonction onDeleteConversation pour gérer la suppression dans la base de données
                    deleteOneConversation(conversationId)
                        .then((resDelete) => {
                            //console.log(res)
                            // On recharge les conversations qui viennent d'être mises à jour
                            loadUserConversations(user.infos.id_user, bookId, bookTitle)
                                .then((response) => {
                                    console.log(response);
                                    setConversations(response.conversations);
                                })
                                .catch(err => console.log(err));

                            loadConversationMessages(conversationId)
                                .then((res)=>{
                                    setMessages(res.messages); // Mettre à jour les messages dans l'état
                                }) 
                                .catch(err=>console.log(err));  
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    };
    
    
    
    
    // Redirection vers la page d'accueil si la variable redirect est vraie
    if(redirect){
        return <Navigate to="/" />;
    }

    return (
        <section id="chat">
            
            <div className={`chat_left ${selectedConversation ? 'hide-conversations' : ''}`}>
                <h1 className="title_fixed">Conversations</h1>
                <h2 className="title_fixed">Bienvenue {user.infos.nickName}</h2>
                <ul className='conversationList'>
                    {conversations && conversations.length > 0 ? (
                        conversations.map(conversation => (
                            <li key={`${conversation.id}_${conversation.user1_id}_${conversation.user2_id}`} onClick={() => {
                                console.log("Conversation cliquée :", conversation);
                                handleConversationClick(conversation.id);
                                setSelectedConversation(conversation.id);
                            }}>
                                <p>
                                    {user.infos.id_user === conversation.user1_id ? conversation.user2_nickname : conversation.user1_nickname}: {conversation.bookTitle.slice(0, 25)}...
                                    <FontAwesomeIcon icon={faTrash} onClick={() => onClickDeleteConversation(conversation.id)} />
                                    {selectedConversation !== conversation.id && newMessageReceived[conversation.id] && (
                                        <span>{newMessageReceived[conversation.id]}</span>
                                    )}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p>Aucune conversation à afficher.</p>
                    )}
                </ul>
            </div>
            
    
            <div className="chat_right">  
            
                
                {selectedConversation && oneConversation &&(
                    <div>  
                        <div className='chat_header'>    

                            {/*Lorsque selectedConversationId est null, la condition {selectedConversationId && oneConversation && (...)} devient false.
                            Cela cache les messages de la conversation et réaffiche la liste des conversations. */}
                            {selectedConversation && (
                                <button onClick={() => handleConversationClick(null)}>Retour aux conversations</button>
                            )}        
                            <h2>Messages</h2>

                            <p>
                                {user.infos.id_user === oneConversation.user1_id ? oneConversation.user2_nickname : oneConversation.user1_nickname}: {oneConversation.bookTitle}
                            </p>
                            
                        </div>
                        
                        <div className="messages-wrapper">
                            <div className="scroller2"> 
                                {messages && Array.isArray(messages) && (
                                    <div>
                                        {messages.map(message => (
                                            <div key={message.id} className={`chat-bubble ${message.sender_id === user.infos.id_user ? "" : "right"}`}>
                                                <p>{message.content}</p>
                                            </div>
                                        ))}                            
                                    </div>                               
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