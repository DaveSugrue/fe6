import { PipeTransform, Pipe } from '@angular/core';
import { IMovie } from './movie';

@Pipe({
	name: 'movieGenreFilter'
})

export class MovieGenreFilterPipe implements PipeTransform{

	transform(value: IMovie[], filterBy: string): IMovie[] {
		return filterBy ? value.filter((product : IMovie) => filterBy.includes(product.genreId)) : value;
	}
}