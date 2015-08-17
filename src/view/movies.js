import React, { PropTypes } from 'react';
import _Masonry from 'react-masonry-component';
import Spinner from './spinner';
import VisibilityDetector from './visibility_detector';
import filteredMovies from '../movie_filters';

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
  },

  propTypes: {
    movie: PropTypes.object.isRequired
  }
});

const Director = React.createClass({
  render() {
    const { director } = this.props;
    return (
      <div className='director-wrapper'>by <span className='director-name'>{director}</span></div>
    );
  },

  propTypes: {
    director: PropTypes.string.isRequired
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
    return { visibilityDetector: new VisibilityDetector(this, this.onFirstRender) };
  },

  onFirstRender() {
    this.props.onMovieVisible(this.props.movie);
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
        { movie.isFetching ? <Spinner/> : '' }
        <Poster posterUrl={movie.posterUrl}/>
        <div className='details'>
          <TitleYear movie={movie}/>
          <Director director={movie.director}/>
          <Plot plot={movie.plot}/>
        </div>
      </div>
    );
  },

  propTypes: {
    movie: PropTypes.object.isRequired,
    onMovieVisible: PropTypes.func.isRequired
  }
});

export default React.createClass({
  render() {
    const { movies, filters } = this.props;
    const movieElements = filteredMovies(movies, filters).map((movie) => {
      return <Movie movie={movie} key={movie.key} onMovieVisible={this.props.onMovieVisible}/>;
    });

    const masonryOptions = { isFitWidth: true };

    return <Masonry className='movies' options={masonryOptions}>{movieElements}</Masonry>;
  },

  propTypes: {
    movies: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    onMovieVisible: PropTypes.func.isRequired
  }
});
