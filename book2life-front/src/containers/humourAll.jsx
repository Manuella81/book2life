import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Humour
const AllHumour = (props) =>{
    const id_cat = 3;

    return (
      <main>
         <Link to="/humour"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers Humour</Link>

        <TemplateAllBooks 
                titre_h1 = {`Toutes les BDs de la catégorie Humour`}
                noBooks = {`Il n'y a aucune BDs dans la catégorie Humour`}
                id_categorie = {id_cat}
            />  

      </main>
    )
}

export default AllHumour