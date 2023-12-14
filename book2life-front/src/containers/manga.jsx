import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {loadGenderManga, loadThemeManga, loadMangaByGender, loadMangaByTheme} from '../api/book'
import SectionBooks from "../components/sectionBooks";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie Manga
const Manga = (props)=>{
    
    const [genders, setGenders] = useState([])
    const [themes, setThemes] = useState([])

    const [booksByGender1, setBookByGender1] = useState([])
    const [booksByGender2, setBookByGender2] = useState([])
    const [booksByGender3, setBookByGender3] = useState([])
    const [booksByGender4, setBookByGender4] = useState([])
    const [booksByGender5, setBookByGender5] = useState([])
    const [booksByGender6, setBookByGender6] = useState([])
    const [booksByGender7, setBookByGender7] = useState([])

    const [booksByTheme1, setBookByTheme1] = useState([])
    const [booksByTheme2, setBookByTheme2] = useState([])
    const [booksByTheme3, setBookByTheme3] = useState([])
    const [booksByTheme4, setBookByTheme4] = useState([])
    const [booksByTheme5, setBookByTheme5] = useState([])
    const [booksByTheme6, setBookByTheme6] = useState([])
    const [booksByTheme7, setBookByTheme7] = useState([])
    const [booksByTheme8, setBookByTheme8] = useState([])

    const [selectedGender, setSelectedGender] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')
    const id_cat = 7
    const id_gender1 = 1 //Shonen (garçon)
    const id_gender2 = 2 //Shojo (fille)
    const id_gender3 = 3 //Seinen public averti (jeune adulte)
    const id_gender4 = 4 //Kodomo (manga pour enfants)
    const id_gender5 = 5 //Yaoi, yuni (gay et lesbien)
    const id_gender6= 6 //Manga Harem et Ecchi
    const id_gender7 = 7 //Hentaï (érotique)

    const id_theme1 = 1 //manga Arts Martiaux & Baston
    const id_theme2 = 2 //Manga et Gourmets
    const id_theme3 = 3 //Manga Fantastique
    const id_theme4 = 4 //Manga Héroïc-Fantasy
    const id_theme5 = 5 //Manga d'Humour
    const id_theme6= 6 //Manga Policier, Suspense
    const id_theme7 = 7 //Manga Science-Fiction & Cyber-Punk
    const id_theme8 = 8 //Manga Sport

    
    useEffect(()=>{
        displayGender()
        displayTheme()
        displayBooksByGender1()
        displayBooksByGender2()
        displayBooksByGender3()
        displayBooksByGender4()
        displayBooksByGender5()
        displayBooksByGender6()
        displayBooksByGender7()
        displayBooksByTheme1()
        displayBooksByTheme2()
        displayBooksByTheme3()
        displayBooksByTheme4()
        displayBooksByTheme5()
        displayBooksByTheme6()
        displayBooksByTheme7()
        displayBooksByTheme8()
    }, []);
    

    //on récupère la liste de la sous-catégorie genre de manga(tri_mangagender dans la bdd)
    const displayGender = () =>{
        loadGenderManga()
        .then((res)=>{
            //console.log(res)
            setGenders(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère la liste de la sous-catégorie theme de manga(tri_mangatheme dans la bdd)
    const displayTheme = () =>{
        loadThemeManga()
        .then((res)=>{
            //console.log(res)
            setThemes(res.result)
        })
        .catch(err=>console.log(err)) 
    }


    //on récupère les livres de la catégorie manga par genre
    const displayBooksByGender1 = () =>{
        loadMangaByGender(id_gender1)
        .then((res)=>{
            //console.log(res)
            setBookByGender1(res.result)
        })
        .catch(err=>console.log(err)) 
    }
  
    const displayBooksByGender2 = () =>{
        loadMangaByGender(id_gender2)
        .then((res)=>{
            //console.log(res)
            setBookByGender2(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByGender3 = () =>{
        loadMangaByGender(id_gender3)
        .then((res)=>{
            //console.log(res)
            setBookByGender3(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByGender4 = () =>{
        loadMangaByGender(id_gender4)
        .then((res)=>{
            //console.log(res)
            setBookByGender4(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByGender5 = () =>{
        loadMangaByGender(id_gender5)
        .then((res)=>{
            //console.log(res)
            setBookByGender5(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByGender6 = () =>{
        loadMangaByGender(id_gender6)
        .then((res)=>{
            //console.log(res)
            setBookByGender6(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByGender7 = () =>{
        loadMangaByGender(id_gender7)
        .then((res)=>{
            //console.log(res)
            setBookByGender7(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère les livres de la catégorie manga par theme
    const displayBooksByTheme1 = () =>{
        loadMangaByTheme(id_theme1)
        .then((res)=>{
            //console.log(res)
            setBookByTheme1(res.result)
        })
        .catch(err=>console.log(err)) 
    }
  
    const displayBooksByTheme2 = () =>{
        loadMangaByTheme(id_theme2)
        .then((res)=>{
            //console.log(res)
            setBookByTheme2(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByTheme3 = () =>{
        loadMangaByTheme(id_theme3)
        .then((res)=>{
            //console.log(res)
            setBookByTheme3(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByTheme4 = () =>{
        loadMangaByTheme(id_theme4)
        .then((res)=>{
            //console.log(res)
            setBookByTheme4(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByTheme5 = () =>{
        loadMangaByTheme(id_theme5)
        .then((res)=>{
            //console.log(res)
            setBookByTheme5(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByTheme6 = () =>{
        loadMangaByTheme(id_theme6)
        .then((res)=>{
            //console.log(res)
            setBookByTheme6(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByTheme7 = () =>{
        loadMangaByTheme(id_theme7)
        .then((res)=>{
            //console.log(res)
            setBookByTheme7(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    const displayBooksByTheme8 = () =>{
        loadMangaByTheme(id_theme8)
        .then((res)=>{
            //console.log(res)
            setBookByTheme8(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //constante qui permet de récupérer la value dans le select
    const handleChangeGender = event => {
        //console.log(event.target.value);
        setSelectedGender(event.target.value);
    }

    const handleChangeTheme = event => {
        //console.log(event.target.value);
        setSelectedTheme(event.target.value);
    }
    
    
    return (
        <main id='manga'>
            <Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>
            
            <h1 className="titre_h1">L'univers Manga</h1>     

            {/*tri des BDs Manga par genre en fonction de l'id du genre sélectionné*/} 

            {genders.length > 0 && <div><select className="tri" name="tri_mangaGender" id="tri_mangaGender"value={selectedGender} onChange={handleChangeGender}>
                <option value="">--trier par genre--</option>
                {genders.map((gender)=>{                   
                    return (                            
                        <option 
                            key={gender.id} 
                            value={gender.id}>
                                {gender.gender}
                        </option>                                            
                    )                 
                })}          
            </select></div>}

            { selectedGender === "1" &&  <h2 className="titre_h2"> Genre: Shonen (garçon) </h2> }                          
            {selectedGender === "1" && <div className = "booksCard">           
                {booksByGender1.map((oneBook)=>{
                    return (
                        <SectionBooks 
                            books = {oneBook}
                        />
                    )
                })}
            </div>}

            { selectedGender === "2" &&  <h2 className="titre_h2"> Genre: Shojo (fille) </h2> }                          
            {selectedGender === "2" && <div className = "booksCard">           
                {booksByGender2.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>} 

            { selectedGender === "3" &&  <h2 className="titre_h2"> Genre: Seinen public averti (jeune adulte) </h2> }                          
            {selectedGender === "3" && <div className = "booksCard">           
                {booksByGender3.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>} 

            { selectedGender === "4" &&  <h2 className="titre_h2"> Genre: Kodomo (manga pour enfants)</h2> }                          
            {selectedGender === "4" && <div className = "booksCard">           
                {booksByGender4.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>} 

            { selectedGender === "5" &&  <h2 className="titre_h2"> Genre: Yaoi, yuni (gay et lesbien)</h2> }                          
            {selectedGender === "5" && <div className = "booksCard">           
                {booksByGender5.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>} 

            { selectedGender === "6" &&  <h2 className="titre_h2"> Genre: Manga Harem et Ecchi</h2> }                          
            {selectedGender === "6" && <div className = "booksCard">           
                {booksByGender6.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedGender === "7" &&  <h2 className="titre_h2"> Genre: 	Hentaï (érotique)</h2> }                          
            {selectedGender === "7" && <div className = "booksCard">           
                {booksByGender7.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}


            
            {/*tri des BDs Manga par genre en fonction de l'id du theme sélectionné*/} 

            {themes.length > 0 && <div><select className="tri" name="tri_mangaTheme" id="tri_mangaTheme"value={selectedTheme} onChange={handleChangeTheme}>
                <option value="">--trier par theme--</option>
                {themes.map((theme)=>{                   
                    return (                            
                        <option 
                            key={theme.id} 
                            value={theme.id}>
                                {theme.theme}
                        </option>                                            
                    )                 
                })}          
            </select></div>}

            { selectedTheme === "1" &&  <h2 className="titre_h2"> Genre: manga Arts Martiaux et Baston </h2> }                          
            {selectedTheme === "1" && <div className = "booksCard">           
                {booksByTheme1.map((oneBook)=>{
                {return (
                    <SectionBooks
                        key={oneBook.id_book} 
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "2" &&  <h2 className="titre_h2"> Genre: Manga et Gourmets </h2> }                          
            {selectedTheme === "2" && <div className = "booksCard">           
                {booksByTheme2.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "3" &&  <h2 className="titre_h2"> Genre: Manga Fantastique </h2> }                          
            {selectedTheme === "3" && <div className = "booksCard">           
                {booksByTheme3.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "4" &&  <h2 className="titre_h2"> Genre: Manga Héroïc-Fantasy </h2> }                          
            {selectedTheme === "4" && <div className = "booksCard">           
                {booksByTheme4.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "5" &&  <h2 className="titre_h2"> Genre: Manga d'Humour </h2> }                          
            {selectedTheme === "5" && <div className = "booksCard">           
                {booksByTheme5.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "6" &&  <h2 className="titre_h2"> Genre: Manga Policier, Suspense </h2> }                          
            {selectedTheme === "6" && <div className = "booksCard">           
                {booksByTheme6.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "7" &&  <h2 className="titre_h2"> Genre: Manga Science-Fiction et Cyber-Punk </h2> }                          
            {selectedTheme === "7" && <div className = "booksCard">           
                {booksByTheme7.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}

            { selectedTheme === "8" &&  <h2 className="titre_h2"> Genre: Manga Sport </h2> }                          
            {selectedTheme === "8" && <div className = "booksCard">           
                {booksByTheme8.map((oneBook)=>{
                {return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )}
                })}
            </div>}
           
                
            <div className="trait"></div>   

            <TemplateCategorie 
                titre_h2 = {`Manga`}
                all = {<Link to="/allManga">Voir tout les Mangas</Link>}
                aroundMe = {`Mangas autour de moi`}
                freeBooks = {`Mangas gratuits`}
                id_categorie = {id_cat}
            />   
    
        </main>
        
    )
}

export default Manga