import URI from 'URIjs';
import fetch from 'isomorphic-fetch';
import sodaTransformer from './soda_transformer';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

export const REQUEST_OMDB = 'REQUEST_OMDB';
export const RECEIVE_OMDB = 'RECEIVE_OMDB';

// action creators

function requestOmdb(index) {
  return {
    type: REQUEST_OMDB,
    index
  };
}

function receiveOmdb(index, json) {
  return {
    type: RECEIVE_OMDB,
    index,
    metadata: json
  };
}

function requestMovies() {
  return {
    type: REQUEST_MOVIES
  };
}

function receiveMovies(movies) {
  return {
    type: RECEIVE_MOVIES,
    movies: movies
  };
}

// helpers

function handleOmdb(dispatch, movies, index, json) {
  dispatch(receiveOmdb(index, json));
  dispatch(fetchOmdb(movies, index + 1));
}

function fetchOmdb(movies, index=0) {
  return dispatch => {
    if (index < movies.length && movies[index].title !== undefined) {
      dispatch(requestOmdb(index));

      const uri = URI('http://www.omdbapi.com/?y=&plot=short&r=json')
        .query({ t: movies[index].title, year: movies[index].release_year });

      return fetch(uri)
        .then(req => req.json())
        .then(json => handleOmdb(dispatch, movies, index, json));
    } else {
      return true;
    }
  };
}

function handleMovies(dispatch, movies) {
  dispatch(receiveMovies(movies));
  dispatch(fetchOmdb(movies));
}

export function fetchMovies() {
  return dispatch => {
    dispatch(requestMovies());
    return fetch('https://data.sfgov.org/resource/yitu-d5am.json')
      .then(req => req.json())
      .then(json => sodaTransformer(json))
      .then(movies => handleMovies(dispatch, movies));
  };
}

