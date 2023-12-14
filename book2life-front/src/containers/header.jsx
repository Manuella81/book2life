import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGear, faHeart, faAddressCard, faPowerOff, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import logo from '../assets/logo/logo.png'
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

//Header du site web
const Header = (props) =>{
    const user = useSelector(selectUser) 

    
    return (
        
        <header className="header-nav">

            <nav>

            <Link to="/">
                <div id="logo">
                    <img src={logo} alt = "logo book2life"/>
                    <p id="logo-name">Book2life</p>
                </div>
            </Link>  

                {/*Header mobile*/}
                <div id="nav-mobil">
                    <Link to="/"><FontAwesomeIcon icon={faHouse} /></Link>  
                    <Link to="/about"><FontAwesomeIcon icon={faCircleInfo} /></Link>
                    {/*Si l'utilisateur est connecté le lien 'connexion' devient 'déconnexion'*/}              
                    {user.isLogged ? (
                        <div>
                            <Link to="/favoris"><FontAwesomeIcon icon={faHeart}/></Link>
                            <Link to="/userProfil"><FontAwesomeIcon icon={faAddressCard}/></Link>
                            <Link to="/userAdmin"><FontAwesomeIcon icon={faFolderOpen}/></Link>
                            <Link to="/userLogout"><FontAwesomeIcon icon={faPowerOff}/></Link>
                        </div>
                    ) : ( 
                        <div>
                            <Link to="/userLogin"><FontAwesomeIcon icon={faUserGear} /></Link> 
                        </div> 
                    )}
                </div>

                {/*Header pc tablette*/}
                <div id="nav-pc">
                    <Link to="/"><FontAwesomeIcon icon={faHouse} /> Home</Link> 
                    <Link to="/about"><FontAwesomeIcon icon={faCircleInfo} /> A propos </Link> 
                    {/*Si l'utilisateur est connecté le lien 'connexion' devient 'déconnexion'*/}               
                    {user.isLogged ? (
                        <div>
                            <Link to="/favoris"><FontAwesomeIcon icon={faHeart}/> Favoris</Link>
                            <Link to="/userProfil"><FontAwesomeIcon icon={faAddressCard}/> Mon profil</Link>
                            <Link to="/userAdmin"><FontAwesomeIcon icon={faFolderOpen}/>Admin </Link>
                            <Link to="/userLogout"><FontAwesomeIcon icon={faPowerOff}/></Link>
                        </div>
                        
                    ) : ( 
                        <div>
                            <Link to="/userLogin"><FontAwesomeIcon icon={faUserGear} /> Connexion</Link> 
                        </div>
                    )}
                </div>

            </nav>  
                
        </header>            
       
        
    )
}

export default Header