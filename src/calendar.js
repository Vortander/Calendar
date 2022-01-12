import CalendarAPI from './CalendarAPI.js';

for ( let m = 1; m <= 12; m++ ) {

	const el_month = document.createElement( 'div' );
	el_month.className = 'month';
	el_month.id = `month-${ m }`;

	for ( let d = 1; d <= 30; d++ ) {
		const el_day = document.createElement( 'div' );
		el_day.className = 'day';
		el_day.id = `day-${ d }`;
		el_day.innerText = d;

		el_month.append( el_day );
	}

	document.getElementById( 'calendar' ).append( el_month );

}

let calendario = new CalendarAPI();
console.log( calendario.computus( 2022 ) );
console.log( calendario.day_of_week( 12, 1 ) );



