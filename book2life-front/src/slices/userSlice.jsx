//slice avec deux actions setUser et setLogout
//les actions setUser et setLogout écrasera la state par la valeur retournée par axios
import { createSlice } from "@reduxjs/toolkit";
//on initialise la state
const initialState = {
  infos: {},
  isLogged: false,
};
//on crée notre slice pour la state des users
export const userSlice = createSlice({
  name: "user", //on nome notre state
  initialState, //on attribut une valeur initiale à la state
  reducers: {
    setUser: (state, action) => {
      state.infos = action.payload;
      state.isLogged = true;
    }, //on crée une action qui receptionne (dans l'argument action) la valeur retournée par la requète axios dans nos composants
    setLogout: (state) => {
      state.infos = {};
      state.isLogged = false;
    },
  },
});
//on exporte notre fonction d'action pour l'utiliser dans nos composants le souhaitant
export const { setUser, setLogout } = userSlice.actions;
//on exporte notre selecteur qui permet de lire la state depuis n'importe quel composant qui le souhaite
export const selectUser = (state) => state.user;
//on exporte notre slice en tant que reducer pour l'injecter dans le store et rendre la state manipulable
export default userSlice.reducer;