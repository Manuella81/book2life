import React, {useState,useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {saveBook, loadBooksByUser, loadCategories,loadAges, loadGenderHumour, loadGenderManga, loadThemeManga, loadBookState} from '../../../api/book'
import axios from 'axios'
import {config} from '../../../config'
import {useSelector, useDispatch} from 'react-redux' 
import {selectUser} from '../../../slices/userSlice'
import {loadBooks} from '../../../slices/bookSlice'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {validateInputField} from "../../../helpers/form-validator";


//Ajout d'une nouvelle BD
const AddBook = (props) =>{
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null) 
    const [author, setAuthor] = useState("") 
    const [releaseDate, setReleaseDate] = useState("") 
    const [editor, setEditor] = useState("") 
    const [numberOfPages, setNumberOfPages] = useState("") 
    const [language, setLanguage] = useState("") 
    const [categories, setCategories] = useState([])
    const [ages, setAges] = useState([])
    const [bookStates, setBookStates] = useState([])
    const [humourGender, setHumourGender] = useState([])
    const [mangaGender, setMangaGender] = useState([])
    const [mangaTheme, setMangaTheme] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    const [selectedAge, setSelectedAge] = useState()
    const [selectedCategorie, setSelecteCategorie] = useState()
    const [selectedHumourGender, setSelectedHumourGender] = useState()
    const [selectedMangaGender, setSelectedMangaGender] = useState()
    const [selectedMangaTheme, setSelectedMangaTheme] = useState()
    const [selectedBookState, setSelectedBookState] = useState();


    useEffect(()=>{
        displayAges()
            displayCategories()
            displayBookState()
            displayHumourGender()
            displayMangaGender()
            displayMangaTheme()
    }, []);

    //on récupère la liste des catégories
    const displayCategories = () =>{
        loadCategories()
        .then((res)=>{
            //console.log(res)
            setCategories(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère la liste des états des livres
    const displayBookState = () =>{
        loadBookState()
        .then((res)=>{
            //console.log(res)
            setBookStates(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère la liste des tranches d'âge de la sous-catégorie jeunesse
    const displayAges = () =>{
        loadAges()
        .then((res)=>{
            //console.log(res)
            setAges(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère la liste des genres de la catégorie Humour
    const displayHumourGender = () =>{
        loadGenderHumour()
        .then((res)=>{
            //console.log(res)
            setHumourGender(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère la liste des genres de la catégorie manga
    const displayMangaGender = () =>{
        loadGenderManga()
        .then((res)=>{
            //console.log(res)
            setMangaGender(res.result)
        })
        .catch(err=>console.log(err)) 
    }

    //on récupère la liste des themes de la catégorie manga
    const displayMangaTheme = () =>{
        loadThemeManga()
        .then((res)=>{
            //console.log(res)
            setMangaTheme(res.result)
        })
        .catch(err=>console.log(err)) 
    }
    
    
    //sauvegarder un livre
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
                id_user: user.infos.id_user,
                id_cat : selectedCategorie,
                id_bookState: selectedBookState,
                id_tri_jeunesse: selectedAge,
                id_tri_humour: selectedHumourGender,
                id_tri_mangaByGender: selectedMangaGender,
                id_tri_mangaByTheme: selectedMangaTheme,
                photo: "no-pict.jpg"
            }
            //console.log(datas)
            saveBook(datas)
            .then((res)=>{
                //console.log(res)
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
                        id_user: user.infos.id_user,
                        id_cat : selectedCategorie,
                        id_bookState: selectedBookState,
                        id_tri_jeunesse: selectedAge,
                        id_tri_humour: selectedHumourGender,
                        id_tri_mangaByGender: selectedMangaGender,
                        id_tri_mangaByTheme: selectedMangaTheme,
                        photo: response.data.url
                    }

                    //console.log(datas)

                    //appel de la fonction de validation de formulaire pour le champ photo. 
                    let photoErr = validateInputField("fichier", "photo", response.data.url)
                
                    if(photoErr !== true){
                        //console.log(emailErr)
                        setError(photoErr)
                        return
                    } 

                    saveBook(datas)
                    .then((res)=>{
                        //console.log(res)
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
        if(title === "" || synopsis === "" || price === "" || author === "" || releaseDate === "" || editor === "" || numberOfPages === "" || language === "" ){
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
        <main>
            <h1 className = "titre_h1">Ajouter une BD</h1>
            {error !== null && <p>{error}</p>}
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

                    {/*Les différents états possible d'un livre*/} 
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Etat du livre</Form.Label>                      
                            {bookStates.length > 0 && 
                            <Form.Select 
                                name="bookState" 
                                id="bookState" 
                                value={selectedBookState} 
                                onChange={(e) => {
                                    //console.log(e.target.value);
                                    e.preventDefault();
                                    setSelectedBookState(e.currentTarget.value);
                                }}
                            >
                                <option value="">-- Etat du livre --</option>
                                {bookStates.map((state)=>{                   
                                    return (                            
                                        <option 
                                            key={state.id_bookState} 
                                            value={state.id_bookState}>
                                                {state.state}
                                        </option>                                            
                                    )                 
                                })}          
                            </Form.Select>}
                    </Form.Group>

                    
                    {/*Les différentes catégories*/} 
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Sélectionnez une catégorie</Form.Label>                      
                            {categories.length > 0 && 
                            <Form.Select 
                                name="categorie" 
                                id="categorie"
                                value={selectedCategorie} 
                                onChange={(e) => {
                                    //console.log(e.target.value);
                                    e.preventDefault();
                                    setSelecteCategorie(e.currentTarget.value);
                                }}
                            >
                                <option value="">-- Catégories --</option>
                                {categories.map((categorie)=>{                   
                                    return (                            
                                        <option 
                                            key={categorie.id_cat} 
                                            value={categorie.id_cat}>
                                                {categorie.name}
                                        </option>                                            
                                    )                 
                                })}          
                            </Form.Select>}
                    </Form.Group>

                    
                    {/*Si la catégorie sélectionnée est "BD jeunesse" on affiche les tranches d'âge de la sous catégorie jeunesse*/} 
                    {selectedCategorie === "1" && <div>  
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledSelect">Sélectionnez une tranche d'âge</Form.Label>                      
                                {/*tri des BDs jeunesse par âge: 6-9 ans et 9-13 ans*/} 
                                {ages.length > 0 && 
                                <Form.Select 
                                    name="jeunesse" 
                                    id="jeunesse" 
                                    value={selectedAge} 
                                    onChange={(e) => {
                                        //console.log(e.target.value);
                                        e.preventDefault();
                                        setSelectedAge(e.currentTarget.value);
                                    }}
                                >
                                    <option value="">-- Ages --</option>
                                    {ages.map((age)=>{                   
                                        return (                            
                                            <option 
                                                key={age.id} 
                                                value={age.id}>
                                                    {age.age}
                                            </option>                                            
                                        )                 
                                    })}          
                                </Form.Select>}
                        </Form.Group>                    
                    </div>}


                    {/*Si la catégorie sélectionnée est "Humour" on affiche les genres de la sous catégorie humour*/} 
                    {selectedCategorie === "3" && <div>  
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledSelect">Sélectionnez un genre</Form.Label>                      
                                {/*tri des BDs humour par genre*/} 
                                {humourGender.length > 0 && 
                                <Form.Select 
                                    name="humour" 
                                    id="humour" 
                                    value={selectedHumourGender} 
                                    onChange={(e) => {
                                        //console.log(e.target.value);
                                        e.preventDefault();
                                        setSelectedHumourGender(e.currentTarget.value);
                                    }}
                                >
                                    <option value="">-- Genres --</option>
                                    {humourGender.map((gender)=>{                   
                                        return (                            
                                            <option 
                                                key={gender.id} 
                                                value={gender.id}>
                                                    {gender.humourGender}
                                            </option>                                            
                                        )                 
                                    })}          
                                </Form.Select>}
                        </Form.Group>                    
                    </div>}


                    {/*Si la catégorie sélectionnée est "Manga" on affiche les genres et les themes des sous catégorie manga*/} 
                    {selectedCategorie === "7" && <div>  
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledSelect">Sélectionnez un genre</Form.Label>                      
                                {/*tri des mangas par genre*/} 
                                {mangaGender.length > 0 && 
                                <Form.Select 
                                    name="manga" 
                                    id="mangaGender" 
                                    value={selectedMangaGender} 
                                    onChange={(e) => {
                                        //console.log(e.target.value);
                                        e.preventDefault();
                                        setSelectedMangaGender(e.currentTarget.value);
                                    }}
                                >
                                    <option value="">-- Genres --</option>
                                    {mangaGender.map((gender)=>{                   
                                        return (                            
                                            <option 
                                                key={gender.id} 
                                                value={gender.id}>
                                                    {gender.gender}
                                            </option>                                            
                                        )                 
                                    })}          
                                </Form.Select>}
                        </Form.Group>  

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledSelect">Sélectionnez un theme</Form.Label>                      
                                {/*tri des mangas par theme*/} 
                                {mangaTheme.length > 0 && 
                                <Form.Select 
                                    name="manga" 
                                    id="mangaTheme" 
                                    value={selectedMangaTheme} 
                                    onChange={(e) => {
                                        //console.log(e.target.value);
                                        e.preventDefault();
                                        setSelectedMangaTheme(e.currentTarget.value);
                                    }}
                                >
                                    <option value="">-- Theme --</option>
                                    {mangaTheme.map((theme)=>{                   
                                        return (                            
                                            <option 
                                                key={theme.id} 
                                                value={theme.id}>
                                                    {theme.theme}
                                            </option>                                            
                                        )                 
                                    })}          
                                </Form.Select>}
                        </Form.Group>                  
                    </div>}

                                        

                    <Button 
                        className="submit-button" 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                    >
                        Enregistrer
                    </Button>
                </form>
        </main>
    )
}

export default AddBook