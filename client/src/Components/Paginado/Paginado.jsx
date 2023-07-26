import React, { useState } from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ dogsPerPage, allDogs, paginado }) => {
  const [activeButton, setActiveButton] = useState(1); // Estado del botón activo, inicialmente el primer botón

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const handleButtonClick = (number) => {
    setActiveButton(number);
    paginado(number);
  };

  return (
    <div>
      <nav>
        <ul className={styles.pagination}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className={styles.paginationItem} key={number}>
                <button
                  className={`${styles.paginationButton} ${
                    activeButton === number ? styles.activeButton : ""
                  }`}
                  onClick={() => handleButtonClick(number)}
                >
                  {number}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
