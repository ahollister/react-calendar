import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  constructor() {
    super();
    this.state = {
      classNames: 'day',
      dayContent: []
    };
  }

  render() {
    if ( this.props.isActive ) {
      return (
        <div className="Day">
          <div className="date">{ String(this.props.thisDate) }</div>
          <div className="day-of-week">{ this.props.thisDay }</div>
        </div>
      );
    } else {
      return (
        <div className="Day Day--inactive"></div>
      );
    }
  }
}

export default Day;
