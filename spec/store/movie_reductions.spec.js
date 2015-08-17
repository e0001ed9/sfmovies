import { REQUEST_MOVIES, RECEIVE_MOVIES, REQUEST_OMDB, RECEIVE_OMDB } from '../../src/store/movie_actions';
import { movieReductions } from '../../src/store/movie_reductions';

describe('movieReductions', () => {
  describe('REQUEST_MOVIES', () => {
    it('updates state\'s isFetching to true', () => {
      const state = { isFetching: false };
      const updatedState = movieReductions[REQUEST_MOVIES](state);

      expect(updatedState).toEqual({ isFetching: true });
    });
  });

  describe('RECEIVE_MOVIES', () => {
    const state = { movies: [] };

    const movies = [{
      'title': '48 Hours',
      'actor_1': 'Nick Nolte',
      'release_year': '1982',
      'production_company': 'Paramount Pictures',
      'distributor': 'Paramount Pictures',
      'actor_2': 'Eddie Murphy',
      'writer': 'Walter Hill',
      'director': 'Walter Hill'
    }, {
      'title' : '180',
      'actor_1' : 'Siddarth',
      'locations' : 'Mason & California Streets (Nob Hill)',
      'release_year' : '2011',
      'production_company' : 'SPI Cinemas',
      'actor_2' : 'Nithya Menon',
      'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
      'director' : 'Jayendra',
      'actor_3' : 'Priya Anand'
    }];

    const action = { type: RECEIVE_MOVIES, movies: movies };
    const updatedState = movieReductions[RECEIVE_MOVIES](state, action);

    it('updates state\'s earliestYear and latestYear', () => {
      expect(updatedState.earliestYear).toEqual(1982);
      expect(updatedState.latestYear).toEqual(2011);
    });

    it('marks state\'s hasFetched as true', () => {
      expect(updatedState.hasFetched).toEqual(true);
    });

    it('sets index field on state\'s movies from movies', () => {
      updatedState.movies.forEach((movie, index) => {
        expect(movie.index).toEqual(index);
      });
    });

    it('sets distinct key fields on state\'s movies from movies', () => {
      const keySet = new Set();

      updatedState.movies.forEach((movie, index) => {
        keySet.add(movie.key);
      });

      expect(keySet.size).toEqual(movies.length);
    });

    it('retains all fields on state\'s movies', () => {
      updatedState.movies.forEach((movie, index) => {
        expect(movie).toImplement(movies[index]);
      });
    });
  });

  describe('REQUEST_OMDB', () => {
    it('updates the appropriate movie\'s isFetching to true', () => {
      const index = 1;
      const state = { movies: [{}, {}] };
      const action = { type: REQUEST_OMDB, index };
      const updatedState = movieReductions[REQUEST_OMDB](state, action);

      expect(updatedState).toEqual({ movies: [{}, { isFetching: true }] });
    });
  });

  describe('RECEIVE_OMDB', () => {
    const omdbResponse = {
      "Title": "180",
      "Year": "2011",
      "Rated": "N/A",
      "Released": "24 Jun 2011",
      "Runtime": "N/A",
      "Genre": "Drama, Romance",
      "Director": "Jayendra",
      "Writer": "Umarji Anuradha (dialogue), Umarji Anuradha, A.N. Balakrishnan (dialogue), Jayendra, D. Suresh (dialogue), Aarthi Videep (subtitles)",
      "Actors": "Siddharth, Nithya Menon, Priya Anand, Tanikella Bharani",
      "Plot": "A young man Ajay (cancer victim) meets two lovely women Renu (wife) and Vidya (journalist) in his life.",
      "Language": "Tamil, Telugu",
      "Country": "India",
      "Awards": "3 nominations.",
      "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ1NDExNTA5Ml5BMl5BanBnXkFtZTcwOTc3MjA2NQ@@._V1_SX300.jpg",
      "Metascore": "N/A",
      "imdbRating": "5.9",
      "imdbVotes": "531",
      "imdbID": "tt1855110",
      "Type": "movie",
      "Response": "True"
    };

    const state = { movies: [{
    },
    {
      'title' : '180',
      'actor_1' : 'Siddarth',
      'locations' : 'Mason & California Streets (Nob Hill)',
      'release_year' : '2011',
      'production_company' : 'SPI Cinemas',
      'actor_2' : 'Nithya Menon',
      'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
      'director' : 'Jayendra',
      'actor_3' : 'Priya Anand'
    }]};

    const action = { type: RECEIVE_OMDB, metadata: omdbResponse, index: 1 };

    it('updates the poster url', () => {
      const updatedState = movieReductions[RECEIVE_OMDB](state, action);
      expect(updatedState.movies[1].posterUrl).toEqual(omdbResponse.Poster);
    });

    it('leaves the poster url as undefined if the poster is "N/A"', () => {
      omdbResponse.Poster = 'N/A';

      const updatedState = movieReductions[RECEIVE_OMDB](state, action);
      expect(updatedState.movies[1].posterUrl).toBe(undefined);
    });

    it('updates the plot', () => {
      const updatedState = movieReductions[RECEIVE_OMDB](state, action);
      expect(updatedState.movies[1].plot).toEqual(omdbResponse.Plot);
    });

    it('leaves the plot as undefined if the poster is "N/A"', () => {
      omdbResponse.Plot = 'N/A';

      const updatedState = movieReductions[RECEIVE_OMDB](state, action);
      expect(updatedState.movies[1].plot).toBe(undefined);
    });

    it('formats the imdb url', () => {
      const updatedState = movieReductions[RECEIVE_OMDB](state, action);
      expect(updatedState.movies[1].imdb).toEqual('http://www.imdb.com/title/tt1855110');
    });

    it('leaves the imdb url as undefined if the imdbID is undefined', () => {
      omdbResponse.imdbID = undefined;

      const updatedState = movieReductions[RECEIVE_OMDB](state, action);
      expect(updatedState.movies[1].imdb).toBe(undefined);
    });
  });
});

