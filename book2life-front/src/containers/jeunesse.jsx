import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {loadAges, loadTriJeunesse} from '../api/book'
import SectionBooks from "../components/sectionBooks";
import TemplateCategorie from "../components/templateCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


//Page catégorie Jeunnesse
const Jeunesse = (props)=>{
    
    const [ages, setAge] = useState([])
    const [booksByAge1, setBookByAge1] = useState([])
    const [booksByAge2, setBookByAge2] = useState([])
    const [selected, setSelected] = useState('')
    const id_cat = 1
    const id_tri1 = 1 //6-9 ans
    const id_tri2 = 2//9-13 ans


    useEffect(()=>{
        displayAges()
        displayBooksByAge1()
        displayBooksByAge2()
    }, []);
    

    //on récupère la liste de la sous-catégorie jeunesse(tri_jeunesse dans la bdd)
    const displayAges = () =>{
        loadAges()
        .then((res)=>{
            //console.log(res)
            setAge(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère les livres de la catégorie age: 6-9 ans
    const displayBooksByAge1 = () =>{
        loadTriJeunesse(id_tri1)
        .then((res)=>{
            //console.log(res)
            setBookByAge1(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère les livres de la catégorie age: 9-13 ans
    const displayBooksByAge2 = () =>{
        loadTriJeunesse(id_tri2)
        .then((res)=>{
            //console.log(res)
            setBookByAge2(res.result)
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

            <h1 className="titre_h1">L'univers BD Jeunesse</h1>     

            {/*tri des BDs jeunesse par âge: 6-9 ans et 9-13 ans*/} 
            {ages.length > 0 && <select name="tri_jeunesse" id="tri_jeunesse"value={selected} onChange={handleChange}>
                <option value="">--trier par âge--</option>
                {ages.map((age)=>{                   
                    return (                            
                        <option 
                            key={age.id} 
                            value={age.id}>
                                {age.age}
                        </option>                                            
                    )                 
                })}          
            </select>}

            { selected === "1" &&  <h2 className="titre_h2"> BD Jeunesse 6 - 9 ans </h2> }                          
            {selected === "1" && <div className = "booksCard">           
                {booksByAge1.map((oneBook)=>{
                return (
                    <SectionBooks 
                        key={oneBook.id_book}
                        books = {oneBook}
                    />
                )
                })}
            </div>} 

            { selected === "2" &&  <h2 className="titre_h2"> BD Jeunesse 9 - 13 ans </h2> }                         
            {selected === "2" && <div className = "booksCard">           
                {booksByAge2.map((oneBook)=>{
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
                titre_h2 = {`BDs Jeunesse`}
                all = {<Link to="/allJeunesse">Voir toutes les BD Jeunesse</Link>}
                aroundMe = {`BDs Jeunesse autour de moi`}
                freeBooks = {`BDs Jeunesse gratuits`}
                id_categorie = {id_cat}
            />  
            

        </main>
        
    )
}

export default Jeunesse