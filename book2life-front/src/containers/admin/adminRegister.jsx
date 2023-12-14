import { saveAdmin } from "../../api/admin"

//Contante d'enregistrement d'un nouvel utilisateur
const AdminRegister = (props) =>{
         
        //appel de la fonction ajax qui enregistre l'admin' dans l'api_back
        saveAdmin()
        .then((res)=>{
            if(res.status === 200){
                console.log("Administrateur enregistré!")
            }else{
                console.log("Echec envoi!")
            }
        })
        .catch(err=>console.log(err))    

}

export default AdminRegister