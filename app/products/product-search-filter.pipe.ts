import { PipeTransform, Pipe } from '@angular/core';
import { IDotsProduct } from './dotsProduct';

@Pipe({
	name: 'productSearchFilter'
})

export class ProductSearchFilterPipe implements PipeTransform{

	transform(value: IDotsProduct[], filterBy: string): IDotsProduct[] {
		console.log('name changed');
		filterBy = filterBy ? filterBy.toLocaleLowerCase(): null;
		return filterBy ? value.filter((product : IDotsProduct) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
	}
}