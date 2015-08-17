import URI from 'URIjs';
import fetch from 'isomorphic-fetch';
import sodaTransformer from './soda_transformer';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

export const REQUEST_OMDB = 'REQUEST_OMDB';
export const RECEIVE_OMDB = 'RECEIVE_OMDB';

export const FILTER_TEXT = 'FILTER_TEXT';
export const SHOW_NO_POSTER = 'SHOW_NO_POSTER';
export const CHANGE_DATE_RANGE = 'CHANGE_DATE_RANGE';

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
    movies
  };
}

function filterText(text) {
  return {
    type: FILTER_TEXT,
    text
  };
}

function changeDateRange(minYear, maxYear) {
  return {
    type: CHANGE_DATE_RANGE,
    minYear,
    maxYear
  };
}

function changeShowNoPoster(showNoPoster) {
  return {
    type: SHOW_NO_POSTER,
    showNoPoster
  };
}

// helpers

// on 2015-08-15, OMDB was generating json where some of
// the values were not quoted on both sides of the value,
// making it unparseable. This should fix that issue, but
// also be safe for properly formatted json. Seems to be
// fixed as of 2015-08-16.
function repairBrokenOmdbJson(text) {
  return text.replace(/([^"]),"/g, '$1","');
}

export function fetchOmdb(movie) {
  return (dispatch) => {
    dispatch(requestOmdb(movie.index));

    const uri = URI('http://www.omdbapi.com/')
      .query({
        t: movie.title,
        year: parseInt(movie.release_year),
        plot: 'short',
        r: 'json'
      });

    return fetch(uri)
      .then(req => req.text())
      .then(text => JSON.parse(repairBrokenOmdbJson(text)))
      .then(json => dispatch(receiveOmdb(movie.index, json)));
  };
}

export function fetchMovies() {
  return (dispatch) => {
    dispatch(requestMovies());
    return fetch('https://data.sfgov.org/resource/yitu-d5am.json')
      .then(req => req.json())
      .then(json => sodaTransformer(json))
      .then(movies => dispatch(receiveMovies(movies)));
  };
}

export function updateFilterText(text) {
  return dispatch => dispatch(filterText(text));
}

export function updateDateRange(minYear, maxYear) {
  return dispatch => dispatch(changeDateRange(minYear, maxYear));
}

export function updateShowNoPoster(showNoPoster) {
  return dispatch => dispatch(changeShowNoPoster(showNoPoster));
}

