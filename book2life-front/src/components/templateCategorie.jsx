import React, {useState, useEffect} from 'react'
import {loadBooksByCat, loadBooksByLocationAndCat, loadLastFreeBooksByCat} from '../api/book'
import SectionBooks from "../components/sectionBooks";
import Slider from "../components/slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


//Page catégorie 
const TemplateCategorie = (props)=>{
    
    const [books, setBooks] = useState([])
    const [booksLocation, setBooksLocation] = useState([])
    const [freeBooks, setFreeBooks] = useState([])
    const [location, setLocation] = useState("")


    useEffect(()=>{
        displayBooks()
        displayFreeBooks()
    });
    

    //on récupère les livres de la catégorie 
    const displayBooks = () =>{
        loadBooksByCat(props.id_categorie)
        .then((res)=>{
            //console.log(res)
            setBooks(res.books)
        })
        .catch(err=>console.log(err)) 
    }


    //appel de la fonction de récupération des livres dans l'api en fonction de la recherche par lieu et catégorie
    const searchByLocation = ()=>{
        loadBooksByLocationAndCat(location, props.id_categorie)
        .then((res)=>{
        //console.log(res)
        setBooksLocation(res.result)
        })
    }

    //appel de la fonction de récupération des livres gratuits
    const displayFreeBooks = ()=>{
        loadLastFreeBooksByCat(props.id_categorie)
        .then((res)=>{
        //console.log(res)
        setFreeBooks(res.books)
        })
    }

 
    return (
        <main id='jeunesse'>

            <p>{props.accueil}</p>

            <h1 className="titre_h1">{props.titre_h1}</h1>     

            {/*rubrique par catégorie*/}     
            <section className='bloc bdGraphiques'>    
                <h2 className="titre_h2">{props.titre_h2}</h2> 
                {books.length > 0 && <div>                   
                    <Slider
                        books = {books} 
                    />                               
                </div>}
    
                <p className="all">{props.all}</p>
            </section>


            <div className="trait"></div> 


            {/*rubrique BDs autour de moi*/}    
            <section>      
                <div className='bloc bdAroundMe'>
                    <h2 className="titre_h2">{props.aroundMe}</h2> 
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
                                    id="location"
                                    placeholder="Entrez une ville, un CP ..."
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

                        
                {/*on affiche la liste des livres récupéré grâce à la localisation*/}
                {booksLocation.length > 0 && <h2 className="titre_h2">Liste des livres</h2>}
                {booksLocation.length > 0 && <div className = "booksCard">
                    {booksLocation.map((oneBook)=>{
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
            

            {/*rubrique BDs gratuits*/}            
            <section className='freeBd'>
                <h2 className="titre_h2">{props.freeBooks}</h2> 
                {freeBooks.length > 0 && <div className = "booksCard">
                {freeBooks.map((oneBook)=>{
                return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )
                })}
                </div>} 
            </section>

        </main>
        
    )
}

export default TemplateCategorie