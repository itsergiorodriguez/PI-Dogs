import React from "react";
import styles from "./NavBar.module.css";
import Logo_Perros from "../../Utils/Imagenes/Logo_Perros.png";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to="/home">
        <img className={styles.logoImage} src={Logo_Perros} alt="Logo" />
      </NavLink>

      <div className={styles.links}>
        <NavLink to="/">LANDING</NavLink>
        <NavLink to="/home">HOME</NavLink>
        <NavLink to="/create">NUEVA RAZA</NavLink>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
