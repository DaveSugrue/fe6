import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
	name: 'productSearchFilter'
})

export class ProductSearchFilterPipe implements PipeTransform{

	transform(value: IProduct[], filterBy: string): IProduct[] {
		console.log('name changed');
		filterBy = filterBy ? filterBy.toLocaleLowerCase(): null;
		return filterBy ? value.filter((product : IProduct) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
	}
}