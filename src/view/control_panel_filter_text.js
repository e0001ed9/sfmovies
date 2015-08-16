import React, { PropTypes } from 'react';

const placeholder = 'filter...';

export default React.createClass({
  getInitialState() {
    return { text: '', rawText: '' };
  },

  handleChange(e) {
    const rawText = e.target.value;
    const text = rawText.trim();
    this.setState({ text, rawText });
    this.props.onFilterTextChanged(text);
  },

  render() {
    return <div className="filter-text">
             <input type='text'
                    placeholder='filter...'
                    autofocus='true'
                    value={this.state.rawText}
                    onChange={this.handleChange} />
           </div>;
  },

  propTypes: {
    onFilterTextChanged: PropTypes.func.isRequired
  }
});
