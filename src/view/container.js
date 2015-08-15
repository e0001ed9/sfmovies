import React from 'react';
import { connect } from 'react-redux';

import { fetchMovies, updateFilterText } from '../actions';
import ControlPanel from './control_panel';
import Movies from './movies';

let Container = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  },

  onFilterTextChanged(text) {
    const { dispatch } = this.props;
    dispatch(updateFilterText(text));
  },

  render() {
    const { movies } = this.props.movies;
    const { filters } = this.props;

    return <div className="container">
             <ControlPanel onFilterTextChanged={this.onFilterTextChanged}/>
             <Movies movies={movies} filters={filters}/>
           </div>;
  }
});

export default connect((state) => state)(Container);
