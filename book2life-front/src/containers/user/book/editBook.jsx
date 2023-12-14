import React, {useState,useEffect} from 'react'
import { Navigate} from "react-router-dom";
import {config} from '../../../config'
import axios from 'axios'
import {loadBooksByUser, updateBook, loadBook} from '../../../api/book'
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import {loadBooks} from '../../../slices/bookSlice'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {validateInputField} from "../../../helpers/form-validator";


//Mise à jour d'une BD
const EditBook = (props) =>{
    const user = useSelector(selectUser) 
    const dispatch = useDispatch()
    const id_book = props.params.id_book

    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null) 
    const [author, setAuthor] = useState("") 
    const [releaseDate, setReleaseDate] = useState("") 
    const [editor, setEditor] = useState("") 
    const [numberOfPages, setNumberOfPages] = useState("") 
    const [language, setLanguage] = useState("") 
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
   
    
    
    useEffect(()=>{
        loadBook(id_book)
        .then((res)=>{
            //console.log(res)
            setTitle(res.result.title)
            setSynopsis(res.result.synopsis)
            setPrice(res.result.price)
            setAuthor(res.result.author)
            setReleaseDate(res.result.releaseDate)
            setEditor(res.result.editor)
            setNumberOfPages(res.result.numberOfPages)
            setLanguage(res.result.language)
        })
        .catch(err=>console.log(err))        
    }, [])


   //sauvegarder une BD
   const saveCompleteBook = () =>{
        //appel de la fonction de validation de formulaire pour le champ synopsis. 
        let synopsisErr = validateInputField("Résumé", "synopsis", synopsis)
            
        if(synopsisErr !== true){
            //console.log(emailErr)
            setError(synopsisErr)
            return
        } 

        if(selectedFile === null){
            let datas = {
                title: title,
                synopsis: synopsis,
                price: price,
                author: author,
                releaseDate: releaseDate,
                editor: editor,
                numberOfPages: numberOfPages,
                language: language,
                photo: "no-pict.jpg",
            }

            updateBook(datas, id_book)
            .then((res)=>{
                loadBooksByUser(user.infos.id_user)
                .then((response)=>{
                    dispatch(loadBooks(response.books))
                    setRedirect(true)
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }else{
            let formData = new FormData()
            formData.append('image', selectedFile)
            
            axios({
                method: "post",
                url: `${config.api_url}/api/v1/book/pict`,
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
            .then((response)=>{
                if(response.data.status === 200){
                    let datas = {
                        title: title,
                        synopsis: synopsis,
                        price: price,
                        author: author,
                        releaseDate: releaseDate,
                        editor: editor,
                        numberOfPages: numberOfPages,
                        language: language,
                        photo: response.data.url
                    }

                    //appel de la fonction de validation de formulaire pour le champ photo. 
                    let photoErr = validateInputField("fichier", "photo", response.data.url)
            
                    if(photoErr !== true){
                        //console.log(emailErr)
                        setError(photoErr)
                        return
                    } 

                    updateBook(datas, id_book)
                    .then((res)=>{
                        loadBooksByUser(user.infos.id_user)
                        .then((response)=>{
                            dispatch(loadBooks(response.books))
                            setRedirect(true)
                        })
                        .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err))
                }
            })
            .catch(err=>console.log(err))
        }
    }

    
    const onSubmitForm = ()=>{
        if(title === "" || synopsis === "" || price === "" || author === "" || releaseDate === "" || editor === "" || numberOfPages === "" || language === ""){
            setError("Tous les champs ne sont pas encore remplis!")
        }else if(isNaN(price)){
            setError("Le champs prix doit être un chiffre!")
        }else{
            saveCompleteBook()
        }
    }
    
    if(redirect){
        return <Navigate to="/userAdmin" />
    }

    
    return (
        <main className="group-form form-editBook">
            <h1 className="titre_h1"> Modifier une BD </h1>
            {error !== null && <p>{error}</p>}

            <div className="form">            
                {/*Formulaire bootstrap de connection utilisateur*/}
                <form
                    className="form-log"
                    onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitForm();
                }}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                            type="text"
                            name="tile"
                            size="lg"
                            defaultValue={title}
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">       
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                            type="file"
                            size="lg"
                            onChange={(e) => {
                                setFile(e.currentTarget.files[0]);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Résumé</Form.Label>
                        <Form.Control
                            type="text"
                            name="synopsis"
                            size="lg"
                            defaultValue={synopsis}
                            onChange={(e) => {
                                setSynopsis(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Auteur</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            size="lg"
                            defaultValue={author}
                            onChange={(e) => {
                                setAuthor(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>date de publication</Form.Label>
                        <Form.Control
                            type="text"
                            name="releaseDate"
                            size="lg"
                            value={releaseDate}
                            onChange={(e) => {
                                setReleaseDate(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Editeur</Form.Label>
                        <Form.Control
                            type="text"
                            name="editor"
                            size="lg"
                            defaultValue={editor}
                            onChange={(e) => {
                                setEditor(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Langue</Form.Label>
                        <Form.Control
                            type="text"
                            name="language"
                            size="lg"
                            defaultValue={language}
                            onChange={(e) => {
                                setLanguage(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de pages</Form.Label>
                        <Form.Control
                            type="text"
                            name="numberOfPages"
                            size="lg"
                            defaultValue={numberOfPages}
                            onChange={(e) => {
                                setNumberOfPages(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Prix en euros</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            size="lg"
                            defaultValue={price}
                            onChange={(e) => {
                                setPrice(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Button 
                        className="submit-button" 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                    >
                        Enregistrer
                    </Button>
                </form>
                    
            </div>

        </main>
        
    )
}

export default EditBook