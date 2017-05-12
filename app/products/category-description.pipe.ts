import { PipeTransform, Pipe } from '@angular/core';
import { ICategory } from './category';

@Pipe({
	name: 'categoryDescriptionPipe'
})

export class CategoryDescriptionPipe implements PipeTransform{

	transform(value: string, categories: ICategory[]): string {
		
		for (let category of categories) {
			if (category.id == value){
				return category.name
			}
		}
		
	}
}