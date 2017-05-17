import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StarComponent } from './star.component';
import { MinutesToHoursPipe } from './minutes-to-hours.pipe';

@NgModule({
	declarations: [
		StarComponent,
		MinutesToHoursPipe
	],
	imports: [
		CommonModule
	],
	exports: [
		CommonModule,
		FormsModule,
		StarComponent,
		MinutesToHoursPipe
	]
})

export class SharedModule {}
