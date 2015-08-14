import React from 'react';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions';
import ControlPanel from './control_panel';
import Movies from './movies';

let Container = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  },

  render() {
    const { movies } = this.props;

    return <div className="container">
             <ControlPanel/>
             <Movies movies={movies}/>
           </div>;
  }
});

function mapStateToProps(state) {
  const { movies } = state;

  return { movies };
}

export default connect(mapStateToProps)(Container);
