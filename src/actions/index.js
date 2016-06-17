import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3030';

export function login( email, password ) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        console.log(response);

        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER,payload: response.data });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function logout() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
