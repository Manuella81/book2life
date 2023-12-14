import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash, faGears } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectAdmin } from "../slices/adminSlice";


//Footer du site web
const Footer = (props) =>{
    const admin = useSelector(selectAdmin) 
    
    return (
        <footer>            
            <div className="about">
            {admin.isLogged ? (<div>
                <p><Link to="/adminLogout"><FontAwesomeIcon icon={faUserSlash}/> Déconnexion</Link></p>
                <p><Link to="/admin"> Espace administrateur </Link></p>
            </div>
            ) : ( 
                <Link to="/adminLogin"><FontAwesomeIcon icon={faGears} /></Link>
            )} 
                <p><Link to="/privacy-policy">Politique de confidentialité</Link></p>  
                <p><Link to="/termes_and_conditions">Termes et conditions</Link></p> 
                <p><Link to="/platform">Notre plateforme</Link></p>
            </div>
        </footer>
        
    )
}

export default Footer