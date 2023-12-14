import React, {useContext} from "react"
import {FavoriteContext} from '../context/favoriteContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";


const UserFavorites = (props) =>{
    const [favorites, setFavorites] = useContext(FavoriteContext)
    
    const addFavorite = (book)=>{
        //utilisation du spread operator afin d'ajouter des BDS à des tableaux (la liste des favoris)
        let newFavoris = [...favorites]
        newFavoris.push(book)
        setFavorites(newFavoris)
    }

    //retourne une boucle avec les livres récupérés dans l'api 
    const bookList = (book, user) =>{
        const index = favorites.findIndex(m => m.id_book === parseInt(book.id_book))
        return (       
            <div key={book.id_book}>
                {index === -1 ? <button
                    className="add_favorite"
                    onClick={(e)=>{
                        e.preventDefault();
                        addFavorite(book);
                    }}
                >
                    Ajouter aux favoris
                </button> : <p className="already_favorite"><FontAwesomeIcon icon={faCircleCheck}/> déjà dans les favoris</p>}
            </div>            
        ) 
    }

    

    return (
        <div>                
            {bookList(props.books)}         
        </div>       
    )
}

export default UserFavorites