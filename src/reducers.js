import { combineReducers } from 'redux';
import { FILTER_TEXT, REQUEST_MOVIES, RECEIVE_MOVIES, REQUEST_OMDB, RECEIVE_OMDB } from './actions';

const userInputReductions = {
  [ FILTER_TEXT ]: (state, action) => Object.assign({}, state, { text: action.text })
};

const movieReductions = {
  [ REQUEST_MOVIES ]: (state) => Object.assign({}, state, { isFetching: true }),
  [ RECEIVE_MOVIES ]: (state, action) => Object.assign({}, state, { movies: action.movies }),
  [ REQUEST_OMDB ]: (state, action) => {
    // currently unused
    return Object.assign({}, state, {
      movies: updateIndex(state.movies, action.index, { isFetching: true })
    });
  },
  [ RECEIVE_OMDB ]: (state, action) => {
    return Object.assign({}, state, {
      movies: updateIndex(state.movies, action.index, {
        posterUrl: action.metadata.Poster === 'N/A' ? undefined : action.metadata.Poster,
        plot: action.metadata.Plot === 'N/A' ? undefined : action.metadata.Plot,
        imdb: action.metadata.imdbID === undefined ? undefined : `http://www.imdb.com/title/${action.metadata.imdbID}`
      })
    });
  }
};

// non-destructively update the movie at index
function updateIndex(movies, index, assignment) {
  return [...movies.slice(0, index),
          Object.assign({}, movies[index], assignment),
          ...movies.slice(index+1)];
}

function createReducer(reductions, initialState = {}) {
  return function(state = initialState, action) {
    let reduction = reductions[action.type];

    if (reduction === undefined) {
      return state;
    }

    return reduction(state, action);
  };
}

export default combineReducers({
  filters: createReducer(userInputReductions, { text: '' } ),
  movies: createReducer(movieReductions, { isFetching: false, movies: [] })
});
