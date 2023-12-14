import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../slices/adminSlice";


//Contante de déconnexion d'un administrateur
const AdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem("book2life-adminToken");
    dispatch(setLogout());
    navigate("/adminLogin");
    //window.location.reload(); 
  });

  return (
    <div>
      <h1>Deconnexion en cours...</h1>
    </div>
  );
};

export default AdminLogout;