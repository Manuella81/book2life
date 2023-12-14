import React, {useState} from 'react'
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux' 
import {selectUser, setUser} from '../../slices/userSlice'
import {updateProfil, getCoords, checkMyToken} from '../../api/user'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Profil modifiable d'un utilisateur
const Profil = (props)=>{
    
    const user = useSelector(selectUser)    
    const dispatch = useDispatch()
    const [msg, setMsg] = useState(null)
    const [nickname, setnickname] = useState(user.infos.nickName)
    const [firstname, setFirstname] = useState(user.infos.firstName)
    const [lastname, setLastname] = useState(user.infos.lastName)
    const [address, setAddress] = useState(user.infos.address)
    const [zip, setZip] = useState(user.infos.zip)
    const [city, setCity] = useState(user.infos.city)
    const [phone, setPhone] = useState(user.infos.phone)
 
    
    const onSubmitForm = () =>{
        getCoords(address, zip)
        .then((res)=>{
            let lat = res.features[0].geometry.coordinates[1];
            let lng = res.features[0].geometry.coordinates[0];
            let datas = {
                nickName: nickname,
                firstName: firstname,
                lastName: lastname,
                address: address,
                zip: zip,
                city: city,
                lat: lat,
                lng: lng,
                phone: phone
            }               
            //console.log(datas)
            
            updateProfil(datas, user.infos.id_user)
            .then((res)=>{
                //console.log(res)
                if(res.status !== 200){
                    setMsg("Erreur lors de la modification")
                }else{
                    checkMyToken()
                    .then((res)=>{
                        //si le status de la réponse n'est pas 200
                        if(res.status !== 200){
                            setMsg("Erreur lors de la l'enregistrement")
                        //sinon
                        }else{
                            const token = window.localStorage.getItem('book2life-token')
                            //on stock la réponse de la requète axios dans une variable user (retourne un objet)
                            let user = res.user[0]
                            //on peut rajouter une propriété token à user avec le token dedans
                            user.token = token
                            //appel l'action de connexion de l'utilisateur (store)
                            dispatch(setUser(user))
                        }
                    })
                    .catch(err=>console.log(err))
                    setMsg('Profil modifié avec succés!')
                }
            })
            .catch(err=>console.log(err))
        })  
        .catch(err=>console.log(err))
    }
    
    return (
        <main>
            <h1 className='titre_h1'>Mon profil</h1>
            {msg !== null && <p>{msg}</p>}

            <Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}/> Retour à la page d'accueil</Link>
            
            <form
                className="form1"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitForm();
                }}
            >

                <Form.Group className="mb-3">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control
                        type="text"
                        name="nickname"
                        size="lg"
                        defaultValue={user.infos.nickName}
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
                        defaultValue={user.infos.firstName}
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
                        defaultValue={user.infos.lastName}
                        onChange={(e) => {
                            setLastname(e.currentTarget.value);
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        size="lg"
                        defaultValue={user.infos.address}
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
                        defaultValue={user.infos.zip}
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
                        defaultValue={user.infos.city}
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
                        defaultValue={user.infos.phone}
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
                    Enregister
                </Button>
                
            </form>
        </main>
    )
}

export default Profil