import React from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDogsAll } from "../../Redux/actions";
import Paginado from "../Paginado/Paginado";

const Cards = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogsAll);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  const indexOfLastDogs = currentPage * dogsPerPage;
  const indexOfFirstGames = indexOfLastDogs - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstGames, indexOfLastDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogsAll());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>

      <div className={styles.container}>
        {currentDogs.map(
          ({
            id,
            name,
            image,
            height,
            life_span,
            temperament,
            weightMin,
            weightMax,
            averageWeight,
          }) => (
            <div className={styles.card}>
              <Card
                id={id}
                key={id}
                name={name}
                life_span={life_span}
                temperament={temperament}
                image={image}
                height={height}
                weightMin={weightMin}
                weightMax={weightMax}
                averageWeight={averageWeight}
              />
            </div>
          )
        )}
        <div></div>
      </div>
    </div>
  );
};

export default Cards;
