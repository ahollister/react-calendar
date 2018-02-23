import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';
import Title from '../Title/Title.js';
import Pagination from '../Pagination/Pagination.js';
import Day from '../Day/Day.js';
import DateChooser from '../DateChooser/DateChooser.js';
import Utils from '../utils.js';

class App extends Component {
  constructor() {
    super();

    // Set initial state
    this.state = {
      currentDate: Moment(),
      month: {}
    }
  }

  componentWillMount() {
    // onload
      // IF URL has query strings
      if (window.location.search !== '') {
        // Create state based on URL
        this.setStateFromUrl();
        // Update state when user uses 'back' or 'forward' buttons
        window.addEventListener( 'popstate', () => this.setStateFromUrl() );
      }

      var month = Utils.getMonth( this.state.currentDate );
      this.setState({
        month: month
      });
  }

  componentDidMount() {
    console.log( this.state )
  }

  // Set state based on query strings in URL
  setStateFromUrl() {
    let currentMonth = Utils.getQueryString( 'month' );
    let currentYear = Utils.getQueryString( 'year' );

    // Set state and callback to update UI
    this.setState({
      currentDate: Moment( '1' + ' ' + currentMonth + ' ' + currentYear )
    }, function() {
      this.setState({ month: Utils.getMonth( this.state.currentDate ) })
    })
  }

  // Set current month or year based on value of 'type'
  setCurrentDate( date, type ) {
    let stateToUpdate = {};
    if ( type === 'month' ) {
      stateToUpdate = { currentDate: Moment( '1' + ' ' + date + ' ' + this.state.currentDate.format( 'YYYY' ), 'DD MMMM YYYY' ) };
    } else if ( type === 'year' ) {
      stateToUpdate = { currentDate: Moment( '1' + ' ' + this.state.currentDate.format( 'MMMM' ) + ' ' + date, 'DD MMMM YYYY' ) };
    }

    // Update state and callback to update UI
    this.setState( stateToUpdate, function() {
      // Clear current query parameters from URL and add the updated state
      let originalUrl = window.location.href.substring( 0, window.location.href.indexOf( '?' ) );
      window.history.pushState( null, null, originalUrl + "?month=" + this.state.currentDate.format( 'MMMM' ) + "&year=" + this.state.currentDate.format( 'YYYY' ) );
      this.setState({ month: Utils.getMonth( this.state.currentDate ) })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <Title currentMonth={ this.state.month.month }
                 currentYear={ this.state.month.year } />
          <DateChooser currentMonth={ this.state.month.month }
                       currentYear={ this.state.month.year }
                       setCurrentDate={ ( date, type ) => this.setCurrentDate( date, type ) } />
          <Pagination direction="prev"
                      currentMonth={ this.state.month.month }
                      currentYear={ this.state.month.year }
                      setCurrentDate={ ( date, type ) => this.setCurrentDate( date, type ) } />
          <Pagination direction="next"
                      currentMonth={ this.state.month.month }
                      currentYear={ this.state.month.year }
                      setCurrentDate={ (date, type) => this.setCurrentDate( date, type ) } />

        </div>

        <div className="days">
          {this.state.month.daysBefore.map(function(day, i){
            return <Day key={ i }
                        isActive={ false }
                        day={ day } />
          })}
          {this.state.month.days.map(function(day, i){
            return <Day key={ i }
                        isActive={ true }
                        day={ day } />
          })}
          {this.state.month.daysAfter.map(function(day, i){
            return <Day key={ i }
                        isActive={ false }
                        day={ day } />
          })}
        </div>
      </div>
    );
  }
}

export default App;
