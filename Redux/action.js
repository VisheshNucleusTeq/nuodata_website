import { LOGIN, PROJECT, CONNECT, TABTYPE } from './type';

export const UserDetails = data => dispatch => {
  dispatch({
    type: LOGIN,
    payload: data
  });
};

export const SetProjectDetailsAction = data => dispatch => {
  dispatch({
    type: PROJECT,
    payload: data,
  });
}

export const SetConnectDetailsAction = data => dispatch => {
  dispatch({
    type: CONNECT,
    payload: data,
  });
}



export const SetTabTypeAction = data => dispatch => {
  dispatch({
    type: TABTYPE,
    payload: data,
  });
}