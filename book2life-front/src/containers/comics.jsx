import React from 'react'
import { Link } from "react-router-dom";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie Comics
const Comics = (props)=>{

    const id_cat = 6

    return (
        <div>
            <TemplateCategorie 
                accueil = {<Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>}
                titre_h1 = {`L'univers Comics`}
                titre_h2 = {`Comics`}
                all = {<Link to="/allComics">Voir tout les Comics</Link>}
                aroundMe = {`Comics autour de moi`}
                freeBooks = {`Comics gratuits`}
                id_categorie = {id_cat}
            />   
        </div>     
    )
}

export default Comics