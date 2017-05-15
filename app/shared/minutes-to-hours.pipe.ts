import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'minutesToHoursPipe'
})

export class MinutesToHoursPipe implements PipeTransform{

	transform(value: number): string {
		let minutes: number = value % 60;
		let hours: number = (value - minutes)/60;
		let minutesAsString: string = '00'.concat(minutes.toString()).slice(-2);
		let result: string = hours.toString() + ':' + minutesAsString;

		console.log(value.toString() + ' => ' + result);

		return result;
	}
}