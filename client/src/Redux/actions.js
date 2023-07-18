import axios from "axios";
export const DOGS_ALL = "DOGS_ALL";
export const DOGS_BY_ID = "DOGS_BY_ID";
export const RESET_DETAIL = "RESET_DETAIL";
export const GET_ALL_TEMPS = "GET_ALL_TEMPS,";
export const CREATE_DOG = "CREATE_DOG";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_NAME = "GET_NAME";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_TEMPER = "FILTER_BY_TEMPER";

export const getDogByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      return dispatch({
        type: GET_DOG_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getName = (name) => {
  return {
    type: GET_NAME,
    payload: name,
  };
};

export const getAllTemperaments = () => {
  return async (dispatch) => {
    const json = await axios.get("http://localhost:3001/temperaments");
    let temperamentsAll = json.data.map((el) => el.name);
    return dispatch({
      type: GET_ALL_TEMPS,
      payload: temperamentsAll,
    });
  };
};

export const createNewDog = (payload) => {
  return async (dispatch) => {
    let newDog = await axios.post("http://localhost:3001/dogs", payload);
    return newDog;
  };
};

export const getDogsAll = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/dogs");
      return dispatch({ type: DOGS_ALL, payload: apiData.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDogsById = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: DOGS_BY_ID, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};
export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};
export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export const filterByTemper = (payload) => {
  console.log(payload);
  return {
    type: FILTER_BY_TEMPER,
    payload,
  };
};
