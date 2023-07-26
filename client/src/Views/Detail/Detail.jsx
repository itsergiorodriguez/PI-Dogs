import React from "react";
import { getDogsById, resetDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const dogsDetail = useSelector((state) => state.dogsDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogsById(id));
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch, id]);

  if (Object.keys(dogsDetail).length === 0) {
    return <div className={styles.cardDetails}> Cargando... </div>;
  }

  const dog = Array.isArray(dogsDetail) ? dogsDetail[0] : dogsDetail;
  let temperaments = dog.temperament;
  if (dogsDetail.Temperaments && dogsDetail.Temperaments.length > 0) {
    temperaments = dogsDetail.Temperaments[0].name;
    }

  return (
    <div className={styles.container}>
        <div className={styles.buttonContainer}>
        <Link to="/home">
          <button className={styles.button}>🡸 Volver</button>
        </Link>
      </div>

      <div className={styles.card}>
        <h1 className={styles.cardName}>🐾Raza: {dog?.name}</h1>
        <img className={styles.cardImg} src={dog?.image} alt="img" />
        <div className={styles.detailsContainer}>
          <h3 className={styles.detailItem}>
            <span className={styles.detailLabel}>🐾Peso: </span>
            <span className={styles.highlightedText}>
              Min - Max: {dog?.weightMin}-{dog?.weightMax} Kg
            </span>
          </h3>
          <h3 className={styles.detailItem}>
            <span className={styles.detailLabel}>🐾Peso Promedio: </span>
            <span className={styles.highlightedText}>
              {dog?.averageWeight} Kg
            </span>
          </h3>
          <h3 className={styles.detailItem}>
            <span className={styles.detailLabel}>🐾Altura: </span>
            <span className={styles.highlightedText}>
              (min - max): {dog?.height.metric || dog?.height} Cm
            </span>
          </h3>
          <h3 className={styles.detailItem}>
            <span className={styles.detailLabel}>🐾Esperanza de vida: </span>
            <span className={styles.highlightedText}>
              {dog?.life_span + " (Años)"}
            </span>
          </h3>
          <h3 className={styles.detailItem}>
            <span className={styles.detailLabel}>🐾Temperamento: </span>
            <span className={styles.highlightedText}>{temperaments}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
