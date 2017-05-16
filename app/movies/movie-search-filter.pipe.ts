import { PipeTransform, Pipe } from '@angular/core';
import { IMovie } from './movie';

@Pipe({
	name: 'movieSearchFilter'
})

export class MovieSearchFilterPipe implements PipeTransform{

	transform(value: IMovie[], filterBy: string): IMovie[] {
		filterBy = filterBy ? filterBy.toLocaleLowerCase(): null;
		return filterBy ? value.filter((movie : IMovie) => movie.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
	}
}