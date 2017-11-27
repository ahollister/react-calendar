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

  componentDidMount() {
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

  getEndOfMonth( month, year ) {
    // Get end of month provided
    let monthMoment = Moment( month + ' ' + year, 'MMMM YYYY' )
    return Moment( monthMoment.daysInMonth() + ' ' + month + ' ' + year, 'DD MMMM YYYY' );
  }

  // This method creates the state for the boundaries of the current month
  // Call this whenever the month changes to re-render based on current month and year state
  createMonth() {
    // Set boundaries of month and render <Day /> components
    let startOfMonth = Moment( this.state.currentMonth + ' ' + this.state.currentYear, 'MMMM YYYY' );
    let endOfMonth = this.getEndOfMonth( this.state.currentMonth, this.state.currentYear );
    let daysInMonth = startOfMonth.daysInMonth();
    let currentDayOffset = this.state.dayOffset[startOfMonth.format( 'dddd' )];
    let previousMonth = Moment( this.state.currentMonth + ' ' + this.state.currentYear, 'MMMM YYYY' ).subtract( 1, 'months' );
    let nextMonth = Moment( this.state.currentMonth + ' ' + this.state.currentYear, 'MMMM YYYY' ).add( 1, 'months' );

    this.setState({
      startOfMonth: startOfMonth,
      endOfMonth: endOfMonth,
      daysInMonth: daysInMonth,
      currentDayOffset: currentDayOffset,
      previousMonth: previousMonth,
      nextMonth: nextMonth,
    }, function() {
      this.createDays();
    });
  }

  createDays() {
    var days = [];
    // Loop to create 42 days (6 rows of 7 days)
    let gridTotal = 42;
    for ( let i = 0; i < gridTotal; i++ ) {
      // If this day is before current month
      if ( i < this.state.currentDayOffset ) {
        // Calculate days from end of previous month
        let daysToSubtract = this.state.currentDayOffset - i - 1;
        let previousMonthFormatted = this.state.previousMonth.format( 'MMMM' );
        let thisDate = this.getEndOfMonth( previousMonthFormatted, this.state.currentYear )
                           .subtract( daysToSubtract, 'days' )
                           .format( 'DD' );
        let thisDay = this.getEndOfMonth( previousMonthFormatted, this.state.currentYear )
                          .subtract( daysToSubtract, 'days' )
                          .format( 'ddd' );

        // Add inactive Day component to array and pass date info as props
        days.push( <Day key={ i }
                        isActive={ false }
                        thisDate={ parseInt(thisDate, 10) }
                        thisDay={ thisDay } /> );
      } else if ( i >= this.state.currentDayOffset + this.state.daysInMonth ) { // If this day is after current month
        // Calculate days from start of next month
        let daysToAdd = ( i + 1 ) - ( this.state.currentDayOffset + this.state.daysInMonth );
        let thisDate = this.getEndOfMonth( this.state.currentMonth, this.state.currentYear )
                           .add( daysToAdd, 'days' ).format( 'DD' );
        let thisDay = this.getEndOfMonth( this.state.currentMonth, this.state.currentYear )
                          .add( daysToAdd, 'days' ).format( 'ddd' );

        // Add inactive Day component to array and pass date info as props
        days.push( <Day key={ i }
                        isActive={ false }
                        thisDate={ thisDate }
                        thisDay={ thisDay } /> );
      } else { // These days fall within the current month
        // Calculate date and day of week
        let thisDate = ( i + 1 ) - this.state.currentDayOffset;
        let thisDay = Moment( thisDate + ' ' + this.state.currentMonth + ' ' + this.state.currentYear, 'DD MMMM YYYY' ).format( 'ddd' );

        // Add active Day component to array
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
