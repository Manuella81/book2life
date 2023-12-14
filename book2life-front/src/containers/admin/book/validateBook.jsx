import React, {useState, useEffect} from "react"
import { Link, useParams, Navigate } from "react-router-dom";
import {loadBook, validateBook,deleteBookAdmin} from '../../../api/book'
import {config} from '../../../config'
import {useSelector} from 'react-redux' 
import { selectAdmin } from "../../../slices/adminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


//Page qui permet à l'administrateur de valider la publication d'une BD
const ValidateBook = (props) =>{
    const params = useParams()
    const [book, setBook] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const admin = useSelector(selectAdmin) 

    useEffect(()=>{
        loadBook(params.id_book)
        .then((res)=>{
            //console.log(res)
            setBook(res.result)
        })
        .catch(err=>console.log(err)) 
    });
    
    
    


    //validation d'une BD
    const onClickValidate = ()=>{
        confirmAlert({
        title: 'Confirmez pour valider',
        message: 'Etes vous sûre de vouloir valider la BD.',
        buttons: [
            {
            label: 'Oui',
            onClick: () => validateBook(params.id_book)
                            .then((res)=>{
                                //console.log(res)
                                setRedirect(true)
                            })
                            .catch(err=>console.log(err)) 
            },
            {
            label: 'Non',
            onClick: () => <Navigate to="/validateBook" />
            }
        ]
        });
    }

    //suppression d'une livre
    const onClickDeleteBook = ()=>{
        confirmAlert({
        title: 'Confirmez pour supprimer',
        message: 'Etes vous sûre de vouloir supprimer la BD.',
        buttons: [
            {
            label: 'Oui',
            onClick: () => deleteBookAdmin(params.id_book)
                            .then((res)=>{
                                //console.log(res)
                                setRedirect(true)
                            })
                            .catch(err=>console.log(err)) 
            },
            {
            label: 'Non',
            onClick: () => <Navigate to="/validateBook" />
            }
        ]
        });
    }


    if(redirect){
        return <Navigate to="/admin" />
    }


    return (
        <main className="bloc_details">   
            {admin.isLogged ? (<div>
                <Link to="/admin"><FontAwesomeIcon icon={faArrowLeftLong} /> Retour à l'espace administrateur </Link>
                
                <h1 className="titre_h1"> Détails </h1>

                {book !== null && <article className="details">
                    <div className="details_left">
                        <h2 className="titre_h2">{book.title}</h2>
                        <img src={config.pict_url+book.photo} alt = "couverture de BD"/>
                        <p>prix: {book.price} €</p>
                        <p>Etat: {book.state}</p>
                    </div>

                    <div className="details_right">
                        <p>Email du vendeur: {book.email}</p>
                        <div>
                            <h3 className="titre_h3">Résumé</h3>
                            <p className="resume">{book.synopsis}</p>
                        </div>
                        <div>
                            <h3 className="titre_h3">Caractéristiques</h3>
                            <div className="caracteristiques">
                                <p>Date de parution: {book.releaseDate}</p>
                                <p>Auteur(s): {book.author}</p>
                                <p>Collection: {book.editor}</p>
                                <p>Nombre de page: {book.numberOfPages}</p>
                                <p>validé: {book.validate}</p>
                                <p>catégorie: {book.name}</p>
                                <div>
                                
                                {book.id_cat === '3' ?
                                        <p>humour genre : {book.humourGender}</p>
                                    : book.id_cat === '1' ?
                                        <p>tranche d'âge jeunesse: {book.age}</p>
                                    : book.id_cat === '7' ?
                                        (<div><p>manga genre: {book.gender}</p>
                                        <p>manga theme: {book.theme}</p></div>)
                                    : <p>pas de sous-catégorie</p>
                                }
                           
                                </div>                            
                            </div>
                        </div>
                    </div>                            
                </article>}

                <button 
                    className="validateBD"
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickValidate(book.id_book)  
                    }}
                >
                    valider la BD
                </button>

                <button 
                    className="deleteBD"
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickDeleteBook(book.id_book)  
                    }}
                >
                    supprimer la BD
                </button>                
            </div>) : ( 
                <Navigate to="/adminLogin" />
            )}     
        </main>
        
    )
}

export default ValidateBook