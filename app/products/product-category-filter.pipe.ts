import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
	name: 'productCategoryFilter'
})

export class ProductCategoryFilterPipe implements PipeTransform{

	transform(value: IProduct[], filterBy: string): IProduct[] {
		return filterBy ? value.filter((product : IProduct) => filterBy.includes(product.categoryId)) : value;
	}
}