export default function(rawMovieList) {
  var titles = {};
  var unique = [];

  for (var i = 0; i < rawMovieList.length; i++) {
    const title = rawMovieList[i]['title'].trim();
    if (titles[title] === undefined) {
      unique.push(rawMovieList[i]);
      titles[title] = 1;
    }
  }

  return unique;
}
