import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { IGenre } from './genre';
import { MovieService } from './movie.service';

@Component({
	moduleId: module.id,
	templateUrl: 'movie-list-serviced.component.html',
	styleUrls: ['movie-list.component.css']
})

export class MovieListServicedComponent implements OnInit{
	pageTitle: string = 'Serviced Movie List';
	imageWidth: number = 80;
	imageMargin: number = 2;
	nameFilter: string = '';
	formatFilter: string = 'BDs';
	genreFilter: string = 'X';
	errorMessage: string;
	movies: IMovie[] = [];
	genres: IGenre[] = [];
	selectedGenre: string = '';

	constructor(private _movieService: MovieService) {
	}

	ngOnInit(): void{
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

	getMovieList(genreId: string): void {
		this.selectedGenre = this.getGenreDescription(genreId);
		this._movieService.getMovies(genreId)
			.subscribe(
					movies => {
						this.movies = movies;
						this.updateIconUrls();
					},
					error => {
						this.errorMessage = <any>error;
						console.log('ERROR !!! ' + this.errorMessage);
					});
	}

	updateIconUrls(): void{
		let rootImageUrl = './app/assets/icons/';
		for (let movie of this.movies) {
			let formatPath = 'dvd/';
			if (movie.format == 'B'){
				formatPath = 'bluray/';
			}

			//Don't show image if none is specified on database
			movie.show = true
			if (null == movie.image) {
				movie.show = false;
			}
			movie.image = rootImageUrl + formatPath + movie.image;
		}

	}

	getGenreDescription( genreId: string): string {
		for (let genre of this.genres) {
			if ( genre.id == genreId ) {
				return genre.description;
			}
		}
		return 'all';
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
				this.genreFilter =this.genreFilter.concat(genre.id);
			}
		}
	}

	toggleFormat( format: string ): void {
		this.formatFilter = this.toggleformatFilter(format, this.formatFilter);
	}
	
	toggleformatFilter(format: string, filter: string): string {
		let index: number = filter.indexOf(format, 0);

		if (index > -1){
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