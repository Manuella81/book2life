import React, { useState, useEffect } from "react"
import { Link, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { config } from '../config'
import { loadUserConversations, saveConversation, updateFisrtMessge } from '../api/conversation'; 
import { loadConversationMessages } from '../api/messages'; 
import {loadBook} from '../api/book';
import { useSelector } from 'react-redux' 
import { selectUser } from '../slices/userSlice'
import { selectBook } from "../slices/bookSlice";
import UserFavorites from "../components/userFavorite";
import { useConversation } from '../context/conversationContext';
import io from 'socket.io-client';


// Composant qui affiche les livres
const SectionBooks = (props) => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const { setConversationId } = useConversation();
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [book, setBook] = useState("")
            
   

    useEffect(() => {
        const newSocket = io('http://localhost:4000'); // Remplacez l'URL par l'URL de votre serveur socket.io
        console.log('Connexion au serveur Socket.IO établie avec succès.');
        setSocket(newSocket);
    
        return () => {
            newSocket.disconnect(); // Déconnexion du socket lorsque le composant est démonté
        };
    }, []);
    
    const handleSendMessage = async () => {
        
        const userId = user.infos.id_user;
        const bookId = props.books.id_book;
        const user2Id = props.books.id_user; 
        const user2Nickname = props.books.nickName;
        const bookTitle = props.books.title;

        dispatch(selectBook(bookId)); // Dispatch de l'action pour sélectionner le livre

        loadBook(bookId)
            .then((res) => {
                console.log(res)
                setBook(res.result.title)
            })
            .catch((err) => console.log(err));


        loadUserConversations(userId, bookId)
        .then(res => {
            setConversations(res.conversations)
            console.log(res.conversations)
            let conversationId = null;


            // Recherche de la conversation existante
            for (const conversation of res.conversations) {
                if (
                    ((conversation.user1_id === userId && conversation.user2_id === user2Id) || 
                    (conversation.user1_id === user2Id && conversation.user2_id === userId)) &&
                    conversation.id_book === bookId
                ) {
                    conversationId = conversation.id;
                    break;
                }
            }

            if (conversationId) {
                // Conversation existante, charger les messages de la conversation
                setConversationId(conversationId); // Définir l'ID de la conversation active
                navigate(`/messenger/${conversationId}`); // Naviguer vers la page de messagerie avec l'ID de la conversation
                displayConversationMessage(conversationId); // Charger les messages de la conversation
            } else {
                
                // Aucune conversation existante, créer une nouvelle conversation
                const conversationData = {
                    user1_id: userId,
                    user2_id: user2Id, 
                    user2_nickname: user2Nickname, 
                    user1_nickname: user.infos.nickName,
                    id_book: bookId,
                    bookTitle: bookTitle
                };

                console.log('Valeur de bookTitle avant l\'insertion :', conversationData.bookTitle);

                // Enregistrer la nouvelle conversation
                saveConversation(conversationData)
                .then((response) => {
                    console.log('enregistrement de la nouvelle conversation', response);
                    const newConversationId = response.newConversation.insertId;
                    console.log('nouvelle conversation', newConversationId);
                    setConversationId(newConversationId);
                    navigate(`/messenger/${newConversationId}`);

                    // Vérifier si la conversation est nouvelle en regardant si son ID est déjà dans la liste des conversations
                    /*const isNewChat = !conversations.some(conversation => conversation.id === newConversationId);

                    if (isNewChat) {
                        // Si c'est une nouvelle conversation, afficher instantanément chez le destinataire
                        socket.emit('conversation', newConversationId);

                        // Mettre à jour newChat à faux dans la base de données
                        updateFisrtMessge(newConversationId)
                        .then((updateRes) => {
                            console.log(updateRes);
                            //setRedirect(true)
                        })
                        .catch(updateErr => console.log(updateErr));
                    }*/
                })
                .catch(err => console.log(err));

            }

            
            
        })

        .catch(error => console.error('Error checking conversation existence:', error));
    };



    const displayConversationMessage = (conversationId) => {
        loadConversationMessages(conversationId)
            .then((res) => {
                // Mettre à jour les messages dans le composant SectionBooks
                setMessages(res.messages);
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="book" key={props.books.id_book}>
            <img src={config.pict_url + props.books.photo} alt="couverture de BD" />
            <p>Titre: <span className="bold">{props.books.title}</span></p>
            <p>Lieu: <span className="bold">{props.books.city}</span></p>
            <p>Prix: <span className="bold">{props.books.price} €</span></p>                           
            <p><Link to={"/detail/" + props.books.id_book} className="button">Voir détails</Link></p>
            
            {user.isLogged && (
                <div>
                    <UserFavorites books={props.books} />
                    <p className="sendMessage"><button onClick={handleSendMessage}>Envoyer un message</button></p>
                </div>
            )}
        </div>
    )
}

export default SectionBooks

