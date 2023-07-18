import React from "react";
import Cards from "../../Components/Cards/Cards";
import styles from "../Home/Home.module.css";
import {
  getDogsAll,
  getAllTemperaments,
  setCurrentPage,
  filterByOrigin,
  filterByTemper,
  orderByName,
  orderByWeight,
} from "../../Redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";

const Home = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [temperament, setTemperament] = useState("all");
  const [filter, setFilter] = useState({
    name: "name",
    origin: "All",
    temperament: "all",
    weight: "weight",
    aver: "aver",
  });

  const dogs = useSelector((state) => state.dogs);

  const temperaments = useSelector((state) =>
    [...state.temperaments].sort((a, b) => {
      if (a < b) return -1;
      else return 1;
    })
  );
  const handleOrderName = (event) => {
    dispatch(orderByName(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      name: event.target.value,
    });
  };

  const handleOrderWeight = (event) => {
    dispatch(orderByWeight(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      weight: event.target.value,
    });
  };

  const handleOrderWeight2 = (event) => {
    dispatch(orderByWeight(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      aver: event.target.value,
    });
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      origin: event.target.value,
    });
  };

  const handleFilterByTemper = (event) => {
    setTemperament(event.target.value);
    dispatch(filterByTemper(event.target.value));
    dispatch(setCurrentPage(1));
    setOrder(`Ordered ${event.target.value}`);
    setFilter({
      ...filter,
      temperament: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getDogsAll());
    dispatch(setCurrentPage(1));
    setFilter({
      name: "name",
      origin: "All",
      temperament: "all",
      weight: "weight",
      aver: "aver",
    });
  };

  useEffect(() => {
    dispatch(getDogsAll());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <h1 className={`${styles.container} ${styles.title}`}>
        🦴Lista de Razas🦴
      </h1>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={(event) => handleClick(event)}
        >
          Restaurar Filtros
        </button>
      </div>

      <div className={styles.filterSection}>
        <section>
          <select
            value={filter.name}
            onChange={(event) => handleOrderName(event)}
          >
            <option value="" disabled defaultValue>
              Ordenar alfabéticamente
            </option>
            <option value="a-z"> A - Z</option>
            <option value="z-a"> Z - A</option>
          </select>

          <select
            value={filter.weight}
            onChange={(event) => handleOrderWeight(event)}
          >
            <option value="" disabled defaultValue>
              Ordenar por peso
            </option>
            <option value="min"> Mas liviano </option>
            <option value="max"> Mas pesado </option>
          </select>

          <select
            value={filter.aver}
            onChange={(event) => handleOrderWeight2(event)}
          >
            <option value="" disabled defaultValue>
              Ordenar por peso promedio
            </option>
            <option value="ave">Promedio más ligero</option>
            <option value="ave-max">Promedio más pesado</option>
          </select>

          <select
            value={filter.origin}
            onChange={(event) => handleFilterByOrigin(event)}
          >
            <option value="All">Todos los perros </option>
            <option value="api">Perros desde API </option>
            <option value="created">Perros creados</option>
          </select>

          <select
            value={filter.temperament}
            onChange={(event) => handleFilterByTemper(event)}
          >
            <option value="all"> All temperaments </option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
        </section>
      </div>

      <div>
        <Cards dogs={dogs} />
      </div>
    </>
  );
};

export default Home;
