import React, {useEffect} from "react"
import { Link } from "react-router-dom";
import {loadLastBooks} from '../api/book'
import SectionBooks from "../components/sectionBooks";
import {useSelector, useDispatch} from 'react-redux' 
import {selectBooks, loadBooks} from '../slices/bookSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Les dernières BDs
const LastBooks = (props) =>{
  const dispatch = useDispatch()
  const books = useSelector(selectBooks) 

  useEffect(()=>{
    displayLastBooks()
  })

  //on récupère la liste des 50 derniers livres
  const displayLastBooks = () =>{
    loadLastBooks()
    .then((res)=>{
        //console.log(res)
        dispatch(loadBooks(res.books))
    })
    .catch(err=>console.log(err)) 
  }


    return (
      <main>
        <Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>
        <section>
          <h1 className="titre_h1">Nouveauté BD et Humour</h1>

          <div className="lastBooks">
            {/*on affiche la liste des livres*/}
            {books.books.length > 0 && <div  className = "booksCard">
              {books.books.map((oneBook)=>{
                return (
                  <SectionBooks 
                    key={oneBook.id_book}
                    books = {oneBook}
                  />
                )
              })}
            </div>} 
          </div>
        </section>  

      </main>
    )
}

export default LastBooks