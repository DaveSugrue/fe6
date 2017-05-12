import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
	name: 'productFormatFilter'
})

export class ProductFormatFilterPipe implements PipeTransform{

	transform(value: IProduct[], filterBy: string): IProduct[] {
		return filterBy ? value.filter((product : IProduct) => filterBy.includes(product.format)) : value;
	}
}