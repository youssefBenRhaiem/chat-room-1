import { LOADING, RECEIVED, ERROR, ADD_ROOM } from "../constants";
export const initState = {
  loading: false,
  rooms: [],
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case RECEIVED:
      return {
        ...state,
        loading: false,
        rooms: action.data,
      };
    case ADD_ROOM:
      state.rooms.push(action.data);
      return state;
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
