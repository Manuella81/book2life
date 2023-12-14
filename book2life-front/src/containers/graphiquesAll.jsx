import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Romans Graphiques
const AllGraphiques = (props) =>{
    const id_cat = 2;

    return (
      <main>
         <Link to="/graphiques"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers Romans Graphiques</Link>

        <TemplateAllBooks 
            titre_h1 = {`Toutes les BDs de la catégorie Romans Graphiques`}
            noBooks = {`Il n'y a aucune BDs dans la catégorie Romans Graphiques`}
            id_categorie = {id_cat}
        />  

      </main>
    )
}

export default AllGraphiques