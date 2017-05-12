import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ICategory } from './category';
import { ProductService } from './product.service';

@Component({
	moduleId: module.id,
	templateUrl: 'product-list.component.html',
	styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit{
	pageTitle: string = 'Product List';
	imageWidth: number = 80;
	imageMargin: number = 2;
	showImage: boolean = false;
	nameFilter: string = '';
	formatFilter: string = 'ABD';
	categoryFilter: string = 'X';
	errorMessage: string;
	products: IProduct[] = [];
	categories: ICategory[] = [];

	constructor(private _productService: ProductService) {
	}

	toggleCategory( category: string ): void {
		this.categoryFilter = this.toggleformatFilter(category, this.categoryFilter);
	}

	toggleFormat( format: string ): void {
		this.formatFilter = this.toggleformatFilter(format, this.formatFilter);
	}
	
	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void{
		console.log('In OnInit');
		console.log('Populating Products...');
		this._productService.getProducts()
			.subscribe(
					products => {
						this.products = products
						this.prependUrls();
					},
					error => this.errorMessage = <any>error);

		console.log('Populating Categories...');
		this._productService.getCategories()
			.subscribe(
					categories => {
						this.categories = categories
					},
					error => this.errorMessage = <any>error);
	}

	prependUrls(): void{
		
		console.log('cycling through icon/image urls and prepending with subfolder depending on format')

		for (let product of this.products) {
    		console.log(product);
			let formatPath = '';
			if (product.format == 'B'){
				formatPath = 'bluray/';
			} else if (product.format == 'D') {
				formatPath = 'dvd/';
			}

			//Don't show image if none is specified on database
			product.show = true
			if (null == product.iconUrl) {
				product.show = false;
			}

			console.log('Product Name = ' + product.name);
			console.log('format = ' + product.format);
			console.log('formatPath = ' + formatPath);

			product.iconUrl = formatPath + product.iconUrl;
			console.log('dotsProduct.iconUrl now = ' + product.iconUrl);
			console.log('dotsProduct.show = ' + product.show);
		}

	}

	onRatingClicked(message: string): void {
		console.log('In onRatingClicked');
		this.pageTitle = 'Updated Product List: ' + message;
	}

	toggleformatFilter(format: string, filter: string): string {
		let index: number = filter.indexOf(format, 0);

		if (index > -1){
			let re = new RegExp(format, "gi");
			filter = filter.replace(re, '');
		} else {
			filter = filter.concat(format);
		}

		return filter;
	}

}