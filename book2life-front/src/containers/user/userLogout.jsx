import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../slices/userSlice";


//Contante de déconnexion d'un utilisateur
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem("book2life-token");
    dispatch(setLogout());
    navigate("/userLogin");
    //window.location.reload(); 
  }, [dispatch, navigate]);

  return (
    <div>
      <h1>Deconnexion en cours...</h1>
    </div>
  );
};

export default Logout;