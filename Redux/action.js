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
} from "./type";

export const UserDetailsAction = (data) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: data,
  });
};

export const SetProjectDetailsAction = (data) => (dispatch) => {
  dispatch({
    type: PROJECT,
    payload: data,
  });
};

export const SetConnectDetailsAction = (data) => (dispatch) => {
  dispatch({
    type: CONNECT,
    payload: data,
  });
};

export const SetTabTypeAction = (data) => (dispatch) => {
  dispatch({
    type: TABTYPE,
    payload: data,
  });
};

export const SetAnalyzeDetailAction = (data) => (dispatch) => {
  dispatch({
    type: ANALYZEDETAIL,
    payload: data,
  });
};

export const SetProjectTransformDetailsAction = (data) => (dispatch) => {
  dispatch({
    type: PROJECTTRANSFORMDETAILS,
    payload: data,
  });
};

export const SetDesignDetailsAction = (data) => (dispatch) => {
  dispatch({
    type: DESIGNDETAILS,
    payload: data,
  });
};

export const loderShowHideAction = (data) => (dispatch) => {
  dispatch({
    type: LOADER,
    payload: data,
  });
};

export const setOpenDetails = (data) => (dispatch) => {
  dispatch({
    type: OPENDETAILS,
    payload: data,
  });
};
