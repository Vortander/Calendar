const MILLISECONDS_PER_DAY = 864e5;

export default class CalendarAPI {

	constructor( ano ) {
		this.days_of_months = [ 31,
								resolve_leap_year( ano ) ? 29 : 28,
								31,
								30,
								31,
								30,
								31,
								31,
								30,
								31,
								30,
								31 ];
			// months = {  : }

	}

	computus( ano ) {

		let b = ano / 100 | 0,
			h = ( 19 * ( ano % 19 ) + b - ( b / 4 | 0 ) - ( ( b - ( ( b + 8 ) / 25 | 0 ) + 1 ) / 3 | 0 ) + 15 ) % 30,
			l = ( 32 + 2 * ( b % 4 ) + 2 * ( ( ano % 100 ) / 4 | 0 ) - h - ( ano % 100 ) % 4 ) % 7,
			m = ( ano % 19 + h * 11 + l * 22 ) / 451 | 0,
			p = ( h + l - 7 * m + 114 ) / 31 | 0,
			q = ( h + l - 7 * m + 114 ) % 31;

			// {
			// 	easter_day : q + 1,
			// 	easter_month : p
			// };
			return new Date( ano, p - 1, q + 1 );

	}

	corpus_Christi( easter_date ) {
		return new Date( easter_date + 60 * MILLISECONDS_PER_DAY );
	}

	carnival( easter_date ) {
		return new Date( easter_date - 47 * MILLISECONDS_PER_DAY );
	}

	resolve_leap_year( ano ) {
		return ( ano % 4 == 0 && !ano % 100 ==0 || ano % 400 == 0 );
	}

	julian_days( day, month, year ) {

		let c;

		if ( month < 3 ) {
			year--;
			month += 12;
		}

		if ( year == 1582 && month == 10 && day <= 4 ) {
			c = 0;
		}
		else {
			// |0 = (int) typecasting, / (division) before | (or)
			c = 2 - ( year / 100 | 0 ) + ( ( year / 100 | 0 ) / 4 | 0 );
		}

		return ( 365.25 * ( year + 4716 ) + ( 30.6001 * ( month + 1 ) | 0 ) + day + c - 1524 ) | 0;

	}
}