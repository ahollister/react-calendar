import { Component } from 'react';
import Moment from 'moment';

class Utils extends Component {
	// Returns value from URL query str for given key
	static getQueryString(key) {
    var value = window.location.search.match( new RegExp( '[?&]' + key + '=([^&]*)(&?)', 'i' ) );
    return value ? value[1] : value;
  }

	// Returns Moment() at end of provided month
	static getEndOfMonth( month, year ) {
    let monthMoment = Moment( month + ' ' + year, 'MMMM YYYY' );
    return Moment( monthMoment.daysInMonth() + ' ' + month + ' ' + year, 'DD MMMM YYYY' );
  }

	static getMonth( currentDate ) {
		/*
		Return this:
			{
				month: February,
				year: 2018,
				days: [
					{date: 1, day: Monday},
					{date: 2, day: Tuesday},
					{date: 3, day: Wednesday},
					{date: 4, day: Thursday}
				]
			}
		*/

		console.log( currentDate.format('YYYY'))

		let output = {
			year: currentDate.format('YYYY'),
			month: currentDate.format('MMMM'),
			days: []
		}
		// Find length of month in days
		// Loop to that number
			// Push day objects into array

			return output;
	}
}
export default Utils;
