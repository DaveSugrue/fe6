import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IProduct} from './product';
import {IDotsProduct} from './dotsProduct';
import {ProductService} from './product.service';

@Component({
	moduleId: module.id,
	templateUrl: 'product-list.component.html',
	styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit{
	pageTitle: string = 'Product List';
	imageWidth: number = 50;
	imageMargin: number = 2;
	showImage: boolean = false;
	listFilter: string = '';
	errorMessage: string;
	products: IProduct[] = [];
	dotsProducts: IDotsProduct[] = [];

	constructor(private _productService: ProductService) {
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
					dotsProducts => this.dotsProducts = dotsProducts,
					error => this.errorMessage = <any>error);
	}

	onRatingClicked(message: string): void {
		console.log('In onRatingClicked');
		this.pageTitle = 'Updated Product List: ' + message;
	}
}