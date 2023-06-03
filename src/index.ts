interface Config {
    start: number;
    end: number;
    gap: number;
    ampm: boolean;
    noTime: boolean;
    disabled: [number, number][];
    formatedHours: boolean;
}

export default function slotg(config?: Partial<Config>): {[key: number]: string} | boolean {
	const { start, end, disabled, gap, ampm, formatedHours, noTime } = Object.assign(
			{
				start: 0, // day start 
				end: 1440, // day end - total minitues
				gap: 30, // slot gap minitues
				ampm: true,
				noTime: false,
				disabled: [],
				formatedHours: true,
			},
			config || {}
		);

	// basic validation
	if ( start < 0 || gap <= 0 || end > 1440 ) {
		console.error( 'invalid value' );
		return false;
	}

	const toHoursAndMinutes = ( totalMinutes: number ) => {
		const minutes = totalMinutes % 60;
		const hours = Math.floor( totalMinutes / 60 );
		const suffix = hours >= 12 ? 'PM' : 'AM';
		const hours2 = hours % 12 || 12;

		return `${ padTo2Digits(
			formatedHours ? hours2 : hours
		) }:${ padTo2Digits( minutes ) } ${ ampm ? suffix : '' }`.trim();
	};

	const padTo2Digits = ( num: number ) => {
		return num.toString().padStart( 2, '0' );
	};

	const isAvailable = ( timeStart: number ) => {
		if ( disabled.length === 0 || ! Array.isArray( disabled ) ) {
			return true;
		}

		let valid = true;
		let timeEnd = timeStart + gap;

		for ( let i = timeStart; i <= timeEnd; i++ ) {
			for ( let d = 0; d < disabled.length; d++ ) {
				const [ x, y ] = (disabled[d] as unknown as [number, number]);
				if ( x < i && i < y ) {
					valid = false;
					break;
				}
			}
		}

		return valid;
	};

	const slots: {[key: string]: string} = {};

	let l = 0;
	for ( let i = start; i + gap <= end; i++ ) {
		if ( isAvailable( i ) ) {
			if ( l === gap || l === 0 ) {
				const key = i.toString();
				slots[ key ] = toHoursAndMinutes( i );
				l = 0;
			}
			l++;
		} else {
			l = 0;
		}
	}

	return  (noTime ? Object.keys( slots ) : slots) as {[key: number]: string};
};

console.log(slotg({
	gap: 60,
	start: 600,
	end: 1140,
	formatedHours: false,
	disabled: [ [720, 900] ]
}))