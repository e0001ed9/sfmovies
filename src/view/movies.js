import React from 'react';

let fallback = 'images/fallback.jpg';

export default React.createClass({
  render() {
    let mediaObjects = this.props.movies.map((movie) =>
      <div className='movie'>
        <img src={movie.posterUrl === undefined ? fallback : movie.posterUrl}/>
        <div className='details'>
          <div className='title'>{movie.title}</div>
          <div className='year'>{movie.release_year}</div>
          <div className='director'>{movie.director}</div>
          <div className='plot'>{movie.plot === undefined ? '' : movie.plot }</div>
        </div>
      </div>
    );

    return <div className='movies'>{mediaObjects}</div>;
  }
});
