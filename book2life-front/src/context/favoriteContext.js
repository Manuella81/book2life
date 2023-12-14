import React, { useState, createContext } from "react";

//création de l'environnement du context
const FavoriteContext = createContext();
//ici on va pouvoir envoyer nos states globales vers les composants enfants (HOC)
const FavoriteProvider = (props) => {
    const [favorites, setFavorites] = useState([]);  
    return (    
        <FavoriteContext.Provider value={[favorites, setFavorites]}>      
            {props.children}
        </FavoriteContext.Provider>
    );
};
export { FavoriteContext, FavoriteProvider };