// import { combineReducers } from 'redux';
import { REQUEST_MOVIES, RECEIVE_MOVIES } from './actions';

/// TODO: user input reducer

const movieReductions = {
  REQUEST_MOVIES: (state, action) => Object.assign({}, state, { isFetching: true }),
  RECEIVE_MOVIES: (state, action) => Object.assign({}, state, { movies: action.movies })
};

function movies(state = { isFetching: false, movies: [] }, action) {
  let reduction = movieReductions[action.type];

  if (reduction == undefined) {
    return state;
  }

  return reduction(state, action);
}

export default movies;
