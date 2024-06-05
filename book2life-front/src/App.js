import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/require-auth-user";
import RequireAuthAdmin from "./helpers/require-auth-admin";


import Header from './containers/header'
import Footer from './containers/footer'
import Home from './containers/home'
import LastBooks from './containers/homeLastBooks'
import AllUserBooks from './containers/allUserBooks'
import Jeunesse  from './containers/jeunesse'
import AllJeunesse  from './containers/jeunesseAll'
import Humour  from './containers/humour'
import AllHumour  from './containers/humourAll'
import Graphiques  from './containers/graphiques'
import AllGraphiques from './containers/graphiquesAll'
import Historique  from './containers/historique'
import AllHistorique from './containers/historiqueAll'
import Erotique  from './containers/erotique'
import AllErotique from './containers/erotiqueAll'
import Comics  from './containers/comics'
import AllComics from './containers/comicsAll'
import Manga  from './containers/manga'
import AllManga  from './containers/mangaAll'
import Details from './containers/detail'
import About from './containers/about'
import PrivacyPolicy from './containers/privacy-policy'
import TermesAndConditions from './containers/termes_and_conditions'
import Platform from './containers/platform'


//user
import Register from './containers/user/userRegister'
import Login from './containers/user/userLogin'
import Logout from './containers/user/userLogout'
import Forgot from './containers/user/userForgot'
import Profil from './containers/user/userProfil'
import Favorite from './containers/user/favoris'
import SendMessage from './containers/user/sendMessage'
import Messenger from './containers/user/messenger'
import UserAdmin from './containers/user/userAdmin'
import EditBook from './containers/user/book/editBook'
import AddBook from './containers/user/book/addBook'

//admin
import AdminRegister from './containers/admin/adminRegister'
import AdminLogin from './containers/admin/adminLogin'
import AdminLogout from './containers/admin/adminLogout'
import AdminForgot from './containers/admin/adminForgot'
import Admin from './containers/admin/admin'
import ValidateBook from './containers/admin/book/validateBook'




import { Navigate } from "react-router";

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>  
        <Route exact path="/" element={<Home />}/>   
        <Route exact path="/lastBooks" element={<LastBooks />}/> 
        <Route exact path="/allUserBooks/:id_user" element={<AllUserBooks />}/> 
        <Route exact path="/jeunesse" element={<Jeunesse />}/> 
        <Route exact path="/allJeunesse" element={<AllJeunesse />}/> 
        <Route exact path="/humour" element={<Humour />}/> 
        <Route exact path="/allHumour" element={<AllHumour />}/>
        <Route exact path="/graphiques" element={<Graphiques />}/> 
        <Route exact path="/allgraphiques" element={<AllGraphiques />}/>
        <Route exact path="/historique" element={<Historique />}/> 
        <Route exact path="/allhistorique" element={<AllHistorique />}/>
        <Route exact path="/erotique" element={<Erotique />}/> 
        <Route exact path="/allErotique" element={<AllErotique />}/>
        <Route exact path="/comics" element={<Comics />}/> 
        <Route exact path="/allComics" element={<AllComics />}/>
        <Route exact path="/manga" element={<Manga />}/> 
        <Route exact path="/allManga" element={<AllManga />}/>
        <Route exact path="/detail/:id" element={<Details />}/> 
        <Route exact path="/about" element={<About />}/> 
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />}/> 
        <Route exact path="/termes_and_conditions" element={<TermesAndConditions />}/> 
        <Route exact path="/platform" element={<Platform />}/> 
        
        {/*User*/}  
        <Route exact path="/userRegister" element={<Register />}/>
        <Route exact path="/userLogin" element={<Login />}/>
        <Route exact path="/userLogout" element={<Logout />} />
        <Route exact path="/userForgot" element={<Forgot />} />
        <Route exact path="/userProfil" element={<RequireAuth child={Profil} auth={true}/>}/>
        <Route exact path="/favoris" element={<RequireAuth child={Favorite} auth={true} />}/>
        <Route exact path="/userAdmin" element={<RequireAuth child={UserAdmin} auth={true}/>}/>
        <Route exact path="/sendMessage/:id_book" element={<RequireAuth child={SendMessage} auth={true}/>}/>
        <Route exact path="/messenger" element={<RequireAuth child={Messenger} auth={true}/>}/>
        <Route exact path="/messenger/:conversationId" element={<RequireAuth child={Messenger} auth={true}/>}/>
        <Route exact path="/editBook/:id_book" element={<RequireAuth child={EditBook} auth={true}/>}/>
        <Route exact path="/addBook" element={<RequireAuth child={AddBook} auth={true}/>}/>

        {/*Administrateur du site*/} 
        <Route exact path="/adminRegister" element={<AdminRegister />}/>
        <Route exact path="/adminLogin" element={<AdminLogin />}/>
        <Route exact path="/adminLogout" element={<AdminLogout/>}/>
        <Route exact path="/adminForgot" element={<AdminForgot />} />
        <Route exact path="/admin" element={<RequireAuthAdmin child={Admin} auth={true}/>}/>
        <Route exact path="/validateBook/:id_book" element={<RequireAuthAdmin child={ValidateBook} auth={true}/>}/>
        
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
