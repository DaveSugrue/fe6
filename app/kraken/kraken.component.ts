import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITicker } from './ticker';
import { KrakenService } from './kraken.service';

@Component({
	moduleId: module.id,
	templateUrl: 'kraken.component.html'
})

export class KrakenComponent implements OnInit{
	pageTitle: string = 'Kraken';
	ticker: ITicker;
	errorMessage: string;
	openPrice: number;
	lastTradeClosed: number;

	constructor(private _krakenService: KrakenService) {
	}

	ngOnInit(): void{
		this._krakenService.getTicker()
			.subscribe(
					ticker => {
						this.ticker = ticker;
						this.openPrice = this.ticker.XXRPZEUR.o
						this.lastTradeClosed = this.ticker.XXRPZEUR.c[0];
					},
					error => {
						this.errorMessage = <any>error;
						console.log('ERROR !!! ' + this.errorMessage);
					});
		
	}

}