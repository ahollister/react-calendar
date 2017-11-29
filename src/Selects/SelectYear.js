import React, { Component } from 'react';
import './Selects.css';

class SelectYear extends Component {
  constructor() {
    super();

    this.state = {
      options: []
    };
  }

  componentWillMount() {
    // Create year options from 1900 to 2100
    let options = [];
    for ( let i = 1900; i < 2100; i++ ) {
      options.push(
        <option key={ i } value={ i }>
          { i }
        </option>
      );
    }

    this.setState({ options: options });
  }

  setYear( e ) {
    this.props.setCurrentDate( e.target.value, 'year' )
  }

  render() {
    return (
      <select className="date-select"
              value={ this.props.currentYear }
              onChange={ (e) => this.setYear(e) }>
        { this.state.options }
      </select>
    );
  }
}

export default SelectYear;
