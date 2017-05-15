import { PipeTransform, Pipe } from '@angular/core';
import { IGenre } from './genre';

@Pipe({
	name: 'genreDescriptionPipe'
})

export class GenreDescriptionPipe implements PipeTransform{

	transform(value: string, genres: IGenre[]): string {
		
		for (let genre of genres) {
			if (genre.id == value){
				return genre.description;
			}
		}
		
	}
}