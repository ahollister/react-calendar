import React, { Component } from 'react';
import './DateChooser.css';
import SelectMonth from '../Selects/SelectMonth.js';
import SelectYear from '../Selects/SelectYear.js';

class DateChooser extends Component {
  setMonth( month ) {
    this.props.setMonth( month )
  }

  setYear( year ) {
    this.props.setYear( year )
  }

  render() {
    return (
      <div className="DateChooser">
        <SelectMonth currentMonth={ this.props.currentMonth }
                     setMonth={ (month) => this.setMonth(month) } />
        <SelectYear currentYear={ this.props.currentYear }
                    setYear={ (year) => this.setYear(year) } />
      </div>
    );
  }
}

export default DateChooser;
