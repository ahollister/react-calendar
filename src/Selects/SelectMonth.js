import React, { Component } from 'react';
import './SelectMonth.css';

class SelectMonth extends Component {
  constructor() {
    super();

    this.state = {
      options: []
    };
  }

  componentWillMount() {
    let options = [];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for ( let i = 0; i < months.length; i++ ) {
      options.push(
        <option key={ i } value={ months[i] }>{ months[i] }</option>
      );
    }

    this.setState({
      options: options
    });
  }

  chooseMonth() {
    alert( 'chooseMonth() ... ' );
  }

  render() {
    return (
      <select value={ this.props.currentMonth }
              onChange={ () => this.chooseMonth() }>
        { this.state.options }
      </select>
    );
  }
}

export default SelectMonth;
