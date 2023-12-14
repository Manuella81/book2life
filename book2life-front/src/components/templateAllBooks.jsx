import React, {useEffect} from "react"
import {loadBooksByCat} from '../api/book'
import {useSelector, useDispatch} from 'react-redux' 
import {selectBooks, loadBooks} from '../slices/bookSlice'
import SectionBooks from "../components/sectionBooks";


//Toutes les BDs par catégorie 
const TemplateAllBooks = (props) =>{
  const dispatch = useDispatch()
  const books = useSelector(selectBooks) 


    useEffect(()=>{
        displayBooks()
    })

    const displayBooks = () =>{
        loadBooksByCat(props.id_categorie)
        .then((res)=>{
            //console.log(res)
            dispatch(loadBooks(res.books))
        })
        .catch(err=>console.log(err)) 
    }


    return (
      <main>
        
        <section>
          <h1 className="titre_h1">{props.titre_h1}</h1>
          <div className="lastBooks">
            {/*on affiche la liste des livres*/}
            {books.books.length > 0 ? (
                <div className = "booksCard">
                {books.books.map((oneBook)=>{
                return (
                  <SectionBooks 
                      key={oneBook.id_book}
                      books = {oneBook}
                  />  
                )
              })}
            </div>
            ) : (	
                <p>{props.noBooks} </p>)} 
          </div>
        </section>

      </main>
    )
}

export default TemplateAllBooks