import { combineReducers } from "redux";
import { LOGIN, PROJECT, CONNECT, TABTYPE } from "./type";
// import { Storage } from "../Storage"

const user = true; //Storage.get("user-token");

const initialState = user
  ? { isLogged: true, user }
  : { isLogged: false, user: null };

const initialData = {
  projectDetails: {},
  connectDetails: {},
  tabType: "Define",
};

export const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogged: Boolean(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};

export const projectDetailsReducer = (state = initialData, action) => {
  switch (action.type) {
    case PROJECT:
      return {
        ...state,
        projectDetails: action.payload,
      };
    default:
      return state;
  }
};

export const connectDetailsReducer = (state = initialData, action) => {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connectDetails: action.payload,
      };
    default:
      return state;
  }
};

export const tabTypeReducer = (state = initialData, action) => {
  switch (action.type) {
    case TABTYPE:
      return {
        ...state,
        tabType: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  userDetails: userDetailReducer,
  projectDetails: projectDetailsReducer,
  connectDetail: connectDetailsReducer,
  tabType: tabTypeReducer,
});