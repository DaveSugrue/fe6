import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ITicker } from './ticker'
import { IKrakenResponse } from './kraken.response'

@Injectable()
export class KrakenService {

	private _krakenTickerUrl = 'https://api.kraken.com/0/public/Ticker';

	constructor( private _http: Http){}

	getTicker(): Observable<ITicker> {
		let pair = 'XRPEUR';
		let url: string = this._krakenTickerUrl + '?pair=' + pair;
		console.log('hitting url ' + url);
		return this._http.get(url)
			.map((response: Response) => { 
				console.log('response.json() =' + response.json());
				let resp = <IKrakenResponse>response.json();
				console.log('resp = ' + resp);
				let ticker = resp.result;
				console.log('ticker = ' + ticker);
				console.log('ticker.XXRPZEUR.o = ' + ticker.XXRPZEUR.o);
				console.log('ticker.XXRPZEUR.c[0] = ' + ticker.XXRPZEUR.c[0]);
				return ticker;
			})
			.catch(this.handleError);
	}

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}