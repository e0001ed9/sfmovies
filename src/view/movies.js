import React from 'react';
import _Masonry from 'react-masonry-component';
import inViewportMixin from '../mixins/in_viewport_mixin'

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
    return plot === undefined ?  <div/> : <div className='plot'>{plot}</div>;
  }
});

const Movie = React.createClass({
  mixins: [ inViewportMixin ],

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

export default React.createClass({
  render() {
    const movies = this.props.movies.map((movie) => <Movie movie={movie}/>);
    return <Masonry className='movies'>{movies}</Masonry>;
  }
});
