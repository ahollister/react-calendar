import React, { Component } from 'react';
import './selects.css';

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
        <option key={ i } value={ i }>{ i }</option>
      );
    }

    this.setState({ options: options });
  }

  setYear( e ) {
    this.props.setYear( e.target.value )
  }

  render() {
    return (
      <select value={ this.props.currentYear }
              className="date-select"
              onChange={ (e) => this.setYear(e) }>
        { this.state.options }
      </select>
    );
  }
}

export default SelectYear;
