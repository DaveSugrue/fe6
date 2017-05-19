import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MovieListComponent }  from './movie-list.component';
import { MovieListServicedComponent }  from './movie-list-serviced.component';
import { MovieDetailComponent }  from './movie-detail.component';
import { GenreDescriptionPipe } from './genre-description.pipe';
import { MovieSearchFilterPipe } from './movie-search-filter.pipe';
import { MovieGenreFilterPipe } from './movie-genre-filter.pipe';
import { MovieFormatFilterPipe } from './movie-format-filter.pipe';
import { MovieService } from './movie.service'

import { SliderModule } from 'primeng/components/slider/slider';


@NgModule({
	declarations: [
		MovieListComponent,
		MovieListServicedComponent,
		MovieDetailComponent,
		GenreDescriptionPipe,
		MovieSearchFilterPipe,
		MovieFormatFilterPipe,
		MovieGenreFilterPipe
	],
	imports: [
		SliderModule,
		SharedModule,
		RouterModule.forChild([
			{ path: 'moviesserviced', component: MovieListServicedComponent },
			{ path: 'movies', component: MovieListComponent },
			{ path: 'movie/:id', component: MovieDetailComponent}
		])
	],
	providers: [
		MovieService,
	]
})

export class MovieModule {}