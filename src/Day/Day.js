import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    let cssClasses = '';
    if ( this.props.isActive ) {
      cssClasses = 'Day';
    } else {
      cssClasses = 'Day Day--inactive';
    }

    return (
      <div className={ cssClasses }>
        <div className="date">{ String(this.props.thisDate) }</div>
        <div className="day-of-week">{ this.props.thisDay }</div>
      </div>
    );
  }
}

export default Day;
