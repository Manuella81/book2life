import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {config} from '../../config'
import {loadNotValidateBooks} from '../../api/book'
import {useSelector, useDispatch} from 'react-redux' 
import {selectBooks, loadBooks} from '../../slices/bookSlice'
import Table from 'react-bootstrap/Table';


//Espace administrateur avec la liste des livre validate="no"
const Admin = () => {

  const dispatch = useDispatch()
  const books = useSelector(selectBooks) 
  

  useEffect(()=>{
    displayNotValidateBooks()
  })

  //on affiche les livres non validé
  const displayNotValidateBooks = ()=>{
    loadNotValidateBooks()
    .then((response)=>{
        //console.log(response)
        dispatch(loadBooks(response.books))
    })
    .catch(err=>console.log(err))
  }
  
    
    return (
        <main className="admin">
            
            <h1 className='titre_h1'>Bienvenue dans votre espace administrateur</h1>
          
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
                                    <Link to={`/validateBook/${oneBook.id_book}`}>Voir la BD</Link>
                                </td>
                            </tr>
                        }) : <tr>
                            <td colSpan="3"></td>
                        </tr>
                        }
                
                    </tbody>
                </Table>
            
        </main>
    )
}


export default Admin;