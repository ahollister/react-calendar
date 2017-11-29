import React, { Component } from 'react';
import './DateChooser.css';
import SelectMonth from '../Selects/SelectMonth.js';
import SelectYear from '../Selects/SelectYear.js';

class DateChooser extends Component {
  setCurrentDate( date, type ) {
    this.props.setCurrentDate( date, type )
  }

  render() {
    return (
      <div className="DateChooser">
        <SelectMonth currentMonth={ this.props.currentMonth }
                     setCurrentDate={ (date, type) => this.setCurrentDate(date, type) } />
        <SelectYear currentYear={ this.props.currentYear }
                    setCurrentDate={ (date, type) => this.setCurrentDate(date, type) } />
      </div>
    );
  }
}

export default DateChooser;
