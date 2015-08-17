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

      // make pip marks at each decade as well as the min and max year
      let pipValues = [];
      for (let i = minYear; i <= maxYear; i++) {
        if (i === minYear || i === maxYear || i % 10 === 0) {
          pipValues.push(i);
        }
      }

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
          mode: 'values',
          values: pipValues
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
    return <div className='daterange'></div>;
  },

  propTypes: {
    moviesState: PropTypes.object.isRequired,
    onDateRangeChanged: PropTypes.func.isRequired
  }
});

