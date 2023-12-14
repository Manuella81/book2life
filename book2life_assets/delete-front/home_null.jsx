import React, {useState, useEffect, useContext} from "react"
import { Link } from "react-router-dom";
import Slider from '../components/book-slide'
import {FavoriteContext} from '../context/favoriteContext'
import {loadBooksByKeyword} from '../api/book'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookSkull, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {config} from '../config'



const Home = (props) =>{

  const [favorites, setFavorites] = useContext(FavoriteContext)
  const [books, setBooks] = useState([])
  const [keyword, setKeyword] = useState("")

  const addFavorite = (book)=>{
    let newFavoris = [...favorites]
    newFavoris.push(book)
    setFavorites(newFavoris)
  }

   //retourne une boucle avec les films récupérés dans l'api (pas obligatoire)
  const bookList = (book) =>{
    const index = favorites.findIndex(m => m.id === parseInt(book.id))
    return (<div key={book.id}>

      {index === -1 ? <button
        onClick={(e)=>{
          e.preventDefault();
          addFavorite(book);
        }}
      >
        Ajouter au favoris
      </button> : <p>déjà dans les favoris</p>}
    </div>)

  
}

  //appel de la fonction de récupération des films dans l'api en fonction de la recherche
  const searchByKeyword = ()=>{
    loadBooksByKeyword(keyword)
    .then((res)=>{
      console.log(res)
      setBooks(res.result)
    })
  }


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


        {/*on affiche la liste des livres récupéré grâce au mot clé*/}
      {books.length > 0 && <div>
        <h2 className="titre_h2">Liste des livres par mot clé</h2>
        {books.map((oneBook)=>{
          return (
            <article key={oneBook.id_book}>
                <img src={config.pict_url+oneBook.photo}/>
                <p><Link to={"/detail/"+oneBook.id_book}>{oneBook.title}</Link></p>
                {bookList(oneBook)}
            </article>
          )
        })}
      </div>}  



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