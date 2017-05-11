import { PipeTransform, Pipe } from '@angular/core';
import { IDotsProduct } from './dotsProduct';

@Pipe({
	name: 'productCategoryFilter'
})

export class ProductCategoryFilterPipe implements PipeTransform{

	transform(value: IDotsProduct[], filterBy: string): IDotsProduct[] {
		filterBy = filterBy ? filterBy.toLocaleLowerCase(): null;
		return filterBy ? value.filter((product : IDotsProduct) => product.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
	}
}