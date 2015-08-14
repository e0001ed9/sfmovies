import React from 'react';

let fallback = "images/fallback.jpg";

// ("" +  + "px") }}>
export default React.createClass({
  render() {
    let mediaObjects = this.props.movies.map((movie) =>
      <div className="movie">
        <img src={movie.posterUrl == undefined ? fallback : movie.posterUrl} style={{ height: Math.floor((Math.random() * 100) + 50) }}/>
        <div className="details">
          <div className="title">{movie.title}</div>
          <div className="year">{movie.release_year}</div>
          <div className="director">{movie.director}</div>
          <div className="plot">{movie.plot == undefined ? "" : movie.plot }</div>
        </div>
      </div>
    );

    return <div className="movies">{mediaObjects}</div>;
  }
});
