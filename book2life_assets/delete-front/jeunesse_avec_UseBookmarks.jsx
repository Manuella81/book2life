import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {config} from '../config'
import {loadLastBooks, loadTriJeunesse} from '../api/book'
import UseBookmarks from '../helpers/useBookmarks'

const Jeunesse = (props)=>{
    
    const [books, setBooks] = useState([])

    const [bookmarksOnly, setBookmarksOnly] = useState(false);
    const [bookState, setBookState] = useState();
    const [bookmarks, toggleBookmark] = UseBookmarks();
    const changeBookMarksOnly = (e) => {
        setBookmarksOnly(e.target.checked);
    };

    /*useEffect(()=>{
        displayJeunesse()
    },[])

    //on récupère la liste des 50 derniers livres
    const displayJeunesse = () =>{
        loadTriJeunesse()
        .then((res)=>{
            console.log(res)
            setBooks(res.result)
        })
        .catch(err=>console.log(err)) 
    }*/

    useEffect(()=>{
        displayLastBooks()//on ajoute une fonctionnalité de filtre
        setBookState(books.filter((s) => (bookmarksOnly ? bookmarks.includes(s.id_book) : s)));
    }, [books, bookmarksOnly, bookmarks]);
    

    
    const displayLastBooks = () =>{
        loadLastBooks()
        .then((res)=>{
            //console.log(res)
            setBooks(res.books)
        })
        .catch(err=>console.log(err)) 
      }
    
    
    return (
        <section>

            <h1 className="titre_h1">L'univers BD Jeunesse</h1>

            <div className='lastBooksByCat'>
                <h2 className="titre_h2">Nouveauté BD Jeunesse</h2> 

                {/*on affiche la liste des livres récupéré grâce au mot clé*/}
      <label htmlFor="check">Bookmarked users only</label>
      <input id={"check"} type="checkbox" value={bookmarksOnly} onChange={changeBookMarksOnly} />

      <div>
        {books.length > 0 && <div>
          {bookState.map((oneBook)=>{
            const isBookmarked = bookmarks.includes(oneBook.id_book);
            return (
              <article key={oneBook.id_book} className={`user ${isBookmarked ? "bookmarked" : ""}`}>
                  <img src={config.pict_url+oneBook.photo}/>
                  <p><Link to={"/detail/"+oneBook.id_book}>{oneBook.title}</Link></p>
                  <button onClick={toggleBookmark(oneBook.id_book)}>
                    {/*on ajoute la fonctionnalité d'ajout / suppression des favoris*/}
                    {isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                  </button>
              </article>
            )
          })}
        </div>} 
      </div> 

            </div>

            <div className='bdAroundMe'>
                <h2 className="titre_h2">BD Jeunesse autour de moi</h2> 
            </div>

            <div className='freeBd'>
                <h2 className="titre_h2">BD Jeunesse en don</h2> 
            </div>
        </section>
    )
}

export default Jeunesse