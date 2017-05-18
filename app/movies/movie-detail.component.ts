import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { IMovie } from './movie';
import { IGenre } from './genre';
import { MovieService } from './movie.service';

@Component({
	templateUrl: 'app/movies/movie-detail.component.html'
})

export class MovieDetailComponent{
	pageTitle: string = 'Movie Detail';
	movie: IMovie = <IMovie>{};
	genres: IGenre[] = [];
	errorMessage: string;

	constructor(private _route: ActivatedRoute, private _router: Router, private _movieService: MovieService) {

	}

	ngOnInit(): void {
		let id = +this._route.snapshot.params['id'];
		this._movieService.getGenres()
			.subscribe(
				genres => {
					this.genres = genres;
				},
				error => {
					this.errorMessage = <any>error;
					console.log('ERROR !!! ' + this.errorMessage);
				});
		this._movieService.getMovie(id)
			.subscribe(
				movie => {
					this.movie = movie;
					this.prependUrl();
				},
				error => {
					this.errorMessage = <any>error;
					console.log('ERROR !!! ' + this.errorMessage);
				});
	}

	prependUrl(): void{
		let rootImageUrl = './app/assets/images/';
		let formatPath = 'dvd/';
		if (this.movie.format == 'B'){
			formatPath = 'bluray/';
		}

		//Don't show image if none is specified on database
		this.movie.show = true
		if (null == this.movie.image) {
			this.movie.show = false;
		}
		this.movie.image = rootImageUrl + formatPath + this.movie.image;
	}

	onBack(): void {
		this._router.navigate(['/moviesserviced']);
	}
}