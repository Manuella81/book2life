import React from "react"
import { Link } from "react-router-dom";
import {config} from '../config'
import {useSelector} from 'react-redux' 
import {selectUser} from '../slices/userSlice'
import UserFavorites from "../components/userFavorite";


//composant qui affiche les livres
const SectionBooks = (props) =>{
    const user = useSelector(selectUser)
   
    return (
        <div className="book">
            <img src={config.pict_url+props.books.photo} alt="couverture de BD"/>
            <p>Titre: <span className="bold">{props.books.title}</span></p>
            <p>Lieu: <span className="bold">{props.books.city}</span></p>
            <p>Prix: <span className="bold">{props.books.price} €</span></p>                           
            <p><Link to={"/detail/"+props.books.id_book} className="button">Voir détails</Link></p>
            
            {/*affiche le bouton "ajouter au favoris" lorsque l'utilisateur est connecté grâce au helper userFavorite.jsx*/}
            {user.isLogged && <div key={props.books.id_book}>
                <UserFavorites 
                    books = {props.books}
                />
                <p className="sendMessage"><Link to={"/sendMessage/"+props.books.id_book}>Envoyer un message au vendeur</Link></p>
            </div>}
        </div>
        
    )
}

export default SectionBooks