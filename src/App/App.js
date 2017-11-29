import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';
import Title from '../Title/Title.js';
import Pagination from '../Pagination/Pagination.js';
import Day from '../Day/Day.js';
import DateChooser from '../DateChooser/DateChooser.js';

class App extends Component {
  constructor() {
    super();

    // Set initial state
    this.state = {
      todaysDateFormatted: Moment().format( 'DD MMMM YYYY' ),
      dayOffset: { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 },
    }
  }


  componentDidMount() {
    // Create state based on URL
    this.setStateFromUrl();
    // Update state when user uses 'back' or 'forward' buttons
    window.addEventListener( 'popstate', () => this.setStateFromUrl() );
  }


  // Set state based on query strings in URL
  setStateFromUrl() {
    let currentYear = '';
    let currentMonth = '';
    // If there aren't any query strings
    if ( window.location.href.indexOf( '?' ) === -1 ) {
      currentYear = Moment().format( 'YYYY' );
      currentMonth = Moment().format( 'MMMM' );
    } else {
      currentMonth = this.getQueryString( 'month' );
      currentYear = this.getQueryString( 'year' );
    }

    // Set state and callback to update UI
    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    }, function() {
      this.createMonth();
    });
  }


  // Get value from URL for given key
  getQueryString( key ) {
    var value = window.location.search.match( new RegExp( "[?&]" + key + "=([^&]*)(&?)", "i" ) );
    return value ? value[1] : value;
  }


  // Set current month or year based on value of 'type'
  setCurrentDate( date, type ) {
    let stateToUpdate = {};
    if ( type === 'month' ) {
      stateToUpdate = { currentMonth: date };
    } else if ( type === 'year' ) {
      stateToUpdate = { currentYear: date };
    }

    // Update state and callback to update UI
    this.setState( stateToUpdate, function() {
      // Clear current query parameters from URL and add the updated state
      let originalUrl = window.location.href.substring( 0, window.location.href.indexOf( '?' ) );
      window.history.pushState( null, null, originalUrl + "?month=" + this.state.currentMonth + "&year=" + this.state.currentYear );

      // Update UI
      this.createMonth();
    });
  }


  // Returns Moment() at end of provided month
  getEndOfMonth( month, year ) {
    let monthMoment = Moment( month + ' ' + year, 'MMMM YYYY' );
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


  // Loop to create 42 <Day /> components (6 rows of 7 days)
  createDays() {
    var days = [];
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
                        thisDate={ parseInt( thisDate, 10 ) }
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
          <Title currentMonth={ this.state.currentMonth }
                 currentYear={ this.state.currentYear } />
          <DateChooser currentMonth={ this.state.currentMonth }
                       currentYear={ this.state.currentYear }
                       setCurrentDate={ (date, type) => this.setCurrentDate(date, type) } />
          <Pagination direction="prev"
                      currentMonth={ this.state.currentMonth }
                      currentYear={ this.state.currentYear }
                      setCurrentDate={ (date, type) => this.setCurrentDate(date, type) } />
          <Pagination direction="next"
                      currentMonth={ this.state.currentMonth }
                      currentYear={ this.state.currentYear }
                      setCurrentDate={ (date, type) => this.setCurrentDate(date, type) } />
        </div>
        <div className="days">
          { this.state.days }
        </div>
      </div>
    );
  }
}

export default App;
