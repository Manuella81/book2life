import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, Link } from "react-router-dom";
import { loginAdmin } from "../../api/admin";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../slices/adminSlice";


//Connexion d'un administrateur
const AdminLogin = (props) => {
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    
    //setDisabled se déclenche que lorsque password et email change
    useEffect(() => {
        if (email !== "" && password !== "") {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
    }, [email, password]);
    

    //Constante qui s'appliquera au moment de la soumission de formulaire
    const onSubmitForm = () => {
        let data = {
          email: email,
          password: password,
        };
        
        loginAdmin(data)
        .then((res) => {
            if (res.status === 200) {
                window.localStorage.setItem("book2life-adminToken", res.token);
                let admin = res.admin
                admin.token = res.token
                dispatch(setAdmin(admin))
                setRedirect(true);
            }else{
                setError(res.msg);
            }
        })
        .catch((err) => {
            setError(err);
        });
      
    }
    
    return (
    <main className="group-form form-login">
        
        {redirect && <Navigate to="/admin" />}
        {error !== null ? (
            <p className="errorMsg">{error}</p>
        ) : (
            <div>
                <h1 className="titre_h1">
                    Connectez vous à l'espace administrateur de book2life
                </h1>
            </div>
        )}
     
        <div className="form">
            
            {/*Formulaire bootstrap de connection administrateur*/}
            <form
                className="form-log"
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
                        setEmail(e.currentTarget.value);
                        }}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">       
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        autoComplete="on"
                        size="lg"
                        placeholder="Votre mot de passe"
                        onChange={(e) => {
                        setPassword(e.currentTarget.value);
                        }}
                    />
                </Form.Group>

                <Button 
                    className="submit-button" 
                    variant="primary" 
                    type="submit" 
                    disabled={disabled} 
                    size="lg"
                >
                    Se connecter
                </Button>
            </form>
                

            <div className="fgt-psw">
            <Link to="/adminForgot">
                <span>Mot de passe oublié ?</span>
            </Link>
            </div>
        </div>

    </main>
    
  );
  
}

export default AdminLogin;