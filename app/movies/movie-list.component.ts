import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { IGenre } from './genre';
import { MovieService } from './movie.service';

@Component({
	moduleId: module.id,
	templateUrl: 'movie-list.component.html',
	styleUrls: ['movie-list.component.css']
})

export class MovieListComponent implements OnInit {
	pageTitle: string = 'Movie List';
	imageWidth: number = 80;
	imageMargin: number = 2;
	nameFilter: string = '';
	formatFilter: string = 'UBDs';
	genreFilter: string = 'X';
	errorMessage: string;
	movies: IMovie[] = [];
	genres: IGenre[] = [];

	constructor(private _movieService: MovieService) {
	}

	ngOnInit(): void {
		console.log('In OnInit');
		console.log('Populating Movies...');
		
		this._movieService.getMovies('all')
			.subscribe(
					movies => {
						this.movies = movies;
						this.prependUrls();
					},
					error => {
						this.errorMessage = <any>error;
						console.log('ERROR !!! ' + this.errorMessage);
					});
		
		console.log('Populating Genres...');
		this._movieService.getGenres()
			.subscribe(
					genres => {
						this.genres = genres;
						this.updateAllGenreShows(false);
					},
					error => {
						this.errorMessage = <any>error;
						console.log('ERROR !!! ' + this.errorMessage);
					});
	}

	prependUrls(): void {
		
		console.log('cycling through image names/urls and prepending with subfolder depending on format')

		for (let movie of this.movies) {
			let formatPath = 'dvd/';
			if (movie.format == 'B') {
				formatPath = 'bluray/';
			}

			// Don't show image if none is specified on database
			movie.show = true
			if (null == movie.image) {
				movie.show = false;
			}
			movie.image = formatPath + movie.image;
		}

	}

	updateAllGenreShows(showAllGenres: boolean): void {
		for (let genre of this.genres){
			genre.show = showAllGenres;
		}
		this.updateGenreFilter();
	}

	updateGenreFilter(): void {
		this.genreFilter = 'X';
		for (let genre of this.genres){
			if ( genre.show ) {
				this.genreFilter = this.genreFilter.concat(genre.id);
			}
		}
	}

	toggleFormat( format: string ): void {
		this.formatFilter = this.toggleformatFilter(format, this.formatFilter);
	}
	
	toggleformatFilter(format: string, filter: string): string {
		let index: number = filter.indexOf(format, 0);

		if (index > -1) {
			let re = new RegExp(format, "gi");
			filter = filter.replace(re, '');
		} else {
			filter = filter.concat(format);
		}

		return filter;
	}

	onRatingClicked(message: string): void {
		console.log('In onRatingClicked');
		this.pageTitle = 'Updated Movie List: ' + message;
	}
}
