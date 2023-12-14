import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from 'react-responsive'
import SectionBooks from "./sectionBooks";


const Slider = (props)=>{
    
    const [min, setMin] = useState(0)
    const [minDesktop, setMinDesktop] = useState(0)
    const [max, setMax] = useState(1)
    const [maxDesktop, setMaxDesktop] = useState(3)  
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    
    //constantes qui permettent d'afficher 2 BDs avec la possibilité de faire défiler 
    const onClickPrev = ()=>{
        if(min >= 1 || minDesktop >= 3){
            setMin(min - 1)
            setMax(max - 1)            
        }

        if(minDesktop >= 3){                       
            setMinDesktop(minDesktop - 3)
            setMaxDesktop(maxDesktop - 3)
        }
    }
    
    const onClickNext = ()=>{
        if(max < props.books.length || maxDesktop < props.books.length){
            setMin(min + 1)
            setMax(max + 1)              
        }

        if( maxDesktop < props.books.length){          
            setMinDesktop(minDesktop + 3)
            setMaxDesktop(maxDesktop + 3)           
        }
    }


    return (
        <div >
            <div className="booksCard">   
                    {props.books.map((oneBook, index)=>{
                        if(isMobile && index >= min && index < max){                            
                            return (                                   
                                <SectionBooks 
                                    key={oneBook.id_book}
                                    books = {oneBook}
                                />                                 
                            )
                        }

                        if(isDesktop && index >= minDesktop && index < maxDesktop){                           
                            return (
                                <SectionBooks 
                                    key={oneBook.id_book}
                                    books = {oneBook}
                                />  
                            )
                        } 
                        return null;       
                    })}  
            </div> 

            
            <div className="prevNext_buttons">
                <FontAwesomeIcon className='icon' icon={faChevronLeft}
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickPrev()
                    }}
                />

                <FontAwesomeIcon className='icon' icon={faEllipsis} />
                
                <FontAwesomeIcon className='icon' icon={faChevronRight} 
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickNext()
                    }}
                />
            </div> 
        </div> 
    )
}

export default Slider