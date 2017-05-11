import { PipeTransform, Pipe } from '@angular/core';
import { IDotsProduct } from './dotsProduct';

@Pipe({
	name: 'productFormatFilter'
})

export class ProductFormatFilterPipe implements PipeTransform{

	transform(value: IDotsProduct[], filterBy: string[]): IDotsProduct[] {
		return filterBy ? value.filter((product : IDotsProduct) => filterBy.includes(product.format)) : value;
	}
}