import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SliderModule } from 'primeng/primeng';

import { IMovie } from './movie';
import { IGenre } from './genre';
import { MovieService } from './movie.service';

@Component({
	templateUrl: 'app/movies/movie-detail.component.html',
	styleUrls: ['app/movies/movie-list.component.css']
})

export class MovieDetailComponent {
	pageTitle: string = 'Movie Detail';
	movie: IMovie = <IMovie>{};
	genres: IGenre[] = [];
	errorMessage: string;
	edit: boolean = false;
	create: boolean = false;
	saved: string = "X";

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
					this.setImageUrl();
				},
				error => {
					this.errorMessage = <any>error;
					console.log('ERROR !!! ' + this.errorMessage);
				});
	}

	setImageUrl(): void {
		let rootImageUrl = './app/assets/images/';
		let formatPath = 'dvd/';
		if (this.movie.format == 'B') {
			formatPath = 'bluray/';
		}
		if (this.movie.format == 'U') {
			formatPath = 'uhd/';
		}

		// Don't show image if none is specified on database
		this.movie.show = true
		if (null == this.movie.image) {
			this.movie.show = false;
		}
		this.movie.imageUrl = rootImageUrl + formatPath + this.movie.image + ".jpg";
	}

	toggleEdit(): void {
		this.edit = !this.edit;
		this.saved = "X"; // reset the saved flag
	}

	requiresSave(): void {
		console.log("needs saving!!!")
		this.saved = "N";
	}

	saveMovie(): void {
		if (this.validMovie()) {
			if (this.create) { // creating
				
			} else { // updating
				this._movieService.updateMovie(this.movie)
				this._movieService.updateMovie(this.movie)
					.subscribe(
						movie => this.saved = "Y",
						error =>  this.errorMessage = <any>error);
			}
		}
	}

	validMovie(): boolean {
		return true;
	}

	onBack(): void {
		if (this.edit) {
			this.toggleEdit();
		} else {
			this._router.navigate(['/moviesserviced']);
		}
	}
}
