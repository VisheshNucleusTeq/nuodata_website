import { combineReducers } from "redux";
import {
  LOGIN,
  PROJECT,
  CONNECT,
  TABTYPE,
  ANALYZEDETAIL,
  PROJECTTRANSFORMDETAILS,
  DESIGNDETAILS,
  LOADER,
  OPENDETAILS,
  WORKSPACE,
  PIPELINE,
} from "./type";
import LocalData from "./LocalData";

const user = LocalData.getData("authData");

const initialState = user
  ? { isLogged: true, user }
  : { isLogged: false, user: null };

const initialData = {
  projectDetails: {},
  connectDetails: {},
  tabType: "Define",
  analyzeDetail: {},
  projectTransform: {},
  projectTransformDetails: {},
  designDetails: {},
  openDetails: {},
  workspace: null,
  pipeline: null,
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

export const analyzeDetailReducer = (state = initialData, action) => {
  switch (action.type) {
    case ANALYZEDETAIL:
      return {
        ...state,
        analyzeDetail: action.payload,
      };
    default:
      return state;
  }
};

export const projectTransformDetailsReducer = (state = initialData, action) => {
  switch (action.type) {
    case PROJECTTRANSFORMDETAILS:
      return {
        ...state,
        projectTransformDetails: action.payload,
      };
    default:
      return state;
  }
};

export const designDetailsReducer = (state = initialData, action) => {
  switch (action.type) {
    case DESIGNDETAILS:
      return {
        ...state,
        designDetails: action.payload,
      };
    default:
      return state;
  }
};

export const loderShowHideReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        isLoaderShow: action.payload,
      };
    default:
      return state;
  }
};

export const openDetailsReducer = (state = initialData, action) => {
  switch (action.type) {
    case OPENDETAILS:
      return {
        ...state,
        openDetails: action.payload,
      };
    default:
      return state;
  }
};

export const workspaceReducer = (state = initialData, action) => {
  switch (action.type) {
    case WORKSPACE:
      return {
        ...state,
        workspace: action.payload,
      };
    default:
      return state;
  }
};

export const pipelineReducer = (state = initialData, action) => {
  switch (action.type) {
    case PIPELINE:
      return {
        ...state,
        pipeline: action.payload,
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
  analyzeDetail: analyzeDetailReducer,
  projectTransformDetails: projectTransformDetailsReducer,
  designDetails: designDetailsReducer,
  loderShowHide: loderShowHideReducer,
  openDetails: openDetailsReducer,
  workspace: workspaceReducer,
  pipeline: pipelineReducer,
});
