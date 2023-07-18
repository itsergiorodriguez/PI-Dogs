import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName, setCurrentPage } from "../../Redux/actions";
import styles from "../SearchBar/SearchBar.module.css";

const SearchBar = () => {
  const [dog, setDog] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(getName(event));
    dispatch(setCurrentPage(1));
  };

  const handleClick = (event) => {
    setDog("");
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={dog}
        onChange={(event) => {
          setDog(event.target.value);
          handleChange(event.target.value);
        }}
        placeholder="Busca raza..."
      />
      <button type="submit" onClick={(event) => handleClick(event)}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
