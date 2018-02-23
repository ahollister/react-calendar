import { Component } from 'react';
import Moment from 'moment';

class Utils extends Component {
  // Returns value from URL query str for given key
  static getQueryString(key) {
    var value = window.location.search.match( new RegExp( '[?&]' + key + '=([^&]*)(&?)', 'i' ) );
    return value ? value[1] : value;
  }

  static getMonth( currentDate ) {
    let lengthOfMonth = parseInt( currentDate.endOf( 'month' ).format( 'DD' ), 10 );
    let lengthOfDaysBefore = parseInt( Math.floor( ( 42 - lengthOfMonth ) / 2 ), 10 );
    let lengthOfDaysAfter = 42 - ( lengthOfMonth + lengthOfDaysBefore );

    let daysAfterStart = Moment( currentDate.format( 'DD' ) + ' ' + currentDate.format( 'MMMM' ) + ' ' + currentDate.format( 'YYYY' ), 'DD-MMMM-YYYY' );
    daysAfterStart.add( 1, 'month' ).startOf( 'month' ).subtract( 1, 'days' );

    let daysBeforeStart = Moment( currentDate.format( 'DD' ) + ' ' + currentDate.format( 'MMMM' ) + ' ' + currentDate.format( 'YYYY' ), 'DD-MMMM-YYYY' );
    daysBeforeStart.subtract( 1, 'month' )
                   .endOf( 'month' )
                   .subtract( lengthOfDaysBefore, 'days' );

    let output = {
      year: currentDate.format( 'YYYY' ),
      month: currentDate.format( 'MMMM' ),
      days: this.getDays( currentDate.startOf( 'month' ).subtract( 1, 'days' ), lengthOfMonth ),
      daysBefore: this.getDays( daysBeforeStart, lengthOfDaysBefore ),
      daysAfter: this.getDays( daysAfterStart, lengthOfDaysAfter ),
    }
    return output;
  }

  static getDays( currentDate, maxLength ) {
    let days = [];
    // Loop to end of maxLength
    for ( let i = 0; i < maxLength; i++ ) {
      // Increment the day
      currentDate.add( 1, 'days' );
      // Push day objects into array
      let day = Moment( currentDate.format( 'MM' ) + ' ' + currentDate.format( 'DD' ) + ' ' + currentDate.format( 'YYYY' ), 'MM-DD-YYYY' );
      days.push( day );
    }
    return days;
  }
}
export default Utils;
