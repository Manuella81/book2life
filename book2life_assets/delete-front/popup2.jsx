import React, {useState, useEffect} from 'react'


const PopUp = (props) =>{
    return (
        <div>
            {props.isPopUp && <div className="popUp">
                <p
                    className="closePopUp"
                    onClick={(e)=>{
                        props.onClickClose()
                    }}
                >
                    X
                </p>
                <h4>Félicitations</h4>
                <p>{props.msg}</p>
                <img src={props.img} />
                <button
                    className="closePopUp"
                    onClick={(e)=>{
                        props.onClickClose()
                    }}
                >
                    Retour aux BDs
                </button>
            </div>}
        </div>
    )
}

export default PopUp