import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {config} from '../../config'
import {deleteBook, loadBooksByUser} from '../../api/book'
import {useSelector, useDispatch} from 'react-redux' 
import {selectUser} from '../../slices/userSlice'
import {selectBooks, loadBooks} from '../../slices/bookSlice'
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


//Page admin d'un utilisateur qui affiche tous ses livres enregistrés
const UserAdmin = (props) =>{
    const dispatch = useDispatch()
    const books = useSelector(selectBooks) 
    const user = useSelector(selectUser)

    //récupération des livres d'un utilisateur
    useEffect(()=>{
        displayBooksByUser()
    })

    const displayBooksByUser = ()=>{
        loadBooksByUser(user.infos.id_user)
        .then((res)=>{
            //console.log(res)
            dispatch(loadBooks(res.books))
        })
        .catch(err=>console.log(err)) 
    }
    
    //suppression d'une livre
    const onClickDeleteBook = (id_book)=>{
        deleteBook(id_book)
        .then((res)=>{
            //console.log(res)
            //on recharge les livres qui viennent d'être mises à jour
            displayBooksByUser(res.books)
        })
        .catch(err=>console.log(err)) 
    }

  
    
    return (
        <main className="admin" >
            
            <h1 className='titre_h1'>Administration</h1>
            <section>
                <p className="addBook"><Link to="/addBook"><FontAwesomeIcon icon={faPlusCircle}/> Ajouter une BD</Link></p>
                    <h2 className='titre_h2'>Mes BDs</h2>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.books.length > 0 ? books.books.map((oneBook)=>{
                            return <tr key={oneBook.id_book}>
                                <td><img className="small_pict" src={config.pict_url+oneBook.photo} alt="couverture de BD"/></td>
                                <td>{oneBook.title}</td>
                                <td className="edit_delete">
                                    <p>validé: {oneBook.validate}</p>
                                    <Link to={`/editBook/${oneBook.id_book}`}>modifier</Link>
                                    <button 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            onClickDeleteBook(oneBook.id_book)  
                                        }}
                                    >
                                        supprimer
                                    </button>
                                </td>
                            </tr>
                        }) : <tr>
                            <td colSpan="3"></td>
                        </tr>
                        }
                    </tbody>
                </Table>
            </section>
        </main>
    )
}

export default UserAdmin