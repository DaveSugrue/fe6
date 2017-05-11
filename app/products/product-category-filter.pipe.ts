import { PipeTransform, Pipe } from '@angular/core';
import { IDotsProduct } from './dotsProduct';

@Pipe({
	name: 'productCategoryFilter'
})

export class ProductCategoryFilterPipe implements PipeTransform{

	transform(value: IDotsProduct[], filterBy: string): IDotsProduct[] {
		return filterBy ? value.filter((product : IDotsProduct) => filterBy.includes(product.categoryId)) : value;
	}
}