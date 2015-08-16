import { combineReducers } from 'redux';
import { FILTER_TEXT, CHANGE_DATE_RANGE, SHOW_NO_POSTER } from './actions';
import { REQUEST_MOVIES, RECEIVE_MOVIES, REQUEST_OMDB, RECEIVE_OMDB } from './actions';

const userInputReductions = {
  [ FILTER_TEXT ]: (state, action) => {
    return Object.assign({}, state, { text: action.text });
  },
  [ CHANGE_DATE_RANGE ]: (state, action) => {
    return Object.assign({}, state, { minYear: action.minYear, maxYear: action.maxYear});
  },
  [ SHOW_NO_POSTER ]: (state, action) => {
    return Object.assign({}, state, { showNoPoster: action.showNoPoster });
  }
};

const movieReductions = {
  [ REQUEST_MOVIES ]: (state) => Object.assign({}, state, { isFetching: true }),
  [ RECEIVE_MOVIES ]: (state, action) => {
    const movies = action.movies.map((movie, index) => Object.assign({}, movie, { key: index }));

    const { earliestYear, latestYear } = movies.reduce(({earliestYear, latestYear}, movie) => {
      earliestYear = Math.min(earliestYear, movie.release_year);
      latestYear = Math.max(latestYear, movie.release_year);

      return { earliestYear, latestYear };
    }, { earliestYear: 10000, latestYear: 0 });

    const hasFetched = true;

    return Object.assign({}, state, { movies, earliestYear, latestYear, hasFetched })
  },
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
  filters: createReducer(userInputReductions, { text: '', minYear: 1800, maxYear: 3000, showNoPoster: true } ),
  moviesState: createReducer(movieReductions, { isFetching: false, movies: [] })
});
