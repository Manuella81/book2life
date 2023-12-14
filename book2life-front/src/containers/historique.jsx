import React from 'react'
import { Link } from "react-router-dom";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie BD Historique
const Historique = (props)=>{

    const id_cat = 4

    return (
        <div>
            <TemplateCategorie 
                accueil = {<Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>}
                titre_h1 = {`L'univers BD Historique`}
                titre_h2 = {`BDs Historiques`}
                all = {<Link to="/allHistorique">Voir toutes les BDs Historiques</Link>}
                aroundMe = {`BDs Historiques autour de moi`}
                freeBooks = {`BDs Historiques gratuits`}
                id_categorie = {id_cat}
            />   
        </div>     
    )
}

export default Historique