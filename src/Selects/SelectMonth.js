import React, { Component } from 'react';
import './Selects.css';

class SelectMonth extends Component {
  constructor() {
    super();

    this.state = {
      options: []
    };
  }

  componentWillMount() {
    // Create month options
    let options = [];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for ( let i = 0; i < months.length; i++ ) {
      options.push( <option key={ i } value={ months[i] }>{ months[i] }</option> );
    }

    this.setState({ options: options });
  }

  setMonth( e ) {
    this.props.setCurrentDate( e.target.value, 'month' );
  }

  render() {
    return (
      <select value={ this.props.currentMonth }
              className="date-select"
              onChange={ (e) => this.setMonth(e) }>
        { this.state.options }
      </select>
    );
  }
}

export default SelectMonth;
