import React, { PropTypes } from 'react';
import ControlPanelHeader from './control_panel_header';
import ControlPanelFilterText from './control_panel_filter_text';
import ControlPanelShowNoPoster from './control_panel_show_no_poster';
import ControlPanelDateRange from './control_panel_date_range';

export default React.createClass({
  render() {
    return <div className="controlpanel">
             <ControlPanelHeader/>
             <div className='text-shownoposter'>
               <ControlPanelFilterText onFilterTextChanged={this.props.onFilterTextChanged}/>
               <ControlPanelShowNoPoster onShowNoPoster={this.props.onShowNoPoster}/>
             </div>
             <ControlPanelDateRange moviesState={this.props.moviesState} onDateRangeChanged={this.props.onDateRangeChanged}/>
           </div>;
  },

  propTypes: {
    moviesState: PropTypes.object.isRequired,
    onFilterTextChanged: PropTypes.func.isRequired,
    onDateRangeChanged: PropTypes.func.isRequired,
    onShowNoPoster: PropTypes.func.isRequired
  }
});
