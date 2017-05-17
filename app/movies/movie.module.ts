import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MovieListComponent }  from './movie-list.component';
import { MovieListServicedComponent }  from './movie-list-serviced.component';
import { GenreDescriptionPipe } from './genre-description.pipe';
import { MovieSearchFilterPipe } from './movie-search-filter.pipe';
import { MovieGenreFilterPipe } from './movie-genre-filter.pipe';
import { MovieFormatFilterPipe } from './movie-format-filter.pipe';
import { MovieService } from './movie.service'

@NgModule({
	declarations: [
		MovieListComponent,
		MovieListServicedComponent,
		GenreDescriptionPipe,
		MovieSearchFilterPipe,
		MovieFormatFilterPipe,
		MovieGenreFilterPipe
	],
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: 'moviesserviced', component: MovieListServicedComponent },
			{ path: 'movies', component: MovieListComponent },
		])
	],
	providers: [
		MovieService,
	]
})

export class MovieModule {}