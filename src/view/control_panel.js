import React, { PropTypes } from 'react';
import ControlPanelHeader from './control_panel_header';
import ControlPanelFilterText from './control_panel_filter_text';

export default React.createClass({
  render() {
    return <div className="controlpanel">
             <ControlPanelHeader/>
             <ControlPanelFilterText onFilterTextChanged={this.props.onFilterTextChanged}/>
           </div>;
  },

  propTypes: {
    onFilterTextChanged: PropTypes.func.isRequired
  }
});
