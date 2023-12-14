import React, {useState, useEffect} from "react"
import { useParams, Link } from "react-router-dom";
import {loadBooksByUser2} from '../api/book'
import SectionBooks from "../components/sectionBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";



    //Toutes es BDs de la catégorie Romans Graphiques
    const AllUserBooks = (props) =>{
        const [books, setBooks] = useState([])
        const params = useParams()
        const id_user = params.id_user

    useEffect(()=>{      
      loadBooksByUser2(id_user)
      .then((res)=>{
          //console.log(res)
          setBooks(res.books)
      })
      .catch(err=>console.log(err)) 
    })



    return (
      <main>  
          <Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>
          {/*on affiche la liste des livres*/}
          {books.length > 0 && <h1 className="titre_h1">Liste des livres de {books[0].nickName}</h1>}
          {books.length > 0 && <div className = "booksCard">
              {books.map((oneBook)=>{
                return (
                  <SectionBooks 
                    books = {oneBook}
                    key = {oneBook.id_book}
                  />
                )
              })}
          </div>} 
      </main>
    )
}

export default AllUserBooks