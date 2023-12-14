import React from 'react'
import { Link } from "react-router-dom";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie Romans Graphiques
const Graphiques = (props)=>{

    const id_cat = 2

    return (
        <div>
            <TemplateCategorie 
                accueil = {<Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>}
                titre_h1 = {`L'univers Romans Graphiques`}
                titre_h2 = {`Romans Graphiques`}
                all = {<Link to="/allGraphiques">Voir tout les Romans Graphiques</Link>}
                aroundMe = {`Romans Graphiques autour de moi`}
                freeBooks = {`Romans Graphiques gratuits`}
                id_categorie = {id_cat}
            />   
        </div>     
    )
}

export default Graphiques