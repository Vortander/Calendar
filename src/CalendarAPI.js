const MILLISECONDS_PER_DAY = 864e5;

export default class CalendarAPI {

	#current_year;
	#days_of_months;
	#months;
	#week_short_name;
	#week_full_name;

	constructor( anno = new Date().getFullYear() ) {
		this.#current_year = anno;

		this.#days_of_months = [ 31,
								this.resolve_leap_year( anno ) ? 29 : 28,
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

		this.#months = { 1: [ 'January', 	'Janeiro' ],
						 2: [ 'February', 	'Fevereiro' ],
						 3: [ 'March', 		'Março' ],
						 4: [ 'April', 		'Abril' ],
						 5: [ 'May', 		'Maio' ],
						 6: [ 'June', 		'Junho' ],
						 7: [ 'July', 		'Julho' ],
						 8: [ 'August', 	'Agosto' ],
						 9: [ 'September', 	'Setembro' ],
						 10: [ 'October', 	'Outubro' ],
						 11: [ 'November', 	'Novembro' ],
						 12: [ 'December', 	'Dezembro' ] };

		this.#week_short_name = { 0: [ 'Sun', 'Dom' ],
								 1: [ 'Mon', 'Seg' ],
								 2: [ 'Tue', 'Ter' ],
								 3: [ 'Wed', 'Qua' ],
								 4: [ 'Thu', 'Qui' ],
								 5: [ 'Fry', 'Sex' ],
								 6: [ 'Sat', 'Sáb' ]  };

		this.#week_full_name = { 0: [ 'Sunday', 'Domingo' ],
								 1: [ 'Monday', 'Segunda-feira' ],
								 2: [ 'Tuesday', 'Terça-feira' ],
								 3: [ 'Wednesday', 'Quarta-feira' ],
								 4: [ 'Thu', 'Quinta-feira' ],
								 5: [ 'Fry', 'Sexta-feira' ],
								 6: [ 'Sat', 'Sábado' ]  };

	}

	computus( year = this.#current_year ) {
		let b = year / 100 | 0,
			h = ( 19 * ( year % 19 ) + b - ( b / 4 | 0 ) - ( ( b - ( ( b + 8 ) / 25 | 0 ) + 1 ) / 3 | 0 ) + 15 ) % 30,
			l = ( 32 + 2 * ( b % 4 ) + 2 * ( ( year % 100 ) / 4 | 0 ) - h - ( year % 100 ) % 4 ) % 7,
			m = ( year % 19 + h * 11 + l * 22 ) / 451 | 0,
			p = ( h + l - 7 * m + 114 ) / 31 | 0,
			q = ( h + l - 7 * m + 114 ) % 31;

			// {
			// 	easter_day : q + 1,
			// 	easter_month : p
			// };
			return new Date( year, p - 1, q + 1 );
	}

	day_of_week( day, month, year = this.#current_year ) {
		let a = ( 12 - month ) / 10 | 0,
			b = year - a,
			c = month + ( 12 * a ),
			d = b  / 100 | 0,
			e = d / 4 | 0,
			j = ( 2 - d + e + ( 365.25 * b | 0 ) + ( 30.6001 * ( c + 1 ) | 0 ) + day + 5 ) % 7;
			// 0 = sáb, 1 = dom ... 6 = sex

		return ( j == 0 ) ? 6 : --j; // j - 1, do not use j--
	}

	corpus_Christi( easter_date ) {
		return new Date( easter_date + 60 * MILLISECONDS_PER_DAY );
	}

	carnival( easter_date ) {
		return new Date( easter_date - 47 * MILLISECONDS_PER_DAY );
	}

	resolve_leap_year( anno ) {
		return ( anno % 4 == 0 && !anno % 100 ==0 || anno % 400 == 0 );
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