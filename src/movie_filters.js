function containsFilterText(movie, filters) {
  let { text } = filters;
  text = text.toLowerCase();

  return movie.title.toLowerCase().includes(text) ||
         movie.director.toLowerCase().includes(text) ||
         (movie.plot && movie.plot.toLowerCase().includes(text));
}

function includeNoPoster(movie, filters) {
  return filters.showNoPoster || movie.posterUrl !== undefined;
}

function inDateRange(movie, filters) {
  const { minYear, maxYear } = filters;

  return minYear <= movie.release_year && movie.release_year <= maxYear;
}

function shouldShow(movie, filters) {
  return containsFilterText(movie, filters) &&
         includeNoPoster(movie, filters) &&
         inDateRange(movie, filters);
}

export default function(movies, filters) {
  return movies.filter((movie) => shouldShow(movie, filters));
}
