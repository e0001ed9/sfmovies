import React from 'react';
import { connect } from 'react-redux';

import { fetchMovies, updateFilterText, updateDateRange, updateShowNoPoster } from '../actions';
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

  onDateRangeChanged(minYear, maxYear) {
    const { dispatch } = this.props;
    dispatch(updateDateRange(minYear, maxYear));
  },

  onShowNoPoster(showNoPoster) {
    const { dispatch } = this.props;
    dispatch(updateShowNoPoster(showNoPoster));
  },

  render() {
    const { moviesState, filters } = this.props;

    return <div className="container">
             <ControlPanel moviesState={moviesState}
                           onFilterTextChanged={this.onFilterTextChanged}
                           onDateRangeChanged={this.onDateRangeChanged}
                           onShowNoPoster={this.onShowNoPoster}/>
             <Movies movies={moviesState.movies} filters={filters}/>
           </div>;
  }
});

export default connect((state) => state)(Container);
