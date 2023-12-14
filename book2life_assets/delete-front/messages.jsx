import React, {useState, useEffect} from 'react'
import { useParams, Link } from "react-router-dom";
import {config} from '../../config'
import {loadMessagesByUser,loadMessagesByBook,loadBooksByUser} from '../../api/book'
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";




const Messages = (props) =>{   
    const [contents, setContents] = useState([])
    const [messages, setMessages] = useState([])
    const [books, setBooks] = useState([])
    const [messagesByBook, setMessagesByBook] = useState([])
    const user = useSelector(selectUser) 
    const params = useParams()
    const id_book = props.id_book
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);


    useEffect(()=>{
        displayMessagesByUser()
        displayBooksByUser()
        displayMessagesByBook()
    }, []);

    //on récupère la liste des messages par utilisateur
    const displayMessagesByUser = () =>{
        loadMessagesByUser(user.infos.id_user)
        .then((res)=>{
            console.log(res)
            setMessages(res.messages)
        })
        .catch(err=>console.log(err)) 
    }


    //on récupère la liste des messages par livre
    const displayMessagesByBook = () =>{
        loadMessagesByBook(id_book)
        .then((res)=>{
            console.log(res)
            setMessagesByBook(res.messages)
        })
        .catch(err=>console.log(err)) 
    }

     //on récupère la liste des livres d'un utilisateur
     const displayBooksByUser = () =>{
        loadBooksByUser(user.infos.id_user)
        .then((res)=>{
            console.log(res)
            setBooks(res.books)
        })
        .catch(err=>console.log(err)) 
    }



    return (
        <main>                

           <section>
            <h1 className="titre_h1">Mes messages</h1> 
                <div >
                     
                                {/*on affiche la liste des messages par livre*/}
                                {messages.length > 0 ? (<div >  
                                    {messages.map((oneMessage)=>{
                                    return (
                                        <div className="answerMessage" >
                                            <p key={oneMessage.id_book}>Titre: <span className="bold">{oneMessage.title}</span></p> 
                                            <p><span className="bold"> {oneMessage.nickName}:</span> {oneMessage.contents}</p>
                                            <Link to={"/sendMessage/"+oneMessage.id_book} >Répondre</Link>
                                        </div>
                                    )
                                })}
                                </div>
                                ) : (	
                                    <p>Vous n'avez aucun message </p>)}                                         
                        
                     
                </div>
            </section>

            
        </main>
        
    )
}

export default Messages