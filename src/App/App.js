import React, { Component } from 'react';
import './App.css';
import Day from '../Day/Day.js';
import SelectMonth from '../Selects/SelectMonth.js';
import Moment from 'moment';

class App extends Component {
  constructor() {
    super();

    var currentYear = Moment().format('YYYY');
    var currentMonth = Moment().format('MMMM');

    this.state = {
      todaysDateFormatted: Moment().format('DD MMMM YYYY'),
      currentYear: currentYear,
      currentMonth: currentMonth,
      dayOffset: { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 },
    }

    // Set start of month
    let startOfMonth = Moment( this.state.currentMonth + ' ' + this.state.currentYear, 'MMMM YYYY' );
    this.state.startOfMonth = startOfMonth;
    // Set end of month
    let endOfMonth = Moment( this.state.startOfMonth.daysInMonth() + ' ' + this.state.currentMonth + ' ' + this.state.currentYear, 'DD MMMM YYYY' );
    this.state.endOfMonth = endOfMonth;
    // Set days in month
    this.state.daysInMonth = this.state.startOfMonth.daysInMonth();
    // Set offset for current month
    let currentDayOffset = this.state.dayOffset[this.state.startOfMonth.format( 'dddd' )];
    this.state.currentDayOffset = currentDayOffset;
  }

  render() {
    var Days = [];
    // Loop to create 35 days (5 rows of 7 days)
    for ( let i = 0; i < 35; i++ ) {
      // If this day is not within current month
      if ( i < this.state.currentDayOffset || i >= this.state.currentDayOffset + this.state.daysInMonth ) {
        // Add inactive Day component to array
        Days.push( <Day key={i} isActive={ false } /> );
      } else {
        // Add active Day component to array
        // and pass date info as props
        let thisDate = ( i + 1 ) - this.state.currentDayOffset;
        let thisDay = Moment( thisDate + ' ' + this.state.currentMonth + ' ' + this.state.currentYear, 'DD MMMM YYYY' ).format('ddd');
        Days.push( <Day key={i}
                        isActive={true}
                        thisDate={thisDate}
                        thisDay={thisDay} /> );
      }
    }

    return (
      <div className="App">
        <SelectMonth currentMonth={this.state.currentMonth} />
        <h1>{ this.state.currentMonth + ' - ' + this.state.currentYear }</h1>
        <div className="days">{ Days }</div>
      </div>
    );
  }
}

export default App;
