import {createSlice} from "@reduxjs/toolkit"

//récupération des favoris présent dans le localStorage que l'on stock dans une variable lsFavoris
let lsFavoris = JSON.parse(window.localStorage.getItem('book2life-favoris'))
//si lsFavoris est null (introuvable dans le storage pas de favoris)
if(lsFavoris === null){
    //on initialise un tableau vide pour lsFavoris
    lsFavoris = []
}


//on initialise une state, soit on aura une liste de favoris avec un tableau d'objet , soit on aura une liste de favoris tableau vide
const initialState = {
    favoris: lsFavoris
}

//création d'un slice avec une action modifyBasket et une autre cleanBasket
export const favoriSlice = createSlice({
    name: "favoris",
    initialState,
    reducers: {
        modifyFavoris: (state, action)=>{
            state.favoris = action.payload
        },
        cleanFavoris: (state)=>{
            state.favoris = []
        }
    }
})

export const {modifyFavoris, cleanFavoris} = favoriSlice.actions

export const selectFavoris = state => state.favoris

export default favoriSlice.reducer