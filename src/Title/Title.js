import React, { Component } from 'react';
import './Title.css';

class Title extends Component {
  render() {
    return (
      <h1 className="title">
        { this.props.currentMonth + ' - ' + this.props.currentYear }
      </h1>
    );
  }
}

export default Title;