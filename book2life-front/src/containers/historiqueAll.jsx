import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Romans Graphiques
const AllHistorique = (props) =>{
    const id_cat = 4;

    return (
      <main>
         <Link to="/historique"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers BD Historique</Link>

        <TemplateAllBooks 
                titre_h1 = {`Toutes les BDs de la catégorie BD Historique`}
                noBooks = {`Il n'y a aucune BDs dans la catégorie BD Historique`}
                id_categorie = {id_cat}
            />  

      </main>
    )
}

export default AllHistorique