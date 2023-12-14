import React, {useState} from "react"
import { Link} from "react-router-dom";
import {loadBooksByKeyword, loadBooksByLocation} from '../api/book'
import Carrousel from '../components/carrousel'
import SectionBooks from "../components/sectionBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { HashLink as LinkTo } from 'react-router-hash-link';



//Page d'accueil
const Home = (props) =>{

  const [books, setBooKs] = useState([])
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  
  //appel de la fonction de récupération des livres dans l'api en fonction de la recherche par mot clé
  const searchByKeyword = ()=>{
    loadBooksByKeyword(keyword)
    .then((res)=>{
      //console.log(res)
      setBooKs(res.result)
    })
  }

  //appel de la fonction de récupération des livres dans l'api en fonction de la recherche par lieu
  const searchByLocation = ()=>{
    loadBooksByLocation(location)
    .then((res)=>{
      ///console.log(res)
      setBooKs(res.result)
    })
  }




  return (
    <main id='homePage'>    
  
      {/* recherche par mot clé */}
      <div className="bloc_search">
        <div className="search">
          <form
              className="form1"
              onSubmit={(e) => {
                  e.preventDefault();
                  searchByKeyword();  
              }}
          >
            <input
                type="text"
                name="keyword" 
                required
                id="keyword"
                placeholder="Recherche BD par mot clé"
                onChange={(e)=>{
                  setKeyword(e.currentTarget.value)
                }}
            />

            <button 
              type="submit" 
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button> 

          </form>
        </div>

        <div>ou</div>
        
        {/* recherche par lieu */}
        <div className="search">
        <form
              className="form1"
              onSubmit={(e) => {
                  e.preventDefault();
                  searchByLocation()    
              }}
          >
            <input
                type="text"
                name="location" 
                required
                id="location"
                placeholder="Recherche BD par lieu"
                onChange={(e)=>{
                  setLocation(e.currentTarget.value)
                }}
            />

            <button 
              type="submit" 
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </div>
        
             
      <section>     
        <h1 className="titre_h1">Nouveauté BD et Humour</h1>
          {/* Slider des nouveautés*/}     
          <Carrousel />     
          <p className="link"><Link to="/lastBooks">Voir toutes les nouveautés</Link></p>
          
          {/*on affiche la liste des livres récupéré grâce au mot clé ou à la localisation*/}
          {books.length > 0 && 
            <div>
              <p className="link"><LinkTo to="#categories">Aller aux catégories de BDs</LinkTo></p>
              <h2 className="titre_h2">Liste des livres par mot clé ou lieu</h2>
            </div>
          }
            
          {books.length > 0 && <div className = "booksCard">
            {books.map((oneBook)=>{
              return (
                <SectionBooks 
                  key={oneBook.id_book}
                  books = {oneBook}
                />
              )
            })}
          </div>} 
          
              
      </section>   

        <div className="trait"></div> 

      <section>   
        <h2 id="categories" className="titre_h2">L'univers BD et Humour</h2>
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
      
    </main>
  )
}


export default Home