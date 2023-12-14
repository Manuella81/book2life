import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {loadGenderHumour, loadTriHumour} from '../api/book'
import SectionBooks from "../components/sectionBooks";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie Humour
const Humour = (props)=>{
    
    const [genders, setGender] = useState([])
    const [booksByGender1, setBookByGender1] = useState([])
    const [booksByGender2, setBookByGender2] = useState([])
    const [booksByGender3, setBookByGender3] = useState([])
    const [booksByGender4, setBookByGender4] = useState([])
    const [booksByGender5, setBookByGender5] = useState([])

    const [selected, setSelected] = useState('')
    const id_cat = 3
    const id_gender1 = 1 //Dessinateur de presse
    const id_gender2 = 2 //BD humour politique
    const id_gender3 = 3 //Guide BD humour
    const id_gender4 = 4 //BD humour adulte
    const id_gender5 = 5 //BD humour jeunesse


    
    useEffect(()=>{
        displayGender()
        displayBooksByGender1()
        displayBooksByGender2()
        displayBooksByGender3()
        displayBooksByGender4()
        displayBooksByGender5()
    }, []);
    

    //on récupère la liste de la sous-catégorie humour(tri_humour dans la bdd)
    const displayGender = () =>{
        loadGenderHumour()
        .then((res)=>{
            //console.log(res)
            setGender(res.result)
        })
        .catch(err=>console.log(err)) 
    }


    //on récupère les livres de la catégorie humour: Dessinateur de presse
    const displayBooksByGender1 = () =>{
        loadTriHumour(id_gender1)
        .then((res)=>{
            //console.log(res)
            setBookByGender1(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère les livres de la catégorie humour: humour politique
    const displayBooksByGender2 = () =>{
        loadTriHumour(id_gender2)
        .then((res)=>{
            //console.log(res)
            setBookByGender2(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    
    //on récupère les livres de la catégorie humour: Guide BD humour
    const displayBooksByGender3 = () =>{
        loadTriHumour(id_gender3)
        .then((res)=>{
            //console.log(res)
            setBookByGender3(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère les livres de la catégorie humour: BD humour adulte
    const displayBooksByGender4 = () =>{
        loadTriHumour(id_gender4)
        .then((res)=>{
            //console.log(res)
            setBookByGender4(res.result)
        })
        .catch(err=>console.log(err)) 
    }

      //on récupère les livres de la catégorie humour: BD humour jeunesse
      const displayBooksByGender5 = () =>{
        loadTriHumour(id_gender5)
        .then((res)=>{
            //console.log(res)
            setBookByGender5(res.result)
        })
        .catch(err=>console.log(err)) 
    }


    //constante qui permet de récupérer la value dans le select
    const handleChange = event => {
        //console.log(event.target.value);
        setSelected(event.target.value);
    }
    
    
    return (
        <main id='jeunesse'>
            
            <Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>

            <h1 className="titre_h1">L'univers BD Humour</h1>     

            {/*tri des BDs Humour par genre en fonction de l'id du genre sélectionné*/} 

            {genders.length > 0 && <select name="tri_humour" id="tri_humour"value={selected} onChange={handleChange}>
                <option value="">--trier par genre--</option>
                {genders.map((gender)=>{                   
                    return (                            
                        <option 
                            key={gender.id} 
                            value={gender.id}>
                                {gender.humourGender}
                        </option>                                            
                    )                 
                })}          
            </select>}

            { selected === "1" &&  <h2 className="titre_h2"> Genre: Dessinateur de presse </h2> }                          
            {selected === "1" && <div className = "booksCard">           
                {booksByGender1.map((oneBook)=>{
                    return (
                        <SectionBooks 
                            key={oneBook.id_book}
                            books = {oneBook}
                        />
                    )
                })}
            </div>}

            { selected === "2" &&  <h2 className="titre_h2"> Genre: BD humour politique </h2> }                          
            {selected === "2" && <div className = "booksCard">           
                {booksByGender2.map((oneBook)=>{
                    return (
                        <SectionBooks 
                            key={oneBook.id_book}
                            books = {oneBook}
                        />
                    )
                })}
            </div>} 

            { selected === "3" &&  <h2 className="titre_h2"> Genre: Guide BD humour </h2> }                          
            {selected === "3" && <div className = "booksCard">           
                {booksByGender3.map((oneBook)=>{
                    return (
                        <SectionBooks
                            key={oneBook.id_book} 
                            books = {oneBook}
                        />
                    )
                })}
            </div>} 

            { selected === "4" &&  <h2 className="titre_h2"> Genre: BD humour adulte </h2> }                          
            {selected === "4" && <div className = "booksCard">           
                {booksByGender4.map((oneBook)=>{
                    return (
                        <SectionBooks 
                            key={oneBook.id_book}
                            books = {oneBook}
                        />
                    )
                })}
            </div>} 

            { selected === "5" &&  <h2 className="titre_h2"> Genre: BD humour jeunesse</h2> }                          
            {selected === "5" && <div className = "booksCard">           
                {booksByGender5.map((oneBook)=>{
                    return (
                        <SectionBooks 
                            key={oneBook.id_book}
                            books = {oneBook}
                        />
                    )
                })}
            </div>} 
           
                
            <div className="trait"></div>   


            <TemplateCategorie 
                titre_h2 = {`BDs Humour`}
                all = {<Link to="/allHumour">Voir toutes BD Humour</Link>}
                aroundMe = {`BDs Humour autour de moi`}
                freeBooks = {`BDs Humour gratuits`}
                id_categorie = {id_cat}
            /> 
            

        </main>
        
    )
}

export default Humour