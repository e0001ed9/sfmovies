import { REQUEST_MOVIES, RECEIVE_MOVIES, REQUEST_OMDB, RECEIVE_OMDB } from './movie_actions';

// non-destructively update the movie at index
function updateIndex(movies, index, assignment) {
  return [...movies.slice(0, index),
          Object.assign({}, movies[index], assignment),
          ...movies.slice(index+1)];
}

export const movieReductions = {
  [ REQUEST_MOVIES ]: (state) => Object.assign({}, state, { isFetching: true }),
  [ RECEIVE_MOVIES ]: (state, action) => {
    const movies = action.movies.map((movie, index) => Object.assign({}, movie, { index, key: index }));

    const { earliestYear, latestYear } = movies.reduce(({earliestYear, latestYear}, movie) => {
      earliestYear = Math.min(earliestYear, movie.release_year);
      latestYear = Math.max(latestYear, movie.release_year);

      return { earliestYear, latestYear };
    }, { earliestYear: 10000, latestYear: 0 });

    const hasFetched = true;

    return Object.assign({}, state, { movies, earliestYear, latestYear, hasFetched });
  },
  [ REQUEST_OMDB ]: (state, action) => {
    return Object.assign({}, state, {
      movies: updateIndex(state.movies, action.index, { isFetching: true })
    });
  },
  [ RECEIVE_OMDB ]: (state, action) => {
    return Object.assign({}, state, {
      movies: updateIndex(state.movies, action.index, {
        isFetching: false,
        posterUrl: action.metadata.Poster === 'N/A' ? undefined : action.metadata.Poster,
        plot: action.metadata.Plot === 'N/A' ? undefined : action.metadata.Plot,
        imdb: action.metadata.imdbID === undefined ? undefined : `http://www.imdb.com/title/${action.metadata.imdbID}`
      })
    });
  }
};

export const movieInitialState = { isFetching: false, hasFetched: false, movies: [] };
