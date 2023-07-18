import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewDog, getAllTemperaments } from "../../Redux/actions";
import Validate from "../../Components/Validate/Validate";
import { Navigate, Link } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [inputs, setInputs] = useState({
    name: "",
    height: "",
    image: "",
    life_span: "",
    weightMax: "",
    weightMin: "",
    temperament: [],
  });

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    setErrors(Validate({ ...inputs, [event.target.name]: event.target.value }));
  };

  const handleTemperament = (event) => {
    const { value } = event.target;
    if (inputs.temperament.includes(value)) {
      return alert("Los temperamentos no se pueden repetir");
    }
    if (value === "all") {
      return;
    }
    if (inputs.temperament.length >= 5) {
      return alert("Solo se pueden agregar 5 temperamentos máximo");
    }
    setInputs({
      ...inputs,
      temperament: [...inputs.temperament, value],
    });
    setErrors({
      ...errors,
      temperament: Validate({
        ...inputs,
        [event.target.name]: event.target.value,
      }).temperament,
    });
  };

  const handleDelete = (temp) => {
    setInputs({
      ...inputs,
      temperament: inputs.temperament.filter((inst) => inst !== temp),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewDog(inputs));
    console.log(inputs);
    alert("Raza de Perro Creada");
    setInputs({
      name: "",
      height: "",
      image: "",
      life_span: "",
      weightMax: "",
      weightMin: "",
      temperament: [],
    });
    setErrors({});
    setRedirectToHome(true);
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <div>
      <div>
        {" "}
        <NavBar />
      </div>
      {redirectToHome && <Navigate to="/home" />}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              name="name"
              value={inputs.name}
              type="text"
              onChange={handleInputs}
            />
            {errors.name && (
              <strong className={styles.error}>{errors.name}</strong>
            )}
          </label>
          <br />
          <label>
            Altura 15 – 110 Cm (Al hombro):
            <input
              type="text"
              name="height"
              value={inputs.height}
              onChange={handleInputs}
            />
            {errors.height && (
              <strong className={styles.error}>{errors.height}</strong>
            )}
          </label>
          <br />
          <label>
            Imagen:
            <input
              name="image"
              value={inputs.image}
              placeholder="Formato jpg o Png"
              type="text"
              onChange={handleInputs}
            />
            {errors.image && (
              <strong className={styles.error}>{errors.image}</strong>
            )}
          </label>
          <br />
          <label>
            Esperanza de Vida (Años):
            <input
              type="text"
              name="life_span"
              value={inputs.life_span}
              onChange={handleInputs}
            />
            {errors.life_span && (
              <strong className={styles.error}>{errors.life_span}</strong>
            )}
          </label>
          <br />
          <label>
            Peso Máximo (Kg):
            <input
              type="text"
              name="weightMax"
              value={inputs.weightMax}
              onChange={handleInputs}
            />
            {errors.weightMax && (
              <strong className={styles.error}>{errors.weightMax}</strong>
            )}
          </label>
          <br />
          <label>
            Peso Mínimo (Kg):
            <input
              name="weightMin"
              value={inputs.weightMin}
              onChange={handleInputs}
              type="text"
            />
            {errors.weightMin && (
              <strong className={styles.error}>{errors.weightMin}</strong>
            )}
          </label>
          <br />
          <label>
            Temperamentos:
            <div className={styles.temperaments}>
              <select onChange={handleTemperament}>
                <option className={styles.opciones} value="all"></option>
                {temperaments.map((temp) => (
                  <option className={styles.opciones} value={temp} key={temp}>
                    {temp}
                  </option>
                ))}
              </select>
              {inputs.temperament.map((temp) => (
                <div className={styles.toDelete} key={temp}>
                  <p>{temp}</p>
                  <button onClick={() => handleDelete(temp)}>X</button>
                </div>
              ))}
              <button
                type="submit"
                className={styles.button}
                disabled={
                  errors.name ||
                  errors.weightMin ||
                  errors.weightMax ||
                  errors.height ||
                  errors.life_span ||
                  errors.image ||
                  !inputs.temperament.length ||
                  !inputs.name
                }
              >
                Agrega Perro a Base de Datos
              </button>
              {errors.temperament && (
                <strong className={styles.error}>{errors.temperament}</strong>
              )}
            </div>
          </label>
          <Link to="/home" className={styles.buttonBack}>
            Volver a Home
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Form;
