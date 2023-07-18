import {
  DOGS_ALL,
  DOGS_BY_ID,
  RESET_DETAIL,
  GET_ALL_TEMPS,
  CREATE_DOG,
  GET_DOG_BY_NAME,
  SET_CURRENT_PAGE,
  GET_NAME,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPER,
} from "./actions";

const initialState = {
  currentPage: 1,
  dogs: [],
  dogsAll: [],
  dogsDetail: {},
  temperaments: [],
};

const reducer = (state = initialState, action) => {
  let arr = [];

  switch (action.type) {
    case DOGS_ALL:
      return {
        ...state,
       dogsAll: action.payload,
       dogs: action.payload,
      };
    case DOGS_BY_ID:
      return {
        ...state,
        dogsDetail: action.payload,
      };
    case RESET_DETAIL:
      return {
        ...state,
        dogsDetail: {},
      };
    case GET_ALL_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case CREATE_DOG:
      return {
        ...state,
      };

    case GET_DOG_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case GET_NAME:
      let name =
        action.payload === ""
          ? state.dogsAll
          : state.dogs.filter((inst) =>
              inst.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        dogsAll: name,
      };
    case ORDER_BY_NAME:
      let order =
        action.payload === "a-z"
          ? state.dogs.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: order,
      };

    case ORDER_BY_WEIGHT:
      if (action.payload === "min") {
        arr = state.dogs.sort((dogA, dogB) => {
          if (dogA.weightMin < dogB.weightMin) return -1;
          if (dogA.weightMin > dogB.weightMin) return 1;
          return 0;
        });
      } else if (action.payload === "max") {
        arr = state.dogs.sort((dogA, dogB) => {
          if (dogA.weightMax > dogB.weightMax) return -1;
          if (dogA.weightMax < dogB.weightMax) return 1;
          return 0;
        });
      } else if (action.payload === "ave") {
        arr = state.dogs.sort((dogA, dogB) => {
          if (dogA.averageWeight < dogB.averageWeight) return -1;
          if (dogA.averageWeight > dogB.averageWeight) return 1;
          return 0;
        });
      } else if (action.payload === "ave-max") {
        arr = state.dogs.sort((dogA, dogB) => {
          if (dogA.averageWeight > dogB.averageWeight) return -1;
          if (dogA.averageWeight < dogB.averageWeight) return 1;
          return 0;
        });
      } else {
        console.log("error");
      }

      return {
        ...state,
        dogs: arr,
      };

    case FILTER_BY_ORIGIN:
      let filteredDogs;
      if (action.payload === "All") {
        filteredDogs = state.dogs; // Si el origen es "All", muestra todos los perros
      } else if (action.payload === "api") {
        filteredDogs = state.dogs.filter((dog) => !dog.created); // Filtra los perros desde la API
      } else if (action.payload === "created") {
        filteredDogs = state.dogs.filter((dog) => dog.created); // Filtra los perros creados
      } else {
        filteredDogs = state.dogs; // Si el origen no coincide con ninguna opción, muestra todos los perros
      }

      return {
        ...state,
        dogsAll: filteredDogs,
      };

    case FILTER_BY_TEMPER:
      let dogsTemps =
        action.payload === "all"
          ? state.dogs
          : state.dogs?.filter((dog) => {
              if (!dog.temperament) return undefined;
              return dog.temperament.split(", ").includes(action.payload);
            });
      return {
        ...state,
        dogsAll: dogsTemps,
      };

    default:
      return { ...state };
  }
};

export default reducer;
