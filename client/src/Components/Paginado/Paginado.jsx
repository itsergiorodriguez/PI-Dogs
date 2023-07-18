import styles from "./Paginado.module.css";

const Paginado = ({ dogsPerPage, allDogs, paginado }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div>
      <nav>
        <ul className={styles.pagination}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className={styles["pagination-item"]} key={number}>
                <button
                  className={styles["pagination-button"]}
                  onClick={() => paginado(number)}
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
