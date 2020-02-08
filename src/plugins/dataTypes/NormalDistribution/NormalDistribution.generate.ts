import { DTGenerateReturnType, GenerationData } from '../../../../types/dataTypes';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const generate = (data: GenerationData): DTGenerateReturnType => {
	const { mean, stddev, precision } = data.rowState;

	return {
		display: Math.round(gaussMs(mean, stddev), precision)
	};
};

//  Adjust our gaussian random to fit the mean and standard deviation
//  The division by 4 is an arbitrary value to help fit the distribution
//      within our required range, and gives a best fit for $stddev = 1.0
const gaussMs = (mean: number, stddev: number) => {
	return gauss() * (stddev / 4) + mean;
};

let useExists = false;
let useValue: number;
const gauss = () => {
	if (useExists) {
		//  Use value from a previous call to this function
		useExists = false;
		return useValue;
	} else {
		//  Polar form of the Box-Muller transformation
		let w = 2.0;
		let x = 0;
		let y = 0;
		while ((w >= 1.0) || (w === 0.0)) {
			x = random_PN();
			y = random_PN();
			w = (x * x) + (y * y);
		}
		w = Math.sqrt((-2.0 * Math.log(w)) / w);

		//  Set value for next call to this function
		useValue = y * w;
		useExists = true;
		
		return x * w;
	}
}

//  returns random number using mt_rand() with a flat distribution from -1 to 1 inclusive
const random_PN = () => (2.0 * random_0_1()) - 1.0;

const random_0_1 = () => {
	// return (float) mt_rand() / (float) mt_getrandmax() ;
	return -1; // temp
}

export const getMetadata = (): ExportTypeMetadata => ({
	sql: {
		field: 'varchar(100)'
	}
});
