import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MinutesToHoursPipe } from '../shared/minutes-to-hours.pipe'

import { MovieListComponent }  from './movie-list.component';
import { GenreDescriptionPipe } from './genre-description.pipe';
import { MovieSearchFilterPipe } from './movie-search-filter.pipe';
import { MovieGenreFilterPipe } from './movie-genre-filter.pipe';
import { MovieFormatFilterPipe } from './movie-format-filter.pipe';
import { MovieService } from './movie.service'

@NgModule({
	declarations: [
		MovieListComponent,
		GenreDescriptionPipe,
		MovieSearchFilterPipe,
		MovieFormatFilterPipe,
		MovieGenreFilterPipe,
		MinutesToHoursPipe
	],
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: 'movies', component: MovieListComponent },
		])
	],
	providers: [
		MovieService,
	]
})

export class MovieModule {}