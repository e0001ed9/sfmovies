module.exports = function(rawMovieList) {
  var titles = {};
  var unique = [];

  for (var i = 0; i < rawMovieList.length; i++) {
    if (titles[rawMovieList[i]['title']] == undefined) {
      unique.push(rawMovieList[i]);
      titles[rawMovieList[i]['title']] = 1;
    }
  }

  return unique;
};
