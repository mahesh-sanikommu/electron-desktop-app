import * as types from './types';
import iFetch from 'isomorphic-fetch';
import { validateResponse, standardApiHeaders } from './api-utils';
window.fetch = fetch || iFetch;

export const fetchSpiderDnsInfo = () => dispatch => {
  dispatch({ type: types.SET_DNS.REQUEST });
  return fetch(
    'https://jsonplaceholder.typicode.com/todos/1',
    { credentials: 'same-origin' },
    {
      headers: standardApiHeaders,
      method: 'GET'
    }
  )
    .then(response => validateResponse(response, dispatch))
    .then(
      info => {
        dispatch({
          type: types.SET_DNS.SUCCESS,
          payload: info
        });
      },
      error => {
        dispatch({ type: types.SET_DNS.FAILURE, payload: error });
      }
    );
};
