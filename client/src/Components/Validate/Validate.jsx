const validate = ({
  name,
  height,
  life_span,
  weightMax,
  weightMin,
  temperament,
}) => {
  let errors = {};
  let regexName = /^[a-zA-Z\s]+$/;

  if (!name.trim()) {
    errors.name = "Nombre es requerido.";
  } else if (!regexName.test(name)) {
    errors.name = "Nombre debe contener solo letras y espacios.";
  } else if (name.length > 40 || name.length < 2) {
    errors.name =
      "Elija un nombre que tenga más de 1 carácter y menos de 40 caracteres.";
  }

  if (!weightMin) {
    errors.weightMin = "Por favor elige un peso mínimo";
  } else if (weightMin.trim() > 100 || weightMin.trim() < 1) {
    errors.weightMin =
      "El peso mínimo no puede ser superior a 100 ni inferior a 1";
  }
  if (!weightMax) {
    errors.weightMax = "Por favor elige un peso máximo";
  } else if (weightMax.trim() > 100 || weightMax.trim() < 1) {
    errors.weightMax =
      "El peso máximo no puede ser superior a 100 ni inferior a 1";
  }
  if (weightMax && weightMin) {
    if (parseInt(weightMin) >= parseInt(weightMax)) {
      errors.weightMax =
        "El peso máximo no puede ser inferior o igual al peso mínimo";
    }
  }
  if (!height) {
    errors.height = "Por favor, elige una altura.";
  } else if (!/^\d+$/.test(height)) {
    errors.height = "La altura debe ser un número entero.";
  } else if (height.trim() < 15 || height.trim() > 110) {
    errors.height = "La altura debe estar entre 15 y 110 cm.";
  }
  if (!life_span) {
    errors.life_span = "Por favor, elige una vida útil aproximada.";
  } else if (!/^\d+$/.test(life_span)) {
    errors.life_span = "La vida útil debe ser un número entero.";
  } else if (life_span > 30) {
    errors.life_span = "La vida útil no debe superar los 30 años.";
  }
  if (!temperament) {
    errors.temperament = "Por favor elige al menos un temperamento";
  } else if (temperament.length > 3) {
    errors.temperament = "Solo puedes seleccionar hasta 5 temperamentos";
  }
  if (temperament && temperament.length <= 3 && errors.temperament) {
    delete errors.temperament;
  }
  return errors;
};

export default validate;
