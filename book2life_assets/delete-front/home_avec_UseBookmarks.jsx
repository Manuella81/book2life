import React, {useState, useEffect, useContext} from "react"
import { Link } from "react-router-dom";
import Slider from '../components/book-slide'
import UseBookmarks from '../helpers/useBookmarks'
import {loadBooksByKeyword} from '../api/book'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {config} from '../config'
import {useSelector} from 'react-redux' 
import {selectUser} from '../slices/userSlice'


const Home = (props) =>{

  const user = useSelector(selectUser)
  const [books, setBooks] = useState([])
  const [keyword, setKeyword] = useState("")

  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [bookState, setBookState] = useState(books);
  const [bookmarks, toggleBookmark] = UseBookmarks();

  const changeBookMarksOnly = (e) => {
    setBookmarksOnly(e.target.checked);
  };

  //appel de la fonction de récupération des films dans l'api en fonction de la recherche
  const searchByKeyword = ()=>{
    loadBooksByKeyword(keyword)
    .then((res)=>{
      console.log(res)
      setBooks(res.result)
    })
  }

  useEffect(() => {
    loadBooksByKeyword(keyword);
    //on ajoute une fonctionnalité de filtre
    setBookState(books.filter((s) => (bookmarksOnly ? bookmarks.includes(s.id_book) : s)));
  }, [books, bookmarksOnly, bookmarks]);



  return (
    <section>
      <div className="bloc_search">
        <div className="search">
          <input
              type="text"
              name="keyword" 
              id="keyword"
              placeholder="Recherche BD par mot clé"
              onChange={(e)=>{
                setKeyword(e.currentTarget.value)
              }}
          />
          <button 
            type="submit" 
            onClick={(e)=>{
              e.preventDefault()
              searchByKeyword()   
          }}
          >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button> 
        </div>

        <div>ou</div>
        
        <div className="search">
          <input
              type="text"
              name="address" 
              id="address"
              placeholder="Recherche BD par lieu"
              /*onChange={(e)=>{
                setAddress(e.currentTarget.value)
              }}*/
          />
          <button 
            type="submit" 
          >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
     

      <h1 className="titre_h1">Nouveauté BD et Humour</h1>

        <Slider />        
    
        <p className="all"><Link to="/lastBooks">Voir tout</Link></p>


      

      <div>
        {books.length > 0 && <div>
          <h2 className="titre_h2">Liste des livres par mot clé</h2>
          {/*on affiche la liste des livres récupéré grâce au mot clé*/}
          {user.isLogged && <div>
            <label htmlFor="check">Bookmarked users only</label>
            <input id={"check"} type="checkbox" value={bookmarksOnly} onChange={changeBookMarksOnly} />
          </div>}
          {bookState.map((oneBook)=>{
            const isBookmarked = bookmarks.includes(oneBook.id_book);
            return (
              <article key={oneBook.id_book} className={`user ${isBookmarked ? "bookmarked" : ""}`}>
                  <img src={config.pict_url+oneBook.photo}/>
                  <p><Link to={"/detail/"+oneBook.id_book}>{oneBook.title}</Link></p>
                  {user.isLogged && <button onClick={toggleBookmark(oneBook.id_book)}>                    
                      {/*on ajoute la fonctionnalité d'ajout / suppression des favoris*/}
                      {isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                  </button>}
                  
              </article>
            )
          })}
        </div>} 
      </div> 



        <h2 className="titre_h2">L'univers BD et Humour</h2>
          <div className="bloc_univers">
            <div className="univers">
              <div><Link to="/jeunesse"><p className="theme">BD Jeunesse</p></Link></div>
            </div>
            <div className="univers">
              <div><Link to="/graphiques"><p className="theme">Romans graphiques</p></Link></div>
            </div>
            <div className="univers">
              <div><Link to="/humour"><p className="theme">Humour</p></Link></div>
            </div>
            <div className="univers">
              <div><Link to="/historique"><p className="theme">BD Historique</p></Link></div>
            </div>
            <div className="univers">
              <div><Link to="/erotique"><p className="theme">BD Erotique</p></Link></div>
            </div>
            <div className="univers">
              <div><Link to="/comics"><p className="theme">Comics</p></Link></div>
            </div>
            <div className="univers">
              <div><Link to="/manga"><p className="theme">Manga</p></Link></div>
            </div>
          </div>

    </section>
  )
}


export default Home