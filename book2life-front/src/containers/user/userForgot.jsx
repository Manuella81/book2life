import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { forgotPassword } from "../../api/user";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


//mot de passe oublié d'un utilisateur
const Forgot = () => {
    const [email, setEmail] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    
    const onSubmitForm = () => {
        let data = {
          email: email,
        };
        
        forgotPassword(data)
          .then((res) => {
            setRedirect(true);
          })
          .catch((err) => {
            //console.log(err);
            setError(err);
          });
          
    }
    
    return (
    <main className="group-form form-login">
        {redirect && <Navigate to="/login" />}
        <h1 className="titre_h1">
            Bienvenue sur book2life
        </h1>
      {error !== null && <p className="errorMsg">{error}</p>}

        <div>
            <h2 className="titre_h2">Mot de passe oublié</h2>
            <div className="form">
                <form
                  className="form-forgot"
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
                  <Button 
                    className="submit-button" 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                  >
                    Envoyer un nouveau mot de passe
                  </Button>
                </form>
            </div>
        </div>
    </main>
  );
}

export default Forgot