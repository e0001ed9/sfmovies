import React, { PropTypes } from 'react';
import ControlPanelFilterText from './control_panel_filter_text';

const placeholder = 'filter...';

export default React.createClass({
  getInitialState() {
    return { text: '' };
  },

  handleChange(e) {
    const text = e.target.value.trim();
    this.setState({ text });
    this.props.onFilterTextChanged(text);
  },

  render() {
    return <div className="filter-text">
             <input type='text'
                    placeholder='filter...'
                    autofocus='true'
                    value={this.state.text}
                    onChange={this.handleChange} />
           </div>;
  },

  propTypes: {
    onFilterTextChanged: PropTypes.func.isRequired
  }
});
