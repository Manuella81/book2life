import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import {FavoriteContext} from '../../context/favoriteContext'
import {config} from '../../config'

//Liste des favoris
const Favorite = (props) =>{
    const [favorites, setFavorites] = useContext(FavoriteContext)

    const deleteFromFavorite = (index)=>{
        let delFavoris = [...favorites]
        delFavoris.splice(index, 1)
        setFavorites(delFavoris)
    }

    return (
		<main>
			<h1 className='titre_h1'>Liste de mes livres favoris</h1>
			{favorites.length > 0 ? ( 
				<div className = "booksCard">
				{favorites.map((favorite, index)=>{
					return (
						<div key={favorite.id_book} className = "book">      
							<img src={config.pict_url+favorite.photo} alt="couverture BDS"/>
							<p>Titre: <span className="bold">{favorite.title}</span></p>
							<p>Lieu: <span className="bold">{favorite.city}</span></p>
							<p>Prix: <span className="bold">{favorite.price} €</span></p>
							<p><Link to={"/detail/"+favorite.id_book} className="button_details">Voir détails</Link></p>

							{/* affiche le bouton "Supprimer des favoris" */}
							<button
								className="delete_favorite"
								onClick={(e)=>{
									e.preventDefault();
									deleteFromFavorite(index);
								}}
							>
								Supprimer des favoris
							</button>
						</div>
					)
				})}			
			</div> 
			) : (	
			<p> Votre liste de favoris est vide </p>)}	
		</main>
	)
    
}

export default Favorite

