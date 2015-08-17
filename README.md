# sfmovies

A simple frontend project that displays the list of movies shot in San
Francisco based on the SF Open Data API (SODA), pulling plot and IMDB
information from OMDB.

This is my first Javascript project in about 4 years, so take it with
a grain of salt and feel free to spit back suggestions. :)

# Building

To build the project, run:

```
npm install -g gulp
npm install
gulp bundle
```

This pulls the project dependencies and assembles the javascript into
a bundle.js file in the root of the project. Open index.html to view.

## Tests and lint

This project uses jasmine and eslint to test and validate the source.
Run the following, respectively, to execute each:

```
gulp test
gulp lint
```

# Implementation details

## Application dependencies

The application itself has the following major dependencies:

- [redux](https://github.com/rackt/redux) - state containment
- [react](https://facebook.github.io/react/) - view
- [masonry](http://masonry.desandro.com/) - masonry layout (via the
  [masonry-react-component](https://github.com/eiriklv/react-masonry-component))
- [noUiSlider](http://refreshless.com/nouislider/) - dual end slider for year
  ranges. (Installed in the vendor/ directory as there is not actually a
  recent version in NPM at the moment...)

It also uses the following as niceties:

- [URIjs](http://medialize.github.io/URI.js/) - URI builder
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) -
  AJAX with promises rather than XHR

## Architecture

### Store

The data in the application is stored in Redux, fetching data from SODA and
OMDB using the patterns suggested in the [advanced Redux tutorial](http://rackt.github.io/redux/docs/advanced/index.html).

The store has two sections which looks roughly like:
- **moviesState** containing the actual movies list from SODA itself
  (enriched with OMDB data, as it comes in) and some metadata like
  whether the movies have been fetched and their range of release years.
- **filters** containing the state of the filter controls, i.e.
  - filterText that should be found in the title, director, or plot of
  the movie to qualify.
  - minYear/maxYear, the inclusive range of years required for a movie
  to be included.
  - showNoPoster indicating whether to show or hide a movie depending
  on whether it has a poster in OMDB.

### View

The top-level "[smart](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)"
React components in the view are Root (just to hook up the store to the
view) and Container, where the actual application logic happens. All the
other components are "dumb," i.e. they have no idea that Redux is used at
all in application. They merely use injected callbacks which happen to
do Redux actions when appropriate.

There are two main view components mounted in the Container:
- **ControlPanel** into which Container injects callbacks to allow it to update
  the filter control store state. These filters are interpreted in the Movies
  component to decide which movies to show. It also receives the moviesState to
  find out the year range of movies to scale the year selection component
  appropriately.
- **Movies** which actually displays the movies. It receives the movie store and
  the state of the filters so that it can display just those movies that the
  user has selected. Container also injects a callback for when a movie first
  becomes visible. That callback (as implemented by Container) initiates a
  fetch from OMDB to get additional details.

### Actions and Reducers

The actions can be broken into two different categories, much like the store
and view:

- Updates to the moviesState, e.g.
  - REQUEST_MOVIES/RECEIVE_MOVIES indicating how the fetch of the list of movies
  from SODA is going.
  - REQUEST_OMDB/RECEIVE_OMDB indicating how the fetch of a single movie from
  OMDB is going.
- Updates to the filters, e.g.
  - FILTER_TEXT the user changed the text of the filter.
  - SHOW_NO_POSTER the user checked/unchecked the show movies with no poster
  checkbox.
  - CHANGE_DATE_RANGE the user moved one of the date range slider handles.

The reducers then take those actions and incorporate their changes into the
state of the store. They are broken down similarly:

- A reducer for moviesState, depending on the action:
  - marks either the list of movies or a single movie as being fetched (REQUEST_MOVIES/REQUEST_OMDB).
  - populates the list of movies and computes the range of release years
  (RECEIVE_MOVIES).
  - merges the additional data from OMDB into a single movie (RECEIVE_OMDB).
- A reducer for filters that simply updates the filters store as appropriate
  (hopefully obvious from the list of actions above).

## Development environment

This project uses the following on the build/development side:

- [babel](https://babeljs.io/) via [babelify](https://github.com/babel/babelify)
  for ES6 transpilation and JSX.
- [browserify](http://browserify.org/) for browser-side package bundling.
- [karma](http://karma-runner.github.io/) as a test runner.
- [jasmine](http://jasmine.github.io/) for BDD.
- [gulp](http://gulpjs.com/) for building.
- [eslint](http://eslint.org/) for keeping things consistent.
