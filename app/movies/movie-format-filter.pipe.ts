import { PipeTransform, Pipe } from '@angular/core';
import { IMovie } from './movie';

@Pipe({
	name: 'movieFormatFilter'
})

export class MovieFormatFilterPipe implements PipeTransform {

	transform(value: IMovie[], filterBy: string): IMovie[] {
		return filterBy ? value.filter((movie: IMovie) => filterBy.includes(movie.format)) : value;
	}
}
