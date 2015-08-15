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

export default function(movies, filters) {
  return movies.filter((movie) => shouldShow(movie, filters));
}
