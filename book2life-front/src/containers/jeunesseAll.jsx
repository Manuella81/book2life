import React from "react"
import { Link } from "react-router-dom";
import TemplateAllBooks from "../components/templateAllBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Toutes es BDs de la catégorie Jeunesse
const AllJeunesse = (props) =>{
  const id_cat = 1;

  return (
    <main>
       <Link to="/jeunesse"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la l'univers BD Jeunesse</Link>

      <TemplateAllBooks 
              titre_h1 = {`Toutes les BDs de la catégorie Jeunesse`}
              noBooks = {`Il n'y a aucune BDs dans la catégorie Jeunesse`}
              id_categorie = {id_cat}
          />  

    </main>
  )
}

export default AllJeunesse