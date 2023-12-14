import React, {useState, useEffect} from 'react'
import { useParams, Navigate } from "react-router-dom";
import SectionBooks from "../../components/sectionBooks";
import {saveMessage, loadBook} from '../../api/book'
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import {validateInputField} from "../../helpers/form-validator";




const SendMessage = (props) =>{   
    const [contents, setContents] = useState([])
    const [email, setEmail] = useState([])
    const user = useSelector(selectUser) 
    const params = useParams()
    const id_book = params.id_book
    const [redirect, setRedirect] = useState(false)
    const [book, setBook] = useState(null)
    const [error, setError] = useState(null);

    useEffect(()=>{
        loadBook(id_book)
        .then((res)=>{
            //console.log(res)
            setBook(res.result)
        })
        .catch(err=>console.log(err)) 
    });
      

    const onSubmitForm = () => {

        //appel de la fonction de validation de formulaire pour le champs email. 
        let emailErr = validateInputField("Email", "email", email)
    
        if(emailErr !== true){
            //console.log(emailErr)
            setError(emailErr)
            return
        }

        //appel de la fonction de validation de formulaire pour le champs textarea. 
        let contentsErr = validateInputField("Message", "contents", contents)
    
        if(contentsErr !== true){
            //console.log(emailErr)
            setError(contentsErr)
            return
        }
         
        const datas = {
            buyerName: user.infos.nickName,  
            bookTitle: book.title,  
            contents: contents,  
            email: email,   
            sellerEmail: book.email,
            id_user: user.infos.id_user,
            id_book: id_book
        };
        
        saveMessage(datas)
        .then((res)=>{
            //console.log(res)
            setContents(res.messages)
            setRedirect(true)
        })
        .catch(err=>console.log(err)) 
    }

    if(redirect){
        return <Navigate to="/" />
    }


    return (
        <main>  

            {book !== null && <div className="details">
                <div className = "booksCard">
                <SectionBooks 
                    books = {book}
                    /> 
                </div>
            </div>}  

            <h2 className='titre_h2'>Envoyer un message au vendeur de cette BD</h2> 

            {error !== null && <p>{error}</p>}
            <form
                className='formSendMessage'
                onSubmit={(e) => {
                e.preventDefault();
                onSubmitForm();
                }}
            >
                <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Votre email"
                    onChange={(e)=>{
                        setEmail(e.currentTarget.value)
                    }}
                />
                </Form.Group>
        
                <Form.Group className="mb-3">
                    <Form.Control 
                        as="textarea" 
                        size="lg"
                        placeholder="Votre message"
                        rows="5" cols="37"
                        onChange={(e) => {
                            setContents(e.currentTarget.value);
                        }}
                    />
                </Form.Group>

                <div>
                    <input type="submit" value="Envoyer" />
                </div>
            </form>   
            
        </main>
        
    )
}

export default SendMessage