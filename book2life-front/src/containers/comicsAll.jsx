import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Comics
const AllComics = (props) =>{
    const id_cat = 6;

    return (
      <main>
         <Link to="/comics"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers Comics</Link>

        <TemplateAllBooks 
                titre_h1 = {`Toutes les BDs de la catégorie Comics`}
                noBooks = {`Il n'y a aucune BDs dans la catégorie Comics`}
                id_categorie = {id_cat}
            />  

      </main>
    )
}

export default AllComics