import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Manga
const AllManga = (props) =>{
    const id_cat = 7;

    return (
      <main>
         <Link to="/manga"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers Manga</Link>

        <TemplateAllBooks 
                titre_h1 = {`Toutes les BDs de la catégorie Manga`}
                noBooks = {`Il n'y a aucune BDs dans la catégorie Manga`}
                id_categorie = {id_cat}
            />  

      </main>
    )
}

export default AllManga