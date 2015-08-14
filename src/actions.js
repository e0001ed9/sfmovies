import fetch from 'isomorphic-fetch';
import sodaTransformer from './soda_transformer';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

function requestMovies() {
  return {
    type: REQUEST_MOVIES
  };
}

function receiveMovies(json) {
  return {
    type: RECEIVE_MOVIES,
    movies: sodaTransformer(json)
  };
}

export function fetchMovies() {
  return dispatch => {
    dispatch(requestMovies());
    return fetch('https://data.sfgov.org/resource/yitu-d5am.json')
      .then(req => req.json())
      .then(json => dispatch(receiveMovies(json)));
  }
}
