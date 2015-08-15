import React from 'react';
import UninjectedMasonry from 'react-masonry-component';

const Masonry = UninjectedMasonry(React);
const fallback = 'images/fallback.jpg';

export default React.createClass({
  render() {
    let mediaObjects = this.props.movies.map(function(movie) {
      const movieTitle = movie.imdb === undefined ?
        movie.title : <a className='imdb-link' href={movie.imdb}>{movie.title}</a>;
      const plot = movie.plot === undefined ?  '' : <div className='plot'>{movie.plot}</div>;
      return (
        <div className='movie'>
          <img src={movie.posterUrl === undefined ? fallback : movie.posterUrl}/>
          <div className='details'>
            <div className='title-year'>
              <div className='title'>{movieTitle}</div>
              <div className='year'>{movie.release_year}</div>
            </div>
            <div className='director-wrapper'>by <span className='director-name'>{movie.director}</span></div>
            {plot}
          </div>
        </div>
      );
    });

    return <Masonry className='movies'>{mediaObjects}</Masonry>;
  }
});
