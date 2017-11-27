import React, { Component } from 'react';
import './App.css';
import Day from '../Day/Day.js';
import SelectMonth from '../Selects/SelectMonth.js';
import SelectYear from '../Selects/SelectYear.js';
import Moment from 'moment';

class App extends Component {
  constructor() {
    super();

    // Set default state
    var currentYear = Moment().format('YYYY');
    var currentMonth = Moment().format('MMMM');
    this.state = {
      todaysDateFormatted: Moment().format('DD MMMM YYYY'),
      currentYear: currentYear,
      currentMonth: currentMonth,
      dayOffset: { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 },
    }
  }

  componentWillMount() {
    // Create UI
    this.createMonth();
  }

  setMonth( month ) {
    // Update currentMonth and callback to update UI
    this.setState({
      currentMonth: month
    }, function() {
      this.createMonth();
    });
  }

  setYear( year ) {
    // Update currentMonth and callback to update UI
    this.setState({
      currentYear: year
    }, function() {
      this.createMonth();
    });
  }

  createMonth() {
    // Set boundaries of month and render Day components
    let startOfMonth = Moment( this.state.currentMonth + ' ' + this.state.currentYear, 'MMMM YYYY' );
    let endOfMonth = Moment( startOfMonth.daysInMonth() + ' ' + this.state.currentMonth + ' ' + this.state.currentYear, 'DD MMMM YYYY' );
    let currentDayOffset = this.state.dayOffset[startOfMonth.format( 'dddd' )];
    let daysInMonth = startOfMonth.daysInMonth();

    this.setState({
      startOfMonth: startOfMonth,
      endOfMonth: endOfMonth,
      daysInMonth: daysInMonth,
      currentDayOffset: currentDayOffset
    }, function() {
      this.createDays();
    });
  }

  createDays() {
    var days = [];
    // Loop to create 35 days (5 rows of 7 days)
    for ( let i = 0; i < 35; i++ ) {
      // If this day is not within current month
      if ( i < this.state.currentDayOffset || i >= this.state.currentDayOffset + this.state.daysInMonth ) {
        // Add inactive Day component to array
        days.push( <Day key={ i }
                        isActive={ false } /> );
      } else {
        // Calculate date and day of week
        let thisDate = ( i + 1 ) - this.state.currentDayOffset;
        let thisDay = Moment( thisDate + ' ' + this.state.currentMonth + ' ' + this.state.currentYear, 'DD MMMM YYYY' ).format( 'ddd' );
        // Add active Day component to array
        // and pass date info as props
        days.push( <Day key={ i }
                        isActive={ true }
                        thisDate={ thisDate }
                        thisDay={ thisDay } /> );
      }
    }
    // Update state
    this.setState({ days: days });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>{ this.state.currentMonth + ' - ' + this.state.currentYear }</h1>
          <div>
            <SelectMonth currentMonth={ this.state.currentMonth }
                         setMonth={ (month) => this.setMonth(month) } />
            <SelectYear currentYear={ this.state.currentYear }
                        setYear={ (year) => this.setYear(year) } />
          </div>
        </div>
        <div className="days">{ this.state.days }</div>
      </div>
    );
  }
}

export default App;
