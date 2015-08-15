import React from 'react';
import _Masonry from 'react-masonry-component';
import VisibilityDetector from './visibility_detector'
import filteredMovies from '../movie_filters'

const Masonry = _Masonry(React);

const Poster = React.createClass({
  fallback: 'images/fallback.jpg',
  render() {
    const { posterUrl } = this.props;
    return <img src={posterUrl === undefined ? this.fallback : posterUrl}/>;
  }
});

const TitleYear = React.createClass({
  render() {
    const { movie } = this.props;
    const movieTitle = movie.imdb === undefined ?
      movie.title : <a className='imdb-link' href={movie.imdb}>{movie.title}</a>;

    return (
      <div className='title-year'>
        <div className='title'>{movieTitle}</div>
        <div className='year'>{movie.release_year}</div>
      </div>
    );
  }
});

const Director = React.createClass({
  render() {
    const { director } = this.props;
    return (
      <div className='director-wrapper'>by <span className='director-name'>{director}</span></div>
    );
  }
});

const Plot = React.createClass({
  render() {
    const { plot } = this.props;
    return plot === undefined ? false : <div className='plot'>{plot}</div>;
  }
});

const Movie = React.createClass({
  getInitialState() {
    return { visibilityDetector: new VisibilityDetector(this) }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.visibilityDetector.shouldComponentUpdate(nextProps, nextState);
  },

  componentDidMount() {
    this.state.visibilityDetector.componentDidMount();
  },

  componentWillUnmount() {
    this.state.visibilityDetector.componentWillUnmount();
  },

  render() {
    const { movie } = this.props;

    return (
      <div className='movie'>
        <Poster posterUrl={movie.posterUrl}/>
        <div className='details'>
          <TitleYear movie={movie}/>
          <Director director={movie.director}/>
          <Plot plot={movie.plot}/>
        </div>
      </div>
    );
  }
});

/*
function containsFilterText(movie, filters) {
  let { text } = filters;
  text = text.toLowerCase();

  return movie.title.toLowerCase().includes(text) ||
         movie.director.toLowerCase().includes(text) ||
         (movie.plot && movie.plot.toLowerCase().includes(text));
}

function shouldShow(movie, filters) {
  return containsFilterText(movie, filters);
}

function filteredMovies(movies, filters) {
  return movies.filter((elements, movie) => shouldShow(movie,filters));
}
*/

export default React.createClass({
  render() {
    const { movies, filters } = this.props;
    const movieElements = filteredMovies(movies, filters).map((movie) => <Movie movie={movie}/>);
    return <Masonry className='movies'>{movieElements}</Masonry>;
  }
});
