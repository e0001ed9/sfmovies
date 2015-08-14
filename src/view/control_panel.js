import React from 'react';
import ControlPanelHeader from './control_panel_header';

export default React.createClass({
  render: function() {
    return <div className="controlpanel">
             <ControlPanelHeader/>
           </div>;
  }
});
