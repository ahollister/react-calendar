import React, { Component } from 'react';
import './Day.css'

class Day extends Component {
  constructor() {
    super()
    this.state = {
      classNames: 'day',
      dayContent: []
    };
  }

  render() {
    if ( this.props.isActive ) {
      return (
        <div className="day">
          <div className="date">{ String(this.props.thisDate) }</div>
          <div className="day-of-week">{ this.props.thisDay }</div>
        </div>
      );
    } else {
      return (
        <div className="day day--inactive"></div>
      );
    }
  }
}

export default Day;
