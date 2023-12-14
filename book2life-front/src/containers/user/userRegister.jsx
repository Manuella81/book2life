import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import { saveUser, getCoords } from "../../api/user"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {validateInputField} from "../../helpers/form-validator";


//Contante d'enregistrement d'un nouvel utilisateur
const Register = (props) =>{
    const [email, setMail] = useState('')
    const [nickname, setnickname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null);

    //setError se déclenche que lorsque password et confirPassword change
    useEffect((e)=>{
        setError(null);
        if (
        password !== "" &&
        confirmPassword !== "" &&
        password !== confirmPassword
        ) {
            setError("Les mots de passe ne sont pas identiques.");
        }
    }, [password, confirmPassword])
    
      
    //Constante qui s'appliquera au moment de la soumission de formulaire
    const onSubmitForm = () => {
        //au click, on vérife les données envoyé du formulaire      
        //appel de la fonction de validation de formulaire pour chacun des champs. 
        let emailErr = validateInputField("Email", "email", email)
        //le premier argument c'est le nom qu'on donne au label, le 2ème argument c'est le type dans les cases et le dernier la state
       
        if(emailErr !== true){
            //console.log(emailErr)
            setError(emailErr)
            return
        }
        
                    
        let errCity = validateInputField("Ville", "city", city)
        if(errCity !== true){
            setError(errCity)
            return
        } 

               
        let errZip = validateInputField("Code postal", "zip", zip)
        if(errZip !== true){
            setError(errZip)
            return
        } 

        let errPhone = validateInputField("Téléphone", "phone", phone)
        if(errPhone !== true){
            setError(errPhone)
            return
        } 
               
 
        //Si un des champs du formulaire est vide, un message d'erreur s'affiche
        if (
            email === "" ||
            firstname === "" ||
            lastname === "" ||
            password === "" ||
            confirmPassword === "" ||
            address === "" ||
            zip === "" ||
            city === "" ||
            phone === "" 
        ) 
        {
            setError("Veuillez remplir tous les champs du formulaire.");
        } 
        //Sinon si les 2 mots de passe sont identiques la fonction getCoords est lancée. Cette fonction va permettre de récupérer la latitude et la longitude de l'emplacement de l'utilisateur et de sauvegarder toutes les données de l'utilisateur dans la bdd
        else if (password === confirmPassword) {
            getCoords(address, zip)
            .then((res)=>{
                let lat = res.features[0].geometry.coordinates[1];
                let lng = res.features[0].geometry.coordinates[0];
                //console.log("lat: " + lat)
                //console.log("lng: " + lng)
                
                let data = {
                    email: email,
                    nickName: nickname,
                    firstName: firstname,
                    lastName: lastname,
                    password: password,
                    address: address,
                    zip: zip,
                    city: city,
                    lat: lat,
                    lng: lng,
                    phone: phone
                }
         
                //appel de la fonction ajax qui enregistre l'utilisateur' dans l'api_back
                saveUser(data)
                //console.log(data)
                .then((res)=>{
                    if(res.status === 200){
                        setRedirect(true)
                    }else if (res.status === 401){
                        setError(res.msg)
                    }else{
                        setError("Echec envoi!")
                    }
                })
                .catch(err=>console.log(err))
            })

            .catch(err=>console.log(err))

        }else{
            console.log("Erreur, echec enregistrement")
        }
    }
  
    
    return (
        <main className="group-form form-register">
            {/*Si redirect = true on redirige l'utilisateur sur la page home*/}
            {redirect && <Navigate to="/userLogin" />}
            {/*Si il y a une erreur on l'affiche sinon on affiche le titre h1*/}
            {error !== null ? (
                <p className="errorMsg">Erreur:</p>
            ) : (
                <h1 className="titre_h1">
                    Bienvenue sur book2life
                </h1>
            )}
          
            <div className="form">
                {/*Formulaire bootstrap d'enregistrement d'un nouveau membre*/}
                {error !== null && <p>{error}</p>}
                <form
                    className="form1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                    }}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            size="lg"
                            placeholder="Votre email"
                            onChange={(e) => {
                                setMail(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pseudo</Form.Label>
                        <Form.Control
                            type="text"
                            name="nickname"
                            size="lg"
                            placeholder="Votre pseudo"
                            onChange={(e) => {
                                setnickname(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">    
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstname"
                            size="lg"
                            placeholder="Votre prénom"
                            onChange={(e) => {
                                setFirstname(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">    
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            size="lg"
                            placeholder="Votre nom"
                            onChange={(e) => {
                                setLastname(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">    
                        <Form.Label>Mot de passe 1</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            size="lg"
                            placeholder="Votre mot de passe"
                            onChange={(e) => {
                                setPassword(e.currentTarget.value);
                            }}
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe 2</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            size="lg"
                            placeholder="Confirmez mot de passe"
                            onChange={(e) => {
                                setConfirmPassword(e.currentTarget.value);
                            }}
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            size="lg"
                            placeholder="Votre adresse"
                            onChange={(e) => {
                                setAddress(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Code postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="zip"
                            size="lg"
                            placeholder="Votre code postal"
                            onChange={(e) => {
                                setZip(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            size="lg"
                            placeholder="Ville"
                            onChange={(e) => {
                                setCity(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            size="lg"
                            placeholder="Votre téléphone"
                            onChange={(e) => {
                                setPhone(e.currentTarget.value);
                            }}
                        />
                    </Form.Group>

                    <Button 
                        className="submit-button" 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                    >
                        S'enregister
                    </Button>
                    
                </form>
            </div>
        </main>
    
      );
}

export default Register