import { configureStore } from "@reduxjs/toolkit";

//on importe nos reducers pour les injecter dans le store
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import bookReducer from "./bookSlice";
import messageReducer from "./messageSlice";



//connexion du store et récupération des réducers
const store = configureStore({
    reducer: {
        user: userReducer,
        books: bookReducer,
        admin: adminReducer,
        messages: messageReducer
    }     
})

export default store;