import React, { Component } from 'react';
import Moment from 'moment';
import './Pagination.css';

class Pagination extends Component {
  constructor() {
    super();

    this.state = {
      cssClasses: ''
    };
  }

  componentDidMount() {
    // Set state based on direction prop
    if ( this.props.direction === 'prev' ) {
      this.setState({
        cssClasses: 'Pagination Pagination--prev'
      });
    } else if ( this.props.direction === 'next' ) {
      this.setState({
        cssClasses: 'Pagination Pagination--next'
      });
    }
  }

  setMonth( month ) {
    this.props.setMonth( month )
  }

  setYear( year ) {
    this.props.setYear( year )
  }

  paginateMonth() {
    let month = Moment( this.props.currentMonth + ' ' + this.props.currentYear, 'MMMM YYYY' );

    if ( this.props.direction === 'prev' ) {
      let previousMonth = month.subtract( 1, 'month' );
      this.setMonth( previousMonth.format( 'MMMM' ) );

      // If year has changed
      if ( previousMonth.format( 'YYYY' ) !== this.props.currentYear ) {
        this.setYear( previousMonth.format( 'YYYY' ) );
      }
    } else if ( this.props.direction === 'next' ) {
      let nextMonth = month.add( 1, 'month' );
      this.setMonth( nextMonth.format( 'MMMM' ) );

      // If year has changed
      if ( nextMonth.format( 'YYYY' ) !== this.props.currentYear ) {
        this.setYear( nextMonth.format( 'YYYY' ) );
      }
    }
  }

  render() {
    return (
      <div className={ this.state.cssClasses }
           onClick={ () => this.paginateMonth() }></div>
    );
  }
}

export default Pagination;
