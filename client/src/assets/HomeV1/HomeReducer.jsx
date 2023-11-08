import {
  INITIALIZATION,
  DATA_PROCESSING,
  HANDLE_CLIENT_ERROR,
  HANDLE_SERVER_ERROR,
  HANDLE_INPUT_CHANGE,
} from "./HomeConstants";
export const initState = {
  isLoading: false,
  roomData: {},
  roomName: "",
  roomNameError: null,
  serverError: null,
};
export default (state, action) => {
  switch (action.type) {
    case INITIALIZATION:
      return {
        ...state,
        isLoading: true,
        roomNameError: null,
        serverError: null,
      };
    case DATA_PROCESSING:
      return {
        ...state,
        isLoading: false,
        roomData: action.roomData,
      };
    case HANDLE_SERVER_ERROR:
      return {
        ...state,
        [action.error.name]: action.error,
      };
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        [action.inputData.name]: action.inputData.value,
      };
    default:
      return state;
  }
};
