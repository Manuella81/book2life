import React, {useState, useEffect} from "react"
import { useParams,Link } from "react-router-dom";
import {loadBook} from '../api/book'
import {config} from '../config'
import UserFavorites from "../components/userFavorite";
import {useSelector} from 'react-redux' 
import {selectUser} from '../slices/userSlice'



//Header du site web
const Details = (props) =>{
    const user = useSelector(selectUser)
    const params = useParams()
    const [book, setBook] = useState(null)

    useEffect(()=>{
        displayOneBook(params.id)
    });
    
    
    const displayOneBook = () =>{
        loadBook(params.id)
        .then((res)=>{
            //console.log(res)
            setBook(res.result)
        })
        .catch(err=>console.log(err)) 
      }



    return (
        <main className="bloc_details">    
        
            <h1 className="titre_h1"> Détails </h1>

            {book !== null && <article className="details">
                <div className="details_left">
                    <h2 className="titre_h2">{book.title}</h2>
                    <img src={config.pict_url+book.photo} alt = "couverture de BD"/>
                    <p>prix: {book.price} €</p>
                    <p>Etat: {book.state}</p>
                </div>

                <div className="details_right">
                    <div>
                        <h3 className="titre_h3">Résumé</h3>
                        <p className="resume">{book.synopsis}</p>
                    </div>
                    <div>
                        <h3 className="titre_h3">Caractéristiques</h3>
                        <div className="caracteristiques">
                            <p>Date de parution: {book.releaseDate}</p>
                            <p>Auteur(s): {book.author}</p>
                            <p>Collection: {book.editor}</p>
                            <p>Nombre de page: {book.numberOfPages}</p>
                            <Link to={`/allUserBooks/${book.id_user}`} className="button">Tout les livres de {book.nickName}</Link>
                            {user.isLogged && <div key={book.id_book}>
                                <UserFavorites 
                                    books = {book}
                                />
                            </div>}
                        </div>
                    </div>
                </div>                            
            </article>}
            
        </main>
        
    )
}

export default Details