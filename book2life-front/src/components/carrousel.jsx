import React, {useState, useEffect} from 'react'
import {loadLastBooks} from '../api/book'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import {config} from '../config'


const Carrousel = (props)=>{

    const [slides, setSlides] = useState([]) 
               
    const [timer, setTimer] = useState(null)
    const [numero, setNumero] = useState(0)
    
    const getRandomInteger = (min, max) =>{
	    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    //défilement aléatoire des BDs
    const randomImg = ()=>{
        let index;
        do{
            index = getRandomInteger(0, slides.length -1)
        }while(index === numero)
        
        setNumero(index)
    }
    
    //gère le bouton play 
    const play = ()=>{        
        if(timer === null){
            setTimer(setInterval(()=>{
                randomImg()
            }, 2000))
        }
    }

    //gère le bouton pause
    const pause = ()=>{        
        if(timer !== null){
            setTimer(clearInterval(timer))
            setTimer(null)
        }
    }

    useEffect(()=>{
        displayBooks()
      },[])
    
      //on récupère la liste des derniers livres
      const displayBooks = (props) =>{       
        loadLastBooks()
        .then((res)=>{
            //console.log(res)
            setSlides(res.books)
        })
        .catch(err=>console.log(err))      
      }



    
    return (
        <div>
            <div className='bloc_slider'>
                <div className='slide-buttons'>
                    <FontAwesomeIcon className='icon' icon={faChevronLeft}
                        onClick={(e)=>{
                            if((numero - 1) < 0){
                                setNumero(slides.length - 1)
                            }else{
                                setNumero(numero -1)
                            }
                        }}
                    />
                                
                    <FontAwesomeIcon className='icon' icon={faPlay}
                        onClick={play}
                    />
                    
                    <FontAwesomeIcon className='icon' icon={faPause}
                        onClick={pause}
                    />
                                
                    <FontAwesomeIcon className='icon' icon={faChevronRight} 
                        onClick={(e)=>{
                            if((numero +1) === slides.length){
                                setNumero(0)
                            }else{
                                setNumero(numero + 1)
                            }
                        }}
                    />
                </div>
                        
                             
                {slides.length > 0 && <figure className = "slide">                    
                    <img src={config.pict_url+slides[numero].photo} alt="couverture BD"/>                             
                    <figcaption className='caption'>{slides[numero].title}</figcaption>                                      
                </figure>}                    
                
            </div>

        </div>
    )
    
}

export default Carrousel