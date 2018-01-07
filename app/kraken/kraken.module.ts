import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { KrakenComponent }  from './kraken.component';
import { KrakenService } from './kraken.service'

@NgModule({
	declarations: [
		KrakenComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: 'kraken', component: KrakenComponent }
		])
	],
	providers: [
		KrakenService,
	]
})

export class KrakenModule {}