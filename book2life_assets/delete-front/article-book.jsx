import React, {useState, useEffect} from 'react'
import {config} from '../config'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
//import PopUp from './popup'

import {useSelector, useDispatch} from 'react-redux' 
import {selectFavoris, modifyFavoris} from '../slices/favoriSlice'

const ArticleDetail = (props)=>{
    
    const favoris = useSelector(selectFavoris)
    const dispatch = useDispatch() 
    
    const [error, setError] = useState(null)
    //const [isPopUp, setPopUp] = useState(false)
    
    //console.log(props.book)
    
    const onClickFavoris = (oldList, newBook) =>{        
        
        let newList = JSON.parse(JSON.stringify(oldList))
        console.log(newList)
        let same = newList.favoris.findIndex((b) => b.id_book === newBook.id_book)
        //console.log(same)
        if(same === -1){
            let myBook = JSON.parse(JSON.stringify(newBook))

            let myFavoris = [...newList.favoris, myBook]
            let lsFavoris = JSON.stringify(myFavoris)
            window.localStorage.setItem('book2life-favoris', lsFavoris)
            dispatch(modifyFavoris(myFavoris))
        }else{
            //console.log(newList.favoris[same])
            let lsFavoris = JSON.stringify(newList)
            window.localStorage.setItem('book2life-favoris', lsFavoris)
            dispatch(modifyFavoris(newList))
        }
        //setPopUp(true)
           
    } 
    
    return (
        <li >
            {/*popup*/}
            {/*<PopUp 
                isPopUp={isPopUp}
                msg={`Vous avez ajouté: ${quantity} bières dans votre panier`}
                onClickClose={(e)=>{
                    setPopUp(false)
                    setQuantity("")
                }}
            />*/}
           
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                }}
            >
                
                <div 
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickFavoris(favoris, props.book)
                    }}
                >
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </div>
            </form>
            
            
        </li>
    )
}

export default ArticleDetail