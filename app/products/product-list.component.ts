import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { IDotsProduct } from './dotsProduct';
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
	dotsProducts: IDotsProduct[] = [];
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
					products => this.products = products,
					error => this.errorMessage = <any>error);
		
		console.log('Populating DotsProducts...');
		this._productService.getDotsProducts()
			.subscribe(
					dotsProducts => {
						this.dotsProducts = dotsProducts
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

		for (let dotsProduct of this.dotsProducts) {
    		console.log(dotsProduct);
			let formatPath = '';
			if (dotsProduct.format == 'B'){
				formatPath = 'bluray/';
			} else if (dotsProduct.format == 'D') {
				formatPath = 'dvd/';
			}

			//Don't show image if none is specified on database
			dotsProduct.show = true
			if (null == dotsProduct.iconUrl) {
				dotsProduct.show = false;
			}

			console.log('Product Name = ' + dotsProduct.name);
			console.log('format = ' + dotsProduct.format);
			console.log('formatPath = ' + formatPath);

			dotsProduct.iconUrl = formatPath + dotsProduct.iconUrl;
			console.log('dotsProduct.iconUrl now = ' + dotsProduct.iconUrl);
			console.log('dotsProduct.show = ' + dotsProduct.show);
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