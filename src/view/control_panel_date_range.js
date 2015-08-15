import React, { PropTypes } from 'react';
import noUiSlider from '../../vendor/nouislider';

export default React.createClass({
  getInitialState() {
    return { minYear: 1800, maxYear: 3000 };
  },

  onDateRangeChanged(minYear, maxYear) {
    this.setState({ minYear, maxYear });
    this.props.onDateRangeChanged(minYear, maxYear);
  },

  tryNoUiSlider() {
    const { moviesState } = this.props;

    if (this.getDOMNode().noUiSlider === undefined && moviesState.hasFetched) {
      const minYear = moviesState.earliestYear;
      const maxYear = moviesState.latestYear;

      noUiSlider.create(this.getDOMNode(), {
        start: [ minYear, maxYear ],
        direction: 'ltr',
        connect: true,
        range: {
          min: moviesState.earliestYear,
          max: moviesState.latestYear
        },
        behavior: 'tap-drag',
        orientation: 'horizontal',
        pips: {
          mode: 'steps',
        }
      });

      const slider = this.getDOMNode().noUiSlider;
      slider.on('change', ([minYear,maxYear]) => this.onDateRangeChanged(minYear, maxYear));

      this.setState({ minYear, maxYear, slider });
    }
  },

  componentDidMount() {
    this.tryNoUiSlider();
  },

  componentDidUpdate() {
    this.tryNoUiSlider();
  },

  render() {
    return <div></div>;
  },

  propTypes: {
    moviesState: PropTypes.object.isRequired,
    onDateRangeChanged: PropTypes.func.isRequired
  }
});

