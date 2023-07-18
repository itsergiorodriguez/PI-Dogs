import React from "react";
import Logo_Landing from "../../Utils/Imagenes/Logo_Landing.jpg";
import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleButtonClick = ()=>{
    navigate ("../Home")
  }

  return (
    <div >
     
         <div className={styles.container}>
             <h1 className={styles.h1}>Perros-Razas</h1>   
             <img className={styles.logoImage} src={Logo_Landing} alt="Logo"/>
             <button className={styles.button} onClick={handleButtonClick}>Acceso</button>
         </div>
    </div>
  );
};

export default Landing;
