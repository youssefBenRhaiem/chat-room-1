import { LOADING, RECEIVED, ERROR, ADD_ROOM } from "../constants";
export const loadingRooms = () => {
  return {
    type: LOADING,
  };
};
export const getRooms = (data) => {
  return {
    type: RECEIVED,
    data,
  };
};
export const homeError = (error) => {
  return {
    type: ERROR,
    error,
  };
};
export const addRoom = (data) => {
  return {
    type: ADD_ROOM,
    data,
  };
};
