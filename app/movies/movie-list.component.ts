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

export class MovieListComponent implements OnInit{
	pageTitle: string = 'Movie List';
	imageWidth: number = 80;
	imageMargin: number = 2;
	showImage: boolean = false;
	nameFilter: string = '';
	formatFilter: string = 'BDs';
	genreFilter: string = '';
	errorMessage: string;
	movies: IMovie[] = [];
	genres: IGenre[] = [];

	constructor(private _movieService: MovieService) {
	}

	toggleGenre( genre: string ): void {
		this.genreFilter = this.toggleformatFilter(genre, this.genreFilter);
	}

	toggleFormat( format: string ): void {
		this.formatFilter = this.toggleformatFilter(format, this.formatFilter);
	}
	
	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void{
		console.log('In OnInit');
		console.log('Populating Movies...');
		this._movieService.getMovies()
			.subscribe(
					movies => {
						this.movies = movies
						this.prependUrls();
					},
					error => this.errorMessage = <any>error);

		console.log('Populating Genres...');
		this._movieService.getGenres()
			.subscribe(
					genres => {
						this.genres = genres
					},
					error => this.errorMessage = <any>error);
	}

	prependUrls(): void{
		
		console.log('cycling through image names/urls and prepending with subfolder depending on format')

		for (let movie of this.movies) {
    		console.log(movie);
			let formatPath = '';
			if (movie.format == 'B'){
				formatPath = 'bluray/';
			} else if (movie.format == 'D') {
				formatPath = 'dvd/';
			}

			//Don't show image if none is specified on database
			movie.show = true
			if (null == movie.image) {
				movie.show = false;
			}

			console.log('Product Name = ' + movie.name);
			console.log('format = ' + movie.format);
			console.log('formatPath = ' + formatPath);

			movie.image = formatPath + movie.image;
			console.log('dotsProduct.iconUrl now = ' + movie.image);
			console.log('dotsProduct.show = ' + movie.show);
		}

	}

	onRatingClicked(message: string): void {
		console.log('In onRatingClicked');
		this.pageTitle = 'Updated Movie List: ' + message;
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

}