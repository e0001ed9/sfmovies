import React, { PropTypes } from 'react';

export default React.createClass({
  getInitialState() {
    return { showNoPoster: true };
  },

  handleChange(e) {
    console.log("showNoPoster");
    console.log(e);
    this.setState({ showNoPoster: e.target.checked });
    this.props.onShowNoPoster(e.target.checked);
  },

  render() {
    return <div className="shownoposter">
             Show movies without posters
             <input type='checkbox'
                    defaultChecked={this.state.showNoPoster}
                    onChange={this.handleChange} />
           </div>;
  },

  propTypes: {
    onShowNoPoster: PropTypes.func.isRequired
  }
});

