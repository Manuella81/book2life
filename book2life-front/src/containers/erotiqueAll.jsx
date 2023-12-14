import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Romans Graphiques
const AllGraphiques = (props) =>{
    const id_cat = 5;

    return (
      <main>
         <Link to="/erotique"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers BD Erotique</Link>

        <TemplateAllBooks 
                titre_h1 = {`Toutes les BDs de la catégorie BD Erotique`}
                noBooks = {`Il n'y a aucune BDs dans la catégorie BD Erotique`}
                id_categorie = {id_cat}
            />  

      </main>
    )
}

export default AllGraphiques