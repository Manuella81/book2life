import React from 'react'
import { Link } from "react-router-dom";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie BD Erotique
const Erotique = (props)=>{

    const id_cat = 5

    return (
        <div>
            <TemplateCategorie 
                accueil = {<Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>}
                titre_h1 = {`L'univers BD Erotique`}
                titre_h2 = {`BDs Erotiques`}
                all = {<Link to="/allErotique">Voir toutes BDs Erotiques</Link>}
                aroundMe = {`BDs Erotiques autour de moi`}
                freeBooks = {`BDs Erotiques gratuits`}
                id_categorie = {id_cat}
            />   
        </div>     
    )
}

export default Erotique