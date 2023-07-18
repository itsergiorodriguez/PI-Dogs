import React from "react";
import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({
  image,
  name,
  id,
  temperament,
  averageWeight,
  weightMin,
  weightMax,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardName}>
        <span className={styles.highlightedText}>🐾{name}</span>
      </h3>
      <div>
        <NavLink to={`/home/${id}`}>
          <img src={image} alt={name} />
          Mas detalles...
        </NavLink>
      </div>
      <p className={styles.highlightedText}>
        <span className={styles.cardTitle}>🐾Temperamentos: </span>
        {temperament}
      </p>
      <p className={styles.highlightedText}>
        <span className={styles.cardTitle}>🐾Peso: </span>
        {weightMin + "-" + weightMax + " Kg"}
      </p>
    </div>
  );
};

export default Card;
