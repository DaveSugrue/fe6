import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IProduct } from './product'
import { IDotsProduct } from './dotsProduct'
import { IStatus } from './status'
import { IProductResponse } from './product.response'

@Injectable()
export class ProductService {

	private _productUrl = 'api/products/products.json';
	private _dotsProductUrl = 'http://localhost:8090/product/all';
	
	status: IStatus;
	dotsProducts: IDotsProduct[] = [];

	constructor( private _http: Http){}

	getProducts(): Observable<IProduct[]> {
		return this._http.get(this._productUrl)
			.map((response: Response) => <IProduct[]>response.json())
			.do(data => console.log('All: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	getDotsProducts(): Observable<IDotsProduct[]> {
		return this._http.get(this._dotsProductUrl)
			.map((response: Response) => { 
				console.log('Intial Response = ' + JSON.stringify(response.json()))

				let resp = <IProductResponse>response.json();

				console.log('resp = ' + JSON.stringify(resp));

				let status = resp.status;

				console.log('Status = ' + JSON.stringify(status));

				let dotsProducts = <IDotsProduct[]>resp.object;

				console.log('Products = ' + JSON.stringify(dotsProducts));
				
				return dotsProducts;
			})
			.do(data => console.log('Dots Products = ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}