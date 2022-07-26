import {
  CURRENT_CHAT,
  DARK_MODE,
  LOG_IN,
  LOG_OUT,
  SELECT_USER,
} from "./userAction";

// Get the logged in user from the local Storage
let getUser = () => {
  let con = JSON.parse(localStorage.getItem("user"));
  return con;
};

// inital states
const initialState = {
  user: getUser(),
  selectedUser: null,
  currentChat: null,
  darkMode: false,
};

// userReducer to Dispatch Actions

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload,
      };
    // Dark mode
    case DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};
