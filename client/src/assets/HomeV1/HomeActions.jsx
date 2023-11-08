import {
  INITIALIZATION,
  DATA_PROCESSING,
  HANDLE_CLIENT_ERROR,
  HANDLE_SERVER_ERROR,
  HANDLE_INPUT_CHANGE,
} from "./HomeConstants";
export const init = () => {
  return {
    type: INITIALIZATION,
  };
};
export const processData = (roomData) => {
  return {
    type: DATA_PROCESSING,
    roomData,
  };
};
export const handleServerError = (error) => {
  return {
    type: HANDLE_SERVER_ERROR,
    error,
  };
};
export const handleClientError = (error, message) => {
  return {
    type: HANDLE_CLIENT_ERROR,
    error,
    message,
  };
};
export const handleInputChange = (inputData) => {
  return {
    type: HANDLE_INPUT_CHANGE,
    inputData,
  };
};
